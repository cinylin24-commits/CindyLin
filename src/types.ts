export type PhonicsSound = {
  sound: string; // e.g. "sh", "ch", "th"
  label: string; // e.g. "发音 sh" or "复习发音 ch"
  storyWords: string[]; // e.g. ["fish", "rush", "brush", "crash", "ship", "shop", "shelf", "shock"]
  storyTitle: string; // e.g. "Pete's Sheep"
  storyText?: string[]; // Short phonics practice story lines
};

export type VocabularyItem = {
  word: string;
  translation: string;
  emoji: string;
  category?: string;
  exampleSentence?: string;
};

export type SentencePattern = {
  id: string;
  question: string; // e.g. "Do you want to eat ____?"
  answer: string; // e.g. "Yes, I do. / No, I don't. I want to eat ____."
  sampleQuestion: string; // e.g. "Do you want to eat pizza?"
  sampleAnswer: string; // e.g. "Yes, I do. I want to eat pizza."
  wordsToInsert?: string[];
};

export type ReaderBook = {
  title: string;
  coverEmoji: string;
  pages: {
    text: string;
    translation: string;
    illustration: string;
  }[];
};

export type QuizType = 'listen_pick' | 'phonics_match' | 'fill_blank' | 'read_match';

export type QuizQuestion = {
  id: string;
  type: QuizType;
  prompt: string;
  audioPromptText?: string;
  options?: string[];
  correctAnswer?: string | number;
  matchPairs?: { id: number; question: string; answer: string }[];
  hint?: string;
};

export type UnitData = {
  id: number;
  title: string;
  subtitle: string;
  phonics: PhonicsSound[];
  sightWords: string[];
  vocabReview: VocabularyItem[];
  vocabNew: VocabularyItem[];
  topicSentences: SentencePattern[];
  reader: ReaderBook;
  quizzes: QuizQuestion[];
};

export type UserProgress = {
  starsByUnit: Record<number, number>; // unitId -> stars count
  completedQuizzes: Record<number, boolean>;
  speechSpeed: number; // 0.7 for slow, 1.0 for normal
};
