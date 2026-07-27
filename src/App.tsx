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

  // Detail progress state: unitId -> { vocab, sentences, quiz }
  const [unitStarsDetail, setUnitStarsDetail] = useState<Record<number, { vocab?: number; sentences?: number; quiz?: number }>>(() => {
    try {
      const savedDetail = localStorage.getItem('kids_english_stars_detail');
      if (savedDetail) return JSON.parse(savedDetail);

      const oldSaved = localStorage.getItem('kids_english_stars');
      if (oldSaved) {
        const parsed: Record<number, number> = JSON.parse(oldSaved);
        const migrated: Record<number, { vocab?: number; sentences?: number; quiz?: number }> = {};
        Object.entries(parsed).forEach(([uId, val]) => {
          migrated[Number(uId)] = { quiz: val };
        });
        return migrated;
      }
      return {};
    } catch {
      return {};
    }
  });

  const currentUnit = UNITS_DATA.find(u => u.id === currentUnitId) || UNITS_DATA[0];

  // Map of total stars per unit (sum of vocab 3 + sentences 4 + quiz 3 = max 10 per unit)
  const starsByUnit = React.useMemo(() => {
    const map: Record<number, number> = {};
    UNITS_DATA.forEach(u => {
      const d = unitStarsDetail[u.id];
      map[u.id] = d ? (d.vocab || 0) + (d.sentences || 0) + (d.quiz || 0) : 0;
    });
    return map;
  }, [unitStarsDetail]);

  const totalStars = Object.values(starsByUnit).reduce((acc: number, curr: number) => acc + curr, 0);

  const handleChallengeComplete = (
    unitId: number,
    category: 'vocab' | 'sentences' | 'quiz',
    stars: number
  ) => {
    setUnitStarsDetail(prev => {
      const currentDetail = prev[unitId] || { vocab: 0, sentences: 0, quiz: 0 };
      const newCategoryStars = Math.max(currentDetail[category] || 0, stars);
      const updatedUnitDetail = { ...currentDetail, [category]: newCategoryStars };
      const updatedAll = { ...prev, [unitId]: updatedUnitDetail };

      try {
        localStorage.setItem('kids_english_stars_detail', JSON.stringify(updatedAll));

        const starsSumMap: Record<number, number> = {};
        UNITS_DATA.forEach(u => {
          const d = updatedAll[u.id];
          starsSumMap[u.id] = d ? (d.vocab || 0) + (d.sentences || 0) + (d.quiz || 0) : 0;
        });
        localStorage.setItem('kids_english_stars', JSON.stringify(starsSumMap));
      } catch (e) {
        console.error(e);
      }
      return updatedAll;
    });
  };

  const handleResetData = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    setUnitStarsDetail({});
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
          unitSubtitle={currentUnit.subtitle}
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
          unitStarsDetail={unitStarsDetail}
        />

        {/* Workspace Card for Content */}
        <div className="bg-white rounded-[28px] sm:rounded-[36px] shadow-xl shadow-sky-200/40 border border-sky-100/80 p-4 sm:p-8 transition-all duration-300">
          {activeTab === 'vocab' && (
            <VocabularyTab
              unit={currentUnit}
              speechSpeed={speechSpeed}
              onCompleteChallenge={handleChallengeComplete}
            />
          )}

          {activeTab === 'sentences' && (
            <SentencesTab
              unit={currentUnit}
              speechSpeed={speechSpeed}
              onCompleteChallenge={handleChallengeComplete}
            />
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
              onCompleteQuiz={handleChallengeComplete}
              onNextUnit={handleNextUnit}
            />
          )}
        </div>
      </main>
    </div>
  );
}
