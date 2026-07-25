import React from 'react';
import { BookOpen, BookText, Sparkles, MessageSquare, CheckCircle, Volume2, Turtle, Rabbit } from 'lucide-react';
import { UnitData } from '../types';

interface HeaderProps {
  units: UnitData[];
  currentUnitId: number;
  onSelectUnit: (unitId: number) => void;
  activeTab: 'vocab' | 'sentences' | 'phonics' | 'reader' | 'quiz';
  onSelectTab: (tab: 'vocab' | 'sentences' | 'phonics' | 'reader' | 'quiz') => void;
  starsByUnit: Record<number, number>;
}

export const Header: React.FC<HeaderProps> = ({
  units,
  currentUnitId,
  onSelectUnit,
  activeTab,
  onSelectTab,
  starsByUnit,
}) => {
  const currentUnit = units.find(u => u.id === currentUnitId) || units[0];
  const completedUnitsCount = units.filter(u => (starsByUnit[u.id] || 0) > 0).length;
  const unitProgress = Math.round((completedUnitsCount / units.length) * 100);

  return (
    <header className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 p-4 sm:p-6 mb-6 border-b-4 border-sky-100 border-x border-t">
      {/* Top Title Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-indigo-200">
            A+
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-2">
              Junior English Explorer
            </h1>
            <p className="text-xs sm:text-sm font-bold text-sky-600 uppercase tracking-wider">
              {currentUnit ? currentUnit.title : '7岁英语互动学习乐园'}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Tracker Bar */}
      <div className="bg-indigo-900 rounded-2xl p-3.5 mb-5 shadow-inner">
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs font-black text-indigo-200 uppercase tracking-wider flex-shrink-0">
            Progress ({unitProgress}%):
          </span>
          <div className="flex-1 h-3 bg-indigo-950 rounded-full overflow-hidden flex shadow-inner">
            <div
              className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] transition-all duration-500 rounded-full"
              style={{ width: `${unitProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Unit Selector Pills */}
      <div className="mb-4">
        <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider flex items-center gap-1">
          <span>Select Unit:</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {units.map((u) => {
            const isSelected = u.id === currentUnitId;
            const stars = starsByUnit[u.id] || 0;
            return (
              <button
                key={u.id}
                onClick={() => onSelectUnit(u.id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-2 border-indigo-700 shadow-lg ring-4 ring-indigo-100 scale-105'
                    : 'bg-sky-50 hover:bg-sky-100 text-slate-700 border-2 border-sky-100'
                }`}
              >
                <span>Unit {u.id}</span>
                {stars > 0 && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-black px-2 py-0.5 rounded-full text-[10px] flex items-center gap-0.5 shadow-sm">
                    ⭐ {stars}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mode Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        <button
          onClick={() => onSelectTab('vocab')}
          className={`px-3 py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all ${
            activeTab === 'vocab'
              ? 'bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-lg ring-4 ring-indigo-100 font-black'
              : 'bg-white hover:bg-sky-50 text-indigo-900 border-2 border-sky-200'
          }`}
        >
          <BookText className="w-5 h-5" />
          <span>主题词汇 Vocabulary</span>
        </button>

        <button
          onClick={() => onSelectTab('sentences')}
          className={`px-3 py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all ${
            activeTab === 'sentences'
              ? 'bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-lg ring-4 ring-indigo-100 font-black'
              : 'bg-white hover:bg-sky-50 text-indigo-900 border-2 border-sky-200'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>重点句型 Sentences</span>
        </button>

        <button
          onClick={() => onSelectTab('phonics')}
          className={`px-3 py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all ${
            activeTab === 'phonics'
              ? 'bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-lg ring-4 ring-indigo-100 font-black'
              : 'bg-white hover:bg-sky-50 text-indigo-900 border-2 border-sky-200'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span>自然拼读 Phonics</span>
        </button>

        <button
          onClick={() => onSelectTab('reader')}
          className={`px-3 py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all ${
            activeTab === 'reader'
              ? 'bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-lg ring-4 ring-indigo-100 font-black'
              : 'bg-white hover:bg-sky-50 text-indigo-900 border-2 border-sky-200'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span>阅读绘本 Reader</span>
        </button>

        <button
          onClick={() => onSelectTab('quiz')}
          className={`col-span-2 sm:col-span-1 px-3 py-3 rounded-2xl font-bold text-xs sm:text-sm flex flex-col items-center justify-center gap-1.5 transition-all ${
            activeTab === 'quiz'
              ? 'bg-indigo-600 text-white border-b-4 border-indigo-800 shadow-lg ring-4 ring-indigo-100 font-black'
              : 'bg-white hover:bg-sky-50 text-indigo-900 border-2 border-sky-200'
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          <span>考考你 Quiz</span>
        </button>
      </div>
    </header>
  );
};
