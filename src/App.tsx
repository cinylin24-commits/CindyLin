import React, { useState, useEffect } from 'react';
import { UNITS_DATA } from './data/unitsData';
import { Header } from './components/Header';
import { MascotBanner } from './components/MascotBanner';
import { PhonicsTab } from './components/PhonicsTab';
import { VocabularyTab } from './components/VocabularyTab';
import { SentencesTab } from './components/SentencesTab';
import { ReaderTab } from './components/ReaderTab';
import { QuizTab } from './components/QuizTab';

export default function App() {
  const [currentUnitId, setCurrentUnitId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'vocab' | 'sentences' | 'phonics' | 'reader' | 'quiz'>('vocab');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.75); // 0.75 for clear kid-friendly pronunciation
  const [resetKey, setResetKey] = useState<number>(0);

  // Progress state initialized from localStorage
  const [starsByUnit, setStarsByUnit] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('kids_english_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentUnit = UNITS_DATA.find(u => u.id === currentUnitId) || UNITS_DATA[0];

  const totalStars = Object.values(starsByUnit).reduce((acc: number, curr: number) => acc + curr, 0);

  const handleToggleSpeed = () => {
    setSpeechSpeed(prev => (prev < 0.85 ? 1.0 : 0.75));
  };

  const handleQuizComplete = (unitId: number, stars: number) => {
    setStarsByUnit(prev => {
      const updated = { ...prev, [unitId]: Math.max(prev[unitId] || 0, stars) };
      try {
        localStorage.setItem('kids_english_stars', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleResetData = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    setStarsByUnit({});
    setCurrentUnitId(1);
    setActiveTab('vocab');
    setSpeechSpeed(0.75);
    setResetKey(prev => prev + 1);
  };

  const handleNextUnit = () => {
    if (currentUnitId < UNITS_DATA.length) {
      setCurrentUnitId(currentUnitId + 1);
      setActiveTab('vocab');
    }
  };

  return (
    <div key={resetKey} className="min-h-screen bg-slate-100/80 text-slate-800 pb-16 font-sans selection:bg-indigo-200">
      {/* Top Background Accent Bar */}
      <div className="h-2.5 bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-400" />

      <main className="max-w-6xl mx-auto px-3 sm:px-6 pt-6">
        {/* Mascot Banner placed at the top */}
        <MascotBanner
          unitId={currentUnitId}
          unitTitle={currentUnit.title}
          totalStars={totalStars}
          speechSpeed={speechSpeed}
          onReset={handleResetData}
        />

        {/* Navigation & Controls Header */}
        <Header
          units={UNITS_DATA}
          currentUnitId={currentUnitId}
          onSelectUnit={(id) => {
            setCurrentUnitId(id);
            setActiveTab('vocab');
          }}
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          starsByUnit={starsByUnit}
        />

        {/* Workspace Card for Content */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-xl shadow-sky-200/40 border border-sky-100/80 p-4 sm:p-8 transition-all duration-300">
          {activeTab === 'vocab' && (
            <VocabularyTab
              unit={currentUnit}
              speechSpeed={speechSpeed}
              onCompleteChallenge={handleQuizComplete}
            />
          )}

          {activeTab === 'sentences' && (
            <SentencesTab unit={currentUnit} speechSpeed={speechSpeed} />
          )}

          {activeTab === 'phonics' && (
            <PhonicsTab unit={currentUnit} speechSpeed={speechSpeed} />
          )}

          {activeTab === 'reader' && (
            <ReaderTab unit={currentUnit} speechSpeed={speechSpeed} />
          )}

          {activeTab === 'quiz' && (
            <QuizTab
              unit={currentUnit}
              speechSpeed={speechSpeed}
              onCompleteQuiz={handleQuizComplete}
              onNextUnit={handleNextUnit}
            />
          )}
        </div>
      </main>
    </div>
  );
}
