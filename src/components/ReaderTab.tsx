import React, { useState } from 'react';
import { BookOpen, Volume2, ChevronLeft, ChevronRight, Sparkles, Languages } from 'lucide-react';
import { UnitData } from '../types';
import { speakText, sfx } from '../utils/speech';

interface ReaderTabProps {
  unit: UnitData;
  speechSpeed: number;
}

export const ReaderTab: React.FC<ReaderTabProps> = ({ unit, speechSpeed }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(true);

  const reader = unit.reader;
  const currentPage = reader.pages[pageIndex] || reader.pages[0];

  const handleReadPage = () => {
    sfx.playPop();
    speakText(currentPage.text, speechSpeed);
  };

  const handlePrevPage = () => {
    if (pageIndex > 0) {
      sfx.playPop();
      setPageIndex(p => p - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < reader.pages.length - 1) {
      sfx.playPop();
      setPageIndex(p => p + 1);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg border-b-4 border-indigo-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-6 h-6 text-amber-300" />
            <span className="text-xs font-black uppercase tracking-wider bg-indigo-800 px-3 py-1 rounded-xl border border-indigo-700">
              配套绘本 Story Reader
            </span>
          </div>
          <h2 className="text-2xl font-black">{reader.title}</h2>
          <p className="text-indigo-100 text-xs sm:text-sm font-bold mt-1">
            沉浸式英文原版故事朗读，培养孩子语感！
          </p>
        </div>

        {/* Translation Toggle */}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="flex items-center gap-2 bg-indigo-900/80 hover:bg-indigo-950 text-white px-4 py-2.5 rounded-2xl text-xs font-black transition-all border border-indigo-700 shadow-sm"
        >
          <Languages className="w-4 h-4 text-emerald-400" />
          <span>{showTranslation ? '隐藏中文翻译' : '显示中文翻译'}</span>
        </button>
      </div>

      {/* Main Storybook Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-sky-100 shadow-xl relative overflow-hidden flex flex-col items-center text-center space-y-6">
        {/* Story Illustration Header */}
        <div className="w-32 h-32 sm:w-44 sm:h-44 bg-sky-50 rounded-3xl flex items-center justify-center text-7xl sm:text-8xl shadow-inner border border-sky-200 my-2 transform hover:scale-105 transition-transform cursor-pointer" onClick={handleReadPage}>
          {currentPage.illustration || reader.coverEmoji}
        </div>

        {/* Page Text Block */}
        <div className="max-w-xl space-y-3">
          <p
            onClick={handleReadPage}
            className="text-xl sm:text-2xl font-black text-indigo-950 hover:text-indigo-600 transition-colors cursor-pointer leading-relaxed"
          >
            "{currentPage.text}"
          </p>

          {showTranslation && (
            <p className="text-sm sm:text-base font-bold text-sky-700">
              {currentPage.translation}
            </p>
          )}
        </div>

        {/* Audio Play Button */}
        <button
          onClick={handleReadPage}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-200 border-b-4 border-indigo-800 transition-transform active:scale-95"
        >
          <Volume2 className="w-5 h-5 text-amber-300" /> 点击朗读本页故事
        </button>

        {/* Page Navigator Controls */}
        <div className="flex items-center justify-between w-full pt-6 border-t border-sky-100">
          <button
            onClick={handlePrevPage}
            disabled={pageIndex === 0}
            className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
              pageIndex === 0
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                : 'bg-sky-50 text-indigo-900 border-2 border-sky-200 hover:bg-sky-100 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> 上一页
          </button>

          <div className="flex items-center gap-1 text-xs font-black text-sky-700 bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200">
            <span>第 {pageIndex + 1} 页</span>
            <span>/</span>
            <span>共 {reader.pages.length} 页</span>
          </div>

          <button
            onClick={handleNextPage}
            disabled={pageIndex === reader.pages.length - 1}
            className={`flex items-center gap-1 px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all ${
              pageIndex === reader.pages.length - 1
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                : 'bg-emerald-500 text-white hover:bg-emerald-600 border-b-4 border-emerald-700 shadow-md shadow-emerald-200'
            }`}
          >
            下一页 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
