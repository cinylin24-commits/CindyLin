import { UNITS_DATA } from '../data/unitsData';

// Dictionary of common phrases and words used in sentences to emojis
const EMOJI_MAP: Record<string, string> = {
  // Foods & Drinks
  'pizza': '🍕',
  'dumplings': '🥟',
  'apples': '🍎',
  'noodles': '🍜',
  'pears': '🍐',
  'grapes': '🍇',
  'rice': '🍚',
  'fish': '🐟',
  'salad': '🥗',
  'bread': '🍞',
  'fruit': '🍎',
  'seaweed': '🌿',

  // Occupations & Actions
  'doctor': '👨‍⚕️',
  'nurse': '👩‍⚕️',
  'firefighter': '👨‍🚒',
  'baker': '🧑‍🍳',
  'police officer': '👮',
  'pilot': '🧑‍✈️',
  'singer': '🎤',
  'stops fires': '🚒',
  'drives a fire truck': '🚒',
  'helps people': '🩺',
  'saves lives': '❤️',
  'helps sick people': '🩺',
  'flies planes': '✈️',
  'bakes bread': '🥖',

  // Places
  'hospital': '🏥',
  'clinic': '🏥',
  'medical center': '🏥',
  'fire station': '🚒',
  'police station': '👮',
  'bakery': '🧁',
  'library': '📚',
  'park': '🏞️',
  'movie theater': '🎬',
  'ocean': '🌊',
  'sea': '🌊',
  'water': '💧',
  'deep sea': '🌊',
  'forest': '🌲',
  'bamboo park': '🎍',

  // Animals
  'dolphin': '🐬',
  'dolphins': '🐬',
  'starfish': '⭐',
  'crab': '🦀',
  'octopus': '🐙',
  'jellyfish': '🪼',
  'shark': '🦈',
  'sharks': '🦈',
  'panda': '🐼',
  'pandas': '🐼',
  'koala': '🐨',
  'elephant': '🐘',

  // Sports & Activities
  'running': '🏃',
  'singing': '🎤',
  'dancing': '💃',
  'reading': '📖',
  'walking': '🚶',
  'climbing': '🧗',
  'basketball': '🏀',
  'soccer': '⚽',
  'badminton': '🏸',
  'kung fu': '🥋',
  'volleyball': '🏐',
  'table tennis': '🏓',
  'yoga': '🧘',
  'baseball': '⚾',
  'fly kites': '🪁',
  'swim': '🏊',
  'ride my bike': '🚲',
  'skate': '⛸️',
  'read books': '📖',
  'read book': '📖',
  'play basketball': '🏀',
  'do yoga': '🧘',

  // Appearance & Descriptives
  'straight': '👩‍🦰',
  'curly': '👩‍🦱',
  'short': '💇',
  'long': '💇‍♀️',
  'tall': '🦒',
  'thin': '🧍',
  'cute - clever': '🐱',
  'big - fast': '🚀',
  'small - pink': '🌸',
  'clever - friendly': '🐬',

  // Days & Time
  'seven days': '📆',
  'twelve months': '🗓️',
  'twenty stars': '⭐',
  'Monday': '📅',
  'Tuesday': '📅',
  'Wednesday': '📅',
  'Thursday': '📅',
  'Friday': '🎉',
  'Saturday': '🎈',
  'Sunday': '☀️',

  // Seasons & Weather
  'spring': '🌸',
  'summer': '☀️',
  'fall': '🍂',
  'winter': '❄️',
  'sunny and warm': '☀️',
  'hot and sunny': '🌡️',
  'cool and windy': '🍃',
  'cold and snowy': '❄️',

  // Clothing
  'jacket': '🧥',
  'hat': '🎩',
  'socks': '🧦',
  'coat': '🧥'
};

// Build a cache from units vocabulary
const vocabCache: Record<string, string> = {};
UNITS_DATA.forEach(u => {
  const allVocab = [...(u.vocabNew || []), ...(u.vocabReview || [])];
  allVocab.forEach(v => {
    if (v.word && v.emoji) {
      vocabCache[v.word.toLowerCase().trim()] = v.emoji;
    }
  });
});

export function getOptionEmoji(word: string): string {
  if (!word) return '✨';
  const cleanWord = word.trim().toLowerCase();

  // 1. Direct dictionary match
  if (EMOJI_MAP[cleanWord]) {
    return EMOJI_MAP[cleanWord];
  }

  // 2. Vocabulary cache match
  if (vocabCache[cleanWord]) {
    return vocabCache[cleanWord];
  }

  // 3. Partial / substring match
  for (const [key, emoji] of Object.entries(EMOJI_MAP)) {
    if (cleanWord.includes(key) || key.includes(cleanWord)) {
      return emoji;
    }
  }

  for (const [key, emoji] of Object.entries(vocabCache)) {
    if (cleanWord.includes(key) || key.includes(cleanWord)) {
      return emoji;
    }
  }

  return '✨';
}
