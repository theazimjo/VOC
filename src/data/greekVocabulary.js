// Core Greek vocabulary for the standalone Greek track's "So'z boyligi"
// section — grouped into small topical categories, same spirit as the
// alphabet's letter set: a fixed, hand-picked list (not user-editable),
// each entry pre-recorded as real audio (see public/audio/greek/vocab/).
export const GREEK_VOCAB_CATEGORIES = [
  { id: 'greetings', title: 'Salomlashish', icon: '👋' },
  { id: 'numbers', title: 'Raqamlar', icon: '🔢' },
  { id: 'family', title: 'Oila', icon: '👪' },
  { id: 'colors', title: 'Ranglar', icon: '🎨' },
  { id: 'everyday', title: "Kundalik so'zlar", icon: '🗓️' },
];

export const GREEK_VOCABULARY = [
  // Salomlashish
  { id: 'hello', category: 'greetings', greek: 'γεια σου', translit: 'ya su', uz: 'salom' },
  { id: 'goodbye', category: 'greetings', greek: 'αντίο', translit: 'andío', uz: 'xayr' },
  { id: 'good-morning', category: 'greetings', greek: 'καλημέρα', translit: 'kaliméra', uz: 'xayrli tong' },
  { id: 'good-evening', category: 'greetings', greek: 'καλησπέρα', translit: 'kalispéra', uz: 'xayrli kech' },
  { id: 'please', category: 'greetings', greek: 'παρακαλώ', translit: 'parakaló', uz: 'iltimos' },
  { id: 'thank-you', category: 'greetings', greek: 'ευχαριστώ', translit: 'efharistó', uz: 'rahmat' },
  { id: 'sorry', category: 'greetings', greek: 'συγγνώμη', translit: 'signómi', uz: 'kechirasiz' },
  { id: 'yes', category: 'greetings', greek: 'ναι', translit: 'ne', uz: 'ha' },
  { id: 'no', category: 'greetings', greek: 'όχι', translit: 'óhi', uz: "yo'q" },

  // Raqamlar
  { id: 'one', category: 'numbers', greek: 'ένα', translit: 'éna', uz: 'bir' },
  { id: 'two', category: 'numbers', greek: 'δύο', translit: 'thío', uz: 'ikki' },
  { id: 'three', category: 'numbers', greek: 'τρία', translit: 'tría', uz: 'uch' },
  { id: 'four', category: 'numbers', greek: 'τέσσερα', translit: 'tésera', uz: "to'rt" },
  { id: 'five', category: 'numbers', greek: 'πέντε', translit: 'pénde', uz: 'besh' },
  { id: 'six', category: 'numbers', greek: 'έξι', translit: 'éksi', uz: 'olti' },
  { id: 'seven', category: 'numbers', greek: 'επτά', translit: 'eptá', uz: 'yetti' },
  { id: 'eight', category: 'numbers', greek: 'οκτώ', translit: 'októ', uz: 'sakkiz' },
  { id: 'nine', category: 'numbers', greek: 'εννέα', translit: 'enéa', uz: "to'qqiz" },
  { id: 'ten', category: 'numbers', greek: 'δέκα', translit: 'théka', uz: "o'n" },

  // Oila
  { id: 'mother', category: 'family', greek: 'μητέρα', translit: 'mitéra', uz: 'ona' },
  { id: 'father', category: 'family', greek: 'πατέρας', translit: 'patéras', uz: 'ota' },
  { id: 'brother', category: 'family', greek: 'αδελφός', translit: 'adelfós', uz: 'aka/uka' },
  { id: 'sister', category: 'family', greek: 'αδελφή', translit: 'adelfí', uz: 'opa/singil' },
  { id: 'son', category: 'family', greek: 'γιος', translit: 'yos', uz: "o'g'il" },
  { id: 'daughter', category: 'family', greek: 'κόρη', translit: 'kóri', uz: 'qiz' },

  // Ranglar
  { id: 'red', category: 'colors', greek: 'κόκκινο', translit: 'kókino', uz: 'qizil' },
  { id: 'blue', category: 'colors', greek: 'μπλε', translit: 'ble', uz: "ko'k" },
  { id: 'green', category: 'colors', greek: 'πράσινο', translit: 'prásino', uz: 'yashil' },
  { id: 'yellow', category: 'colors', greek: 'κίτρινο', translit: 'kítrino', uz: 'sariq' },
  { id: 'black', category: 'colors', greek: 'μαύρο', translit: 'mávro', uz: 'qora' },
  { id: 'white', category: 'colors', greek: 'άσπρο', translit: 'áspro', uz: 'oq' },

  // Kundalik so'zlar
  { id: 'water', category: 'everyday', greek: 'νερό', translit: 'neró', uz: 'suv' },
  { id: 'bread', category: 'everyday', greek: 'ψωμί', translit: 'psomí', uz: 'non' },
  { id: 'house', category: 'everyday', greek: 'σπίτι', translit: 'spíti', uz: 'uy' },
  { id: 'friend', category: 'everyday', greek: 'φίλος', translit: 'fílos', uz: "do'st" },
  { id: 'time', category: 'everyday', greek: 'χρόνος', translit: 'hrónos', uz: 'vaqt' },
  { id: 'love', category: 'everyday', greek: 'αγάπη', translit: 'agápi', uz: 'sevgi' },
];

export function getVocabByCategory(categoryId) {
  return GREEK_VOCABULARY.filter((w) => w.category === categoryId);
}
