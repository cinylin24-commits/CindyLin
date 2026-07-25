import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, BookOpen, Star, HelpCircle, Trophy, RefreshCw, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UnitData } from '../types';
import { speakText, sfx } from '../utils/speech';
import { UNITS_DATA } from '../data/unitsData';

interface PhonicsTabProps {
  unit: UnitData;
  speechSpeed: number;
}

interface PhonicsQuizItem {
  prompt: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
  type: 'word' | 'sound' | 'sight' | 'missing';
}

export const PhonicsTab: React.FC<PhonicsTabProps> = ({ unit, speechSpeed }) => {
  const [poppedSightWords, setPoppedSightWords] = useState<Record<string, boolean>>({});

  const handleSpeak = (text: string) => {
    sfx.playPop();
    speakText(text, speechSpeed);
  };

  const handleSightWordPop = (word: string) => {
    sfx.playCorrect();
    speakText(word, speechSpeed);
    setPoppedSightWords(prev => ({ ...prev, [word]: true }));
  };

  // Helper function to highlight phonics letter combinations (sh, ch, th, wh, oi, oy, ar, or, etc.)
  const renderPhonicsHighlightedWord = (word: string, targetSound?: string) => {
    if (!word) return null;

    // List of key phonics patterns to highlight
    const keyPatterns = [
      targetSound,
      'sh', 'ch', 'th', 'wh', 'ph', 'ck', 'ng', 'nk',
      'oi', 'oy', 'ar', 'or', 'er', 'ir', 'ur',
      'ee', 'ea', 'ai', 'ay', 'oa', 'ow', 'ou', 'oo',
      'bl', 'cl', 'fl', 'gl', 'pl', 'sl', 'br', 'cr', 'dr', 'fr', 'gr', 'pr', 'tr', 'st', 'sp', 'sk'
    ].filter(Boolean) as string[];

    // Remove duplicates and sort by length descending
    const sortedPatterns = Array.from(new Set(keyPatterns)).sort((a, b) => b.length - a.length);
    const patternRegex = new RegExp(`(${sortedPatterns.join('|')})`, 'gi');

    const parts = word.split(patternRegex);

    return (
      <span>
        {parts.map((part, idx) => {
          const isTarget = targetSound && part.toLowerCase() === targetSound.toLowerCase();
          const isKeyPattern = sortedPatterns.some(p => p.toLowerCase() === part.toLowerCase());

          if (isTarget || isKeyPattern) {
            return (
              <span
                key={idx}
                className="font-black"
                style={{ color: '#4F39F6' }}
              >
                {part}
              </span>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  // Helper to render entire sentence with phonics highlighted words
  const renderPhonicsHighlightedText = (text: string, targetSound?: string) => {
    if (!text) return null;
    const words = text.split(' ');

    return (
      <span>
        {words.map((w, i) => (
          <React.Fragment key={i}>
            {renderPhonicsHighlightedWord(w, targetSound)}
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        ))}
      </span>
    );
  };

  // ================= 10-Question Phonics Quiz Module =================
  const MAX_PHONICS_Q = 10;
  const [pqIndex, setPqIndex] = useState(0);
  const [pqScore, setPqScore] = useState(0);
  const [pqFinished, setPqFinished] = useState(false);
  const [pqFeedback, setPqFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [pqSelectedOpt, setPqSelectedOpt] = useState<string | null>(null);
  const [pqList, setPqList] = useState<PhonicsQuizItem[]>([]);

  const generate10PhonicsQuestions = (): PhonicsQuizItem[] => {
    const list: PhonicsQuizItem[] = [];

    // Collect phonics items across all units
    const currentPhonics = unit.phonics;
    const currentSightWords = unit.sightWords;

    const allPhonics = UNITS_DATA.flatMap(u => u.phonics);
    const allSightWords = UNITS_DATA.flatMap(u => u.sightWords);

    // 1. Story word listen & pick (3 questions)
    currentPhonics.forEach((p, pIdx) => {
      p.storyWords.forEach((word) => {
        if (list.length >= 3) return;
        const distractors = allPhonics
          .flatMap(item => item.storyWords)
          .filter(w => w !== word);
        const randD1 = distractors[Math.floor(Math.random() * distractors.length)] || 'cat';
        const randD2 = distractors.filter(w => w !== randD1)[Math.floor(Math.random() * (distractors.length - 1))] || 'dog';

        const opts = [word, randD1, randD2].sort(() => Math.random() - 0.5);
        list.push({
          prompt: `请听发音，选出正确的自然拼读单词：`,
          correctAnswer: word,
          options: opts,
          audioText: word,
          type: 'word'
        });
      });
    });

    // 2. Sound matching (3 questions)
    currentPhonics.forEach(p => {
      if (list.length >= 6) return;
      const targetWord = p.storyWords[0] || 'word';
      const targetSound = p.sound;
      const otherSounds = allPhonics.map(item => item.sound).filter(s => s !== targetSound);
      const d1 = otherSounds[Math.floor(Math.random() * otherSounds.length)] || 'ch';
      const d2 = otherSounds.filter(s => s !== d1)[Math.floor(Math.random() * (otherSounds.length - 1))] || 'th';

      const opts = [`/${targetSound}/`, `/${d1}/`, `/${d2}/`].sort(() => Math.random() - 0.5);
      list.push({
        prompt: `单词 "${targetWord}" 主要发哪种自然拼读音素？`,
        correctAnswer: `/${targetSound}/`,
        options: opts,
        audioText: targetWord,
        type: 'sound'
      });
    });

    // 3. Sight words listen & pick (2 questions)
    currentSightWords.forEach(sw => {
      if (list.length >= 8) return;
      const otherSight = allSightWords.filter(s => s !== sw);
      const d1 = otherSight[Math.floor(Math.random() * otherSight.length)] || 'the';
      const d2 = otherSight.filter(s => s !== d1)[Math.floor(Math.random() * (otherSight.length - 1))] || 'and';

      const opts = [sw, d1, d2].sort(() => Math.random() - 0.5);
      list.push({
        prompt: `请听朗读，选出对应的高频词 (Sight Word)：`,
        correctAnswer: sw,
        options: opts,
        audioText: sw,
        type: 'sight'
      });
    });

    // 4. Missing phonics letters completion (Fill remaining up to 10)
    currentPhonics.forEach(p => {
      if (list.length >= MAX_PHONICS_Q) return;
      const word = p.storyWords[0] || 'fish';
      const sound = p.sound;

      if (word.toLowerCase().includes(sound.toLowerCase())) {
        const masked = word.replace(new RegExp(sound, 'gi'), '___');
        const otherSounds = allPhonics.map(item => item.sound).filter(s => s !== sound);
        const d1 = otherSounds[0] || 'ch';
        const d2 = otherSounds[1] || 'th';

        const opts = [sound, d1, d2].sort(() => Math.random() - 0.5);
        list.push({
          prompt: `补全拼音字母："${masked}" (听全词发音)`,
          correctAnswer: sound,
          options: opts,
          audioText: word,
          type: 'missing'
        });
      }
    });

    // Fill any remaining slots to guarantee exactly 10 questions
    while (list.length < MAX_PHONICS_Q) {
      const sw = currentSightWords[list.length % currentSightWords.length] || 'a';
      const otherSight = allSightWords.filter(s => s !== sw);
      const d1 = otherSight[0] || 'in';
      const d2 = otherSight[1] || 'on';
      const opts = [sw, d1, d2].sort(() => Math.random() - 0.5);

      list.push({
        prompt: `请听发音，选出对应的单词：`,
        correctAnswer: sw,
        options: opts,
        audioText: sw,
        type: 'sight'
      });
    }

    return list.slice(0, MAX_PHONICS_Q);
  };

  useEffect(() => {
    setPqList(generate10PhonicsQuestions());
    setPqIndex(0);
    setPqScore(0);
    setPqFinished(false);
    setPqFeedback(null);
    setPqSelectedOpt(null);
  }, [unit.id]);

  // Auto-play question audio when entering a new question for "磨耳朵"
  useEffect(() => {
    if (!pqFinished && pqList.length > 0 && pqList[pqIndex]) {
      const currentItem = pqList[pqIndex];
      if (currentItem.audioText) {
        const timer = setTimeout(() => {
          speakText(currentItem.audioText!, speechSpeed);
        }, 350);
        return () => clearTimeout(timer);
      }
    }
  }, [pqIndex, pqFinished, pqList]);

  const handleStartPhonicsQuiz = () => {
    setPqList(generate10PhonicsQuestions());
    setPqIndex(0);
    setPqScore(0);
    setPqFinished(false);
    setPqFeedback(null);
    setPqSelectedOpt(null);
  };

  const handlePQOptionClick = (opt: string) => {
    if (pqFeedback === 'correct' || pqFinished) return;

    setPqSelectedOpt(opt);
    const currentQ = pqList[pqIndex];

    if (opt === currentQ.correctAnswer) {
      sfx.playCorrect();
      setPqFeedback('correct');
      setPqScore(s => s + 10);

      setTimeout(() => {
        if (pqIndex + 1 >= MAX_PHONICS_Q) {
          triggerPQVictory();
        } else {
          setPqIndex(i => i + 1);
          setPqFeedback(null);
          setPqSelectedOpt(null);
        }
      }, 850);
    } else {
      sfx.playWrong();
      setPqFeedback('wrong');
    }
  };

  const triggerPQVictory = () => {
    setPqFinished(true);
    sfx.playFanfare();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  const currentPQItem = pqList[pqIndex];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg border-b-4 border-indigo-800">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-amber-300" />
          <h2 className="text-2xl font-black">自然拼读 Phonics & 故事</h2>
        </div>
        <p className="text-indigo-100 text-sm font-bold">
          彩色标注自然拼读音素（sh, ch, th, wh, oi, oy, ar, or...），轻松搞定拼读！
        </p>
      </div>

      {/* Phonics Sounds Cards with Pattern Color Highlighting */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {unit.phonics.map((p, idx) => (
          <div
            key={idx}
            className="bg-white border-2 border-sky-100 hover:border-indigo-300 rounded-3xl p-6 shadow-md transition-all space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-sky-100">
              <div>
                <span className="text-xs font-black text-indigo-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-xl uppercase tracking-wider">
                  {p.label}
                </span>
                <h3 className="text-3xl font-black text-indigo-900 mt-2 flex items-center gap-2">
                  <span>/{p.sound}/</span>
                  <button
                    onClick={() => handleSpeak(p.sound)}
                    className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-transform active:scale-95"
                    title="朗读发音"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 font-bold">拼读故事</span>
                <div className="text-sm font-black text-indigo-900 flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-indigo-600" /> {p.storyTitle}
                </div>
              </div>
            </div>

            {/* Story Words Grid with Phonics Highlight (Requirement 7) */}
            <div>
              <div className="text-xs font-bold text-slate-500 mb-2">故事单词 (Story Words):</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {p.storyWords.map((word, wIdx) => (
                  <button
                    key={wIdx}
                    onClick={() => handleSpeak(word)}
                    className="p-2.5 rounded-xl bg-sky-50/80 hover:bg-sky-100 text-indigo-950 font-extrabold text-sm flex flex-col items-center justify-center gap-1 border border-sky-200 transition-all hover:scale-105 active:scale-95 shadow-sm"
                  >
                    <span className="text-base">
                      {renderPhonicsHighlightedWord(word, p.sound)}
                    </span>
                    <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                  </button>
                ))}
              </div>
            </div>

            {/* Phonics Story Paragraph - Plain Text without color highlight */}
            {p.storyText && p.storyText.length > 0 && (
              <div className="bg-sky-50/50 rounded-2xl p-4 border border-sky-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-900">📖 拼读小故事：</span>
                  <button
                    onClick={() => handleSpeak(p.storyText!.join(' '))}
                    className="text-xs font-extrabold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-sky-200 shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> 朗读整段故事
                  </button>
                </div>
                <div className="space-y-1.5">
                  {p.storyText.map((line, lIdx) => (
                    <p
                      key={lIdx}
                      onClick={() => handleSpeak(line)}
                      className="text-sm text-indigo-950 font-bold hover:bg-sky-100/80 p-2 rounded-xl cursor-pointer transition-colors flex items-center justify-between border border-transparent hover:border-sky-200"
                    >
                      <span>{line}</span>
                      <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sight Words Section */}
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-sky-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-400 rounded-xl text-indigo-950 shadow-md">
              <Star className="w-5 h-5 fill-indigo-950 text-indigo-950" />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-900">✅ 高频词 Sight Words</h3>
              <p className="text-xs font-bold text-sky-600">点击小泡泡点亮单词，练习快速认读！</p>
            </div>
          </div>

          <button
            onClick={() => setPoppedSightWords({})}
            className="text-xs font-bold text-indigo-700 hover:bg-sky-100 bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl transition-colors"
          >
            重置泡泡 Reset
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {unit.sightWords.map((word, idx) => {
            const isPopped = poppedSightWords[word];
            return (
              <button
                key={idx}
                onClick={() => handleSightWordPop(word)}
                className={`px-4 py-2.5 rounded-2xl font-black text-sm transition-all transform active:scale-90 flex items-center gap-2 shadow-sm ${
                  isPopped
                    ? 'bg-amber-400 text-indigo-950 scale-105 shadow-md shadow-amber-200/50 border-2 border-amber-500'
                    : 'bg-sky-50 hover:bg-sky-100 text-indigo-900 border-2 border-sky-200'
                }`}
              >
                <span>{word}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requirement 2: 10-Question Phonics Test Module */}
      <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <HelpCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-950">🎯 10题自然拼读大挑战 (Phonics Test)</h3>
              <p className="text-xs font-bold text-sky-600">测试发音与拼读掌握程度，答对自动跳转下一题！</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!pqFinished && pqList.length > 0 && (
              <span className="text-xs font-black text-indigo-900 bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl">
                进度: {pqIndex + 1} / {MAX_PHONICS_Q}
              </span>
            )}
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl">
              得分: {pqScore}
            </span>
            <button
              onClick={handleStartPhonicsQuiz}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 重新开始
            </button>
          </div>
        </div>

        {pqFinished ? (
          /* Victory Screen */
          <div className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 border-4 border-amber-300 shadow-2xl relative overflow-hidden animate-pop">
            <div className="w-24 h-24 bg-amber-400/20 border-4 border-amber-300 rounded-3xl flex items-center justify-center text-amber-300 mx-auto shadow-inner">
              <Trophy className="w-14 h-14 text-amber-300 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-400 text-indigo-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                拼读小能手！Phonics Master!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                🎉 恭喜完成10题自然拼读测试！
              </h3>
              <p className="text-sm text-indigo-200 font-bold max-w-md mx-auto">
                你成功斩获 <span className="text-emerald-400 font-black text-lg">{pqScore}</span> 分！自然拼读能力棒棒哒！
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleStartPhonicsQuiz}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl flex items-center gap-2 shadow-lg border-b-4 border-emerald-700 transition-transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" /> 再挑战一次 Re-start
              </button>
            </div>
          </div>
        ) : currentPQItem ? (
          <div className="space-y-6 py-2 max-w-xl mx-auto">
            {/* Display Question Prompt */}
            <div className="bg-sky-50/80 rounded-2xl p-4 sm:p-5 border-2 border-sky-200 text-center space-y-3 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-black text-sky-700 bg-white border border-sky-200 px-3 py-1 rounded-xl uppercase">
                  第 {pqIndex + 1} 题
                </span>
              </div>

              <div className="text-lg sm:text-xl font-black text-indigo-950 flex flex-col sm:flex-row items-center justify-center gap-2">
                <span>{currentPQItem.prompt}</span>
                {currentPQItem.audioText && (
                  <button
                    type="button"
                    onClick={() => speakText(currentPQItem.audioText!, speechSpeed)}
                    className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow transition-transform hover:scale-110 flex items-center gap-1 text-xs"
                  >
                    <Volume2 className="w-4 h-4 text-amber-300" />
                    <span>播放声音</span>
                  </button>
                )}
              </div>
            </div>

            {/* Response Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentPQItem.options.map((opt, oIdx) => {
                const isSelected = pqSelectedOpt === opt;
                let optStyle = 'bg-white hover:bg-sky-100 border-sky-200 text-indigo-950';

                if (pqFeedback === 'correct' && opt === currentPQItem.correctAnswer) {
                  optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-100';
                } else if (pqFeedback === 'wrong' && isSelected) {
                  optStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                }

                return (
                  <div
                    key={oIdx}
                    role="button"
                    tabIndex={0}
                    onClick={() => handlePQOptionClick(opt)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handlePQOptionClick(opt);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 font-black text-base sm:text-lg transition-all text-center flex flex-col items-center justify-center gap-2 shadow-sm hover:scale-[1.02] cursor-pointer ${optStyle}`}
                  >
                    <span>{opt}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(opt, speechSpeed);
                      }}
                      className="p-1 text-indigo-600 hover:text-indigo-800"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Answer Feedback placed at the very bottom */}
            <div className="min-h-[28px] flex items-center justify-center">
              {pqFeedback === 'correct' && (
                <div className="text-emerald-600 font-black text-sm flex items-center justify-center gap-1 animate-bounce text-center">
                  <CheckCircle2 className="w-5 h-5" /> 太棒啦！回答正确 +10 分！
                </div>
              )}

              {pqFeedback === 'wrong' && (
                <div className="text-rose-500 font-black text-sm text-center">
                  再听听看哦！选出正确的拼读或单词~
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <button
              onClick={handleStartPhonicsQuiz}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-200 border-b-4 border-emerald-700 transition-all hover:-translate-y-0.5"
            >
              🎯 开始10题自然拼读测试
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
