import React, { useState, useEffect } from 'react';
import { Volume2, MessageSquare, Sparkles, CheckCircle2, HelpCircle, Trophy, RefreshCw, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UnitData, SentencePattern } from '../types';
import { speakText, speakSequence, sfx } from '../utils/speech';
import { getOptionEmoji } from '../utils/emoji';
import { UNITS_DATA } from '../data/unitsData';

interface SentencesTabProps {
  unit: UnitData;
  speechSpeed: number;
}

interface SentenceQAItem {
  questionText: string;
  correctAnswer: string;
  options: string[];
}

const NUMBER_EMOJIS = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];

const JOB_DUTIES: Record<string, { question: string; answer: string }> = {
  'nurse': { question: 'What does a nurse do?', answer: 'A nurse helps sick people.' },
  'pilot': { question: 'What does a pilot do?', answer: 'A pilot flies planes.' },
  'baker': { question: 'What does a baker do?', answer: 'A baker bakes bread.' },
  'police officer': { question: 'What does a police officer do?', answer: 'A police officer helps people.' },
  'firefighter': { question: 'What does a firefighter do?', answer: 'A firefighter stops fires.' },
  'doctor': { question: 'What does a doctor do?', answer: 'A doctor helps sick people.' },
  'singer': { question: 'What does a singer do?', answer: 'A singer sings songs.' },
};

const JOB_WORKPLACES: Record<string, { question: string; answer: string }> = {
  'doctor': { question: 'Where does a doctor work?', answer: 'A doctor works at a hospital.' },
  'nurse': { question: 'Where does a nurse work?', answer: 'A nurse works at a hospital.' },
  'firefighter': { question: 'Where does a firefighter work?', answer: 'A firefighter works at a fire station.' },
  'police officer': { question: 'Where does a police officer work?', answer: 'A police officer works at a police station.' },
  'pilot': { question: 'Where does a pilot work?', answer: 'A pilot works at an airport.' },
  'baker': { question: 'Where does a baker work?', answer: 'A baker works at a bakery.' },
};

export const SentencesTab: React.FC<SentencesTabProps> = ({ unit, speechSpeed }) => {
  // State for Requirement 4: Active selected word per pattern ID
  const [activeWords, setActiveWords] = useState<Record<string, string>>({});

  // Get active selected word for a pattern, defaulting to first item in wordsToInsert
  const getActiveWordForPattern = (pattern: SentencePattern): string => {
    if (activeWords[pattern.id]) return activeWords[pattern.id];
    if (pattern.wordsToInsert && pattern.wordsToInsert.length > 0) {
      return pattern.wordsToInsert[0];
    }
    return '';
  };

  // Helper to build filled Question sentence
  const getFilledQuestionText = (pattern: SentencePattern, activeWord: string): string => {
    if (!activeWord) return pattern.sampleQuestion || pattern.question;

    const lowerWord = activeWord.toLowerCase().trim();
    if (JOB_DUTIES[lowerWord] && (pattern.question.includes('What does a') || pattern.id === 'u1-3')) {
      return JOB_DUTIES[lowerWord].question;
    }
    if (JOB_WORKPLACES[lowerWord] && (pattern.question.includes('Where does a') || pattern.id === 'u2-2')) {
      return JOB_WORKPLACES[lowerWord].question;
    }

    let base = pattern.sampleQuestion || pattern.question;
    // Replace placeholder ____ or first option in sample
    if (base.includes('____')) {
      return base.replace('____', activeWord);
    }
    // Handle word replacement in sample question if present
    if (pattern.wordsToInsert) {
      for (const w of pattern.wordsToInsert) {
        if (base.toLowerCase().includes(w.toLowerCase())) {
          return base.replace(new RegExp(w, 'gi'), activeWord);
        }
      }
    }
    return base;
  };

  // Helper to build filled Answer sentence
  const getFilledAnswerText = (pattern: SentencePattern, activeWord: string): string => {
    if (!activeWord) return pattern.sampleAnswer || pattern.answer;

    const lowerWord = activeWord.toLowerCase().trim();
    if (JOB_DUTIES[lowerWord] && (pattern.question.includes('What does a') || pattern.id === 'u1-3')) {
      return JOB_DUTIES[lowerWord].answer;
    }
    if (JOB_WORKPLACES[lowerWord] && (pattern.question.includes('Where does a') || pattern.id === 'u2-2')) {
      return JOB_WORKPLACES[lowerWord].answer;
    }

    let base = pattern.sampleAnswer || pattern.answer;
    if (base.includes('____')) {
      return base.replace('____', activeWord);
    }
    if (pattern.wordsToInsert) {
      for (const w of pattern.wordsToInsert) {
        if (base.toLowerCase().includes(w.toLowerCase())) {
          return base.replace(new RegExp(w, 'gi'), activeWord);
        }
      }
    }
    return base;
  };

  const handleSelectWord = (pattern: SentencePattern, word: string) => {
    sfx.playPop();
    setActiveWords(prev => ({ ...prev, [pattern.id]: word }));
    const filledQuestion = getFilledQuestionText(pattern, word);
    const filledAnswer = getFilledAnswerText(pattern, word);
    speakSequence([filledQuestion, filledAnswer], speechSpeed);
  };

  // Helper to highlight replacement word inside a sentence
  const renderHighlightedSentence = (fullText: string, activeWord: string) => {
    if (!activeWord || !fullText.toLowerCase().includes(activeWord.toLowerCase())) {
      return <span>{fullText}</span>;
    }

    const parts = fullText.split(new RegExp(`(${activeWord})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === activeWord.toLowerCase() ? (
            <span
              key={i}
              className="font-black"
              style={{ color: '#FE9A00' }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  // ================= Requirement 5: 20-Question Sentence Q&A Challenge =================
  const MAX_QA_QUESTIONS = 20;
  const [qaIndex, setQaIndex] = useState(0);
  const [qaScore, setQaScore] = useState(0);
  const [qaCorrectCount, setQaCorrectCount] = useState(0);
  const [qaFinished, setQaFinished] = useState(false);
  const [qaFeedback, setQaFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [qaList, setQaList] = useState<SentenceQAItem[]>([]);

  // Generator for 20 Q&A questions from all units
  const generate20QAQuestions = (): SentenceQAItem[] => {
    const pool: SentenceQAItem[] = [];

    // Collect all patterns across all units for rich variety
    const allPatterns: { p: SentencePattern; uTitle: string }[] = [];
    UNITS_DATA.forEach(u => {
      u.topicSentences.forEach(ts => {
        allPatterns.push({ p: ts, uTitle: u.title });
      });
    });

    const currentUnitPatterns = unit.topicSentences;

    // Generate up to 20 questions
    for (let i = 0; i < MAX_QA_QUESTIONS; i++) {
      // Pick a pattern (prefer current unit patterns)
      const patObj = i < currentUnitPatterns.length
        ? { p: currentUnitPatterns[i % currentUnitPatterns.length], uTitle: unit.title }
        : allPatterns[Math.floor(Math.random() * allPatterns.length)];

      const pat = patObj.p;
      const wordToUse = pat.wordsToInsert && pat.wordsToInsert.length > 0
        ? pat.wordsToInsert[Math.floor(Math.random() * pat.wordsToInsert.length)]
        : '';

      const qText = wordToUse ? getFilledQuestionText(pat, wordToUse) : (pat.sampleQuestion || pat.question);
      const aText = wordToUse ? getFilledAnswerText(pat, wordToUse) : (pat.sampleAnswer || pat.answer);

      // Create distractors from other patterns
      const distractors: string[] = [];
      while (distractors.length < 2) {
        const randP = allPatterns[Math.floor(Math.random() * allPatterns.length)].p;
        const randAns = randP.sampleAnswer || randP.answer;
        if (randAns !== aText && !distractors.includes(randAns)) {
          distractors.push(randAns);
        }
      }

      const options = [aText, ...distractors].sort(() => Math.random() - 0.5);

      pool.push({
        questionText: qText,
        correctAnswer: aText,
        options,
      });
    }

    return pool;
  };

  useEffect(() => {
    setQaList(generate20QAQuestions());
  }, [unit.id]);

  // Auto-play question audio when entering a new question for "磨耳朵"
  useEffect(() => {
    if (!qaFinished && qaList.length > 0 && qaList[qaIndex]) {
      const qText = qaList[qaIndex].questionText;
      const timer = setTimeout(() => {
        speakText(qText, speechSpeed);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [qaIndex, qaFinished, qaList]);

  const handleStartQAChallenge = () => {
    setQaList(generate20QAQuestions());
    setQaIndex(0);
    setQaScore(0);
    setQaCorrectCount(0);
    setQaFinished(false);
    setQaFeedback(null);
    setSelectedOpt(null);
  };

  const handleQAOptionClick = (opt: string) => {
    if (qaFeedback === 'correct' || qaFinished) return;

    setSelectedOpt(opt);
    const currentQ = qaList[qaIndex];

    if (opt === currentQ.correctAnswer) {
      sfx.playCorrect();
      setQaFeedback('correct');
      setQaScore(s => s + 10);
      setQaCorrectCount(c => c + 1);

      setTimeout(() => {
        if (qaIndex + 1 >= MAX_QA_QUESTIONS) {
          triggerQAVictory();
        } else {
          setQaIndex(i => i + 1);
          setQaFeedback(null);
          setSelectedOpt(null);
        }
      }, 900);
    } else {
      sfx.playWrong();
      setQaFeedback('wrong');
    }
  };

  const triggerQAVictory = () => {
    setQaFinished(true);
    sfx.playFanfare();
    confetti({
      particleCount: 130,
      spread: 85,
      origin: { y: 0.5 }
    });
  };

  const currentQAItem = qaList[qaIndex];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg border-b-4 border-indigo-800">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-amber-300" />
          <h2 className="text-2xl font-black">主题句型与语法 Topic Sentences</h2>
        </div>
      </div>

      {/* Sentence Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {unit.topicSentences.map((p, idx) => {
          const activeWord = getActiveWordForPattern(p);
          const filledQuestion = getFilledQuestionText(p, activeWord);
          const filledAnswer = getFilledAnswerText(p, activeWord);

          return (
            <div
              key={p.id || idx}
              className="bg-white rounded-3xl p-6 border-2 border-sky-100 hover:border-indigo-400 shadow-sm transition-all space-y-4"
            >
              {/* Q&A Dialog Box with Dynamic Word Substitution */}
              <div className="space-y-3">
                {/* Question Box */}
                <div
                  onClick={() => {
                    sfx.playPop();
                    speakText(filledQuestion, speechSpeed);
                  }}
                  className="p-4 bg-sky-50/80 hover:bg-sky-100 rounded-2xl text-indigo-950 cursor-pointer transition-colors flex items-center justify-between gap-3 border border-sky-200 shadow-sm"
                >
                  <div className="flex-1">
                    <span className="text-xs font-black text-sky-700 uppercase block mb-1">
                      ❓ Question:
                    </span>
                    <p className="text-base sm:text-lg font-black text-indigo-950 leading-snug">
                      {renderHighlightedSentence(filledQuestion, activeWord)}
                    </p>
                  </div>
                  <Volume2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                </div>

                {/* Answer Box */}
                <div
                  onClick={() => {
                    sfx.playPop();
                    speakText(filledAnswer, speechSpeed);
                  }}
                  className="p-4 bg-emerald-50 hover:bg-emerald-100/80 rounded-2xl text-emerald-950 cursor-pointer transition-colors flex items-center justify-between gap-3 border border-emerald-200 shadow-sm"
                >
                  <div className="flex-1">
                    <span className="text-xs font-black text-emerald-700 uppercase block mb-1">
                      💬 Answer:
                    </span>
                    <p className="text-base sm:text-lg font-black text-emerald-950 leading-snug">
                      {renderHighlightedSentence(filledAnswer, activeWord)}
                    </p>
                  </div>
                  <Volume2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                </div>
              </div>

              {/* Words To Insert Substitution Chips */}
              {p.wordsToInsert && p.wordsToInsert.length > 0 && (
                <div className="pt-2">
                  <div className="text-xs font-black text-sky-700 mb-2 flex items-center gap-1">
                    <span>✨ Click to Insert / 点击替换词汇:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {p.wordsToInsert.map((w, wIdx) => {
                      const isSelected = activeWord === w;
                      const emoji = getOptionEmoji(w);
                      return (
                        <button
                          key={wIdx}
                          onClick={() => handleSelectWord(p, w)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 shadow-sm border ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-200 scale-105'
                              : 'bg-sky-50 hover:bg-sky-100 text-indigo-900 border-sky-200'
                          }`}
                        >
                          <span className="text-sm sm:text-base">{emoji}</span>
                          <span>{w}</span>
                          <Volume2 className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-indigo-500'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Requirement 5: Sentence Question Choice Challenge (20 Questions Max) */}
      <div className="bg-white rounded-3xl p-6 border-2 border-sky-100 shadow-md">
        <div className="flex items-center justify-between mb-4 border-b border-sky-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-md">
              <HelpCircle className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-lg font-black text-indigo-950">🎯 20题句型问答大挑战 (Sentence Q&A Challenge)</h3>
              <p className="text-xs font-bold text-sky-600">看问句，选择正确的对应回答！最多20题</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {qaIndex >= 0 && !qaFinished && qaList.length > 0 && (
              <span className="text-xs font-black text-indigo-900 bg-sky-100 border border-sky-200 px-3 py-1 rounded-xl">
                进度: {qaIndex + 1} / {MAX_QA_QUESTIONS}
              </span>
            )}
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-xl">
              积分: {qaScore}
            </span>
            <button
              onClick={handleStartQAChallenge}
              className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black px-3 py-2 rounded-xl transition-colors shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" /> 重新开始
            </button>
          </div>
        </div>

        {qaFinished ? (
          /* Victory Celebration Screen */
          <div className="bg-gradient-to-b from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 text-center space-y-6 border-4 border-amber-300 shadow-2xl relative overflow-hidden animate-pop">
            <div className="w-24 h-24 bg-amber-400/20 border-4 border-amber-300 rounded-3xl flex items-center justify-center text-amber-300 mx-auto shadow-inner">
              <Trophy className="w-14 h-14 text-amber-300 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="bg-amber-400 text-indigo-950 px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider">
                句型大满贯！Conversation Master!
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2">
                🎉 恭喜完成20题句型问答大挑战！
              </h3>
              <p className="text-sm text-indigo-200 font-bold max-w-md mx-auto">
                你一共答对了 <span className="text-amber-300 font-black text-lg">{qaCorrectCount}</span> / 20 题，斩获 <span className="text-emerald-400 font-black text-lg">{qaScore}</span> 分！
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={handleStartQAChallenge}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl flex items-center gap-2 shadow-lg border-b-4 border-emerald-700 transition-transform hover:scale-105"
              >
                <RotateCcw className="w-4 h-4" /> 再挑战一次 Re-start
              </button>
            </div>
          </div>
        ) : currentQAItem ? (
          <div className="space-y-6 py-2 max-w-xl mx-auto">
            {/* Display Question Prompt */}
            <div className="bg-sky-50/80 rounded-2xl p-4 sm:p-5 border-2 border-sky-200 text-center space-y-2 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <span className="text-xs font-black text-sky-700 bg-white border border-sky-200 px-3 py-1 rounded-xl uppercase">
                  Question
                </span>
              </div>

              <div className="text-lg sm:text-xl font-black text-indigo-950 flex items-center justify-center gap-2 pt-1">
                <span>"{currentQAItem.questionText}"</span>
                <button
                  type="button"
                  onClick={() => speakText(currentQAItem.questionText, speechSpeed)}
                  className="p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow transition-transform hover:scale-110"
                >
                  <Volume2 className="w-5 h-5 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Response Options List */}
            <div className="space-y-3">
              {currentQAItem.options.map((opt, oIdx) => {
                const isSelected = selectedOpt === opt;
                let optStyle = 'bg-white hover:bg-sky-100 border-sky-200 text-indigo-950';

                if (qaFeedback === 'correct' && opt === currentQAItem.correctAnswer) {
                  optStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-100';
                } else if (qaFeedback === 'wrong' && isSelected) {
                  optStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                }

                const optEmoji = getOptionEmoji(opt);

                return (
                  <div
                    key={oIdx}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleQAOptionClick(opt)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleQAOptionClick(opt);
                      }
                    }}
                    className={`w-full p-4 rounded-2xl border-2 font-black text-sm sm:text-base transition-all text-left flex items-center justify-between gap-3 shadow-sm hover:scale-[1.01] cursor-pointer ${optStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl sm:text-2xl p-1 bg-sky-100/60 rounded-xl flex-shrink-0">{optEmoji}</span>
                      <span>{opt}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakText(opt, speechSpeed);
                      }}
                      className="p-1.5 text-indigo-600 hover:text-indigo-800 flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Answer Feedback Alert placed at the very bottom */}
            <div className="min-h-[28px] flex items-center justify-center">
              {qaFeedback === 'correct' && (
                <div className="text-emerald-600 font-black text-sm flex items-center justify-center gap-1 animate-bounce text-center">
                  <CheckCircle2 className="w-5 h-5" /> 太棒啦！回答正确 +10 分！
                </div>
              )}

              {qaFeedback === 'wrong' && (
                <div className="text-rose-500 font-black text-sm text-center">
                  再想想看哦！选出最合适的回答~
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <button
              onClick={handleStartQAChallenge}
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-base rounded-2xl shadow-lg shadow-emerald-200 border-b-4 border-emerald-700 transition-all hover:-translate-y-0.5"
            >
              🎯 开始20题句型问答大挑战
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
