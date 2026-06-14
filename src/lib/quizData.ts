export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface StudentInfo {
  fullName: string;
  grade: string;
}

export const QUESTIONS_7TH: Question[] = [
  {
    id: 1,
    text: "She _____ tennis every Sunday.",
    options: ["play", "plays", "playing", "to play"],
    correctAnswer: "plays"
  },
  {
    id: 2,
    text: "I _____ pizza.",
    options: ["am not like", "do not like", "does not like", "not like"],
    correctAnswer: "do not like"
  },
  {
    id: 3,
    text: "_____ to school by bus?",
    options: ["They go", "Do they go", "Does they go", "Are they go"],
    correctAnswer: "Do they go"
  },
  {
    id: 4,
    text: "The sun _____ in the east.",
    options: ["rise", "rises", "is rising", "rose"],
    correctAnswer: "rises"
  },
  {
    id: 5,
    text: "He always _____ his teeth before bed.",
    options: ["brush", "brushes", "brushing", "is brushing"],
    correctAnswer: "brushes"
  },
  {
    id: 6,
    text: "We _____ TV in the evening.",
    options: ["watches", "watch", "are watching", "watched"],
    correctAnswer: "watch"
  },
  {
    id: 7,
    text: "_____ English?",
    options: ["You speak", "Do you speak", "Does you speak", "Are you speak"],
    correctAnswer: "Do you speak"
  },
  {
    id: 8,
    text: "My cat _____ a lot.",
    options: ["sleeps", "sleep", "is sleeping", "sleeping"],
    correctAnswer: "sleeps"
  },
  {
    id: 9,
    text: "Sarah and John _____ in an office.",
    options: ["works", "working", "work", "is working"],
    correctAnswer: "work"
  },
  {
    id: 10,
    text: "The train _____ at 8:00 AM.",
    options: ["leave", "leaves", "leaving", "is leaving"],
    correctAnswer: "leaves"
  },
  {
    id: 11,
    text: "He _____ football.",
    options: ["do not play", "does not play", "not play", "not plays"],
    correctAnswer: "does not play"
  },
  {
    id: 12,
    text: "_____ the answer?",
    options: ["she know", "Does she know", "Do she know", "Is she know"],
    correctAnswer: "Does she know"
  },
  {
    id: 13,
    text: "I usually _____ early.",
    options: ["gets up", "getting up", "am get up", "get up"],
    correctAnswer: "get up"
  },
  {
    id: 14,
    text: "Water _____ at 100 degrees Celsius.",
    options: ["boil", "boils", "is boiling", "boiling"],
    correctAnswer: "boils"
  },
  {
    id: 15,
    text: "They often _____ their grandparents.",
    options: ["visits", "visiting", "visit", "are visiting"],
    correctAnswer: "visit"
  }
];

export const QUESTIONS_9TH: Question[] = [
  { id: 1, text: "I _____ to the park yesterday.", options: ["go", "goes", "went", "gone"], correctAnswer: "went" },
  { id: 2, text: "They _____ a new house last month.", options: ["buy", "bought", "buyed", "were buying"], correctAnswer: "bought" },
  { id: 3, text: "She _____ me an email this morning.", options: ["send", "sended", "sent", "was sending"], correctAnswer: "sent" },
  { id: 4, text: "We _____ pizza for dinner last night.", options: ["eat", "eated", "ate", "eaten"], correctAnswer: "ate" },
  { id: 5, text: "_____ you see the movie?", options: ["Do", "Did", "Were", "Are"], correctAnswer: "Did" },
  { id: 6, text: "He _____ his keys yesterday.", options: ["lose", "losed", "lost", "was losing"], correctAnswer: "lost" },
  { id: 7, text: "I _____ not know the answer.", options: ["do", "did", "was", "were"], correctAnswer: "did" },
  { id: 8, text: "The train _____ late.", options: ["arrive", "arrived", "arrives", "arriving"], correctAnswer: "arrived" },
  { id: 9, text: "_____ they play football on Sunday?", options: ["Did", "Do", "Were", "Are"], correctAnswer: "Did" },
  { id: 10, text: "She _____ the book in two days.", options: ["read", "readed", "reads", "reading"], correctAnswer: "read" },
  { id: 11, text: "We _____ a lot of pictures on holiday.", options: ["took", "take", "taked", "taken"], correctAnswer: "took" },
  { id: 12, text: "I _____ very happy when I heard the news.", options: ["was", "were", "did", "am"], correctAnswer: "was" },
  { id: 13, text: "He _____ to the music.", options: ["listen", "listens", "listened", "listening"], correctAnswer: "listened" },
  { id: 14, text: "They _____ the game.", options: ["win", "won", "wined", "winning"], correctAnswer: "won" },
  { id: 15, text: "_____ she at the party?", options: ["Did", "Was", "Were", "Do"], correctAnswer: "Was" }
];

export const QUESTIONS_10TH: Question[] = [
  { id: 1, text: "I _____ seen that movie.", options: ["have", "has", "did", "was"], correctAnswer: "have" },
  { id: 2, text: "She _____ not finished her homework yet.", options: ["have", "has", "did", "is"], correctAnswer: "has" },
  { id: 3, text: "_____ you ever visited Paris?", options: ["Have", "Has", "Did", "Do"], correctAnswer: "Have" },
  { id: 4, text: "They have _____ here for ten years.", options: ["live", "lived", "living", "lives"], correctAnswer: "lived" },
  { id: 5, text: "He has just _____ out.", options: ["go", "went", "gone", "going"], correctAnswer: "gone" },
  { id: 6, text: "We have never _____ sushi.", options: ["eat", "ate", "eaten", "eating"], correctAnswer: "eaten" },
  { id: 7, text: "_____ she found her keys?", options: ["Have", "Has", "Did", "Is"], correctAnswer: "Has" },
  { id: 8, text: "I haven't _____ to him today.", options: ["speak", "spoke", "spoken", "speaking"], correctAnswer: "spoken" },
  { id: 9, text: "They have _____ a new car.", options: ["buy", "bought", "buyed", "buying"], correctAnswer: "bought" },
  { id: 10, text: "How long _____ you known him?", options: ["have", "has", "did", "do"], correctAnswer: "have" },
  { id: 11, text: "She has _____ my best friend since childhood.", options: ["be", "was", "been", "being"], correctAnswer: "been" },
  { id: 12, text: "I have _____ three cups of coffee already.", options: ["drink", "drank", "drunk", "drinking"], correctAnswer: "drunk" },
  { id: 13, text: "He hasn't _____ back yet.", options: ["come", "came", "comed", "coming"], correctAnswer: "come" },
  { id: 14, text: "_____ they left?", options: ["Have", "Has", "Did", "Do"], correctAnswer: "Have" },
  { id: 15, text: "We have _____ the instructions.", options: ["read", "readed", "reading", "reads"], correctAnswer: "read" }
];

export const QUESTIONS_11TH: Question[] = [
  { id: 1, text: "I think it _____ rain tomorrow.", options: ["will", "is going to", "am going to", "are going to"], correctAnswer: "will" },
  { id: 2, text: "Look at those clouds! It _____ rain.", options: ["will", "is going to", "am going to", "are going to"], correctAnswer: "is going to" },
  { id: 3, text: "I _____ be 18 next month.", options: ["will", "is going to", "am going to", "are going to"], correctAnswer: "will" },
  { id: 4, text: "We _____ travel to Spain next summer.", options: ["will", "is going to", "are going to", "am going to"], correctAnswer: "are going to" },
  { id: 5, text: "I promise I _____ help you.", options: ["will", "am going to", "is going to", "are going to"], correctAnswer: "will" },
  { id: 6, text: "He _____ buy a new laptop next week.", options: ["will", "is going to", "am going to", "are going to"], correctAnswer: "is going to" },
  { id: 7, text: "If you study, you _____ pass the test.", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "will" },
  { id: 8, text: "They _____ visit their grandparents on Sunday.", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "are going to" },
  { id: 9, text: "I _____ probably stay home tonight.", options: ["will", "am going to", "is going to", "are going to"], correctAnswer: "will" },
  { id: 10, text: "She has bought sugar and flour. She _____ make a cake.", options: ["will", "is going to", "am going to", "are going to"], correctAnswer: "is going to" },
  { id: 11, text: "Maybe we _____ go to the beach.", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "will" },
  { id: 12, text: "I _____ not tell anyone your secret.", options: ["will", "am going to", "is going to", "are going to"], correctAnswer: "will" },
  { id: 13, text: "Watch out! You _____ drop the glasses.", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "are going to" },
  { id: 14, text: "I am sure they _____ win the match.", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "will" },
  { id: 15, text: "What _____ you do this weekend?", options: ["will", "are going to", "is going to", "am going to"], correctAnswer: "are going to" }
];

export const QUESTIONS_8TH: Question[] = [
  {
    id: 1,
    text: "I _____ TV when the phone rang.",
    options: ["was watching", "watched", "am watching", "watch"],
    correctAnswer: "was watching"
  },
  {
    id: 2,
    text: "She _____ to the cinema yesterday.",
    options: ["go", "goes", "went", "is going"],
    correctAnswer: "went"
  },
  {
    id: 3,
    text: "They _____ football at 5 PM last Sunday.",
    options: ["played", "were playing", "play", "are playing"],
    correctAnswer: "were playing"
  },
  {
    id: 4,
    text: "He _____ the movie.",
    options: ["did not like", "do not like", "was not liking", "not like"],
    correctAnswer: "did not like"
  },
  {
    id: 5,
    text: "While I _____ a book, my sister was sleeping.",
    options: ["read", "am reading", "was reading", "reads"],
    correctAnswer: "was reading"
  },
  {
    id: 6,
    text: "We _____ a great exhibition last week.",
    options: ["see", "saw", "were seeing", "seen"],
    correctAnswer: "saw"
  },
  {
    id: 7,
    text: "_____ you _____ when I called?",
    options: ["Did / sleep", "Were / sleeping", "Do / sleep", "Are / sleeping"],
    correctAnswer: "Were / sleeping"
  },
  {
    id: 8,
    text: "I _____ dinner when the lights went out.",
    options: ["ate", "am eating", "were eating", "was eating"],
    correctAnswer: "was eating"
  },
  {
    id: 9,
    text: "He _____ a new car two days ago.",
    options: ["buy", "bought", "was buying", "buys"],
    correctAnswer: "bought"
  },
  {
    id: 10,
    text: "What _____ she _____ at 8 PM last night?",
    options: ["was / doing", "did / do", "is / doing", "were / doing"],
    correctAnswer: "was / doing"
  },
  {
    id: 11,
    text: "They _____ when the teacher walked in.",
    options: ["did not study", "were not studying", "not studying", "are not studying"],
    correctAnswer: "were not studying"
  },
  {
    id: 12,
    text: "Did you _____ your homework?",
    options: ["finished", "finishing", "finish", "finishes"],
    correctAnswer: "finish"
  },
  {
    id: 13,
    text: "While we _____ in the park, it started to rain.",
    options: ["walked", "were walking", "was walking", "are walking"],
    correctAnswer: "were walking"
  },
  {
    id: 14,
    text: "I _____ this old coin in the garden.",
    options: ["finds", "finding", "was finding", "found"],
    correctAnswer: "found"
  },
  {
    id: 15,
    text: "She _____ dinner while he was washing the dishes.",
    options: ["cooked", "was cooking", "is cooking", "cooks"],
    correctAnswer: "was cooking"
  }
];
