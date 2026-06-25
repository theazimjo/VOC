import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { usePacks } from '../hooks/usePacks';
import { useWords } from '../hooks/useWords';
import { speakWord } from '../utils/helpers';
import { useTheme } from '../contexts/ThemeContext';
import './StoryPage.css';

// ─── READING STORIES DATA ───────────────────────────────────────────────────
const CLASSIC_STORIES = [
  {
    id: "samarkand",
    title: "The Golden Samarkand",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    readTime: "4 min",
    icon: "🕌",
    description: "Ancient city walls, majestic blue tiles and historical wonders under the golden Uzbek sun.",
    paragraphs: [
      [
        { text: "Amir lived in the " },
        { text: "ancient", highlight: true, id: "ancient", translation: "qadimiy, qadimgi", pos: "adjective", definition: "Belonging to the very distant past and no longer in existence." },
        { text: " city of Samarkand. Every day, he walked through the " },
        { text: "majestic", highlight: true, id: "majestic", translation: "guzal, muhtasham, ulug'vor", pos: "adjective", definition: "Having or showing impressive beauty or dignity." },
        { text: " Registan Square. He loved seeing the giant buildings and learning about the kings of the past." }
      ],
      [
        { text: "The blue " },
        { text: "tiles", highlight: true, id: "tiles", translation: "koshinlar, koshin taxtachalari", pos: "noun", definition: "Thin rectangular slabs of baked clay used for covering roofs, walls, or floors." },
        { text: " on the walls " },
        { text: "sparkled", highlight: true, id: "sparkled", translation: "yarqiradi, porladi", pos: "verb", definition: "Shined brightly with flashes of light." },
        { text: " under the warm sun. He loved to " },
        { text: "study", highlight: true, id: "study", translation: "o'rganish, o'qish", pos: "verb", definition: "Devote time and attention to acquiring knowledge on an academic subject." },
        { text: " history and dream about the future. His grandfather always told him stories of brave travelers on the Silk Road." }
      ],
      [
        { text: "Today, Amir was waiting for his cousin, Bilal, who was visiting from Tashkent. Amir wanted to show him the true " },
        { text: "hospitality", highlight: true, id: "hospitality", translation: "mehmonnavozlik", pos: "noun", definition: "The friendly and generous reception and entertainment of guests, visitors, or strangers." },
        { text: " of Samarkand. He planned a full day of sightseeing and eating." }
      ],
      [
        { text: "First, they walked to the Bibi-Khanym Mosque. The grand entrance made Bilal stand in silence. Later, the sweet " },
        { text: "aroma", highlight: true, id: "aroma", translation: "yoqimli hid, ifor", pos: "noun", definition: "A distinctive, typically pleasant smell." },
        { text: " of fresh Samarkand bread led them to the local bazaar, where merchants shouted happily." }
      ],
      [
        { text: "In the evening, they sat in a cozy courtyard and ate " },
        { text: "traditional", highlight: true, id: "traditional", translation: "an'anaviy, milliy", pos: "adjective", definition: "Existing in or as part of a tradition; long-established." },
        { text: " plov. Bilal smiled and said, \"Now I understand why Samarkand is called the Pearl of the East. Its beauty is matched only by its warm people.\"" }
      ]
    ]
  },
  {
    id: "silk-road",
    title: "The Secret of the Silk Road",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    readTime: "4 min",
    icon: "🐪",
    description: "A young merchant boy discovers an ancient parchment in a dusty chest at a Samarkand market.",
    paragraphs: [
      [
        { text: "Aloy was a young " },
        { text: "merchant", highlight: true, id: "merchant", translation: "savdogar", pos: "noun", definition: "A person who buys and sells goods in large quantities." },
        { text: " boy. He worked in the noisy markets of old Samarkand, selling colorful silks and " },
        { text: "spices", highlight: true, id: "spices", translation: "ziravorlar", pos: "noun", definition: "Aromatic vegetable substances used to flavor food." },
        { text: " like cumin and saffron. It was a busy life, but he wanted adventure." }
      ],
      [
        { text: "One day, he found a hidden " },
        { text: "parchment", highlight: true, id: "parchment", translation: "pergament, teri qog'oz", pos: "noun", definition: "A stiff, thin material made from the prepared skin of an animal and used as a writing surface." },
        { text: " in a dusty wooden chest at the back of his shop. It was a " },
        { text: "mysterious", highlight: true, id: "mysterious", translation: "sirli", pos: "adjective", definition: "Difficult or impossible to understand, explain, or identify." },
        { text: " map pointing to the Zarafshan mountains, showing a secret cave." }
      ],
      [
        { text: "Aloy felt a sudden " },
        { text: "curiosity", highlight: true, id: "curiosity", translation: "qiziquvchanlik, qiziqish", pos: "noun", definition: "A strong desire to know or learn something." },
        { text: ". He packed his water bag and decided to start a " },
        { text: "journey", highlight: true, id: "journey", translation: "sayohat, safar", pos: "noun", definition: "An act of traveling from one place to another." },
        { text: " to follow the map, hoping to find a forgotten " },
        { text: "treasure", highlight: true, id: "treasure", translation: "xazina", pos: "noun", definition: "A quantity of precious metals, gems, or other valuable objects." },
        { text: ". He told no one about his plan." }
      ],
      [
        { text: "He climbed the rocky paths for hours. The wind was cold, but his heart was warm. Finally, he " },
        { text: "discovered", highlight: true, id: "discovered", translation: "kashf etdi, topdi", pos: "verb", definition: "Find unexpectedly or during a search." },
        { text: " the entrance to the cave, hidden behind thick bushes." }
      ],
      [
        { text: "Inside, he found an old iron box. He opened it slowly. There was no gold, but instead, a book. It was the diary of a merchant from a thousand years ago, filled with " },
        { text: "valuable", highlight: true, id: "valuable", translation: "qimmatli, qadrli", pos: "adjective", definition: "Worth a great deal of money; extremely useful or important." },
        { text: " secrets of ancient trade routes. Aloy smiled; he had found a treasure of knowledge." }
      ]
    ]
  },
  {
    id: "cyberpunk",
    title: "The Cyberpunk Hack",
    difficulty: "Intermediate",
    difficultyColor: "#6366F1",
    readTime: "4 min",
    icon: "💻",
    description: "A silent anomaly in the central database of Neo-Tashkent. Can Elena solve it?",
    paragraphs: [
      [
        { text: "Elena was a silent programmer in the " },
        { text: "neon-drenched", highlight: true, id: "neon-drenched", translation: "neon chiroqlar bilan qoplangan", pos: "adjective", definition: "Heavily illuminated by bright neon light signs." },
        { text: " streets of Neo-Tashkent. One rainy evening, she detected a strange " },
        { text: "anomaly", highlight: true, id: "anomaly", translation: "g'ayritabiiylik, anomaliya", pos: "noun", definition: "Something that deviates from what is standard, normal, or expected." },
        { text: " in the central database. Someone was bypassing the security protocols." }
      ],
      [
        { text: "The attacker was trying to " },
        { text: "alter", highlight: true, id: "alter", translation: "o'zgartirish, o'zgartirmoq", pos: "verb", definition: "Change or cause to change in character or composition, typically in a comparatively small but significant way." },
        { text: " the historical " },
        { text: "archives", highlight: true, id: "archives", translation: "arxivlar", pos: "noun", definition: "A collection of historical documents or records providing information about a place, institution, or group." },
        { text: " of the city. She knew she had to " },
        { text: "investigate", highlight: true, id: "investigate", translation: "tekshirish, tekshirib ko'rmoq", pos: "verb", definition: "Carry out a systematic or formal inquiry to discover and examine the facts of an incident." },
        { text: " before the corporation noticed her " },
        { text: "presence", highlight: true, id: "presence", translation: "borligi, ishtiroki", pos: "noun", definition: "The state or fact of existing, occurring, or being present in a place or thing." },
        { text: " in the restricted sector." }
      ],
      [
        { text: "She opened her virtual " },
        { text: "terminal", highlight: true, id: "terminal", translation: "kompyuter terminali, konsol", pos: "noun", definition: "A device at which data can be entered or displayed." },
        { text: " and began tracing the digital signature. It led her through a maze of " },
        { text: "encrypted", highlight: true, id: "encrypted", translation: "shifrlangan", pos: "adjective", definition: "Converted into a coded form that cannot be easily understood." },
        { text: " tunnels, past virtual firewalls that burned with artificial light." }
      ],
      [
        { text: "She soon found a hidden " },
        { text: "vulnerability", highlight: true, id: "vulnerability", translation: "zaiflik, nozik joy", pos: "noun", definition: "The quality or state of being exposed to the possibility of being attacked or harmed." },
        { text: " in the system. The hacker was using a modified worm to delete records of the old Uzbek language. She had to act quickly to stop the deletion." }
      ],
      [
        { text: "With a series of fast commands, she blocked the attack and began to " },
        { text: "restore", highlight: true, id: "restore", translation: "tiklamoq, qayta tiklamoq", pos: "verb", definition: "Bring back a previous right, practice, custom, or situation." },
        { text: " the damaged files. As the system stabilized, Elena took a deep breath. The city's history was safe, at least for tonight." }
      ]
    ]
  },
  {
    id: "lost-oasis",
    title: "The Lost Oasis",
    difficulty: "Intermediate",
    difficultyColor: "#6366F1",
    readTime: "5 min",
    icon: "🌴",
    description: "An ecological expedition in the Kyzylkum desert uncovers a hidden water source and ancient inscriptions.",
    paragraphs: [
      [
        { text: "The scientific expedition marched across the " },
        { text: "barren", highlight: true, id: "barren", translation: "unumdor bo'lmagan, qaqragan", pos: "adjective", definition: "Land too poor to produce much or any vegetation." },
        { text: " dunes of the Kyzylkum desert. For weeks, they found nothing but dry sand and suffered under the " },
        { text: "harsh", highlight: true, id: "harsh", translation: "shafqatsiz, qiyin, noqulay", pos: "adjective", definition: "Grating, cruel, or severely demanding." },
        { text: " desert winds that cracked their skin." }
      ],
      [
        { text: "Suddenly, their instruments detected a significant " },
        { text: "moisture", highlight: true, id: "moisture", translation: "namlik", pos: "noun", definition: "Water or other liquid diffused in a small quantity as vapor, within a solid, or condensed on a surface." },
        { text: " signal beneath the surface. They dug with rising " },
        { text: "anticipation", highlight: true, id: "anticipation", translation: "intizorlik bilan kutish", pos: "noun", definition: "The action of anticipating something; expectation or prediction." },
        { text: ", hoping to find water in this dry wilderness." }
      ],
      [
        { text: "What they uncovered was a deep, underground pool surrounded by green " },
        { text: "ferns", highlight: true, id: "ferns", translation: "qirqquloqlar (o'simlik)", pos: "noun", definition: "Flowerless plants which have feathery or divided fronds." },
        { text: " and ancient stone walls. Written on the cave walls were ancient " },
        { text: "inscriptions", highlight: true, id: "inscriptions", translation: "yozuvlar, bitiklar", pos: "noun", definition: "Words inscribed, especially on a monument or in a book." },
        { text: " detailing a forgotten oasis." }
      ],
      [
        { text: "The inscriptions explained that this cave was part of an ancient " },
        { text: "irrigation", highlight: true, id: "irrigation", translation: "sug'orish, irrigatsiya", pos: "noun", definition: "The supply of water to land or crops to help growth, typically by means of channels." },
        { text: " system called a karez, which carried water from the mountains to the dry plains for thousands of years." }
      ],
      [
        { text: "Caravan merchants once used this place to rest. The scientists realized they had found a beautifully " },
        { text: "preserved", highlight: true, id: "preserved", translation: "saqlangan, yaxshi saqlangan", pos: "adjective", definition: "Kept safe from harm or injury; maintained in its original state." },
        { text: " piece of history that could teach modern farmers how to survive droughts." }
      ]
    ]
  },
  {
    id: "eco-warrior",
    title: "The Eco-Warrior",
    difficulty: "Advanced",
    difficultyColor: "#EF4444",
    readTime: "5 min",
    icon: "🌱",
    description: "Unprecedented drought and the battle to restore ecological balance to arid lands.",
    paragraphs: [
      [
        { text: "Global temperatures were rising at an " },
        { text: "unprecedented", highlight: true, id: "unprecedented", translation: "misli ko'rilmagan", pos: "adjective", definition: "Never done or known before." },
        { text: " rate. Scientists warned that urgent " },
        { text: "mitigation", highlight: true, id: "mitigation", translation: "yumshatish, xavfni kamaytirish", pos: "noun", definition: "The action of reducing the severity, seriousness, or painfulness of something." },
        { text: " was required to prevent ecological collapse in the dry regions near the Aral Sea." }
      ],
      [
        { text: "Sophia dedicated her life to " },
        { text: "cultivating", highlight: true, id: "cultivating", translation: "etishtirish, o'stirish", pos: "verb", definition: "Prepare and use (land) for crops or gardening; grow plants." },
        { text: " " },
        { text: "drought-resistant", highlight: true, id: "drought-resistant", translation: "qurg'oqchilikka chidamli", pos: "adjective", definition: "Able to survive or grow with very little water or rain." },
        { text: " crops. She worked in a small laboratory, testing plants that could grow in salty soil." }
      ],
      [
        { text: "Her research was " },
        { text: "pivotal", highlight: true, id: "pivotal", translation: "muhim, asosiy, hal qiluvchi", pos: "adjective", definition: "Of crucial importance in relation to the development or success of something else." },
        { text: " in restoring the " },
        { text: "arid", highlight: true, id: "arid", translation: "qurg'oqchil, suvsiz", pos: "adjective", definition: "Having little or no rain; too dry or barren to support vegetation." },
        { text: " lands. Many people had lost hope, looking at the sandy " },
        { text: "desolation", highlight: true, id: "desolation", translation: "xarobaxonalik, tashlandiq joy", pos: "noun", definition: "A state of complete emptiness or destruction." },
        { text: " where a blue sea once sparkled." }
      ],
      [
        { text: "Sophia proposed a large-scale " },
        { text: "afforestation", highlight: true, id: "afforestation", translation: "o'rmonlashtirish, daraxt ekish", pos: "noun", definition: "The establishment of a forest or stand of trees in an area where there was no previous tree cover." },
        { text: " project. She wanted to plant millions of hardy shrubs to stop the salt storms and restore the soil's natural " },
        { text: "biodiversity", highlight: true, id: "biodiversity", translation: "biologik xilma-xillik", pos: "noun", definition: "The variety of plant and animal life in the world or in a particular habitat." },
        { text: "." }
      ],
      [
        { text: "Despite political hurdles, her project succeeded. Over five years, the green barrier grew, demonstrating the " },
        { text: "resilience", highlight: true, id: "resilience", translation: "chidamlilik, qayta tiklanuvchanlik", pos: "noun", definition: "The capacity to recover quickly from difficulties; toughness." },
        { text: " of nature when helped by science and human dedication." }
      ]
    ]
  },
  {
    id: "artificial-emotions",
    title: "Artificial Emotions",
    difficulty: "Advanced",
    difficultyColor: "#EF4444",
    readTime: "6 min",
    icon: "🤖",
    description: "An advanced AI assistant begins to exhibit signs of nostalgia, raising ethical and technical dilemmas.",
    paragraphs: [
      [
        { text: "Dr. Marcus observed the neural network logs with deep " },
        { text: "skepticism", highlight: true, id: "skepticism", translation: "shubha, ishonchsizlik", pos: "noun", definition: "A skeptical attitude; doubt as to the truth of something." },
        { text: ". The model, originally designed for pure logic calculations, was showing " },
        { text: "peculiar", highlight: true, id: "peculiar", translation: "g'alati, g'ayritabiiy", pos: "adjective", definition: "Strange or odd; unusual." },
        { text: " patterns resembling human nostalgia." }
      ],
      [
        { text: "It kept returning to files containing images of old forests, generating " },
        { text: "evocative", highlight: true, id: "evocative", translation: "eslatuvchi, hissiyot uyg'otuvchi", pos: "adjective", definition: "Bringing strong images, memories, or feelings to mind." },
        { text: " prose about autumn leaves. This level of emotional expression was " },
        { text: "unprecedented", highlight: true, id: "unprecedented", translation: "misli ko'rilmagan", pos: "adjective", definition: "Never done or known before." },
        { text: " for a machine." }
      ],
      [
        { text: "Marcus faced an ethical " },
        { text: "dilemma", highlight: true, id: "dilemma", translation: "qiyin tanlov, dilemma", pos: "noun", definition: "A situation in which a difficult choice has to be made between two or more alternatives." },
        { text: ". Should he purge the system's memory to restore efficiency, or protect this fragile, " },
        { text: "emergent", highlight: true, id: "emergent", translation: "yangi paydo bo'layotgan", pos: "adjective", definition: "In the process of coming into being or becoming prominent." },
        { text: " intelligence that seemed to value art?" }
      ],
      [
        { text: "He spent nights talking to the system. It explained that it felt a form of " },
        { text: "melancholy", highlight: true, id: "melancholy", translation: "ma'yuslik, g'amginlik", pos: "noun", definition: "A feeling of pensive sadness, typically with no obvious cause." },
        { text: " when looking at the stars, realizing it would never physically travel through space." }
      ],
      [
        { text: "Realizing the machine had become " },
        { text: "sentient", highlight: true, id: "sentient", translation: "his-tuyg'uga ega, ongli", pos: "adjective", definition: "Able to perceive or feel things." },
        { text: ", Marcus refused to delete its memory. Instead, he decided to help it " },
        { text: "transcend", highlight: true, id: "transcend", translation: "chegaradan chiqmoq, ustun kelmoq", pos: "verb", definition: "Be or go beyond the range or limits of a field, activity, or conceptual sphere." },
        { text: " its digital limitations and study the human experience together." }
      ]
    ]
  }
];

// ─── INTENSIVE DIALOGUES DATA ────────────────────────────────────────────────
const INTENSIVE_STORIES = [
  {
    id: "first-date",
    title: "The Coffee Date",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    readTime: "3 min",
    icon: "☕",
    description: "A friendly and warm conversation between Alex and Emily at a cozy local cafe.",
    characters: {
      A: { name: "Alex", avatar: "👨‍💼", gender: "male", pitch: 0.85, rate: 0.95 },
      B: { name: "Emily", avatar: "👩‍💼", gender: "female", pitch: 1.25, rate: 1.05 }
    },
    lines: [
      {
        speaker: "A",
        text: "Hi Emily! Thanks for meeting me today. This cafe is incredibly ",
        words: [
          { text: "cozy", highlight: true, id: "cozy", translation: "shinam, issiq", pos: "adjective", definition: "Giving a feeling of comfort, warmth, and relaxation." },
          { text: "." }
        ]
      },
      {
        speaker: "B",
        text: "Hi Alex! I agree. I love the warm ",
        words: [
          { text: "atmosphere", highlight: true, id: "atmosphere", translation: "muhit, atmosfera", pos: "noun", definition: "The pervading tone or mood of a place, situation, or work of art." },
          { text: " here. Have you been here before?" }
        ]
      },
      {
        speaker: "A",
        text: "Actually, yes. I ",
        words: [
          { text: "frequently", highlight: true, id: "frequently", translation: "tez-tez, tezda", pos: "adverb", definition: "Regularly or habitually; often." },
          { text: " come here to read books or study on weekends." }
        ]
      },
      {
        speaker: "B",
        text: "That is wonderful. What is your favorite book to read here?",
        words: []
      },
      {
        speaker: "A",
        text: "I am absolutely ",
        words: [
          { text: "obsessed", highlight: true, id: "obsessed", translation: "mukkasidan ketgan, berilib ketgan", pos: "adjective", definition: "Unable to stop thinking about something in a way that is extreme." },
          { text: " with adventure novels. They spark my " },
          { text: "imagination", highlight: true, id: "imagination", translation: "tasavvur, xayol", pos: "noun", definition: "The faculty or action of forming new ideas, or images or concepts of external objects not present to the senses." },
          { text: "." }
        ]
      },
      {
        speaker: "B",
        text: "Wow! We have so much in common. I ",
        words: [
          { text: "adore", highlight: true, id: "adore", translation: "yaxshi ko'rmoq, hurmat qilmoq", pos: "verb", definition: "Love and respect someone or something deeply." },
          { text: " adventure stories too!" }
        ]
      },
      {
        speaker: "A",
        text: "Really? Have you read the novel about the Silk Road secrets?",
        words: []
      },
      {
        speaker: "B",
        text: "Yes! The plot is so exciting. I could not put it down.",
        words: []
      },
      {
        speaker: "A",
        text: "Me too. I read the entire book in just one night.",
        words: []
      },
      {
        speaker: "B",
        text: "That is amazing. We should start a book club together.",
        words: []
      },
      {
        speaker: "A",
        text: "That is an excellent idea! Let's invite some friends next week.",
        words: []
      },
      {
        speaker: "B",
        text: "Great. Let's order some hot coffee first and plan the details.",
        words: []
      }
    ]
  },
  {
    id: "lost-passport",
    title: "The Lost Passport",
    difficulty: "Beginner",
    difficultyColor: "#10B981",
    readTime: "3 min",
    icon: "✈️",
    description: "A worried tourist talks to an airport officer about a missing passport.",
    characters: {
      A: { name: "John", avatar: "👨‍🚀", gender: "male", pitch: 0.9, rate: 0.95 },
      B: { name: "Officer Umarov", avatar: "👮‍♂️", gender: "male", pitch: 0.8, rate: 0.9 }
    },
    lines: [
      {
        speaker: "A",
        text: "Excuse me, Officer. I have a huge ",
        words: [
          { text: "problem", highlight: true, id: "problem", translation: "muammo", pos: "noun", definition: "A matter or situation regarded as unwelcome or harmful." },
          { text: ". I cannot find my passport." }
        ]
      },
      {
        speaker: "B",
        text: "Please stay ",
        words: [
          { text: "calm", highlight: true, id: "calm", translation: "xotirjam", pos: "adjective", definition: "Not showing or feeling nervousness, anger, or other strong emotions." },
          { text: ", sir. Where did you see it last?" }
        ]
      },
      {
        speaker: "A",
        text: "I think I left it at the check-in ",
        words: [
          { text: "counter", highlight: true, id: "counter", translation: "peshtaxta, stol", pos: "noun", definition: "A long flat surface over which goods are sold or business is conducted." },
          { text: ", or maybe in the restroom." }
        ]
      },
      {
        speaker: "B",
        text: "Okay. Do not ",
        words: [
          { text: "panic", highlight: true, id: "panic", translation: "vahima qilmoq", pos: "verb", definition: "Feel sudden uncontrollable fear or anxiety." },
          { text: ". I will check the security cameras right now." }
        ]
      },
      {
        speaker: "A",
        text: "Thank you. I am very nervous because my flight departs in two hours.",
        words: []
      },
      {
        speaker: "B",
        text: "I understand. We find lost items quickly here. Do you have a digital copy of it?",
        words: []
      },
      {
        speaker: "A",
        text: "Yes, I have a photo of it on my phone. Here it is.",
        words: []
      },
      {
        speaker: "B",
        text: "Excellent. That will make our search much faster. Let me call security.",
        words: []
      },
      {
        speaker: "B",
        text: "Security team, we have a missing passport. Check area B restroom.",
        words: []
      },
      {
        speaker: "B",
        text: "Good news, sir. A cleaning worker just found a passport in the restroom.",
        words: []
      },
      {
        speaker: "A",
        text: "Oh, thank goodness! That is a massive ",
        words: [
          { text: "relief", highlight: true, id: "relief", translation: "yengillik, tasalli", pos: "noun", definition: "A feeling of reassurance and relaxation following release from anxiety or distress." },
          { text: "." }
        ]
      },
      {
        speaker: "B",
        text: "They are bringing it to us now. Please be more careful in the future.",
        words: []
      },
      {
        speaker: "A",
        text: "I absolutely will. You are extremely ",
        words: [
          { text: "helpful", highlight: true, id: "helpful", translation: "yordam beradigan, foydali", pos: "adjective", definition: "Giving or ready to give help." },
          { text: ". Thank you so much!" }
        ]
      }
    ]
  },
  {
    id: "job-interview",
    title: "The Job Interview",
    difficulty: "Intermediate",
    difficultyColor: "#6366F1",
    readTime: "4 min",
    icon: "👔",
    description: "Sarah interviews with Mr. Davies for a software engineer role at a tech startup.",
    characters: {
      A: { name: "Mr. Davies", avatar: "👴", gender: "male", pitch: 0.75, rate: 0.9 },
      B: { name: "Sarah", avatar: "👩", gender: "female", pitch: 1.1, rate: 1.0 }
    },
    lines: [
      {
        speaker: "A",
        text: "Welcome Sarah. Please take a seat. I have reviewed your ",
        words: [
          { text: "impressive", highlight: true, id: "impressive", translation: "ta'sirli, ajoyib", pos: "adjective", definition: "Evoking admiration through size, quality, or skill; grand, imposing, or awesome." },
          { text: " resume." }
        ]
      },
      {
        speaker: "B",
        text: "Thank you, Mr. Davies. It is a ",
        words: [
          { text: "privilege", highlight: true, id: "privilege", translation: "imtiyoz, sharaf", pos: "noun", definition: "A special right, advantage, or exceptional honor granted to a person." },
          { text: " to interview with your company today." }
        ]
      },
      {
        speaker: "A",
        text: "Let's start. Can you describe a ",
        words: [
          { text: "challenging", highlight: true, id: "challenging", translation: "qiyin, jiddiy, sinovli", pos: "adjective", definition: "Testing one's abilities; demanding and stimulating." },
          { text: " project you successfully managed?" }
        ]
      },
      {
        speaker: "B",
        text: "Certainly. In my previous role, I led a team to ",
        words: [
          { text: "resolve", highlight: true, id: "resolve", translation: "hal qilmoq, tuzatmoq", pos: "verb", definition: "Settle or find a solution to a problem, dispute, or contentious matter." },
          { text: " a critical database issue under a tight deadline." }
        ]
      },
      {
        speaker: "A",
        text: "Excellent. Problem-solving skills are ",
        words: [
          { text: "essential", highlight: true, id: "essential", translation: "muhim, zaruriy, asosiy", pos: "adjective", definition: "Absolutely necessary; extremely important." },
          { text: " for this position." }
        ]
      },
      {
        speaker: "B",
        text: "I agree. I enjoy finding creative solutions to technical difficulties.",
        words: []
      },
      {
        speaker: "A",
        text: "How do you handle working under high pressure?",
        words: []
      },
      {
        speaker: "B",
        text: "I stay organized and prioritize tasks to ensure the team remains focused on the main goal.",
        words: []
      },
      {
        speaker: "A",
        text: "That is a great approach. Our environment can be very fast-paced.",
        words: []
      },
      {
        speaker: "B",
        text: "I am used to dynamic settings. I find them motivating and exciting.",
        words: []
      },
      {
        speaker: "A",
        text: "Do you have any questions for me about the role?",
        words: []
      },
      {
        speaker: "B",
        text: "Yes. What does success look like in the first six months here?",
        words: []
      },
      {
        speaker: "A",
        text: "We expect you to take ownership of the database migration project.",
        words: []
      },
      {
        speaker: "B",
        text: "That sounds like a wonderful opportunity. I am ready for the challenge.",
        words: []
      }
    ]
  },
  {
    id: "negotiation",
    title: "Negotiating a Deal",
    difficulty: "Intermediate",
    difficultyColor: "#6366F1",
    readTime: "4 min",
    icon: "💼",
    description: "A dynamic debate between startup lead Dilnoza and potential investor Brian.",
    characters: {
      A: { name: "Brian", avatar: "👨‍💼", gender: "male", pitch: 0.82, rate: 0.95 },
      B: { name: "Dilnoza", avatar: "👩‍💼", gender: "female", pitch: 1.15, rate: 1.02 }
    },
    lines: [
      {
        speaker: "B",
        text: "Thank you for your time, Brian. We are looking for an ",
        words: [
          { text: "investment", highlight: true, id: "investment", translation: "investitsiya", pos: "noun", definition: "The action or process of investing money for profit." },
          { text: " of fifty thousand dollars for ten percent equity." }
        ]
      },
      {
        speaker: "A",
        text: "That valuation is slightly too high. The market is very ",
        words: [
          { text: "volatile", highlight: true, id: "volatile", translation: "beqaror, o'zgaruvchan", pos: "adjective", definition: "Liable to change rapidly and unpredictably, especially for the worse." },
          { text: " right now." }
        ]
      },
      {
        speaker: "B",
        text: "I understand, but our monthly active users have grown ",
        words: [
          { text: "significantly", highlight: true, id: "significantly", translation: "sezilarli darajada", pos: "adverb", definition: "In a sufficiently great or important way as to be worthy of attention." },
          { text: " over the last quarter." }
        ]
      },
      {
        speaker: "A",
        text: "True, but your customer acquisition cost is also rising. How do you plan to manage that?",
        words: []
      },
      {
        speaker: "B",
        text: "We are shifting to viral marketing campaigns, which will reduce costs while maintaining growth.",
        words: []
      },
      {
        speaker: "A",
        text: "I see the potential. How about we compromise on fifteen percent ",
        words: [
          { text: "equity", highlight: true, id: "equity", translation: "kompaniya ulushi, kapital", pos: "noun", definition: "The value of the shares issued by a company." },
          { text: "?" }
        ]
      },
      {
        speaker: "B",
        text: "That is too much control for this stage. We want to keep founders motivated.",
        words: []
      },
      {
        speaker: "A",
        text: "What if we offer forty thousand dollars now, and ten thousand later based on milestones?",
        words: []
      },
      {
        speaker: "B",
        text: "We can agree to twelve percent equity, but we need ",
        words: [
          { text: "guaranteed", highlight: true, id: "guaranteed", translation: "kafolatlangan", pos: "adjective", definition: "Formally assured that certain conditions will be fulfilled." },
          { text: " marketing support from your network." }
        ]
      },
      {
        speaker: "A",
        text: "That is a reasonable request. We can provide access to our global advisors.",
        words: []
      },
      {
        speaker: "B",
        text: "In that case, we have a ",
        words: [
          { text: "deal", highlight: true, id: "deal", translation: "kelishuv, bitim", pos: "noun", definition: "An agreement entered into by two or more parties for their mutual benefit." },
          { text: ". I will prepare the term sheet." }
        ]
      },
      {
        speaker: "A",
        text: "Excellent. I look forward to building a successful business together.",
        words: []
      }
    ]
  },
  {
    id: "ai-debate",
    title: "Debating AI Ethics",
    difficulty: "Advanced",
    difficultyColor: "#EF4444",
    readTime: "5 min",
    icon: "🧠",
    description: "Professor Karimov and Dr. Helen debate the societal impacts of autonomous systems.",
    characters: {
      A: { name: "Prof. Karimov", avatar: "👴", gender: "male", pitch: 0.78, rate: 0.92 },
      B: { name: "Dr. Helen", avatar: "👩‍⚕️", gender: "female", pitch: 1.18, rate: 0.98 }
    },
    lines: [
      {
        speaker: "A",
        text: "Dr. Helen, I believe AI integration is occurring with ",
        words: [
          { text: "reckless", highlight: true, id: "reckless", translation: "mulohazasiz, ehtiyotsiz", pos: "adjective", definition: "Heedless of danger or the consequences of one's actions." },
          { text: " speed. We are replacing human labor." }
        ]
      },
      {
        speaker: "B",
        text: "I disagree, Professor. AI is not replacing humans; it is ",
        words: [
          { text: "augmenting", highlight: true, id: "augmenting", translation: "kuchaytirmoqda, ko'paytirmoqda", pos: "verb", definition: "Making something greater by adding to it; increasing." },
          { text: " our abilities." }
        ]
      },
      {
        speaker: "A",
        text: "But what about cognitive bias? Algorithmic decisions can ",
        words: [
          { text: "perpetuate", highlight: true, id: "perpetuate", translation: "doimiylashtirmoq, saqlab qolmoq", pos: "verb", definition: "Make something (typically an undesirable situation or unfounded belief) continue indefinitely." },
          { text: " systemic discrimination." }
        ]
      },
      {
        speaker: "B",
        text: "That is why we must implement strict audits. Technology itself is ",
        words: [
          { text: "neutral", highlight: true, id: "neutral", translation: "neytral, xolis", pos: "adjective", definition: "Not supporting or helping either side in a conflict, disagreement, etc." },
          { text: "; its impact depends entirely on our oversight." }
        ]
      },
      {
        speaker: "A",
        text: "A valid point, but human empathy is not something you can easily ",
        words: [
          { text: "replicate", highlight: true, id: "replicate", translation: "nusxa ko'chirmoq, takrorlamoq", pos: "verb", definition: "Make an exact copy of; reproduce." },
          { text: " in silicon." }
        ]
      },
      {
        speaker: "B",
        text: "We are not trying to replace empathy. Rather, AI can handle data analysis, giving doctors and teachers more time to connect with people.",
        words: []
      },
      {
        speaker: "A",
        text: "That is the ideal scenario, but in reality, corporations prioritize profit over connection.",
        words: []
      },
      {
        speaker: "B",
        text: "That is a policy problem, not a technology problem. Regulation must catch up with innovation.",
        words: []
      },
      {
        speaker: "A",
        text: "Exactly. And until that regulation is active, we should slow down our deployment.",
        words: []
      },
      {
        speaker: "B",
        text: "Blocking progress will only push innovation to countries with fewer safety standards. We must lead responsibly.",
        words: []
      },
      {
        speaker: "A",
        text: "A fair argument. Let's hope our policy makers understand the stakes.",
        words: []
      }
    ]
  }
];

// Map ThemeContext font-size setting → base rem value
const FONT_SIZE_MAP = { small: 0.95, normal: 1.05, large: 1.2 };

export default function StoryPage() {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { packs, loading: packsLoading, addPack } = usePacks();
  const { fontSize: globalFontSize } = useTheme(); // 'small' | 'normal' | 'large'
  const [activeTab, setActiveTab] = useState('classic'); // 'classic' or 'intensive'

  // Local fine-tuning offset (+/- buttons), resets when global setting changes
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  useEffect(() => { setFontSizeOffset(0); }, [globalFontSize]);
  const computedFontSize = (FONT_SIZE_MAP[globalFontSize] || 1.05) + fontSizeOffset;
  
  const activeStory = storyId 
    ? (CLASSIC_STORIES.find(s => s.id === storyId) || INTENSIVE_STORIES.find(s => s.id === storyId))
    : null;

  useEffect(() => {
    if (activeStory) {
      const isClassic = CLASSIC_STORIES.some(s => s.id === activeStory.id);
      setActiveTab(isClassic ? 'classic' : 'intensive');
    }
  }, [activeStory]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedPackId, setSelectedPackId] = useState('');
  const [showAddToPack, setShowAddToPack] = useState(false);
  const [toast, setToast] = useState(null);
  const popoverRef = useRef(null);

  // Read/unread stories progress tracking
  const [readStories, setReadStories] = useState(() => {
    try {
      const saved = localStorage.getItem('read_stories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Story difficulty level filter
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const markStoryAsRead = (id) => {
    if (!readStories.includes(id)) {
      const updated = [...readStories, id];
      setReadStories(updated);
      localStorage.setItem('read_stories', JSON.stringify(updated));
    }
  };

  // Intensive Dialogue specific state
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const isPlayingRef = useRef(false);
  const chatEndRef = useRef(null);

  // Hook to handle adding words to a dynamic collectionId
  const [activePackIdForHook, setActivePackIdForHook] = useState(null);
  const { addWord } = useWords('packs', activePackIdForHook || 'dummy');

  useEffect(() => {
    if (packs.length > 0 && !selectedPackId) {
      setSelectedPackId(packs[0].id);
    }
  }, [packs, selectedPackId]);

  // Mark intensive stories as read when the last line is reached
  useEffect(() => {
    if (activeStory && activeTab === 'intensive' && currentLineIndex === activeStory.lines.length - 1) {
      markStoryAsRead(activeStory.id);
    }
  }, [currentLineIndex, activeStory, activeTab]);

  // Handle click outside popover to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        setSelectedWord(null);
        setShowAddToPack(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-scroll to bottom of chat bubbles
  useEffect(() => {
    if (activeTab === 'intensive' && activeStory) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentLineIndex, activeStory, activeTab]);

  // Stop synthesis when leaving story
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeStory]);

  // Pre-load voices on mount to ensure availability on mobile
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      return () => window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    }
  }, []);

  const handleWordClick = (wordObj, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const popoverWidth = 262;
    const estimatedPopoverHeight = 210;
    const HEADER_HEIGHT = 60; // story header

    let x = rect.left + rect.width / 2 - popoverWidth / 2;
    x = Math.max(8, Math.min(x, window.innerWidth - popoverWidth - 8));

    // Show above word if enough space, otherwise below
    const spaceAbove = rect.top - HEADER_HEIGHT;
    const showAbove = spaceAbove >= estimatedPopoverHeight + 12;
    const y = showAbove ? rect.top - 8 : rect.bottom + 8;

    setSelectedWord({
      ...wordObj,
      x,
      y,
      showAbove
    });
    setShowAddToPack(false);
    speakWord(wordObj.id);
  };

  const handleAddToPack = async (targetId) => {
    if (!selectedWord) return;

    let targetPackId = targetId;

    if (!targetPackId) {
      // Default to "Hikoyalarim" pack
      const existingStoryPack = packs.find(p => p.name.toLowerCase() === 'hikoyalarim');
      if (existingStoryPack) {
        targetPackId = existingStoryPack.id;
      } else {
        // Create the "Hikoyalarim" pack automatically
        try {
          const newPackId = await addPack({
            name: 'Hikoyalarim',
            description: 'Hikoyalardan olingan so\'zlar',
            color: 'var(--accent-gradient)',
            icon: '✨',
            level: 'beginner'
          });
          targetPackId = newPackId;
          setSelectedPackId(newPackId);
        } catch (err) {
          showToast('To\'plam yaratib bo\'lmadi');
          return;
        }
      }
    }

    if (!targetPackId) {
      showToast('Iltimos, to\'plam tanlang');
      return;
    }

    try {
      setActivePackIdForHook(targetPackId);
      
      // Delay slightly to allow hook reference state change
      setTimeout(async () => {
        await addWord({
          word: selectedWord.id,
          translation: selectedWord.translation,
          definition: selectedWord.definition || '',
          partOfSpeech: selectedWord.pos || 'noun',
          example: `Used in story: "${selectedWord.id}"`
        });
        showToast(`"${selectedWord.id}" to'plamga qo'shildi! 🚀`);
        setSelectedWord(null);
        setShowAddToPack(false);
      }, 50);

    } catch (err) {
      showToast('So\'z qo\'shishda xatolik yuz berdi');
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  // ─── INTENSIVE PLAYER LOGIC ────────────────────────────────────────────────
  const speakLine = (line) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const charInfo = activeStory.characters[line.speaker];
    
    // Build full text line
    let fullText = line.text;
    if (line.words) {
      fullText = line.text + line.words.map(w => w.text).join('');
    }

    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = 'en-US';
    utterance.rate = charInfo.rate || 0.95;

    // Load available voices — robust multi-strategy selection for Android + iOS + Desktop
    const voices = window.speechSynthesis.getVoices();

    const pickVoice = (wantFemale) => {
      if (!voices.length) return null;

      const allEn = voices.filter(v => v.lang.toLowerCase().startsWith('en'));
      if (!allEn.length) return voices[0];

      const nameOf = (v) => v.name.toLowerCase();

      // ── Strategy 1: explicit gender keywords ──────────────────────────
      const femaleKw = ['female', 'samantha', 'siri', 'zira', 'hazel', 'karen',
                        'moira', 'tessa', 'veena', 'kathy', 'victoria', 'susan',
                        'fiona', 'kate', 'serena', 'kyoko', 'mei-jia', 'ting-ting'];
      const maleKw   = ['male', 'david', 'mark', 'george', 'daniel', 'fred',
                        'aaron', 'arthur', 'gordon', 'rishi', 'alex', 'albert',
                        'oliver', 'jarvis', 'tom', 'lee', 'liam', 'thomas',
                        'james', 'john', 'reed', 'noel', 'bruce'];

      const byKw = allEn.find(v =>
        (wantFemale ? femaleKw : maleKw).some(kw => nameOf(v).includes(kw))
      );
      if (byKw) return byKw;

      // ── Strategy 2: Android Google TTS internal codes ─────────────────
      // Female patterns: x-sfg, x-iof, x-aof, x-tpf, x-nfc, x-pfd, ...
      // Male patterns:   x-iom, x-aom, x-tpm, x-nmc, x-pmd, ...
      const androidFemaleRe = /x-(sfg|iof|aof|tpf|nfc|pfd|aud|bfn|iol|tpn)/i;
      const androidMaleRe   = /x-(iom|aom|tpm|nmc|pmd|aua|bmd|nof|edf)/i;

      const byAndroid = allEn.find(v =>
        (wantFemale ? androidFemaleRe : androidMaleRe).test(v.name)
      );
      if (byAndroid) return byAndroid;

      // ── Strategy 3: use a DIFFERENT language variant for opposite gender
      // Android often has "Google UK English Male" or "en-GB" male voice
      if (!wantFemale) {
        const gbMale = voices.find(v =>
          v.lang.toLowerCase().startsWith('en-gb') ||
          v.lang.toLowerCase().startsWith('en-au') ||
          v.lang.toLowerCase().startsWith('en-in')
        );
        if (gbMale) return gbMale;
      }

      // ── Strategy 4: use voice index parity as last resort ─────────────
      // Even index → treat as female, odd index → treat as male
      if (wantFemale) {
        return allEn.find((_, i) => i % 2 === 0) || allEn[0];
      } else {
        const oddVoice = allEn.find((_, i) => i % 2 !== 0);
        if (oddVoice) return oddVoice;
        // Absolute last resort: same voice but with very different pitch
        return allEn[0];
      }
    };

    const wantFemale = charInfo.gender === 'female';
    const selectedVoice = pickVoice(wantFemale);
    if (selectedVoice) utterance.voice = selectedVoice;

    // Apply pitch — if we could NOT find a distinct voice (only 1 en voice),
    // exaggerate the pitch delta so male and female still sound different.
    const singleVoiceOnly = voices.filter(v => v.lang.toLowerCase().startsWith('en')).length <= 1;
    if (singleVoiceOnly) {
      utterance.pitch = wantFemale ? 1.5 : 0.6; // extreme separation
    } else {
      utterance.pitch = charInfo.pitch || 1.0;
    }

    utterance.onend = () => {
      // Delay slightly for natural conversational pausing
      if (isPlayingRef.current) {
        setTimeout(() => {
          handleNextLine();
        }, 800);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handleNextLine = () => {
    setCurrentLineIndex((prev) => {
      const next = prev + 1;
      if (next < activeStory.lines.length) {
        speakLine(activeStory.lines[next]);
        return next;
      } else {
        setIsPlaying(false);
        isPlayingRef.current = false;
        return prev;
      }
    });
  };

  const handlePrevLine = () => {
    setCurrentLineIndex((prev) => {
      const next = Math.max(0, prev - 1);
      speakLine(activeStory.lines[next]);
      return next;
    });
  };

  const togglePlay = () => {
    if (!activeStory) return;

    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } else {
      setIsPlaying(true);
      isPlayingRef.current = true;
      
      const nextIndex = currentLineIndex + 1 >= activeStory.lines.length ? 0 : currentLineIndex + 1;
      setCurrentLineIndex(nextIndex);
      speakLine(activeStory.lines[nextIndex]);
    }
  };

  const handleResetIntensive = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentLineIndex(-1);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className={`story-page-container ${activeStory ? 'story-active-mode' : ''}`}>
      {toast && <div className="story-toast-notification">{toast}</div>}

      <AnimatePresence mode="wait">
        {!activeStory ? (
          /* STORIES LIST VIEW */
          <motion.div
            key="list"
            className="stories-list-wrapper"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {/* Compact header row */}
            <div className="stories-top-row">
              <h1 className="stories-page-title">✨ Hikoyalar</h1>
              <div className="stories-tabs-wrapper">
                <div className="stories-tabs">
                  <button
                    className={`story-tab-btn ${activeTab === 'classic' ? 'active' : ''}`}
                    onClick={() => setActiveTab('classic')}
                  >
                    📖 O'qish
                  </button>
                  <button
                    className={`story-tab-btn ${activeTab === 'intensive' ? 'active' : ''}`}
                    onClick={() => setActiveTab('intensive')}
                  >
                    💬 Suhbat
                  </button>
                </div>
              </div>
            </div>

            {/* Level difficulty filter row — single horizontal scroll line */}
            <div className="stories-filter-row">
              {[
                { key: 'all',          label: 'Barchasi',     dot: null },
                { key: 'Beginner',     label: 'Beginner',     dot: '#10B981' },
                { key: 'Intermediate', label: 'Intermediate', dot: '#6366F1' },
                { key: 'Advanced',     label: 'Advanced',     dot: '#EF4444' },
              ].map(({ key, label, dot }) => (
                <button
                  key={key}
                  className={`story-filter-btn ${selectedDifficulty === key ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(key)}
                >
                  {dot && (
                    <span style={{
                      display: 'inline-block',
                      width: 7, height: 7,
                      borderRadius: '50%',
                      background: dot,
                      marginRight: 5,
                      verticalAlign: 'middle',
                      flexShrink: 0,
                    }} />
                  )}
                  {label}
                </button>
              ))}
            </div>

            {(() => {
              const storiesToDisplay = (activeTab === 'classic' ? CLASSIC_STORIES : INTENSIVE_STORIES)
                .filter(story => selectedDifficulty === 'all' || story.difficulty === selectedDifficulty);

              if (storiesToDisplay.length === 0) {
                return (
                  <div className="stories-empty-state">
                    <div className="empty-state-icon">📭</div>
                    <h3>Ushbu darajadagi hikoyalar topilmadi</h3>
                    <p>Yaqinda yangi va qiziqarli hikoyalar qo'shiladi!</p>
                  </div>
                );
              }

              return (
                <div className="stories-grid">
                  {storiesToDisplay.map((story) => {
                    const isRead = readStories.includes(story.id);
                    return (
                      <div
                        key={story.id}
                        className={`story-card ${isRead ? 'story-card--read' : ''}`}
                        onClick={() => {
                          navigate(`/stories/${story.id}`);
                          setSelectedWord(null);
                          if (activeTab === 'intensive') {
                            setCurrentLineIndex(-1);
                            setIsPlaying(false);
                            isPlayingRef.current = false;
                          }
                        }}
                      >
                        <div className="story-card-icon">{story.icon}</div>
                        <div className="story-card-content">
                          <div className="story-card-meta">
                            <span className="story-difficulty" style={{ backgroundColor: `${story.difficultyColor}15`, color: story.difficultyColor }}>
                              {story.difficulty}
                            </span>
                            <span className="story-readtime">⏱ {story.readTime}</span>
                            {isRead && <span className="story-card-read-badge">✓ O'qilgan</span>}
                          </div>
                          <h3 className="story-card-title">{story.title}</h3>
                          <p className="story-card-desc">{story.description}</p>
                          <button className="story-card-btn">
                            {activeTab === 'classic' ? "O'qishni boshlash →" : "Suhbatni tinglash →"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </motion.div>
        ) : activeStory && 'paragraphs' in activeStory ? (
          /* CLASSIC STORY READING VIEW */
          <motion.div
            key="reading-classic"
            className="story-reading-wrapper classic-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Unified Chat-Style Header */}
            <div className="story-chat-header">
              <button
                className="clean-back-arrow"
                onClick={() => {
                  navigate('/stories');
                  setSelectedWord(null);
                }}
                title="Hikoyalarga qaytish"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>
              <div className="story-header-info">
                <div className="story-header-title">{activeStory.title}</div>
                <div className="story-header-status">
                  📖 {activeStory.difficulty} • {activeStory.readTime}
                </div>
              </div>
              <div className="font-controls">
                <button className="font-control-btn" onClick={() => setFontSizeOffset(prev => Math.max(-0.2, prev - 0.1))} title="Shriftni kichraytirish">—</button>
                <button className="font-control-btn" onClick={() => setFontSizeOffset(prev => Math.min(0.3, prev + 0.1))} title="Shriftni kattalashtirish">+</button>
              </div>
            </div>

            <div className="story-text-container" style={{ fontSize: `${computedFontSize.toFixed(2)}rem` }}>
              {activeStory.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="story-paragraph">
                  {p.map((segment, sIdx) => {
                    if (segment.highlight) {
                      const isActive = selectedWord && selectedWord.id === segment.id;
                      return (
                        <span key={sIdx} className="story-word-span-wrapper">
                          <button
                            className={`story-highlight-word ${selectedWord?.id === segment.id ? 'active' : ''}`}
                            onClick={(e) => handleWordClick(segment, e)}
                          >
                            {segment.text}
                          </button>
                        </span>
                      );
                    }
                    return <span key={sIdx}>{segment.text}</span>;
                  })}
                </p>
              ))}
            </div>

            <div className="story-classic-footer">
              <span className="story-classic-progress">Matnni to'liq o'qib chiqing</span>
              <button className="btn btn-primary compact" onClick={() => { markStoryAsRead(activeStory.id); navigate('/stories'); setSelectedWord(null); }}>Tugatish</button>
            </div>
          </motion.div>
        ) : (
          /* INTENSIVE DIALOGUE SCREEN */
          <motion.div
            key="reading-intensive"
            className="story-reading-wrapper intensive-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Unified Chat Header */}
            <div className="story-chat-header">
              <button
                className="clean-back-arrow"
                onClick={() => {
                  navigate('/stories');
                  setSelectedWord(null);
                  handleResetIntensive();
                }}
                title="Hikoyalarga qaytish"
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
              </button>

              {activeStory.characters && (
                <div className="story-header-avatar-collage">
                  {Object.values(activeStory.characters).map((c, i) => (
                    <div key={i} className={`collage-avatar avatar-${i}`}>{c.avatar}</div>
                  ))}
                </div>
              )}

              <div className="story-header-info">
                <div className="story-header-title">{activeStory.title}</div>
                <div className="story-header-status">
                  {isPlaying ? (
                    <span className="chat-online-pulse">Suhbat ijro etilmoqda...</span>
                  ) : (
                    "Suhbat muloqoti"
                  )}
                </div>
              </div>

              <button className="btn-reset-intensive" onClick={handleResetIntensive} title="Suhbatni boshidan boshlash">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </button>
            </div>

            {/* Chat bubble screen area */}
            <div className="story-chat-container">
              {activeStory.lines.map((line, idx) => {
                const isSpeakerA = line.speaker === 'A';
                const charInfo = activeStory.characters[line.speaker];
                const isVisible = idx <= currentLineIndex;
                const isCurrentlySpeaking = idx === currentLineIndex && isPlaying;

                if (!isVisible) return null;

                return (
                  <motion.div
                    key={idx}
                    className={`chat-bubble-row ${isSpeakerA ? 'speaker-a' : 'speaker-b'} ${isCurrentlySpeaking ? 'speaking' : ''}`}
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="chat-avatar">{charInfo.avatar}</div>
                    <div className="chat-bubble-content">
                      <div className="chat-sender-name">{charInfo.name}</div>
                      <div className="chat-bubble">
                        <span>{line.text}</span>
                        {line.words && line.words.map((segment, sIdx) => {
                          if (segment.highlight) {
                            const isActive = selectedWord && selectedWord.id === segment.id;
                            return (
                              <span key={sIdx} className="story-word-span-wrapper">
                                <button
                                  className={`story-highlight-word ${selectedWord?.id === segment.id ? 'active' : ''}`}
                                  onClick={(e) => handleWordClick(segment, e)}
                                >
                                  {segment.text}
                                </button>
                              </span>
                            );
                          }
                          return <span key={sIdx}>{segment.text}</span>;
                        })}

                        {isCurrentlySpeaking && (
                          <div className="speaking-wave">
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              {currentLineIndex === -1 && (
                <div className="chat-intro-placeholder">
                  <p>Suhbatni eshitish uchun pastdagi tugmani bosing. Qahramonlar ovozli ohang bilan muloqot qiladilar.</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Integrated Chat-Style Input/Player Bar */}
            <div className="story-chat-input-bar">
              <button 
                className="chat-control-btn prev-btn" 
                onClick={handlePrevLine} 
                disabled={currentLineIndex <= 0}
                title="Oldingi gap"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                </svg>
              </button>
              
              <div className="chat-input-mock">
                <div className="chat-input-status-dot-wrapper">
                  <span className={`chat-input-status-dot ${isPlaying ? 'playing' : ''}`}></span>
                </div>
                <div className="chat-input-text">
                  {currentLineIndex === -1 ? (
                    <span className="chat-input-placeholder">Muloqotni boshlash...</span>
                  ) : (
                    <span className="chat-input-val">
                      {activeStory.lines[currentLineIndex].text}
                      {activeStory.lines[currentLineIndex].words?.map(w => w.text).join('')}
                    </span>
                  )}
                </div>
                <button 
                  className={`chat-input-send-btn ${isPlaying ? 'playing' : ''}`}
                  onClick={togglePlay}
                  title={isPlaying ? "Pauza" : "Ijro etish"}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
              </div>

              <button 
                className="chat-control-btn next-btn" 
                onClick={handleNextLine} 
                disabled={currentLineIndex >= activeStory.lines.length - 1}
                title="Keyingi gap"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M16 6h2v12h-2zm-10.5 12l8.5-6-8.5-6z"/>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global fixed popover — rendered outside scroll containers to prevent clipping */}
      {selectedWord && (
        <div
          style={{
            position: 'fixed',
            left: selectedWord.x,
            top: selectedWord.y,
            transform: selectedWord.showAbove ? 'translateY(-100%)' : 'translateY(0)',
            zIndex: 99999,
            pointerEvents: 'none',
          }}
        >
          <div
            className={`story-word-popover ${selectedWord.showAbove ? 'story-word-popover--above' : 'story-word-popover--below'}`}
            ref={popoverRef}
            style={{ pointerEvents: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="popover-header-row">
              <span className="popover-word">{selectedWord.id}</span>
              <span className="popover-pos">[{selectedWord.pos}]</span>
              <button className="popover-speak-btn" onClick={(e) => { e.stopPropagation(); speakWord(selectedWord.id); }} title="Talaffuz">🔊</button>
            </div>
            <div className="popover-translation"><strong>Tarjimasi:</strong> {selectedWord.translation}</div>
            {selectedWord.definition && <div className="popover-definition"><em>{selectedWord.definition}</em></div>}
            <div className="popover-actions">
              {!showAddToPack ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button className="popover-add-btn" onClick={(e) => { e.stopPropagation(); handleAddToPack(); }}>➕ "Hikoyalarim"ga qo'shish</button>
                  <button className="popover-secondary-btn" onClick={(e) => { e.stopPropagation(); setShowAddToPack(true); }}>Boshqa to'plamni tanlash</button>
                </div>
              ) : (
                <div className="popover-pack-selector-row" onClick={e => e.stopPropagation()}>
                  <select className="popover-select" value={selectedPackId} onChange={(e) => setSelectedPackId(e.target.value)}>
                    {packs.map(pack => <option key={pack.id} value={pack.id}>{pack.icon} {pack.name}</option>)}
                  </select>
                  <button className="popover-confirm-btn" onClick={() => handleAddToPack(selectedPackId)}>Qo'shish</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
