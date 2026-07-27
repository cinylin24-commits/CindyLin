import { UnitData } from '../types';

export const UNITS_DATA: UnitData[] = [
  // ================= UNIT 1 =================
  {
    id: 1,
    title: 'Unit 1️⃣ Food & Jobs',
    subtitle: '食物与职业 (sh / ch 发音)',
    phonics: [
      {
        sound: 'sh',
        label: '发音 sh',
        storyTitle: "Pete's Sheep",
        storyWords: ['fish', 'rush', 'brush', 'crash', 'ship', 'shop', 'shelf', 'shock'],
        storyText: [
          'Pete has a sheep on a ship.',
          'The sheep goes to a shop to buy a brush.',
          'Do not crash into the shelf with the fish!'
        ]
      },
      {
        sound: 'ch',
        label: '发音 ch',
        storyTitle: "Woodchucks' Picnic",
        storyWords: ['lunch', 'bench', 'reach', 'witch', 'chip', 'chess', 'cheer', 'chase'],
        storyText: [
          'The woodchucks sit on a bench for lunch.',
          'They eat a chip and play chess.',
          'They cheer and chase around the tree!'
        ]
      }
    ],
    sightWords: ['to', 'there', 'are', 'on', 'in', 'many', 'with', 'is', 'off', 'up'],
    vocabReview: [
      { word: 'pears', translation: '梨', emoji: '🍐' },
      { word: 'noodles', translation: '面条', emoji: '🍜' },
      { word: 'dumplings', translation: '饺子', emoji: '🥟' },
      { word: 'apples', translation: '苹果', emoji: '🍎' },
      { word: 'bananas', translation: '香蕉', emoji: '🍌' },
      { word: 'oranges', translation: '橙子', emoji: '🍊' },
      { word: 'fish', translation: '鱼肉/鱼', emoji: '🐟' },
      { word: 'rice', translation: '米饭', emoji: '🍚' },
      { word: 'candy', translation: '糖果', emoji: '🍬' },
      { word: 'cookies', translation: '饼干', emoji: '🍪' },
      { word: 'grapes', translation: '葡萄', emoji: '🍇' },
      { word: 'strawberries', translation: '草莓', emoji: '🍓' },
      { word: 'pizza', translation: '披萨', emoji: '🍕' },
      { word: 'salad', translation: '沙拉', emoji: '🥗' },
      { word: 'bread', translation: '面包', emoji: '🍞' }
    ],
    vocabNew: [
      { word: 'doctor', translation: '医生', emoji: '👨‍⚕️' },
      { word: 'nurse', translation: '护士', emoji: '👩‍⚕️' },
      { word: 'firefighter', translation: '消防员', emoji: '👩‍🚒' },
      { word: 'baker', translation: '面包师', emoji: '👨‍🍳' },
      { word: 'police officer', translation: '警察', emoji: '👮‍♂️' },
      { word: 'singer', translation: '歌手', emoji: '🎤' },
      { word: 'pilot', translation: '飞行员', emoji: '👨‍✈️' },
      { word: 'waiter', translation: '服务员', emoji: '🤵' }
    ],
    topicSentences: [
      {
        id: 'u1-1',
        question: 'Do you want to eat ____?',
        answer: 'Yes, I do. / No, I don\'t. I want to eat ____.',
        sampleQuestion: 'Do you want to eat pizza?',
        sampleAnswer: 'Yes, I do. I want to eat pizza.',
        wordsToInsert: ['pizza', 'dumplings', 'apples', 'noodles', 'pears', 'grapes']
      },
      {
        id: 'u1-2',
        question: 'What is (he/she)?',
        answer: '(He/She) is a ____.',
        sampleQuestion: 'What is she?',
        sampleAnswer: 'She is a firefighter.',
        wordsToInsert: ['doctor', 'nurse', 'firefighter', 'baker', 'police officer', 'pilot']
      },
      {
        id: 'u1-3',
        question: 'What does a ____ do?',
        answer: 'A ____ (stops fires / helps sick people / flies planes / bakes bread / helps people).',
        sampleQuestion: 'What does a nurse do?',
        sampleAnswer: 'A nurse helps sick people.',
        wordsToInsert: ['nurse', 'pilot', 'baker', 'police officer', 'firefighter']
      },
      {
        id: 'u1-4',
        question: 'Do you want to be a ____?',
        answer: 'Yes, I do. / No, I don\'t. I want to be a ____.',
        sampleQuestion: 'Do you want to be a pilot?',
        sampleAnswer: 'Yes, I do. I want to be a pilot.',
        wordsToInsert: ['doctor', 'baker', 'singer', 'pilot', 'police officer']
      },
      {
        id: 'u1-5',
        question: 'What do you want for lunch?',
        answer: 'I want some ____ and ____.',
        sampleQuestion: 'What do you want for lunch?',
        sampleAnswer: 'I want some rice and fish.',
        wordsToInsert: ['rice', 'fish', 'salad', 'bread', 'noodles']
      }
    ],
    reader: {
      title: 'Happy New Year, Mulan - Part 1',
      coverEmoji: '🧧',
      pages: [
        {
          text: 'It is New Year! Mulan and her family are getting ready for dinner.',
          translation: '新年到了！木兰和她的家人正在准备年夜饭。',
          illustration: '🏮'
        },
        {
          text: 'Mulan says, "Do you want to eat dumplings?"',
          translation: '木兰说：“你想吃饺子吗？”',
          illustration: '🥟'
        },
        {
          text: 'Her brother answers, "Yes, I do! I love dumplings and rice."',
          translation: '她的哥哥回答：“是的！我喜欢饺子和米饭。”',
          illustration: '🍚'
        }
      ]
    },
    quizzes: [
      {
        id: 'u1-q1',
        type: 'phonics_match',
        prompt: '哪一个单词含有 /sh/ 的发音？',
        options: ['fish', 'bench', 'chip'],
        correctAnswer: 'fish',
        hint: '想想“鱼”的英文怎么读~'
      },
      {
        id: 'u1-q2',
        type: 'listen_pick',
        prompt: '请听发音，选出正确的职业单词：',
        audioPromptText: 'firefighter',
        options: ['doctor', 'firefighter', 'baker'],
        correctAnswer: 'firefighter',
        hint: '熄灭火灾的大英雄！'
      },
      {
        id: 'u1-q3',
        type: 'fill_blank',
        prompt: '补全对话：— What does a firefighter do? — A firefighter ____ fires.',
        options: ['stops', 'eats', 'plays'],
        correctAnswer: 'stops',
        hint: '消防员负责灭火(stops fires)'
      },
      {
        id: 'u1-q4',
        type: 'read_match',
        prompt: '问答连连看：将左侧问句与右侧答句匹配',
        matchPairs: [
          { id: 1, question: 'Do you want to eat pizza?', answer: 'Yes, I do.' },
          { id: 2, question: 'What is he?', answer: 'He is a pilot.' },
          { id: 3, question: 'What does a firefighter do?', answer: 'A firefighter stops fires.' }
        ]
      }
    ]
  },

  // ================= UNIT 2 =================
  {
    id: 2,
    title: 'Unit 2️⃣ Places & Rooms',
    subtitle: '物品与工作场所 (ch 复习 / th 发音)',
    phonics: [
      {
        sound: 'ch',
        label: '复习发音 ch',
        storyTitle: "Woodchucks' Picnic",
        storyWords: ['lunch', 'bench', 'reach', 'witch', 'chip', 'chess', 'cheer', 'chase'],
        storyText: [
          'Reach for the chip on the bench for lunch!',
          'Don\'t let the witch chase the chess game.'
        ]
      },
      {
        sound: 'th',
        label: '发音 th',
        storyTitle: 'Little Thor',
        storyWords: ['bath', 'path', 'cloth', 'teeth', 'thick', 'thin', 'thank', 'think'],
        storyText: [
          'Little Thor takes a bath.',
          'He brushes his teeth with a thick cloth.',
          'Thor walks down the path and says thank you!'
        ]
      }
    ],
    sightWords: ['are', 'they', 'play', 'to', "let's", 'see', 'use', 'that', 'jump', 'but', 'no', 'one', 'then', 'the', 'for', 'thank', 'you', 'my', 'too', "we'll", 'be', 'there', 'three'],
    vocabReview: [
      { word: 'train', translation: '火车', emoji: '🚂' },
      { word: 'table', translation: '桌子', emoji: '🪵' },
      { word: 'boat', translation: '小船', emoji: '⛵' },
      { word: 'turtle', translation: '乌龟', emoji: '🐢' },
      { word: 'picture', translation: '图片/画', emoji: '🖼️' },
      { word: 'toy robot', translation: '玩具机器人', emoji: '🤖' },
      { word: 'hats', translation: '帽子', emoji: '🧢' },
      { word: 'backpacks', translation: '书包', emoji: '🎒' },
      { word: 'jackets', translation: '夹克/外套', emoji: '🧥' },
      { word: 'socks', translation: '袜子', emoji: '🧦' },
      { word: 'balls', translation: '球', emoji: '⚽' }
    ],
    vocabNew: [
      { word: 'police station', translation: '警察局', emoji: '🚔' },
      { word: 'hospital', translation: '医院', emoji: '🏥' },
      { word: 'bakery', translation: '面包店', emoji: '🥖' },
      { word: 'fire station', translation: '消防局', emoji: '🚒' },
      { word: 'movie theater', translation: '电影院', emoji: '🎬' },
      { word: 'library', translation: '图书馆', emoji: '📚' },
      { word: 'airport', translation: '机场', emoji: '✈️' },
      { word: 'restaurant', translation: '餐厅', emoji: '🍽️' }
    ],
    topicSentences: [
      {
        id: 'u2-1',
        question: "What do you see in Mike's room?",
        answer: 'There is a ____. / There are ____.',
        sampleQuestion: "What do you see in Mike's room?",
        sampleAnswer: 'There is a toy robot. / There are three balls.',
        wordsToInsert: ['toy robot', 'picture', 'hats', 'balls', 'backpacks']
      },
      {
        id: 'u2-2',
        question: 'Where does a ____ work?',
        answer: 'A ____ works at a/an ____.',
        sampleQuestion: 'Where does a doctor work?',
        sampleAnswer: 'A doctor works at a hospital.',
        wordsToInsert: ['doctor', 'nurse', 'firefighter', 'police officer', 'pilot', 'baker']
      },
      {
        id: 'u2-3',
        question: 'Is/Are there ____ in the ____?',
        answer: 'Yes, there is. / No, there isn\'t. | Yes, there are. / No, there aren\'t.',
        sampleQuestion: 'Is there a train in the room?',
        sampleAnswer: 'Yes, there is.',
        wordsToInsert: ['train', 'backpacks', 'jackets', 'socks']
      },
      {
        id: 'u2-4',
        question: 'Where are you going?',
        answer: 'I\'m going to the ____.',
        sampleQuestion: 'Where are you going?',
        sampleAnswer: 'I\'m going to the library.',
        wordsToInsert: ['library', 'bakery', 'movie theater', 'hospital', 'restaurant']
      },
      {
        id: 'u2-5',
        question: 'What can you do at the ____?',
        answer: 'I can ____ at the ____.',
        sampleQuestion: 'What can you do at the library?',
        sampleAnswer: 'I can read books at the library.',
        wordsToInsert: ['read books', 'watch movies', 'buy bread', 'see doctors']
      }
    ],
    reader: {
      title: 'Happy New Year, Mulan - Part 2',
      coverEmoji: '🎆',
      pages: [
        {
          text: 'Mulan goes outside. She sees a police station and a bakery.',
          translation: '木兰走到外面。她看见了一座警察局和一家面包店。',
          illustration: '🏪'
        },
        {
          text: 'She asks, "Where does a baker work?"',
          translation: '她问：“面包师在哪里工作？”',
          illustration: '👨‍🍳'
        },
        {
          text: 'Her dad says, "A baker works at a bakery with warm bread!"',
          translation: '她的爸爸说：“面包师在面包店工作，做出香喷喷的面包！”',
          illustration: '🥖'
        }
      ]
    },
    quizzes: [
      {
        id: 'u2-q1',
        type: 'phonics_match',
        prompt: '选出含有 /th/ 发音的单词：',
        options: ['teeth', 'bench', 'ship'],
        correctAnswer: 'teeth',
        hint: '牙齿(teeth)发的是 /th/ 音~'
      },
      {
        id: 'u2-q2',
        type: 'fill_blank',
        prompt: '补全句子：A doctor works at a ____.',
        options: ['hospital', 'bakery', 'library'],
        correctAnswer: 'hospital',
        hint: '医生工作的地方是医院(hospital)。'
      },
      {
        id: 'u2-q3',
        type: 'listen_pick',
        prompt: '听音选词：选择你听到的场所单词',
        audioPromptText: 'movie theater',
        options: ['airport', 'movie theater', 'restaurant'],
        correctAnswer: 'movie theater',
        hint: '去这里看电影~'
      },
      {
        id: 'u2-q4',
        type: 'read_match',
        prompt: '问答连连看：将问题与正确答句连线',
        matchPairs: [
          { id: 1, question: 'Where does a baker work?', answer: 'A baker works at a bakery.' },
          { id: 2, question: 'Is there a toy robot in the room?', answer: 'Yes, there is.' },
          { id: 3, question: 'Are there balls on the table?', answer: 'No, there aren\'t.' }
        ]
      }
    ]
  },

  // ================= UNIT 3 =================
  {
    id: 3,
    title: 'Unit 3️⃣ Transport & Stationery',
    subtitle: '文具与交通工具 (wh / ng 发音)',
    phonics: [
      {
        sound: 'wh',
        label: '发音 wh',
        storyTitle: 'When You Wish Upon a Starfish',
        storyWords: ['whale', 'wheel', 'white', 'what', 'when', 'where', 'who', 'whose'],
        storyText: [
          'A white whale plays with a wheel.',
          'Where is the whale going?',
          'Whose wheel is that in the water?'
        ]
      },
      {
        sound: 'ng',
        label: '发音 ng (-ang/-ing/-ong/-ung)',
        storyTitle: "The King's Ring",
        storyWords: ['king', 'ring', 'wing', 'sing', 'gong', 'swing', 'sting', 'fang'],
        storyText: [
          'The king wears a shiny gold ring.',
          'A bird with a blue wing starts to sing.',
          'Strike the gong and play on the swing!'
        ]
      }
    ],
    sightWords: ['has', 'wants', 'help', 'us', 'look', 'over', 'there', 'do', 'two', 'not', "I'm", 'then', 'just', "I'll", 'okay', 'one', 'with'],
    vocabReview: [
      { word: 'book', translation: '书', emoji: '📖' },
      { word: 'table', translation: '桌子', emoji: '🪵' },
      { word: 'chair', translation: '椅子', emoji: '🪑' },
      { word: 'backpack', translation: '背包', emoji: '🎒' },
      { word: 'pencil', translation: '铅笔', emoji: '✏️' },
      { word: 'pencil case', translation: '铅笔盒', emoji: '✏️' },
      { word: 'ruler', translation: '尺子', emoji: '📏' },
      { word: 'crayon', translation: '蜡笔', emoji: '🖍️' }
    ],
    vocabNew: [
      { word: 'airplane', translation: '飞机', emoji: '✈️' },
      { word: 'spaceship', translation: '宇宙飞船', emoji: '🚀' },
      { word: 'motorcycle', translation: '摩托车', emoji: '🏍️' },
      { word: 'bike', translation: '自行车', emoji: '🚲' },
      { word: 'ship', translation: '轮船', emoji: '🛳️' },
      { word: 'subway', translation: '地铁', emoji: '🚇' },
      { word: 'car', translation: '小汽车', emoji: '🚗' },
      { word: 'taxi', translation: '出租车', emoji: '🚕' }
    ],
    topicSentences: [
      {
        id: 'u3-1',
        question: 'Whose ____ is that?',
        answer: 'That is his ____. / That is her ____.',
        sampleQuestion: 'Whose pencil is that?',
        sampleAnswer: 'That is his pencil.',
        wordsToInsert: ['pencil', 'crayon', 'backpack', 'ruler', 'book']
      },
      {
        id: 'u3-2',
        question: 'How do you go to the airport?',
        answer: 'I go by motorcycle.',
        sampleQuestion: 'How do you go to the airport?',
        sampleAnswer: 'I go by motorcycle.',
        wordsToInsert: ['motorcycle', 'car', 'subway', 'taxi', 'bike', 'bus', 'airplane']
      },
      {
        id: 'u3-3',
        question: 'Where is the bus going?',
        answer: 'The bus is going to the school.',
        sampleQuestion: 'Where is the bus going?',
        sampleAnswer: 'The bus is going to the school.',
        wordsToInsert: ['school', 'airport', 'library', 'park']
      },
      {
        id: 'u3-4',
        question: 'Is (this/that) your ____?',
        answer: 'Yes, it is. / No, it isn\'t. It\'s (your/her/his) ____.',
        sampleQuestion: 'Is this your ruler?',
        sampleAnswer: 'Yes, it is.',
        wordsToInsert: ['ruler', 'crayon', 'book', 'pencil case']
      },
      {
        id: 'u3-5',
        question: 'What do you have in your backpack?',
        answer: 'I have a ____ and two ____.',
        sampleQuestion: 'What do you have in your backpack?',
        sampleAnswer: 'I have a ruler and two crayons.',
        wordsToInsert: ['ruler', 'pencil', 'crayons', 'books']
      }
    ],
    reader: {
      title: 'Happy New Year, Mulan - Part 3',
      coverEmoji: '🧧',
      pages: [
        {
          text: 'Mulan asks, "How do you go to the airport?"',
          translation: '木兰问：“你怎么去机场？”',
          illustration: '✈️'
        },
        {
          text: 'Her friend says, "I go by subway or by car!"',
          translation: '她的朋友说：“我乘地铁或者坐小汽车去！”',
          illustration: '🚇'
        },
        {
          text: 'Look at that giant airplane in the sky!',
          translation: '看天空中的那架巨大飞机！',
          illustration: '🛩️'
        }
      ]
    },
    quizzes: [
      {
        id: 'u3-q1',
        type: 'phonics_match',
        prompt: '哪一个单词属于 -ing / -ng 发音？',
        options: ['king', 'white', 'path'],
        correctAnswer: 'king',
        hint: '国王 king 结尾包含 -ing 哦！'
      },
      {
        id: 'u3-q2',
        type: 'fill_blank',
        prompt: '补全对话：— How do you go to school? — I go ____ bike.',
        options: ['by', 'on', 'in'],
        correctAnswer: 'by',
        hint: '乘坐交通工具用介词 by (by bike / by car).'
      },
      {
        id: 'u3-q3',
        type: 'listen_pick',
        prompt: '听音选图：选择你听到的交通工具',
        audioPromptText: 'spaceship',
        options: ['airplane', 'spaceship', 'motorcycle'],
        correctAnswer: 'spaceship',
        hint: '飞向宇宙的超级飞船！'
      },
      {
        id: 'u3-q4',
        type: 'read_match',
        prompt: '问答匹配：连接正确问句和答句',
        matchPairs: [
          { id: 1, question: 'Whose ruler is that?', answer: 'That is her ruler.' },
          { id: 2, question: 'How do you go to the airport?', answer: 'I go by motorcycle.' },
          { id: 3, question: 'Is this your backpack?', answer: 'Yes, it is.' }
        ]
      }
    ]
  },

  // ================= UNIT 4 =================
  {
    id: 4,
    title: 'Unit 4️⃣ Toys & House Rooms',
    subtitle: '玩具与房间方位 (ng 复习 / oi, oy 发音)',
    phonics: [
      {
        sound: 'ng',
        label: '复习发音 ng',
        storyTitle: "The King's Ring",
        storyWords: ['king', 'ring', 'wing', 'sing', 'gong', 'swing', 'sting', 'fang'],
        storyText: [
          'The king sings a song on the swing.',
          'Be careful of the bee sting and the sharp fang!'
        ]
      },
      {
        sound: 'oi / oy',
        label: '发音 oi, oy',
        storyTitle: "Roy's Toys",
        storyWords: ['oil', 'coin', 'foil', 'boil', 'boy', 'toy', 'joy'],
        storyText: [
          'Roy is a happy boy.',
          'He drops a shiny coin into the oil.',
          'Roy plays with his toy with great joy!'
        ]
      }
    ],
    sightWords: ['of', 'five', 'my', 'where', 'little', 'go', 'goes', 'please', 'with', 'give', 'or', 'want', 'here', 'they', 'all', 'lots', "there's", 'like', 'into', 'puts', 'some', 'says', 'his', 'oh'],
    vocabReview: [
      { word: 'kite', translation: '风筝', emoji: '🪁' },
      { word: 'box', translation: '盒子', emoji: '📦' },
      { word: 'toy robot', translation: '玩具机器人', emoji: '🤖' },
      { word: 'doll', translation: '洋娃娃', emoji: '🧸' },
      { word: 'picture', translation: '画/照片', emoji: '🖼️' },
      { word: 'ball', translation: '皮球', emoji: '⚽' },
      { word: 'boat', translation: '玩具船', emoji: '⛵' },
      { word: 'train', translation: '玩具火车', emoji: '🚂' },
      { word: 'mug', translation: '马克杯', emoji: '☕' },
      { word: 'vase', translation: '花瓶', emoji: '🏺' },
      { word: 'rug', translation: '地毯', emoji: '🧹' }
    ],
    vocabNew: [
      { word: 'kitchen', translation: '厨房', emoji: '🍳' },
      { word: 'bedroom', translation: '卧室', emoji: '🛏️' },
      { word: 'living room', translation: '客厅', emoji: '🛋️' },
      { word: 'bathroom', translation: '浴室', emoji: '🛁' },
      { word: 'in', translation: '在...里面', emoji: '📥' },
      { word: 'on', translation: '在...上面', emoji: '🔝' },
      { word: 'under', translation: '在...下面', emoji: '⬇️' },
      { word: 'next to', translation: '在...旁边', emoji: '➡️' }
    ],
    topicSentences: [
      {
        id: 'u4-1',
        question: 'What is that/this?',
        answer: 'That is a ____. / This is a ____.',
        sampleQuestion: 'What is this?',
        sampleAnswer: 'This is a doll.',
        wordsToInsert: ['doll', 'toy robot', 'kite', 'vase', 'mug']
      },
      {
        id: 'u4-2',
        question: 'Where is Pike?',
        answer: 'He\'s in the living room.',
        sampleQuestion: 'Where is Pike?',
        sampleAnswer: 'He\'s in the living room.',
        wordsToInsert: ['kitchen', 'bedroom', 'living room', 'bathroom']
      },
      {
        id: 'u4-3',
        question: 'Where is the ball?',
        answer: 'It\'s on the box.',
        sampleQuestion: 'Where is the ball?',
        sampleAnswer: 'It\'s on the box.',
        wordsToInsert: ['in', 'on', 'under', 'next to']
      },
      {
        id: 'u4-4',
        question: 'How many dogs are there under the box?',
        answer: 'There (is/are) ____ (in/on/under/next to) the ____.',
        sampleQuestion: 'How many dogs are there under the box?',
        sampleAnswer: 'There are two dogs under the box.',
        wordsToInsert: ['one dog', 'two dogs', 'three dolls', 'four balls']
      },
      {
        id: 'u4-5',
        question: 'What are you doing in the ____?',
        answer: 'I am playing with my ____ in the ____.',
        sampleQuestion: 'What are you doing in the bedroom?',
        sampleAnswer: 'I am playing with my toy robot in the bedroom.',
        wordsToInsert: ['bedroom', 'living room', 'kitchen', 'bathroom']
      }
    ],
    reader: {
      title: 'Aladdin and the Birthday Wish - Part 1',
      coverEmoji: '🧞‍♂️',
      pages: [
        {
          text: 'Aladdin is looking for his magical lamp in his bedroom.',
          translation: '阿拉丁正在他的卧室里寻找神奇的油灯。',
          illustration: '🛏️'
        },
        {
          text: 'Where is Pike? He\'s in the living room playing with a doll!',
          translation: '派克在哪里？他正在客厅里玩洋娃娃呢！',
          illustration: '🛋️'
        },
        {
          text: 'The lamp is on the table next to the vase.',
          translation: '油灯在花瓶旁边的桌子上。',
          illustration: '🏺'
        }
      ]
    },
    quizzes: [
      {
        id: 'u4-q1',
        type: 'phonics_match',
        prompt: '选出发音包含 /oy/ 或 /oi/ 的单词：',
        options: ['boy', 'king', 'wheel'],
        correctAnswer: 'boy',
        hint: '男孩(boy)和玩具(toy)都是 /oy/ 发音！'
      },
      {
        id: 'u4-q2',
        type: 'fill_blank',
        prompt: '根据情境选择介词：球在盒子正上方，It is ____ the box.',
        options: ['on', 'under', 'in'],
        correctAnswer: 'on',
        hint: '在……上面用介词 on。'
      },
      {
        id: 'u4-q3',
        type: 'listen_pick',
        prompt: '听音选房间：',
        audioPromptText: 'kitchen',
        options: ['bedroom', 'kitchen', 'bathroom'],
        correctAnswer: 'kitchen',
        hint: '做美味食物的厨房(kitchen)！'
      },
      {
        id: 'u4-q4',
        type: 'read_match',
        prompt: '问答连连看：选择对答匹配的句子',
        matchPairs: [
          { id: 1, question: 'Where is Pike?', answer: "He's in the living room." },
          { id: 2, question: 'Where is the ball?', answer: "It's on the box." },
          { id: 3, question: 'What is this?', answer: 'This is a doll.' }
        ]
      }
    ]
  },

  // ================= UNIT 5 =================
  {
    id: 5,
    title: 'Unit 5️⃣ Features & Appearance',
    subtitle: '物品特征与人物外貌 (ou, ow 发音)',
    phonics: [
      {
        sound: 'oi / oy',
        label: '复习发音 oi, oy',
        storyTitle: "Roy's Toys",
        storyWords: ['oil', 'coin', 'foil', 'boil', 'boy', 'toy', 'joy'],
        storyText: ['Roy points to the oil and foil with joy!']
      },
      {
        sound: 'ou / ow',
        label: '发音 ou, ow',
        storyTitle: 'Circus Clowns',
        storyWords: ['house', 'mouse', 'shout', 'loud', 'cow', 'clown', 'brown', 'crown'],
        storyText: [
          'A brown mouse runs around the house.',
          'A clown in a crown gives a loud shout.',
          'Look at the cow with the clown!'
        ]
      }
    ],
    sightWords: ['hey', 'can', 'we', 'go', 'how many', "let's", 'one-eight', 'wow', 'must', 'be', 'out', 'put'],
    vocabReview: [
      { word: 'new', translation: '新的', emoji: '✨' },
      { word: 'old', translation: '旧的/老的', emoji: '⏳' },
      { word: 'big', translation: '大的', emoji: '🐘' },
      { word: 'little', translation: '小的', emoji: '🐭' },
      { word: 'heavy', translation: '重重的', emoji: '🪨' },
      { word: 'light', translation: '轻盈的', emoji: '🪶' }
    ],
    vocabNew: [
      { word: 'beautiful', translation: '美丽的', emoji: '💃' },
      { word: 'handsome', translation: '英俊的/帅气的', emoji: '🕺' },
      { word: 'thin', translation: '瘦的', emoji: '🧍‍♂️' },
      { word: 'tall', translation: '高的', emoji: '🦒' },
      { word: 'short', translation: '矮的/短的', emoji: '🚶‍♂️' },
      { word: 'long', translation: '长的', emoji: '📏' },
      { word: 'straight', translation: '直的', emoji: '➖' },
      { word: 'curly', translation: '卷曲的', emoji: '🌀' }
    ],
    topicSentences: [
      {
        id: 'u5-1',
        question: 'What is it?',
        answer: 'It is (a/an) ____. It\'s ____.',
        sampleQuestion: 'What is it?',
        sampleAnswer: 'It is a house. It\'s big.',
        wordsToInsert: ['big', 'heavy', 'new', 'old', 'light']
      },
      {
        id: 'u5-2',
        question: 'What does (he/she) look like?',
        answer: '(He\'s/She\'s) ____.',
        sampleQuestion: 'What does she look like?',
        sampleAnswer: 'She\'s tall and beautiful.',
        wordsToInsert: ['tall', 'short', 'handsome', 'beautiful', 'thin']
      },
      {
        id: 'u5-3',
        question: 'What does (his/her) hair look like?',
        answer: '(His/Her) hair is ____.',
        sampleQuestion: 'What does her hair look like?',
        sampleAnswer: 'Her hair is long and curly.',
        wordsToInsert: ['straight', 'curly', 'short', 'long']
      },
      {
        id: 'u5-4',
        question: 'Is he/she tall?',
        answer: 'Yes, (he/she) is. / No, (he/she) isn\'t. (He/She) is ____.',
        sampleQuestion: 'Is he tall?',
        sampleAnswer: 'No, he isn\'t. He is short.',
        wordsToInsert: ['tall', 'short', 'thin']
      },
      {
        id: 'u5-5',
        question: 'Does she have long hair or short hair?',
        answer: 'She has ____ hair.',
        sampleQuestion: 'Does she have long hair or short hair?',
        sampleAnswer: 'She has long hair.',
        wordsToInsert: ['long', 'short', 'straight', 'curly']
      }
    ],
    reader: {
      title: 'Aladdin and the Birthday Wish - Part 2',
      coverEmoji: '🧞',
      pages: [
        {
          text: 'Aladdin meets a handsome prince and a beautiful princess.',
          translation: '阿拉丁遇到了一位英俊的王子和一位美丽的公主。',
          illustration: '👑'
        },
        {
          text: 'What does her hair look like? Her hair is long and curly.',
          translation: '她的头发长什么样？她的头发又长又卷。',
          illustration: '💇‍♀️'
        },
        {
          text: 'Is the Genie big? Yes, he is! He is huge and blue!',
          translation: '精灵很大吗？是的！他超级庞大还是蓝色的！',
          illustration: '🧞‍♂️'
        }
      ]
    },
    quizzes: [
      {
        id: 'u5-q1',
        type: 'phonics_match',
        prompt: '哪一个单词带有 /ou/ 或 /ow/ 的发音？',
        options: ['house', 'teeth', 'oil'],
        correctAnswer: 'house',
        hint: '房子(house)和小丑(clown)都是 /ou/ /ow/ 的发音。'
      },
      {
        id: 'u5-q2',
        type: 'fill_blank',
        prompt: '补全句子：Her hair is long and ____. (卷曲的)',
        options: ['curly', 'straight', 'short'],
        correctAnswer: 'curly',
        hint: 'curly 意思就是卷曲的头发。'
      },
      {
        id: 'u5-q3',
        type: 'listen_pick',
        prompt: '听音选词：形容帅气的男生',
        audioPromptText: 'handsome',
        options: ['handsome', 'beautiful', 'short'],
        correctAnswer: 'handsome',
        hint: '形容男孩很帅用 handsome！'
      },
      {
        id: 'u5-q4',
        type: 'read_match',
        prompt: '问答匹配：连接正确答句',
        matchPairs: [
          { id: 1, question: 'What does she look like?', answer: "She's tall and beautiful." },
          { id: 2, question: 'What does his hair look like?', answer: 'His hair is short and straight.' },
          { id: 3, question: 'Is he short?', answer: "No, he isn't. He is tall." }
        ]
      }
    ]
  },

  // ================= UNIT 6 =================
  {
    id: 6,
    title: 'Unit 6️⃣ Animals & Sound Vowels',
    subtitle: '陆地/海洋动物 (长短oo / ar, or发音)',
    phonics: [
      {
        sound: 'oo (Short & Long)',
        label: '发音 oo (长音 / 短音)',
        storyTitle: 'Pinocchio',
        storyWords: ['wood', 'hood', 'cook', 'hook', 'tool', 'moon', 'spoon', 'boot'],
        storyText: [
          'Pinocchio is made of wood.',
          'The cook wears a hood and holds a hook.',
          'Under the full moon, use a spoon to eat soup with boots on!'
        ]
      },
      {
        sound: 'ar / or',
        label: '发音 ar, or',
        storyTitle: 'Corn Farm',
        storyWords: ['car', 'cart', 'barn', 'farm', 'corn', 'horn', 'horse', 'north'],
        storyText: [
          'Drive a car to the barn on the farm.',
          'Feed yellow corn to the horse in the north.'
        ]
      }
    ],
    sightWords: ['little', 'lives', 'who', 'he', 'his', 'out of', 'puts', 'up', 'at', 'comes', 'must', 'be', 'if', 'your', 'will', 'some', 'from', 'my', 'we', "won't", 'get', 'too', "let's", 'hear', 'can', 'see'],
    vocabReview: [
      { word: 'kangaroo', translation: '袋鼠', emoji: '🦘' },
      { word: 'hippo', translation: '河马', emoji: '🦛' },
      { word: 'zebra', translation: '斑马', emoji: '🦓' },
      { word: 'koala', translation: '考拉', emoji: '🐨' },
      { word: 'lion', translation: '狮子', emoji: '🦁' },
      { word: 'cow', translation: '奶牛', emoji: '🐮' },
      { word: 'bear', translation: '熊', emoji: '🐻' },
      { word: 'penguin', translation: '企鹅', emoji: '🐧' },
      { word: 'panda', translation: '熊猫', emoji: '🐼' },
      { word: 'alligator', translation: '短吻鳄', emoji: '🐊' },
      { word: 'elephant', translation: '大象', emoji: '🐘' }
    ],
    vocabNew: [
      { word: 'dolphin', translation: '海豚', emoji: '🐬' },
      { word: 'shark', translation: '鲨鱼', emoji: '🦈' },
      { word: 'octopus', translation: '章鱼', emoji: '🐙' },
      { word: 'jellyfish', translation: '水母', emoji: '🪼' },
      { word: 'lobster', translation: '龙虾', emoji: '🦞' },
      { word: 'crab', translation: '螃蟹', emoji: '🦀' },
      { word: 'seahorse', translation: '海马', emoji: '海' },
      { word: 'starfish', translation: '海星', emoji: '⭐' }
    ],
    topicSentences: [
      {
        id: 'u6-1',
        question: 'What is it? What color is it?',
        answer: 'It is (a/an) ____. It is ____.',
        sampleQuestion: 'What is it? What color is it?',
        sampleAnswer: 'It is a crab. It is green.',
        wordsToInsert: ['crab', 'dolphin', 'starfish', 'octopus', 'jellyfish']
      },
      {
        id: 'u6-2',
        question: 'What do ____ look like?',
        answer: 'They are ____.',
        sampleQuestion: 'What do sharks look like?',
        sampleAnswer: 'They are big and fast.',
        wordsToInsert: ['sharks', 'dolphins', 'pandas', 'jellyfish']
      },
      {
        id: 'u6-3',
        question: 'Do sharks eat fish?',
        answer: 'Yes, they do. / No, they don\'t.',
        sampleQuestion: 'Do sharks eat fish?',
        sampleAnswer: 'Yes, they do.',
        wordsToInsert: ['fish', 'seaweed', 'fruit']
      },
      {
        id: 'u6-4',
        question: 'What animal can you draw?',
        answer: 'I can draw (a/an) ____.',
        sampleQuestion: 'What animal can you draw?',
        sampleAnswer: 'I can draw a starfish.',
        wordsToInsert: ['starfish', 'octopus', 'panda', 'dolphin', 'koala']
      },
      {
        id: 'u6-5',
        question: 'Where does a dolphin live?',
        answer: 'A dolphin lives in the ____.',
        sampleQuestion: 'Where does a dolphin live?',
        sampleAnswer: 'A dolphin lives in the sea.',
        wordsToInsert: ['sea', 'ocean', 'water', 'deep sea']
      }
    ],
    reader: {
      title: 'Aladdin and the Birthday Wish - Part 3',
      coverEmoji: '🧞‍♂️',
      pages: [
        {
          text: 'Aladdin wishes to see ocean animals!',
          translation: '阿拉丁许愿想看海洋动物！',
          illustration: '🌊'
        },
        {
          text: 'Look! A playful dolphin and a bright blue starfish appear!',
          translation: '看！一只调皮的海豚和一只鲜艳的蓝色海星出现了！',
          illustration: '🐬'
        },
        {
          text: 'Aladdin smiles and says, "I can draw a dolphin and a starfish!"',
          translation: '阿拉丁笑着说：“我会画海豚和海星！”',
          illustration: '🎨'
        }
      ]
    },
    quizzes: [
      {
        id: 'u6-q1',
        type: 'phonics_match',
        prompt: '哪一个词含有 /ar/ 或 /or/ 的发音？',
        options: ['starfish', 'book', 'duck'],
        correctAnswer: 'starfish',
        hint: 'starfish 里的 star 带有 /ar/ 音！'
      },
      {
        id: 'u6-q2',
        type: 'fill_blank',
        prompt: '回答问句：Do sharks eat fish? — ____, they do.',
        options: ['Yes', 'No', 'Not'],
        correctAnswer: 'Yes',
        hint: '肯定回答是 Yes, they do.'
      },
      {
        id: 'u6-q3',
        type: 'listen_pick',
        prompt: '听音选海洋动物：',
        audioPromptText: 'octopus',
        options: ['dolphin', 'octopus', 'jellyfish'],
        correctAnswer: 'octopus',
        hint: '有8条触手的大章鱼！'
      },
      {
        id: 'u6-q4',
        type: 'read_match',
        prompt: '问答连连看：匹配动物相关对话',
        matchPairs: [
          { id: 1, question: 'What is it?', answer: 'It is a dolphin.' },
          { id: 2, question: 'Do sharks eat fish?', answer: 'Yes, they do.' },
          { id: 3, question: 'What animal can you draw?', answer: 'I can draw a starfish.' }
        ]
      }
    ]
  },

  // ================= UNIT 7 =================
  {
    id: 7,
    title: 'Unit 7️⃣ Actions & Sports',
    subtitle: '动作与体育运动 (er, ir, ur 发音)',
    phonics: [
      {
        sound: 'ar / or',
        label: '复习发音 ar, or',
        storyTitle: 'Corn Farm',
        storyWords: ['car', 'cart', 'barn', 'farm', 'corn', 'horn', 'horse', 'north'],
        storyText: ['The horse runs north past the barn and cart.']
      },
      {
        sound: 'er / ir / ur',
        label: '发音 er, ir, ur',
        storyTitle: 'Surfer Girl',
        storyWords: ['girl', 'turn', 'surf', 'curb', 'smirk', 'twirl', 'swerve', 'church'],
        storyText: [
          'A cool girl loves to surf.',
          'She can turn and twirl on her surfboard.',
          'Surfer girl smiles with a smirk!'
        ]
      }
    ],
    sightWords: ['who', 'loves', 'they', 'her', 'with', 'sure', 'you', 'says', 'give', 'me', "I'll", 'past', 'sees', 'like'],
    vocabReview: [
      { word: 'walking', translation: '步行/走路', emoji: '🚶' },
      { word: 'running', translation: '跑步', emoji: '🏃' },
      { word: 'climbing', translation: '攀爬', emoji: '🧗' },
      { word: 'throwing', translation: '投掷', emoji: '🎾' },
      { word: 'catching', translation: '接球', emoji: '🥎' },
      { word: 'dancing', translation: '跳舞', emoji: '💃' },
      { word: 'singing', translation: '唱歌', emoji: '🎤' },
      { word: 'reading', translation: '阅读', emoji: '📖' }
    ],
    vocabNew: [
      { word: 'play basketball', translation: '打篮球', emoji: '🏀' },
      { word: 'play soccer', translation: '踢足球', emoji: '⚽' },
      { word: 'play badminton', translation: '打羽毛球', emoji: '🏸' },
      { word: 'play volleyball', translation: '打排球', emoji: '🏐' },
      { word: 'play table tennis', translation: '打乒乓球', emoji: '🏓' },
      { word: 'play baseball', translation: '打棒球', emoji: '⚾' },
      { word: 'do kung fu', translation: '练功夫', emoji: '🥋' },
      { word: 'do yoga', translation: '做瑜伽', emoji: '🧘' }
    ],
    topicSentences: [
      {
        id: 'u7-1',
        question: 'What are you doing?',
        answer: 'I am ____.',
        sampleQuestion: 'What are you doing?',
        sampleAnswer: 'I am dancing.',
        wordsToInsert: ['running', 'singing', 'dancing', 'reading', 'walking', 'climbing']
      },
      {
        id: 'u7-2',
        question: 'What is your favorite sport?',
        answer: 'My favorite sport is ____.',
        sampleQuestion: 'What is your favorite sport?',
        sampleAnswer: 'My favorite sport is basketball.',
        wordsToInsert: ['basketball', 'soccer', 'badminton', 'kung fu', 'volleyball', 'table tennis']
      },
      {
        id: 'u7-3',
        question: 'Are you going to play ____ tomorrow?',
        answer: 'Yes, I am. / No, I\'m not.',
        sampleQuestion: 'Are you going to play soccer tomorrow?',
        sampleAnswer: 'Yes, I am.',
        wordsToInsert: ['soccer', 'table tennis', 'volleyball', 'basketball']
      },
      {
        id: 'u7-4',
        question: 'Is she good at ____?',
        answer: 'Yes, she is good at ____. / No, she isn\'t good at ____.',
        sampleQuestion: 'Is she good at yoga?',
        sampleAnswer: 'Yes, she is good at yoga.',
        wordsToInsert: ['yoga', 'badminton', 'baseball', 'dancing']
      },
      {
        id: 'u7-5',
        question: 'Can you play ____?',
        answer: 'Yes, I can. / No, I can\'t, but I can play ____.',
        sampleQuestion: 'Can you play badminton?',
        sampleAnswer: 'Yes, I can play badminton.',
        wordsToInsert: ['badminton', 'basketball', 'table tennis', 'soccer']
      }
    ],
    reader: {
      title: 'Peter Pan and the Four Seasons - Part 1',
      coverEmoji: '🧚‍♂️',
      pages: [
        {
          text: 'Peter Pan asks Wendy, "What are you doing?"',
          translation: '彼得潘问温蒂：“你正在做什么？”',
          illustration: '🧚‍♂️'
        },
        {
          text: 'Wendy answers, "I am playing badminton in the park!"',
          translation: '温蒂回答：“我正在公园里打羽毛球呢！”',
          illustration: '🏸'
        },
        {
          text: 'My favorite sport is soccer. Let\'s play together tomorrow!',
          translation: '我最喜欢的运动是足球。明天我们一起踢足球吧！',
          illustration: '⚽'
        }
      ]
    },
    quizzes: [
      {
        id: 'u7-q1',
        type: 'phonics_match',
        prompt: '哪一个单词发音含有 /ir/ 或 /er/ /ur/？',
        options: ['girl', 'shark', 'book'],
        correctAnswer: 'girl',
        hint: 'girl 和 surf 属于 /er, ir, ur/ 的发音。'
      },
      {
        id: 'u7-q2',
        type: 'fill_blank',
        prompt: '填空：My favorite sport is ____. (篮球)',
        options: ['basketball', 'soccer', 'kung fu'],
        correctAnswer: 'basketball',
        hint: 'basketball 就是篮球！'
      },
      {
        id: 'u7-q3',
        type: 'listen_pick',
        prompt: '听音选运动项目：',
        audioPromptText: 'play badminton',
        options: ['play badminton', 'play table tennis', 'do yoga'],
        correctAnswer: 'play badminton',
        hint: '拿羽毛球拍拍球~'
      },
      {
        id: 'u7-q4',
        type: 'read_match',
        prompt: '问答匹配：连接正确运动问答',
        matchPairs: [
          { id: 1, question: 'What are you doing?', answer: 'I am running.' },
          { id: 2, question: 'What is your favorite sport?', answer: 'My favorite sport is soccer.' },
          { id: 3, question: 'Are you going to play basketball tomorrow?', answer: 'Yes, I am.' }
        ]
      }
    ]
  },

  // ================= UNIT 8 =================
  {
    id: 8,
    title: 'Unit 8️⃣ Numbers & Days of Week',
    subtitle: '数字与星期 (are/air, eer/ear, y 发音)',
    phonics: [
      {
        sound: 'are / air, eer / ear',
        label: '发音 are/air, eer/ear',
        storyTitle: 'The Haircut',
        storyWords: ['hair', 'stair', 'stare', 'scare', 'ear', 'beard', 'steer', 'sneer'],
        storyText: [
          'The boy with long hair sits on the stair.',
          'Do not scare the bear with the long beard!',
          'Listen with your ear and steer clear.'
        ]
      },
      {
        sound: 'y',
        label: '发音 y',
        storyTitle: 'Goodbye Party',
        storyWords: ['cry', 'fly', 'shy', 'sky', 'happy', 'party', 'hungry', 'silly'],
        storyText: [
          'A shy bird tries to fly into the blue sky.',
          'Everyone is happy at the hungry party!',
          'Don\'t cry, be silly and smile!'
        ]
      }
    ],
    sightWords: ['so', 'want', 'be', "let's", "can't", 'one', 'with', 'but', 'of', 'not', 'up', 'all', 'for', 'do', 'um', "don't", 'after', 'who', 'loves', 'they', 'her', 'sure', 'you', 'says', 'give', 'me', "I'll", 'past', 'sees', 'like'],
    vocabReview: [
      { word: 'one', translation: '1', emoji: '1️⃣' },
      { word: 'two', translation: '2', emoji: '2️⃣' },
      { word: 'three', translation: '3', emoji: '3️⃣' },
      { word: 'four', translation: '4', emoji: '4️⃣' },
      { word: 'five', translation: '5', emoji: '5️⃣' },
      { word: 'ten', translation: '10', emoji: '🔟' },
      { word: 'twelve', translation: '12', emoji: '1️⃣2️⃣' },
      { word: 'twenty', translation: '20', emoji: '2️⃣0️⃣' }
    ],
    vocabNew: [
      { word: 'Monday', translation: '星期一', emoji: '📅' },
      { word: 'Tuesday', translation: '星期二', emoji: '📅' },
      { word: 'Wednesday', translation: '星期三', emoji: '📅' },
      { word: 'Thursday', translation: '星期四', emoji: '📅' },
      { word: 'Friday', translation: '星期五', emoji: '📅' },
      { word: 'Saturday', translation: '星期六', emoji: '🥳' },
      { word: 'Sunday', translation: '星期日', emoji: '☀️' },
      { word: 'weekend', translation: '周末', emoji: '🎈' }
    ],
    topicSentences: [
      {
        id: 'u8-1',
        question: 'How many days are there in a week?',
        answer: 'There are seven days in a week.',
        sampleQuestion: 'How many days are there in a week?',
        sampleAnswer: 'There are seven days in a week.',
        wordsToInsert: ['seven days']
      },
      {
        id: 'u8-2',
        question: 'What day is it today?',
        answer: 'It\'s ____.',
        sampleQuestion: 'What day is it today?',
        sampleAnswer: 'It\'s Friday.',
        wordsToInsert: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      },
      {
        id: 'u8-3',
        question: 'When do you play soccer?',
        answer: 'I play soccer on ____.',
        sampleQuestion: 'When do you play soccer?',
        sampleAnswer: 'I play soccer on Saturday.',
        wordsToInsert: ['Monday', 'Wednesday', 'Friday', 'Saturday', 'Sunday']
      },
      {
        id: 'u8-4',
        question: 'Where do you go on Sunday?',
        answer: 'I go to the park on Sunday.',
        sampleQuestion: 'Where do you go on Sunday?',
        sampleAnswer: 'I go to the library on Sunday.',
        wordsToInsert: ['library', 'park', 'movie theater', 'bakery']
      },
      {
        id: 'u8-5',
        question: 'What do you do on the weekend?',
        answer: 'I ____ on the weekend.',
        sampleQuestion: 'What do you do on the weekend?',
        sampleAnswer: 'I read book on the weekend.',
        wordsToInsert: ['read book', 'play basketball', 'swim', 'do yoga']
      }
    ],
    reader: {
      title: 'Peter Pan and the Four Seasons - Part 2',
      coverEmoji: '✨',
      pages: [
        {
          text: 'Peter Pan asks, "What day is it today?"',
          translation: '彼得潘问：“今天星期几呀？”',
          illustration: '📅'
        },
        {
          text: 'Tinkerbell flies around and shouts, "It\'s Friday! Tomorrow is weekend!"',
          translation: '小叮当飞来飞去大喊：“今天星期五啦！明天就是周末了！”',
          illustration: '🧚‍♀️'
        },
        {
          text: 'On Saturday, they go to Neverland park to have a happy party!',
          translation: '星期六，他们去梦幻岛公园举办快乐的派对！',
          illustration: '🎉'
        }
      ]
    },
    quizzes: [
      {
        id: 'u8-q1',
        type: 'phonics_match',
        prompt: '哪一个单词包含 /y/ 词尾发音？',
        options: ['happy', 'hair', 'stair'],
        correctAnswer: 'happy',
        hint: 'happy, party, silly 都是 y 结尾的音符。'
      },
      {
        id: 'u8-q2',
        type: 'fill_blank',
        prompt: '回答问句：— What day is it today? — It\'s ____. (星期五)',
        options: ['Friday', 'Monday', 'Sunday'],
        correctAnswer: 'Friday',
        hint: 'Friday 是星期五！'
      },
      {
        id: 'u8-q3',
        type: 'listen_pick',
        prompt: '听音选星期单词：',
        audioPromptText: 'Saturday',
        options: ['Thursday', 'Saturday', 'Tuesday'],
        correctAnswer: 'Saturday',
        hint: '美好的星期六 Saturday！'
      },
      {
        id: 'u8-q4',
        type: 'read_match',
        prompt: '问答连连看：将问题与回答正确对应',
        matchPairs: [
          { id: 1, question: 'What day is it today?', answer: "It's Monday." },
          { id: 2, question: 'When do you play soccer?', answer: 'I play soccer on Saturday.' },
          { id: 3, question: 'Where do you go on Sunday?', answer: 'I go to the park on Sunday.' }
        ]
      }
    ]
  },

  // ================= UNIT 9 =================
  {
    id: 9,
    title: 'Unit 9️⃣ Seasons & Comprehensive Review',
    subtitle: '季节与综合复习 (全套发音与大检测)',
    phonics: [
      {
        sound: 'y',
        label: '发音 y',
        storyTitle: 'Goodbye Party',
        storyWords: ['cry', 'fly', 'shy', 'sky', 'happy', 'party', 'hungry', 'silly'],
        storyText: ['The sky is clear and we fly kites together!']
      },
      {
        sound: 'Comprehensive Vowels',
        label: '综合发音复习',
        storyTitle: 'Phonics Review World',
        storyWords: ['clown', 'spoon', 'farm', 'surf', 'stair', 'party'],
        storyText: [
          'Reviewing: ou/ow (clown), oo (spoon), ar/or (farm), er/ir/ur (surf), are/air (stair), y (party).'
        ]
      }
    ],
    sightWords: ['our', "we're", 'say', 'wow', 'looks', "can't", 'into', 'with', 'why', 'see', 'if', 'so', 'all', 'give', 'for', 'here'],
    vocabReview: [
      { word: 'sport', translation: '运动', emoji: '⚽' },
      { word: 'day', translation: '日子/天', emoji: '☀️' },
      { word: 'animal', translation: '动物', emoji: '🐶' },
      { word: 'color', translation: '颜色', emoji: '🎨' },
      { word: 'food', translation: '食物', emoji: '🍕' },
      { word: 'number', translation: '数字', emoji: '🔢' }
    ],
    vocabNew: [
      { word: 'spring', translation: '春天', emoji: '🌸' },
      { word: 'summer', translation: '夏天', emoji: '☀️' },
      { word: 'fall', translation: '秋天', emoji: '🍁' },
      { word: 'winter', translation: '冬天', emoji: '❄️' },
      { word: 'ride my bike', translation: '骑自行车', emoji: '🚲' },
      { word: 'fly a kite', translation: '放风筝', emoji: '🪁' },
      { word: 'skate', translation: '滑冰/滑板', emoji: '⛸️' },
      { word: 'swim', translation: '游泳', emoji: '🏊‍♂️' }
    ],
    topicSentences: [
      {
        id: 'u9-1',
        question: 'What is your favorite season?',
        answer: 'My favorite season is ____.',
        sampleQuestion: 'What is your favorite season?',
        sampleAnswer: 'My favorite season is spring.',
        wordsToInsert: ['spring', 'summer', 'fall', 'winter']
      },
      {
        id: 'u9-2',
        question: 'How\'s the weather in ____?',
        answer: 'It\'s ____.',
        sampleQuestion: 'How\'s the weather in winter?',
        sampleAnswer: 'It\'s cold and snowy.',
        wordsToInsert: ['winter', 'spring', 'summer', 'fall']
      },
      {
        id: 'u9-3',
        question: 'What do you do in the spring?',
        answer: 'I fly kites in the spring.',
        sampleQuestion: 'What do you do in the spring?',
        sampleAnswer: 'I fly kites in the spring.',
        wordsToInsert: ['fly kites', 'swim', 'ride my bike', 'skate']
      },
      {
        id: 'u9-4',
        question: 'What do you wear in winter?',
        answer: 'I wear a ____ in winter.',
        sampleQuestion: 'What do you wear in winter?',
        sampleAnswer: 'I wear a jacket in winter.',
        wordsToInsert: ['jacket', 'coat', 'hat', 'socks']
      },
      {
        id: 'u9-5',
        question: 'Which season is hot and sunny?',
        answer: 'Summer is hot and sunny.',
        sampleQuestion: 'Which season is hot and sunny?',
        sampleAnswer: 'Summer is hot and sunny.',
        wordsToInsert: ['spring', 'summer', 'fall', 'winter']
      }
    ],
    reader: {
      title: 'Peter Pan and the Four Seasons - Part 3',
      coverEmoji: '🍂',
      pages: [
        {
          text: 'Four seasons come and go in Neverland!',
          translation: '梦幻岛经历了春夏秋冬四季变换！',
          illustration: '🌸'
        },
        {
          text: 'In spring, I fly a kite. In summer, I swim in the lake!',
          translation: '春天，我放风筝。夏天，我在湖里游泳！',
          illustration: '🏊‍♂️'
        },
        {
          text: 'In fall, my favorite season, I ride my bike through golden leaves.',
          translation: '在秋天——我最爱的季节，我骑着自行车穿过金色落叶。',
          illustration: '🍁'
        }
      ]
    },
    quizzes: [
      {
        id: 'u9-q1',
        type: 'phonics_match',
        prompt: '复习拼读：下列哪个词属于冬天滑冰的动作 /aɪ/ 音？',
        options: ['skate', 'swim', 'cold'],
        correctAnswer: 'skate',
        hint: '滑冰 skate 的发音！'
      },
      {
        id: 'u9-q2',
        type: 'fill_blank',
        prompt: '完成教材原题：— What is your favorite season? — My favorite season is ____. (秋天)',
        options: ['fall', 'summer', 'winter'],
        correctAnswer: 'fall',
        hint: '秋天用 fall 表达。'
      },
      {
        id: 'u9-q3',
        type: 'listen_pick',
        prompt: '听音选活动：',
        audioPromptText: 'fly a kite',
        options: ['fly a kite', 'ride my bike', 'skate'],
        correctAnswer: 'fly a kite',
        hint: '春天在草地上放风筝(fly a kite)！'
      },
      {
        id: 'u9-q4',
        type: 'read_match',
        prompt: '教材配套原题（Read and match 连线大闯关）：',
        matchPairs: [
          { id: 1, question: 'What do you do in the spring?', answer: 'I fly kites in the spring.' },
          { id: 2, question: 'What is your favorite season?', answer: 'My favorite season is fall.' },
          { id: 3, question: 'Where does she work?', answer: 'She works at a hospital.' },
          { id: 4, question: 'How is the weather in the winter?', answer: "It's cold and snowy." }
        ]
      }
    ]
  }
];
