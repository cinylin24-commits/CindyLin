import React, { useState } from 'react';
import { Volume2, Sparkles, Award, RotateCcw, Download } from 'lucide-react';
import { speakText } from '../utils/speech';
import { downloadAppAsHtml } from '../utils/exportHtml';

interface MascotProps {
  unitId: number;
  unitTitle: string;
  totalStars: number;
  speechSpeed: number;
  onReset?: () => void;
}

export const MascotBanner: React.FC<MascotProps> = ({
  unitTitle,
  totalStars,
  speechSpeed,
  onReset,
}) => {
  const [mascotMsg, setMascotMsg] = useState("Hi! I'm Buddy! Let's learn English together! Click me to hear a tip!");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const mascotTips = [
    "Tip: Click any English word to hear how it sounds!",
    "Great job practicing! You earn stars by completing Unit Quizzes!",
    "Phonics helps us read new words! Listen carefully to the sounds!",
    "Try saying the sentences out loud after Buddy!"
  ];

  const handleMascotClick = () => {
    const randomTip = mascotTips[Math.floor(Math.random() * mascotTips.length)];
    setMascotMsg(randomTip);
    speakText(randomTip, speechSpeed);
  };

  return (
    <div className="bg-indigo-900 border-2 border-indigo-700/80 rounded-3xl p-4 sm:p-5 shadow-xl shadow-indigo-950/20 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
      <div className="flex items-center gap-4 cursor-pointer group" onClick={handleMascotClick}>
        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-lg border-2 border-indigo-400 group-hover:scale-105 transition-transform">
            🐻
          </div>
          <div className="absolute -bottom-1 -right-1 bg-emerald-400 text-indigo-950 p-1.5 rounded-xl shadow-md border border-white">
            <Volume2 className="w-4 h-4 font-black" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className="font-black text-white text-lg sm:text-xl tracking-tight">Buddy the Bear</span>
            <span className="bg-indigo-800 text-indigo-200 text-xs px-3 py-1 rounded-xl font-bold flex items-center gap-1 border border-indigo-700">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> {unitTitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-indigo-200 font-medium mt-1 max-w-md sm:max-w-xl leading-relaxed">
            {mascotMsg}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={downloadAppAsHtml}
          title="导出/下载 HTML 文件"
          className="px-3.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-md border border-emerald-400 flex items-center gap-1.5 active:scale-95"
        >
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">下载 HTML</span>
        </button>

        <div className="flex items-center gap-3 bg-indigo-950 px-4 py-2.5 rounded-2xl border border-indigo-800 shadow-inner">
          <div className="flex items-center gap-1 text-amber-400 font-black text-xl sm:text-2xl">
            <Award className="w-7 h-7 fill-amber-400 text-amber-500" />
            <span>{totalStars}</span>
          </div>
          <div className="text-xs text-indigo-300 font-bold leading-tight">
            <div>获得星星</div>
            <div className="text-[10px] text-indigo-400">Stars Earned</div>
          </div>
        </div>

        {onReset && (
          <button
            onClick={() => setShowResetConfirm(true)}
            title="Reset All Progress"
            aria-label="Reset All Progress"
            className="p-3 bg-indigo-950 hover:bg-rose-900/80 text-indigo-300 hover:text-rose-200 rounded-2xl border border-indigo-800 hover:border-rose-700 transition-all shadow-inner flex items-center justify-center active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-slate-800 shadow-2xl border-2 border-indigo-100 animate-in fade-in zoom-in duration-200">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto text-2xl font-black">
                ⚠️
              </div>
              <h3 className="text-lg font-black text-indigo-950">重置学习数据？</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                点击确认后，所有的学习历史与获得星星记录都将清空，并恢复到初始默认状态。
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs sm:text-sm transition-all"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    setShowResetConfirm(false);
                    onReset?.();
                    setMascotMsg("Data reset! Let's start fresh!");
                  }}
                  className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs sm:text-sm transition-all shadow-md shadow-rose-200"
                >
                  确认重置
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
