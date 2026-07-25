import React, { useState } from 'react';
import { Volume2, RefreshCw, CheckCircle, HelpCircle, Trophy, Sparkles, Star, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UnitData, VocabularyItem } from '../types';
import { speakText, sfx } from '../utils/speech';

interface VocabularyTabProps {
  unit: UnitData;
  speechSpeed: number;
  onCompleteChallenge?: (unitId: number, stars: number) => void;
}

export const VocabularyTab: React.FC<VocabularyTabProps> = ({
  unit,
  speechSpeed,
  onCompleteChallenge,
}) => {
  const [selectedWord, setSelectedWord] = useState<VocabularyItem | null>(null);

  // Quick Mini-Game state inside vocabulary tab (Max 20 Questions)
  const MAX_GAME_ROUNDS = 20;
  const [gameRound, setGameRound] = useState(0); // 1 to 20
  const [gameScore, setGameScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [gameTarget, setGameTarget] = useState<VocabularyItem | null>(null);
  const [gameOptions, setGameOptions] = useState<VocabularyItem[]>([]);
  const [gameFeedback, setGameFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [gameFinished, setGameFinished] = useState(false);

  const handleSpeak = (word: string) => {
    sfx.playPop();
    speakText(word, speechSpeed);
  };

  const startMatchGame = (roundNum = 1) => {
    const list = [...unit.vocabNew, ...unit.vocabReview];
    if (list.length < 2) return;

    if (roundNum === 1) {
      setGameScore(0);
      setCorrectCount(0);
      setGameFinished(false);
    }

    if (roundNum > MAX_GAME_ROUNDS) {
      triggerVictory(correctCount);
      return;
    }

    const target = list[Math.floor(Math.random() * list.length)];
    const shuffled = [...list].sort(() => Math.random() - 0.5).slice(0, 3);

    if (!shuffled.some(item => item.word === target.word)) {
      shuffled[0] = target;
    }

    const finalOptions = shuffled.sort(() => Math.random() - 0.5);

    setGameRound(roundNum);
    setGameTarget(target);
    setGameOptions(finalOptions);
    setGameFeedback(null);
    speakText(target.word, speechSpeed);
  };

  const triggerVictory = (finalCorrect = correctCount) => {
    setGameFinished(true);
    sfx.playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    const earnedStars = finalCorrect >= 15 ? 3 : finalCorrect >= 10 ? 2 : 1;
    if (onCompleteChallenge) {
      onCompleteChallenge(unit.id, earnedStars);
    }
  };

  const handleGameGuess = (option: VocabularyItem) => {
    if (!gameTarget || gameFeedback === 'correct') return;

    if (option.word === gameTarget.word) {
      sfx.playCorrect();
      setGameFeedback('correct');
      const newScore = gameScore + 10;
      const newCorrect = correctCount + 1;
      setGameScore(newScore);
      setCorrectCount(newCorrect);

      setTimeout(() => {
        if (gameRound >= MAX_GAME_ROUNDS) {
          triggerVictory(newCorrect);
        } else {
          startMatchGame(gameRound + 1);
        }
      }, 900);
    } else {
      sfx.playWrong();
      setGameFeedback('wrong');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg border-b-4 border-indigo-800">
        <h2 className="text-2xl font-black">主题词汇 Vocabulary</h2>
        <p className="text-indigo-100 text-sm font-bold mt-1">
          认读核心词汇，点击卡片练习标准发音！
        </p>
      </div>

      {/* Group 1: 新知词汇 New Words */}
      {unit.vocabNew && unit.vocabNew.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div className="flex items-center gap-2">
              <span className="text-xl">✨</span>
              <h3 className="text-lg font-black text-indigo-950">
                ✨ 新知词汇 New Words ({unit.vocabNew.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {unit.vocabNew.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedWord(item);
                  handleSpeak(item.word);
                }}
                className="group bg-sky-50/50 hover:bg-white rounded-3xl p-5 border-2 border-sky-100 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden transform hover:-translate-y-1"
              >
                <div className="text-5xl sm:text-6xl my-2 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <div className="text-base sm:text-lg font-black text-indigo-900 tracking-tight">
                  {item.word}
                </div>
                <div className="text-xs font-bold text-sky-600 mt-0.5">
                  {item.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Group 2: 复习词汇 Review Words */}
      {unit.vocabReview && unit.vocabReview.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-100">
            <div className="flex items-center gap-2">
              <span className="text-xl">🔄</span>
              <h3 className="text-lg font-black text-indigo-950">
                🔄 复习词汇 Review Words ({unit.vocabReview.length})
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {unit.vocabReview.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedWord(item);
                  handleSpeak(item.word);
                }}
                className="group bg-amber-50/30 hover:bg-white rounded-3xl p-5 border-2 border-sky-100 hover:border-indigo-400 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden transform hover:-translate-y-1"
              >
                <div className="text-5xl sm:text-6xl my-2 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </div>
                <div className="text-base sm:text-lg font-black text-indigo-900 tracking-tight">
                  {item.word}
                </div>
                <div className="text-xs font-bold text-sky-600 mt-0.5">
                  {item.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Word Challenge Game */}
      <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-950">🎮 20题单词速记大挑战 (Word Challenge)</h3>
              <p className="text-xs font-bold text-sky-600">听发音，选出正确的对应卡片！最多20题</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {gameRound > 0 && !gameFinished && (
              <span className="text-xs font-black text-indigo-900 bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl">
                进度: {gameRound} / {MAX_GAME_ROUNDS}
              </span>
            )}
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl">
              积分: {gameScore}
            </span>
            <button
              onClick={() => startMatchGame(1)}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 重新开始
            </button>
          </div>
        </div>

        {gameFinished ? (
          /* Victory Celebration Interactive Animation Card */
          <div className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 border-4 border-amber-300 shadow-2xl relative overflow-hidden animate-pop">
            <div className="absolute top-2 left-4 text-3xl animate-bounce">✨</div>
            <div className="absolute top-4 right-6 text-3xl animate-bounce">🌟</div>

            <div className="w-24 h-24 bg-amber-400/20 border-4 border-amber-300 rounded-3xl flex items-center justify-center text-amber-300 mx-auto shadow-inner">
              <Trophy className="w-14 h-14 text-amber-300 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-indigo-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> 挑战全满贯！Challenge Completed!
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                🎉 恭喜通关20题单词挑战！
              </h3>
              <p className="text-sm text-indigo-200 font-bold max-w-md mx-auto">
                你太棒啦！一共答对 <span className="text-amber-300 font-black text-lg">{correctCount}</span> / 20 题，斩获 <span className="text-emerald-400 font-black text-lg">{gameScore}</span> 分！
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => startMatchGame(1)}
                className="px-6 py-3 bg-indigo-700 hover:bg-indigo-600 text-white border-2 border-indigo-500 font-black text-sm rounded-2xl flex items-center gap-2 transition-transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" /> 再挑战一次 Re-challenge
              </button>
            </div>
          </div>
        ) : gameTarget ? (
          <div className="text-center space-y-4 py-2">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => speakText(gameTarget.word, speechSpeed)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-200 border-b-4 border-indigo-800 hover:scale-105 transition-transform"
              >
                <Volume2 className="w-6 h-6 text-amber-300" /> 点击听发音: "{gameTarget.word}"
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-lg mx-auto">
              {gameOptions.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={() => handleGameGuess(opt)}
                  className="p-4 bg-sky-50/50 hover:bg-sky-100 hover:border-indigo-400 border-2 border-sky-100 rounded-2xl font-black text-indigo-900 transition-all flex flex-col items-center justify-center gap-1 shadow-sm hover:scale-105"
                >
                  <span className="text-4xl">{opt.emoji}</span>
                  <span className="text-sm mt-1">{opt.translation}</span>
                </button>
              ))}
            </div>

            {/* Answer Feedback placed at the bottom below options */}
            <div className="min-h-[28px] flex items-center justify-center pt-2">
              {gameFeedback === 'correct' && (
                <div className="text-emerald-600 font-black text-sm flex items-center justify-center gap-1 animate-bounce">
                  <CheckCircle className="w-5 h-5" /> 太棒啦！回答正确 +10 分！
                </div>
              )}

              {gameFeedback === 'wrong' && (
                <div className="text-rose-500 font-black text-sm">
                  再试一次哦！再听一遍单词声音~
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-sm font-bold text-sky-700 mb-3">点击按钮启动20题单词速记大挑战吧！</p>
            <button
              onClick={() => startMatchGame(1)}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-200 border-b-4 border-emerald-700 transition-all hover:-translate-y-0.5"
            >
              🎮 开始20题词汇大挑战
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
