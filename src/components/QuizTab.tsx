import React, { useState, useMemo, useEffect } from 'react';
import { CheckCircle, XCircle, Volume2, Award, RotateCcw, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UnitData, QuizQuestion } from '../types';
import { speakText, sfx } from '../utils/speech';

interface QuizTabProps {
  unit: UnitData;
  speechSpeed: number;
  onCompleteQuiz: (unitId: number, category: 'vocab' | 'sentences' | 'quiz', stars: number) => void;
  onNextUnit?: () => void;
}

// Helper to generate exactly 10 high-quality questions for any unit
const getTenQuestionsForUnit = (unitData: UnitData): QuizQuestion[] => {
  const vocabQuestions: QuizQuestion[] = [];
  const sentenceQuestions: QuizQuestion[] = [];
  const allVocab = [...unitData.vocabNew, ...unitData.vocabReview];
  const sentences = unitData.topicSentences || [];
  let counter = 1;

  const randItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  // 1. Vocab translation questions
  for (let i = 0; i < allVocab.length; i++) {
    const v = allVocab[i];
    const dists: string[] = [];
    while (dists.length < 2 && allVocab.length > 2) {
      const d = randItem(allVocab).translation;
      if (d !== v.translation && !dists.includes(d)) {
        dists.push(d);
      }
    }
    const opts = [v.translation, ...dists].sort(() => Math.random() - 0.5);

    vocabQuestions.push({
      id: `gen-v-${unitData.id}-${counter++}`,
      type: 'fill_blank',
      prompt: `词汇测试：单词 '${v.word}' (${v.emoji}) 的中文含义是？`,
      options: opts,
      correctAnswer: v.translation,
      hint: `看图标 (${v.emoji}) 提示答题~`
    });
  }

  // 2. Vocab listen pick questions
  for (let i = 0; i < allVocab.length; i++) {
    const v = allVocab[i];
    const dists: string[] = [];
    while (dists.length < 2 && allVocab.length > 2) {
      const d = randItem(allVocab).word;
      if (d !== v.word && !dists.includes(d)) {
        dists.push(d);
      }
    }
    const opts = [v.word, ...dists].sort(() => Math.random() - 0.5);

    vocabQuestions.push({
      id: `gen-l-${unitData.id}-${counter++}`,
      type: 'listen_pick',
      prompt: `请听发音，选出对应的英文单词：`,
      audioPromptText: v.word,
      options: opts,
      correctAnswer: v.word,
      hint: `点击上方喇叭多听几遍标准发音~`
    });
  }

  // 3. Sentence fill_blank questions (Placed in sentence group)
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const ans = s.sampleAnswer || s.answer;
    const dists: string[] = [];
    sentences.forEach(otherS => {
      const otherAns = otherS.sampleAnswer || otherS.answer;
      if (otherAns !== ans && !dists.includes(otherAns)) {
        dists.push(otherAns);
      }
    });

    if (dists.length >= 2) {
      const opts = [ans, ...dists.slice(0, 2)].sort(() => Math.random() - 0.5);
      sentenceQuestions.push({
        id: `gen-s-${unitData.id}-${counter++}`,
        type: 'fill_blank',
        prompt: `句型测试：问句 "${s.sampleQuestion || s.question}" 的正确回答是？`,
        options: opts,
        correctAnswer: ans,
        hint: `选择最地道的日常答句~`
      });
    }
  }

  // 4. Read & Match (问答匹配) questions (Placed at the very end of sentence group)
  if (sentences.length >= 2) {
    const s1 = sentences[0];
    const s2 = sentences[1];
    sentenceQuestions.push({
      id: `gen-match-${unitData.id}-${counter++}`,
      type: 'read_match',
      prompt: '问答连线匹配 1：请为左侧问句选择最合适的日常答句！',
      matchPairs: [
        { id: 1, question: s1.sampleQuestion || s1.question, answer: s1.sampleAnswer || s1.answer },
        { id: 2, question: s2.sampleQuestion || s2.question, answer: s2.sampleAnswer || s2.answer }
      ],
      hint: '对比问句与答句的主谓结构连线哦！'
    });
  }

  if (sentences.length >= 4) {
    const s3 = sentences[2];
    const s4 = sentences[3];
    sentenceQuestions.push({
      id: `gen-match-${unitData.id}-${counter++}`,
      type: 'read_match',
      prompt: '问答连线匹配 2：请将下列英文问句与正确答句进行匹对！',
      matchPairs: [
        { id: 3, question: s3.sampleQuestion || s3.question, answer: s3.sampleAnswer || s3.answer },
        { id: 4, question: s4.sampleQuestion || s4.question, answer: s4.sampleAnswer || s4.answer }
      ],
      hint: '认真阅读题目，找到最匹配的答句~'
    });
  }

  // Combine: Vocabulary questions FIRST, sentence questions AT THE BACK
  const totalWanted = 10;
  const numSentenceToKeep = Math.min(sentenceQuestions.length, 4);
  const numVocabToKeep = Math.min(vocabQuestions.length, totalWanted - numSentenceToKeep);

  const selectedVocab = vocabQuestions.slice(0, numVocabToKeep);
  const selectedSentence = sentenceQuestions.slice(0, totalWanted - selectedVocab.length);

  return [...selectedVocab, ...selectedSentence].slice(0, 10);
};

export const QuizTab: React.FC<QuizTabProps> = ({
  unit,
  speechSpeed,
  onCompleteQuiz,
  onNextUnit,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Read & Match state
  const [userMatches, setUserMatches] = useState<Record<number, string>>({});

  // Ensure strictly 10 questions per quiz
  const questions = useMemo(() => getTenQuestionsForUnit(unit), [unit.id]);
  const currentQ: QuizQuestion | undefined = questions[currentQIndex];

  useEffect(() => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setUserMatches({});
  }, [unit.id]);

  // Auto-play audio prompt for listening questions
  useEffect(() => {
    if (currentQ && !isFinished) {
      if (currentQ.type === 'listen_pick' || currentQ.audioPromptText) {
        const textToSpeak = currentQ.audioPromptText || (typeof currentQ.correctAnswer === 'string' ? currentQ.correctAnswer : '');
        if (textToSpeak) {
          const timer = setTimeout(() => {
            speakText(textToSpeak, speechSpeed);
          }, 400);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [currentQIndex, isFinished, unit.id]);

  const handlePlayAudioPrompt = () => {
    if (currentQ?.audioPromptText) {
      sfx.playPop();
      speakText(currentQ.audioPromptText, speechSpeed);
    } else if (currentQ?.type === 'listen_pick' && typeof currentQ.correctAnswer === 'string') {
      sfx.playPop();
      speakText(currentQ.correctAnswer, speechSpeed);
    }
  };

  const handleOptionSelect = (option: string | number) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const correct = option === currentQ?.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      sfx.playCorrect();
      setScore(s => s + 1);
      setTimeout(() => {
        handleNextQuestion();
      }, 850);
    } else {
      sfx.playWrong();
    }
  };

  const handleMatchSelect = (pairId: number, answerText: string) => {
    sfx.playPop();
    setUserMatches(prev => ({ ...prev, [pairId]: answerText }));
  };

  const checkMatchQuiz = () => {
    if (!currentQ?.matchPairs) return;

    let matchCorrectCount = 0;
    currentQ.matchPairs.forEach(p => {
      if (userMatches[p.id] === p.answer) {
        matchCorrectCount++;
      }
    });

    const allCorrect = matchCorrectCount === currentQ.matchPairs.length;
    setIsAnswered(true);
    setIsCorrect(allCorrect);

    if (allCorrect) {
      sfx.playCorrect();
      setScore(s => s + 1);
      setTimeout(() => {
        handleNextQuestion();
      }, 850);
    } else {
      sfx.playWrong();
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(i => i + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setUserMatches({});
    } else {
      // Quiz Finished!
      const total = questions.length;
      const stars = score === total ? 3 : score >= Math.ceil(total / 2) ? 2 : score >= 1 ? 1 : 0;

      setIsFinished(true);
      onCompleteQuiz(unit.id, 'quiz', stars);

      if (stars >= 2) {
        sfx.playFanfare();
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
    setUserMatches({});
  };

  if (!currentQ && !isFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 text-center text-slate-500 font-bold">
        本单元暂无试题哦！
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Quiz Top Header */}
      <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg border-b-4 border-indigo-800 flex items-center justify-between">
        <div>
          <span className="text-xs font-black uppercase tracking-wider bg-indigo-800 px-3 py-1 rounded-xl text-indigo-100 border border-indigo-700">
            单元小检测 Mastery Assessment
          </span>
          <h2 className="text-2xl font-black mt-2">{unit.title} 测试</h2>
        </div>

        {!isFinished && (
          <div className="text-right">
            <span className="text-xs text-indigo-200 font-bold">题目进度:</span>
            <div className="text-xl font-black text-white">
              {currentQIndex + 1} / {questions.length}
            </div>
          </div>
        )}
      </div>

      {!isFinished ? (
        /* Active Question Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-xl space-y-6">
          {/* Question Prompt */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-sky-50 text-indigo-900 border border-sky-200 font-black text-xs rounded-xl">
                第 {currentQIndex + 1} 题
              </span>
              <h3 className="text-lg sm:text-xl font-black text-indigo-950">
                {currentQ.prompt}
              </h3>
            </div>

            {/* Audio Prompt button if listen_pick type */}
            {currentQ.audioPromptText && (
              <div className="pt-2 flex items-center justify-center">
                <button
                  onClick={handlePlayAudioPrompt}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-200 border-b-4 border-indigo-800 hover:scale-105 transition-transform"
                >
                  <Volume2 className="w-6 h-6 text-amber-300" /> 点击听发音: "{currentQ.audioPromptText}"
                </button>
              </div>
            )}
          </div>

          {/* Option Type 1: Multiple Choice Options */}
          {currentQ.type !== 'read_match' && currentQ.options && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                let cardStyle = 'bg-sky-50/50 hover:bg-sky-100 border-sky-200 text-indigo-950';

                if (isAnswered) {
                  if (opt === currentQ.correctAnswer) {
                    cardStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-4 ring-emerald-100';
                  } else if (isSelected) {
                    cardStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                  }
                }

                return (
                  <div
                    key={idx}
                    role="button"
                    tabIndex={isAnswered ? -1 : 0}
                    onClick={() => handleOptionSelect(opt)}
                    onKeyDown={(e) => {
                      if (!isAnswered && (e.key === 'Enter' || e.key === ' ')) {
                        handleOptionSelect(opt);
                      }
                    }}
                    className={`p-4 rounded-2xl border-2 font-black text-base sm:text-lg transition-all flex items-center justify-between gap-2 shadow-sm cursor-pointer ${cardStyle}`}
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
          )}

          {/* Option Type 2: Read and Match Exercise */}
          {currentQ.type === 'read_match' && currentQ.matchPairs && (
            <div className="space-y-4">
              {currentQ.matchPairs.map((pair) => (
                <div
                  key={pair.id}
                  className="p-4 bg-sky-50/50 rounded-2xl border border-sky-200 space-y-2"
                >
                  <div className="flex items-center justify-between font-black text-indigo-950 text-[18px] sm:text-[20px] leading-relaxed">
                    <span className="flex items-center gap-2">
                      <span>❓ {pair.question}</span>
                      <button
                        onClick={() => speakText(pair.question, speechSpeed)}
                        className="text-indigo-600 hover:text-indigo-800 p-1 rounded-lg hover:bg-sky-100 transition-colors"
                      >
                        <Volume2 className="w-5 h-5 text-indigo-600" />
                      </button>
                    </span>
                  </div>

                  {/* Matching Answers Dropdown / Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {currentQ.matchPairs!.map((subPair, sIdx) => {
                      const isChosen = userMatches[pair.id] === subPair.answer;
                      return (
                        <button
                          key={sIdx}
                          disabled={isAnswered}
                          onClick={() => handleMatchSelect(pair.id, subPair.answer)}
                          className={`p-2.5 rounded-xl text-xs font-black text-left transition-all border-2 ${
                            isChosen
                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-md'
                              : 'bg-white hover:bg-sky-100 text-indigo-900 border-sky-200'
                          }`}
                        >
                          → {subPair.answer}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {!isAnswered && (
                <button
                  onClick={checkMatchQuiz}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-200 border-b-4 border-emerald-700 transition-transform active:scale-95"
                >
                  确认连线答案 Submit Match
                </button>
              )}
            </div>
          )}

          {/* Feedback & Hint Banner */}
          {isAnswered && (
            <div
              className={`p-4 rounded-2xl flex items-center justify-between font-bold text-sm ${
                isCorrect
                  ? 'bg-emerald-100 text-emerald-950 border-2 border-emerald-300'
                  : 'bg-rose-100 text-rose-950 border-2 border-rose-300'
              }`}
            >
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                    <span>答对啦！真棒！(Correct!)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-rose-600" />
                    <div>
                      <div>答错啦，没关系哦！</div>
                      {currentQ.hint && (
                        <div className="text-xs font-medium text-rose-800 mt-0.5">
                          💡 提示: {currentQ.hint}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-950 text-white font-black text-xs sm:text-sm rounded-xl flex items-center gap-1 shadow transition-transform active:scale-95 border-b-2 border-indigo-950"
              >
                <span>下一题</span> <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Summary / Completion Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-sky-100 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 mx-auto border-2 border-amber-300 shadow-inner">
            <Award className="w-12 h-12 fill-amber-400" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-indigo-950">
              恭喜完成 {unit.title} 检测！
            </h3>
            <p className="text-sm font-bold text-sky-700">
              你一共答对了 <span className="text-indigo-600 text-xl font-black">{score}</span> / {questions.length} 道题！
            </p>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center justify-center gap-2 text-4xl">
            {[1, 2, 3].map((star) => {
              const total = questions.length;
              const earnedStars = score === total ? 3 : score >= Math.ceil(total / 2) ? 2 : score >= 1 ? 1 : 0;
              return (
                <span
                  key={star}
                  className={`transition-all transform hover:scale-125 ${
                    star <= earnedStars ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'
                  }`}
                >
                  ★
                </span>
              );
            })}
          </div>
          <p className="text-xs font-bold text-sky-800">
            单元测试获得：{score === questions.length ? 3 : score >= Math.ceil(questions.length / 2) ? 2 : score >= 1 ? 1 : 0} / 3 颗星 ⭐
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="px-6 py-3 bg-sky-50 hover:bg-sky-100 text-indigo-900 border-2 border-sky-200 font-black text-sm rounded-2xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-indigo-600" /> 再测一次 Re-test
            </button>

            {onNextUnit && unit.id < 9 && (
              <button
                onClick={onNextUnit}
                className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-200 border-b-4 border-emerald-700 transition-transform hover:scale-105"
              >
                <span>解锁下一单元 Next Unit</span> <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
