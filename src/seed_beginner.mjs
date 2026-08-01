import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, update, push, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCjAzSQYeftEQ0t84tDITRvy5xOX609WzU",
  authDomain: "ai-chat-703e7.firebaseapp.com",
  databaseURL: "https://ai-chat-703e7-default-rtdb.firebaseio.com",
  projectId: "ai-chat-703e7",
  storageBucket: "ai-chat-703e7.appspot.com",
  messagingSenderId: "185115025377",
  appId: "1:185115025377:web:ca4cfe8fde9703ed1b7ca0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const beginnerCourseData = {
  title: "Beginner",
  level: "Beginner",
  description: "Ingliz tilini noldan o'rganishni boshlaganlar uchun maxsus kurs",
  createdBy: "Center Admin",
  createdAt: new Date().toISOString(),
  months: [
    {
      id: "month_1",
      title: "1-Month (Basics & Greetings)",
      units: [
        {
          id: "unit_1_1",
          title: "Unit 1: Greetings & Introductions",
          words: [
            {
              id: "w_101",
              word: "Hello",
              translation: "Salom",
              partOfSpeech: "noun",
              definition: "A greeting used when meeting someone",
              example: "Hello, how are you?"
            },
            {
              id: "w_102",
              word: "Goodbye",
              translation: "Xayr",
              partOfSpeech: "noun",
              definition: "Used to express good wishes when parting",
              example: "Goodbye, see you tomorrow!"
            },
            {
              id: "w_103",
              word: "Name",
              translation: "Ism",
              partOfSpeech: "noun",
              definition: "A word or set of words by which a person is known",
              example: "My name is John."
            },
            {
              id: "w_104",
              word: "Nice",
              translation: "Yoqimli",
              partOfSpeech: "adjective",
              definition: "Pleasant or agreeable",
              example: "Nice to meet you."
            },
            {
              id: "w_105",
              word: "Please",
              translation: "Iltimos",
              partOfSpeech: "phrase",
              definition: "Used to express politeness when asking for something",
              example: "Please sit down."
            },
            {
              id: "w_106",
              word: "Thank you",
              translation: "Rahmat",
              partOfSpeech: "phrase",
              definition: "Used to express gratitude",
              example: "Thank you for your help."
            }
          ]
        },
        {
          id: "unit_1_2",
          title: "Unit 2: Family & Friends",
          words: [
            {
              id: "w_201",
              word: "Father",
              translation: "Ota",
              partOfSpeech: "noun",
              definition: "A male parent",
              example: "My father is a teacher."
            },
            {
              id: "w_202",
              word: "Mother",
              translation: "Ona",
              partOfSpeech: "noun",
              definition: "A female parent",
              example: "My mother cooks delicious food."
            },
            {
              id: "w_203",
              word: "Brother",
              translation: "Aka / Uka",
              partOfSpeech: "noun",
              definition: "A male sibling",
              example: "I have an elder brother."
            },
            {
              id: "w_204",
              word: "Sister",
              translation: "Opa / Singil",
              partOfSpeech: "noun",
              definition: "A female sibling",
              example: "My sister loves reading books."
            },
            {
              id: "w_205",
              word: "Friend",
              translation: "Do'st",
              partOfSpeech: "noun",
              definition: "A person with whom one has a bond of mutual affection",
              example: "He is my best friend."
            },
            {
              id: "w_206",
              word: "Family",
              translation: "Oila",
              partOfSpeech: "noun",
              definition: "A group consisting of parents and children",
              example: "I love my family."
            }
          ]
        },
        {
          id: "unit_1_3",
          title: "Unit 3: Daily Routine & Time",
          words: [
            {
              id: "w_301",
              word: "Morning",
              translation: "Ertalab / Tong",
              partOfSpeech: "noun",
              definition: "The period of time between sunrise and noon",
              example: "I wake up early in the morning."
            },
            {
              id: "w_302",
              word: "Night",
              translation: "Kechasi",
              partOfSpeech: "noun",
              definition: "The period of darkness in each 24 hours",
              example: "Good night, sleep well!"
            },
            {
              id: "w_303",
              word: "Day",
              translation: "Kun",
              partOfSpeech: "noun",
              definition: "A period of twenty-four hours",
              example: "Have a great day!"
            },
            {
              id: "w_304",
              word: "Eat",
              translation: "Yemoq",
              partOfSpeech: "verb",
              definition: "Put food into the mouth and chew and swallow it",
              example: "I eat breakfast at 8 AM."
            },
            {
              id: "w_305",
              word: "Sleep",
              translation: "Uxlamoq",
              partOfSpeech: "verb",
              definition: "Condition of body and mind such as that which recurs every night",
              example: "I sleep 8 hours a day."
            },
            {
              id: "w_306",
              word: "Work",
              translation: "Ishlamoq",
              partOfSpeech: "verb",
              definition: "Activity involving mental or physical effort done to achieve a result",
              example: "They work at an office."
            }
          ]
        },
        {
          id: "unit_1_4",
          title: "Unit 4: Food & Drinks",
          words: [
            {
              id: "w_401",
              word: "Water",
              translation: "Suv",
              partOfSpeech: "noun",
              definition: "A transparent, odorless, tasteless liquid",
              example: "Drink plenty of water every day."
            },
            {
              id: "w_402",
              word: "Bread",
              translation: "Non",
              partOfSpeech: "noun",
              definition: "Food made of flour, water, and yeast mixed together and baked",
              example: "Fresh bread smells amazing."
            },
            {
              id: "w_403",
              word: "Apple",
              translation: "Olma",
              partOfSpeech: "noun",
              definition: "The round fruit of a tree of the rose family",
              example: "She bought red apples."
            },
            {
              id: "w_404",
              word: "Tea",
              translation: "Choy",
              partOfSpeech: "noun",
              definition: "A hot drink made by infusing dried crushed leaves",
              example: "Would you like a cup of tea?"
            },
            {
              id: "w_405",
              word: "Milk",
              translation: "Sut",
              partOfSpeech: "noun",
              definition: "A white liquid produced by female mammals",
              example: "Children drink milk for breakfast."
            },
            {
              id: "w_406",
              word: "Fruit",
              translation: "Meva",
              partOfSpeech: "noun",
              definition: "The sweet and fleshy product of a tree or other plant",
              example: "Eating fruit is good for health."
            }
          ]
        }
      ]
    }
  ]
};

async function seed() {
  const centersSnap = await get(ref(db, 'centers'));
  let centerIds = ['demo_center_1'];
  if (centersSnap.exists()) {
    centerIds = Object.keys(centersSnap.val());
  }

  const flatUnits = beginnerCourseData.months.flatMap(m => m.units || []);
  const flatWords = flatUnits.flatMap(u => u.words || []);

  for (const cId of centerIds) {
    const packsRef = ref(db, `centers/${cId}/customPacks`);
    const packsSnap = await get(packsRef);

    let existingPackKey = null;
    if (packsSnap.exists()) {
      const val = packsSnap.val();
      Object.keys(val).forEach(k => {
        if (val[k].title?.toLowerCase().includes('beginner')) {
          existingPackKey = k;
        }
      });
    }

    const payload = {
      ...beginnerCourseData,
      centerId: cId,
      units: flatUnits,
      words: flatWords,
      sectionsCount: flatUnits.length,
      wordCount: flatWords.length,
    };

    if (existingPackKey) {
      console.log(`Updating existing Beginner pack in center ${cId}: ${existingPackKey}`);
      payload.id = existingPackKey;
      await update(ref(db, `centers/${cId}/customPacks/${existingPackKey}`), payload);
    } else {
      console.log(`Creating new Beginner pack in center ${cId}`);
      const newRef = push(packsRef);
      payload.id = newRef.key;
      await set(newRef, payload);
    }
  }

  console.log('BEGINNER SEED COMPLETED SUCCESSFULLY!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed Error:', err);
  process.exit(1);
});
