import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, update, remove } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export const PRESET_GENRES = [
  'Action', 'Adventure', 'Anime', 'Animation', 'Comedy', 'Crime',
  'Cyberpunk', 'Documentary', 'Drama', 'Family', 'Fantasy', 'Historical',
  'Horror', 'Isekai', 'Martial Arts', 'Music', 'Mystery', 'Psychological',
  'Romance', 'Sci-Fi', 'Shonen', 'Slice of Life', 'Sports', 'Supernatural',
  'Superhero', 'Thriller', 'War', 'Western'
];

export const ONE_PIECE_ARCS = [
  { id: 'romance-dawn', name: 'Romance Dawn Arc', start: 1, end: 3 },
  { id: 'orange-town', name: 'Orange Town Arc', start: 4, end: 8 },
  { id: 'syrup-village', name: 'Syrup Village Arc', start: 9, end: 18 },
  { id: 'baratie', name: 'Baratie Arc', start: 19, end: 30 },
  { id: 'arlong-park', name: 'Arlong Park Arc', start: 31, end: 44 },
  { id: 'loguetown', name: 'Loguetown Arc', start: 45, end: 53 },
  { id: 'warship-island', name: 'Warship Island Arc (Filler)', start: 54, end: 61 },
  { id: 'reverse-mountain', name: 'Reverse Mountain Arc', start: 62, end: 63 },
  { id: 'whiskey-peak', name: 'Whiskey Peak Arc', start: 64, end: 67 },
  { id: 'coby-meppo-little-garden', name: 'Little Garden Arc', start: 68, end: 77 },
  { id: 'drum-island', name: 'Drum Island Arc', start: 78, end: 91 },
  { id: 'alabasta', name: 'Alabasta Arc', start: 92, end: 135 },
  { id: 'jaya-skypiea', name: 'Jaya & Skypiea Arc', start: 136, end: 206 },
  { id: 'water-7-enies-lobby', name: 'Water 7 & Enies Lobby Arc', start: 207, end: 325 },
  { id: 'thriller-bark', name: 'Thriller Bark Arc', start: 326, end: 384 },
  { id: 'summit-war', name: 'Summit War / Marineford Arc', start: 385, end: 516 },
  { id: 'fish-man-island', name: 'Fish-Man Island Arc', start: 517, end: 574 },
  { id: 'dressrosa', name: 'Dressrosa Arc', start: 575, end: 746 },
  { id: 'whole-cake-island', name: 'Whole Cake Island Arc', start: 747, end: 889 },
  { id: 'wano-country', name: 'Wano Country Arc', start: 890, end: 1085 },
  { id: 'egghead', name: 'Egghead Arc', start: 1086, end: 1122 }
];

const OFFICIAL_ONE_PIECE_EPISODES_1_TO_100 = [
  { epNum: 1, title: "I'm Luffy! The Man Who's Gonna Be King of the Pirates!", duration: '24 min', watched: true },
  { epNum: 2, title: "Enter the Great Swordsman! Pirate Hunter Roronoa Zoro", duration: '24 min', watched: true },
  { epNum: 3, title: "Morgan versus Luffy! Who's the Mysterious Pretty Girl?", duration: '24 min', watched: true },
  { epNum: 4, title: "Luffy's Past! Enter Red-Haired Shanks", duration: '24 min', watched: true },
  { epNum: 5, title: "A Fearful Mysterious Power! Captain Buggy, the Clown Pirate!", duration: '24 min', watched: true },
  { epNum: 6, title: "Desperate Situation! Beast Tamer Mohji vs. Luffy!", duration: '24 min', watched: true },
  { epNum: 7, title: "Epic Showdown! Swordsman Zoro vs. Acrobat Cabaji!", duration: '24 min', watched: true },
  { epNum: 8, title: "Who Is the Winner? Devil Fruit Power Showdown!", duration: '24 min', watched: true },
  { epNum: 9, title: "Honorable Liar? Captain Usopp", duration: '24 min', watched: true },
  { epNum: 10, title: "The Weirdest Guy Ever! Jango the Hypnotist", duration: '24 min', watched: true },
  { epNum: 11, title: "Uncover the Plot! Pirate Steward Captain Kuro", duration: '24 min', watched: true },
  { epNum: 12, title: "Clash with the Black Cat Pirates! Great Battle on the Slope!", duration: '24 min', watched: true },
  { epNum: 13, title: "The Terrifying Duo! Meowban Brothers vs. Zoro", duration: '24 min', watched: true },
  { epNum: 14, title: "Luffy Back in Action! Miss Kaya's Desperate Resistance", duration: '24 min', watched: true },
  { epNum: 15, title: "Defeat Kuro! Pirate Usopp's Tearful Determination!", duration: '24 min', watched: true },
  { epNum: 16, title: "Protect Kaya! The Usopp Pirates' Great Endeavor!", duration: '24 min', watched: true },
  { epNum: 17, title: "Anger Explosion! Kuro vs. Luffy! How It Ends!", duration: '24 min', watched: true },
  { epNum: 18, title: "You're the Weird Creature! Gaimon and His Strange Friends", duration: '24 min', watched: true },
  { epNum: 19, title: "The Three-Sword Style's Past! Zoro and Kuina's Vow!", duration: '24 min', watched: true },
  { epNum: 20, title: "Famous Cook! Sanji and the Floating Restaurant", duration: '24 min', watched: true },
  { epNum: 21, title: "An Unwelcome Guest! Sanji's Food and Gin's Debt", duration: '24 min', watched: true },
  { epNum: 22, title: "The Strongest Pirate Fleet! Commodore Don Krieg", duration: '24 min', watched: true },
  { epNum: 23, title: "Protect Baratie! The Great Pirate, Red Foot Zeff", duration: '24 min', watched: true },
  { epNum: 24, title: "Hawk-Eye Mihawk! Swordsman Zoro Falls at Sea!", duration: '24 min', watched: true },
  { epNum: 25, title: "Super Kicking Combination! Sanji vs. Iron Wall Pearl", duration: '24 min', watched: true },
  { epNum: 26, title: "Zeff and Sanji's Dream! The Illusory All Blue", duration: '24 min', watched: true },
  { epNum: 27, title: "Cool-Headed, Cold-Blooded Demon Commander Gin", duration: '24 min', watched: true },
  { epNum: 28, title: "I Won't Die! Fierce Battle: Luffy vs. Krieg!", duration: '24 min', watched: true },
  { epNum: 29, title: "Outcome of a Deadly Battle! The Spear in the Heart!", duration: '24 min', watched: true },
  { epNum: 30, title: "Set Sail! The Seafaring Cook and Luffy Travel Together!", duration: '24 min', watched: true },
  { epNum: 31, title: "The Most Wicked Man of the Eastern Seas! Arlong!", duration: '24 min', watched: true },
  { epNum: 32, title: "Witch of Cocoyashi Village! Arlong's Female Officer", duration: '24 min', watched: true },
  { epNum: 33, title: "Usopp Dead?! Luffy Have Yet to Land?", duration: '24 min', watched: true },
  { epNum: 34, title: "Reunited! Usopp Tells Nami's Tough Truth", duration: '24 min', watched: true },
  { epNum: 35, title: "The Hidden Past! Female Fighter Belle-Mère!", duration: '24 min', watched: true },
  { epNum: 36, title: "Survive! Mother Belle-Mère and Nami's Bond!", duration: '24 min', watched: true },
  { epNum: 37, title: "Luffy Stands Up! End of a Broken Promise!", duration: '24 min', watched: true },
  { epNum: 38, title: "Luffy in Big Trouble! Fish-Men vs. Luffy Pirates!", duration: '24 min', watched: true },
  { epNum: 39, title: "Luffy Submerged! Zoro vs. Octopus Hatchan!", duration: '24 min', watched: true },
  { epNum: 40, title: "Proud Warriors! Sanji and Usopp's Fierce Battles!", duration: '24 min', watched: true },
  { epNum: 41, title: "Luffy at Full Power! Nami's Determination and Straw Hat", duration: '24 min', watched: true },
  { epNum: 42, title: "Explosion! Fish-Man Arlong's Fierce Attack!", duration: '24 min', watched: true },
  { epNum: 43, title: "End of Fish-Man Empire! Nami Is My Friend!", duration: '24 min', watched: true },
  { epNum: 44, title: "Setting Off with a Smile! Farewell, Cocoyashi Village!", duration: '24 min', watched: true },
  { epNum: 45, title: "Bounty! Straw Hat Luffy Becomes Known to the World!", duration: '24 min', watched: true },
  { epNum: 46, title: "Chase Straw Hat! Little Buggy's Big Adventure!", duration: '24 min', watched: true },
  { epNum: 47, title: "The Wait Is Over! The Return of Captain Buggy!", duration: '24 min', watched: true },
  { epNum: 48, title: "Town of Beginning and End! Arrival at Loguetown", duration: '24 min', watched: true },
  { epNum: 49, title: "Kitetsu III and Yubashiri! Zoro's New Swords", duration: '24 min', watched: true },
  { epNum: 50, title: "Usopp vs. Daddy the Father! Showdown at High Noon!", duration: '24 min', watched: true },
  { epNum: 51, title: "Royal Chef Carmen! Battle in the Culinary Arena!", duration: '24 min', watched: false },
  { epNum: 52, title: "Buggy's Revenge! The Man Who Smiles at the Execution Platform!", duration: '24 min', watched: false },
  { epNum: 53, title: "The Legend Has Started! Head for the Grand Line!", duration: '24 min', watched: false },
  { epNum: 54, title: "Premonition of a New Adventure! Apis, the Mysterious Girl", duration: '24 min', watched: false },
  { epNum: 55, title: "Miraculous Creature! Apis' Secret and the Legendary Island", duration: '24 min', watched: false },
  { epNum: 56, title: "Erik's Raid! Great Escape from Warship Island!", duration: '24 min', watched: false },
  { epNum: 57, title: "Lone Island in a Distant Sea! The Legendary Lost Island", duration: '24 min', watched: false },
  { epNum: 58, title: "Showdown in the Ruins! Tense Zoro vs. Erik!", duration: '24 min', watched: false },
  { epNum: 59, title: "Luffy, Completely Surrounded! Commodore Nelson's Secret Strategy", duration: '24 min', watched: false },
  { epNum: 60, title: "Through the Sky They Fly! The 1,000-Year Legend Lives Again!", duration: '24 min', watched: false },
  { epNum: 61, title: "An Angry Showdown! Cross the Red Line!", duration: '24 min', watched: false },
  { epNum: 62, title: "The First Obstacle? Giant Whale Laboon Appears!", duration: '24 min', watched: false },
  { epNum: 63, title: "A Pirate's Promise! Luffy and Laboon's Vow to Meet Again", duration: '24 min', watched: false },
  { epNum: 64, title: "A Town That Welcomes Pirates? Landing at Whiskey Peak", duration: '24 min', watched: false },
  { epNum: 65, title: "Explosion! 100 Bounty Hunters vs. Zoro!", duration: '24 min', watched: false },
  { epNum: 66, title: "A Serious Battle! Luffy vs. Zoro Unexpected Duel!", duration: '24 min', watched: false },
  { epNum: 67, title: "Deliver Princess Vivi! Luffy Pirates Depart!", duration: '24 min', watched: false },
  { epNum: 68, title: "Try Hard, Coby! Coby-Meppo's Marine Diary", duration: '24 min', watched: false },
  { epNum: 69, title: "Coby-Meppo's Resolve! Vice Admiral Garp's Parental Affection", duration: '24 min', watched: false },
  { epNum: 70, title: "Prehistoric Island! The Shadow Lurking in Little Garden!", duration: '24 min', watched: false },
  { epNum: 71, title: "Huge Duel! Giants Dorry and Brogy!", duration: '24 min', watched: false },
  { epNum: 72, title: "Luffy's Anger! A Dirty Trick in a Sacred Duel!", duration: '24 min', watched: false },
  { epNum: 73, title: "Brogy's Bitter Tears! Outcome of the Century!", duration: '24 min', watched: false },
  { epNum: 74, title: "The Devilish Candle! Tears of Regret and Tears of Anger", duration: '24 min', watched: false },
  { epNum: 75, title: "A Trap Attacks Luffy! Colors Trap", duration: '24 min', watched: false },
  { epNum: 76, title: "Critical Counterattack! Usopp's Quick Wit and Kaabin!", duration: '24 min', watched: false },
  { epNum: 77, title: "Farewell to the Giants' Island! Head for Alabasta!", duration: '24 min', watched: false },
  { epNum: 78, title: "Nami Sick? Beyond the Snow That Falls on the Ocean!", duration: '24 min', watched: false },
  { epNum: 79, title: "A Surprise Attack! The Bliking and Wapol the Blik", duration: '24 min', watched: false },
  { epNum: 80, title: "An Island Without Doctors? Adventure in a Nameless Country!", duration: '24 min', watched: false },
  { epNum: 81, title: "Are You Happy? The Doctor Called a Witch!", duration: '24 min', watched: false },
  { epNum: 82, title: "Dalton's Resolve! Wapol's Forces Land", duration: '24 min', watched: false },
  { epNum: 83, title: "The Island Where Snow Lives! Ascent of the Drum Rockies!", duration: '24 min', watched: false },
  { epNum: 84, title: "Reindeer with a Blue Nose! Chopper's Secret", duration: '24 min', watched: false },
  { epNum: 85, title: "An Outcast's Dream! The Quack Doctor Hiriluk", duration: '24 min', watched: false },
  { epNum: 86, title: "Hiriluk's Cherry Blossoms and the Will That Gets Carried On!", duration: '24 min', watched: false },
  { epNum: 87, title: "Fight Wapol's Army! The Capabilities of the Munch-Munch Fruit!", duration: '24 min', watched: false },
  { epNum: 88, title: "Zoan-Type Devil Fruit! Chopper's Seven-Point Transformation", duration: '24 min', watched: false },
  { epNum: 89, title: "Kingdom's Command Ends! The Banner of Faith Flies Forever", duration: '24 min', watched: false },
  { epNum: 90, title: "Hiriluk's Cherry Blossoms! Miracle of the Drum Rockies", duration: '24 min', watched: false },
  { epNum: 91, title: "Goodbye, Drum Island! I'm Going to Sea!", duration: '24 min', watched: false },
  { epNum: 92, title: "Hero of Alabasta and a Ballerina on the Ship", duration: '24 min', watched: false },
  { epNum: 93, title: "Off to the Desert Kingdom! The Rain-Making Powder and the Rebel Army", duration: '24 min', watched: false },
  { epNum: 94, title: "Reunion of the Powerful! His Name Is Fire-Fist Ace", duration: '24 min', watched: false },
  { epNum: 95, title: "Ace and Luffy! Hot Emotions and Brotherly Bonds", duration: '24 min', watched: false },
  { epNum: 96, title: "Green City Erumalu and the Kung Fu Dugongs!", duration: '24 min', watched: false },
  { epNum: 97, title: "Adventure in the Country of Sand! The Monsters Living in the Scorching Earth", duration: '24 min', watched: false },
  { epNum: 98, title: "Here Come the Sand Pirates! Men Who Live Free", duration: '24 min', watched: false },
  { epNum: 99, title: "Spirit of the Fakes! Heart of the Rebel Army, Kaza!", duration: '24 min', watched: false },
  { epNum: 100, title: "Rebel Warrior Kohza! The Oath Sworn to Vivi!", duration: '24 min', watched: false },
];

const createOnePieceEpisodes = () => {
  const eps = [];
  OFFICIAL_ONE_PIECE_EPISODES_1_TO_100.forEach((ep) => {
    eps.push({
      id: `ep_${ep.epNum}`,
      epNum: ep.epNum,
      title: `${ep.epNum}-qism: ${ep.title}`,
      duration: ep.duration,
      watched: ep.watched,
      watchedDate: ep.watched ? '2026-09-10' : ''
    });
  });

  const remainingSagas = [
    { name: 'Alabasta Arc', start: 101, end: 135, watched: false },
    { name: 'Skypiea', start: 136, end: 206, watched: false },
    { name: 'Water 7', start: 207, end: 325, watched: false },
    { name: 'Thriller Bark', start: 326, end: 384, watched: false },
    { name: 'Marineford', start: 385, end: 516, watched: false },
    { name: 'Fish-Man Island', start: 517, end: 574, watched: false },
    { name: 'Dressrosa', start: 575, end: 746, watched: false },
    { name: 'Whole Cake Island', start: 747, end: 889, watched: false },
    { name: 'Wano Country', start: 890, end: 1085, watched: false },
    { name: 'Egghead', start: 1086, end: 1122, watched: false },
  ];

  remainingSagas.forEach(s => {
    for (let i = s.start; i <= s.end; i++) {
      eps.push({
        id: `ep_${i}`,
        epNum: i,
        title: `${i}-qism (${s.name})`,
        duration: '24 min',
        watched: s.watched,
      });
    }
  });

  return eps.sort((a, b) => (Number(b.epNum) || 0) - (Number(a.epNum) || 0));
};

export function processOnePieceItems(itemsArray) {
  if (!itemsArray) return itemsArray;
  return itemsArray.map(item => {
    if (item.id === 'one-piece-anime' || item.title.toLowerCase().includes('one piece')) {
      const existingEps = item.episodes || [];
      const epMap = new Map();
      existingEps.forEach(e => epMap.set(Number(e.epNum), e));

      OFFICIAL_ONE_PIECE_EPISODES_1_TO_100.forEach(off => {
        const epNum = off.epNum;
        const fullTitle = `${epNum}-qism: ${off.title}`;
        const existing = epMap.get(epNum);
        if (!existing) {
          epMap.set(epNum, {
            id: `ep_${epNum}`,
            epNum,
            title: fullTitle,
            duration: off.duration,
            watched: off.watched,
            watchedDate: off.watched ? '2026-09-10' : ''
          });
        } else {
          const isGenericTitle = !existing.title || existing.title.includes('(') || existing.title === `${epNum}-qism`;
          const forceUnwatched = epNum > 50 && (!existing.watchedDate || existing.watchedDate === '2026-09-10');
          epMap.set(epNum, {
            ...existing,
            title: isGenericTitle ? fullTitle : existing.title,
            watched: forceUnwatched ? false : existing.watched,
            watchedDate: forceUnwatched ? '' : existing.watchedDate
          });
        }
      });

      const updatedEps = Array.from(epMap.values()).sort((a, b) => (Number(b.epNum) || 0) - (Number(a.epNum) || 0));
      return { ...item, episodes: updatedEps };
    }
    return item;
  });
}

export const DEFAULT_MEDIA_ITEMS = [
  {
    id: 'one-piece-anime',
    title: 'One Piece',
    format: 'multi', // 'single' | 'multi'
    type: 'anime', // 'movie' | 'series' | 'anime' | 'cartoon'
    status: 'watching', // 'watching' | 'completed' | 'plan_to_watch'
    releaseYear: 1999,
    genres: ['Action', 'Adventure', 'Fantasy', 'Comedy'],
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    link: 'https://onepiece-online.net',
    duration: '',
    description: "Gol D. Roger ashaddiy qaroqchi bo'lib, o'limidan oldin o'zining barcha xazinasi - One Piece haqida gapiradi. Monkey D. Luffy va uning jamoasi Buyuk Chiziq bo'ylab sayohatga otlanadilar.",
    rating: 9.6,
    watchCount: 1,
    episodes: createOnePieceEpisodes(),
  },
  {
    id: 'inception-movie',
    title: 'Inception',
    format: 'single',
    type: 'movie',
    status: 'completed',
    releaseYear: 2010,
    genres: ['Sci-Fi', 'Action', 'Thriller'],
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    link: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
    duration: '148 min',
    description: "Tushlar ichida tush ko'rish va inson shuurostiga g'oya joylash haqidagi ilmiy-fantastik film.",
    rating: 9.2,
    watchCount: 2,
    episodes: [],
  },
  {
    id: 'arcane-series',
    title: 'Arcane: League of Legends',
    format: 'multi',
    type: 'series',
    status: 'watching',
    releaseYear: 2021,
    genres: ['Anime', 'Action', 'Sci-Fi', 'Drama'],
    posterUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80',
    link: 'https://www.netflix.com',
    duration: '',
    description: "Piltover va Zaun shaharlari o'rtasidagi ziddiyat hamda opa-singil Vi va Jinx fojiaviy taqdiri.",
    rating: 9.4,
    watchCount: 1,
    episodes: Array.from({ length: 18 }, (_, i) => ({
      id: `ep_${i + 1}`,
      epNum: i + 1,
      title: `${i + 1}-qism`,
      duration: '40 min',
      watched: i < 9
    })),
  },
  {
    id: 'spider-verse-cartoon',
    title: 'Spider-Man: Across the Spider-Verse',
    format: 'single',
    type: 'cartoon',
    status: 'completed',
    releaseYear: 2023,
    genres: ['Anime', 'Action', 'Adventure'],
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    link: 'https://www.sonypictures.com',
    duration: '140 min',
    description: "Miles Morales multikoinot bo'ylab sayohatga otlanadi va boshqa O'rgimchak-odamlar bilan to'qnash keladi.",
    rating: 9.5,
    watchCount: 3,
    episodes: [],
  }
];

// Minute Helper Functions
export function parseMinutes(val) {
  if (!val && val !== 0) return 0;
  if (typeof val === 'number') return Math.max(0, Math.floor(val));
  const str = String(val).trim().toLowerCase();
  if (!str) return 0;

  if (/^\d+$/.test(str)) return parseInt(str, 10);

  let hours = 0;
  let mins = 0;
  const hMatch = str.match(/(\d+)\s*(?:h|soat|st)/i);
  const mMatch = str.match(/(\d+)\s*(?:m|min|daqiqa)/i);

  if (hMatch) hours = parseInt(hMatch[1], 10);
  if (mMatch) mins = parseInt(mMatch[1], 10);

  if (hMatch || mMatch) {
    return hours * 60 + mins;
  }

  const numOnly = parseInt(str, 10);
  return isNaN(numOnly) ? 0 : Math.max(0, numOnly);
}

export function formatMinutesToHours(totalMinutes, lang = 'uz') {
  if (!totalMinutes || totalMinutes <= 0) return '0 min';
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  
  const hrLabel = lang === 'en' ? 'hr' : lang === 'ru' ? 'ч' : 'soat';
  const minLabel = 'min';

  if (hours === 0) return `${mins} ${minLabel}`;
  if (mins === 0) return `${hours} ${hrLabel}`;
  return `${hours} ${hrLabel} ${mins} ${minLabel}`;
}

// Compute auto episode & minute stats
export function computeMediaStats(item) {
  if (item.format === 'single') {
    const singleMin = parseMinutes(item.duration);
    const isCompleted = item.status === 'completed';
    const isWatching = item.status === 'watching';
    const rawWatchCount = typeof item.watchCount === 'number' ? item.watchCount : 0;
    
    // Plan to watch items should have 0 watched minutes
    const effectiveWatchCount = (isCompleted || isWatching) ? Math.max(1, rawWatchCount) : 0;
    const watchedMinutes = singleMin * effectiveWatchCount;
    const totalMinutes = singleMin * Math.max(1, rawWatchCount);
    const watchedEpisodes = effectiveWatchCount > 0 ? 1 : 0;

    return {
      totalEpisodes: 1,
      watchedEpisodes,
      totalMinutes,
      watchedMinutes,
      singleMin
    };
  }

  const eps = item.episodes || [];
  const totalEpisodes = eps.length;
  const watchedEpisodes = eps.filter(e => e.watched).length;

  let totalMinutes = 0;
  let watchedMinutes = 0;

  eps.forEach(ep => {
    const epMin = parseMinutes(ep.duration) || 24;
    totalMinutes += epMin;
    if (ep.watched) {
      watchedMinutes += epMin;
    }
  });

  return { totalEpisodes, watchedEpisodes, totalMinutes, watchedMinutes };
}

export function computeGlobalMediaStats(mediaItems, lang = 'uz') {
  let totalWatchedMinutes = 0;
  let totalWatchedEpisodes = 0;

  (mediaItems || []).forEach(item => {
    const stats = computeMediaStats(item);
    totalWatchedMinutes += stats.watchedMinutes;
    totalWatchedEpisodes += stats.watchedEpisodes;
  });

  return {
    totalWatchedMinutes,
    totalWatchedEpisodes,
    formattedWatchedTime: formatMinutesToHours(totalWatchedMinutes, lang)
  };
}

export function useMediaTracker() {
  const { user } = useAuth();
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const localData = localStorage.getItem('voc_media_tracker_v3');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          setMediaItems(processOnePieceItems(parsed));
        } catch {
          setMediaItems(processOnePieceItems(DEFAULT_MEDIA_ITEMS));
        }
      } else {
        setMediaItems(processOnePieceItems(DEFAULT_MEDIA_ITEMS));
      }
      setLoading(false);
      return;
    }

    const mediaRef = ref(db, `users/${user.uid}/mediaTracker`);
    const unsubscribe = onValue(mediaRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const itemsArray = Object.keys(val).map((key) => ({
          id: key,
          ...val[key],
        }));
        setMediaItems(processOnePieceItems(itemsArray));
      } else {
        const processedDefault = processOnePieceItems(DEFAULT_MEDIA_ITEMS);
        const seedPayload = {};
        processedDefault.forEach((item) => {
          seedPayload[item.id] = {
            ...item,
            createdAt: new Date().toISOString(),
          };
        });
        set(mediaRef, seedPayload);
        setMediaItems(processedDefault);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase mediaTracker error:", error);
      setMediaItems(processOnePieceItems(DEFAULT_MEDIA_ITEMS));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveLocal = (items) => {
    try {
      localStorage.setItem('voc_media_tracker_v3', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  // Add Item
  const addMediaItem = useCallback(async (itemData) => {
    const newItemId = itemData.id || `media_${Date.now()}`;
    const format = itemData.format || (itemData.type === 'movie' ? 'single' : 'multi');
    const initialWatchCount = typeof itemData.watchCount === 'number' 
      ? itemData.watchCount 
      : (itemData.status === 'completed' ? 1 : (itemData.status === 'watching' ? 1 : 0));
    
    const payload = {
      id: newItemId,
      title: itemData.title || 'Untitled',
      format: format, // 'single' | 'multi'
      type: itemData.type || 'movie',
      status: itemData.status || 'plan_to_watch',
      releaseYear: parseInt(itemData.releaseYear, 10) || new Date().getFullYear(),
      genres: itemData.genres || [],
      posterUrl: itemData.posterUrl || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
      link: itemData.link || '',
      duration: format === 'single' ? (itemData.duration || '') : '', // duration ONLY for single
      description: itemData.description || '',
      rating: parseFloat(itemData.rating) || 8.0,
      watchCount: initialWatchCount,
      episodes: format === 'multi' ? (itemData.episodes || []) : [],
      updatedAt: new Date().toISOString(),
    };

    setMediaItems(prev => {
      const updated = [payload, ...prev.filter(i => i.id !== newItemId)];
      saveLocal(updated);
      return updated;
    });

    if (user) {
      await set(ref(db, `users/${user.uid}/mediaTracker/${newItemId}`), payload);
    }
  }, [user]);

  // Update Item
  const updateMediaItem = useCallback(async (itemId, updates) => {
    setMediaItems(prev => {
      const updated = prev.map(item => item.id === itemId ? { ...item, ...updates } : item);
      saveLocal(updated);
      return updated;
    });

    if (user) {
      await update(ref(db, `users/${user.uid}/mediaTracker/${itemId}`), {
        ...updates,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [user]);

  // Increment Watch Count (+1 or custom delta)
  const incrementWatchCount = useCallback(async (itemId, delta = 1) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item) return;

    const currentCount = item.watchCount || 0;
    const newCount = Math.max(0, currentCount + delta);
    
    // Auto-update status if watch count increases and item was plan_to_watch
    let newStatus = item.status;
    if (delta > 0 && item.status === 'plan_to_watch') {
      newStatus = 'watching';
    }

    await updateMediaItem(itemId, {
      watchCount: newCount,
      status: newStatus
    });
  }, [mediaItems, updateMediaItem]);

  // Change Watch Status
  const setWatchStatus = useCallback(async (itemId, status) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item) return;

    let updatedEps = item.episodes || [];
    if (status === 'completed' && item.format === 'multi' && updatedEps.length > 0) {
      updatedEps = updatedEps.map(e => ({ ...e, watched: true }));
    }

    let newWatchCount = item.watchCount || 0;
    if (status === 'completed' && newWatchCount === 0) {
      newWatchCount = 1;
    }

    await updateMediaItem(itemId, { status, episodes: updatedEps, watchCount: newWatchCount });
  }, [mediaItems, updateMediaItem]);

  // Toggle Single Episode Watched
  const toggleEpisodeWatched = useCallback(async (itemId, episodeId) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item || !item.episodes) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newEpisodes = item.episodes.map(ep => {
      if (ep.id === episodeId) {
        const nextWatched = !ep.watched;
        return {
          ...ep,
          watched: nextWatched,
          watchedDate: nextWatched ? (ep.watchedDate || todayStr) : (ep.watchedDate || '')
        };
      }
      return ep;
    });

    const watchedCount = newEpisodes.filter(e => e.watched).length;

    let newStatus = item.status;
    let newWatchCount = item.watchCount || 0;

    if (watchedCount === newEpisodes.length && newEpisodes.length > 0) {
      newStatus = 'completed';
      if (newWatchCount === 0) newWatchCount = 1;
    } else if (watchedCount > 0 && item.status === 'plan_to_watch') {
      newStatus = 'watching';
      if (newWatchCount === 0) newWatchCount = 1;
    }

    await updateMediaItem(itemId, {
      episodes: newEpisodes,
      status: newStatus,
      watchCount: newWatchCount
    });
  }, [mediaItems, updateMediaItem]);

  // Add Episode to Item
  const addEpisodeToItem = useCallback(async (itemId, epData) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item) return;

    const currentEps = item.episodes || [];
    const isObject = typeof epData === 'object' && epData !== null;
    let epNum = isObject && epData.epNum ? parseInt(epData.epNum, 10) : 0;

    if (!epNum || epNum <= 0) {
      const maxEp = currentEps.length > 0 ? Math.max(...currentEps.map(e => parseInt(e.epNum, 10) || 0)) : 0;
      epNum = maxEp + 1;
    }

    const title = (isObject && epData.title) ? epData.title : `${epNum}-qism`;
    const duration = isObject ? (epData.duration || '') : '';
    const watched = isObject ? Boolean(epData.watched) : false;
    const watchedDate = isObject ? (epData.watchedDate || (watched ? new Date().toISOString().split('T')[0] : '')) : '';

    const existingIndex = currentEps.findIndex(e => Number(e.epNum) === Number(epNum));
    let newEpisodes;

    if (existingIndex !== -1) {
      // Overwrite/update existing episode with same number instead of creating a duplicate
      newEpisodes = currentEps.map((e, idx) => {
        if (idx === existingIndex) {
          return {
            ...e,
            title: title || e.title,
            duration: duration || e.duration,
            watched: epData.watched !== undefined ? Boolean(epData.watched) : e.watched,
            watchedDate: watchedDate || e.watchedDate
          };
        }
        return e;
      });
    } else {
      const newEp = {
        id: `ep_${Date.now()}_${epNum}`,
        epNum,
        title,
        duration,
        watched,
        watchedDate,
      };
      newEpisodes = [...currentEps, newEp];
    }

    // Sort episodes automatically by epNum descending (largest numbers at top)
    newEpisodes.sort((a, b) => (Number(b.epNum) || 0) - (Number(a.epNum) || 0));
    await updateMediaItem(itemId, { episodes: newEpisodes });
  }, [mediaItems, updateMediaItem]);

  // Update Episode in Item
  const updateEpisodeInItem = useCallback(async (itemId, episodeId, updates) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item || !item.episodes) return;

    const newEpisodes = item.episodes.map(ep => ep.id === episodeId ? { ...ep, ...updates } : ep);
    const sortedEpisodes = [...newEpisodes].sort((a, b) => (Number(b.epNum) || 0) - (Number(a.epNum) || 0));
    const watchedCount = sortedEpisodes.filter(e => e.watched).length;

    let newStatus = item.status;
    if (watchedCount === sortedEpisodes.length && sortedEpisodes.length > 0) {
      newStatus = 'completed';
    } else if (watchedCount > 0 && item.status === 'plan_to_watch') {
      newStatus = 'watching';
    }

    await updateMediaItem(itemId, { episodes: sortedEpisodes, status: newStatus });
  }, [mediaItems, updateMediaItem]);

  // Reorder Episodes in Item
  const reorderEpisodesInItem = useCallback(async (itemId, newEpisodes) => {
    await updateMediaItem(itemId, { episodes: newEpisodes });
  }, [updateMediaItem]);

  // Reorder Media Items
  const reorderMediaItems = useCallback(async (newItems) => {
    setMediaItems(newItems);
    saveLocal(newItems);
    if (user) {
      const payload = {};
      newItems.forEach((item) => {
        payload[item.id] = item;
      });
      await set(ref(db, `users/${user.uid}/mediaTracker`), payload);
    }
  }, [user]);

  // Delete Episode
  const deleteEpisodeFromItem = useCallback(async (itemId, episodeId) => {
    const item = mediaItems.find(i => i.id === itemId);
    if (!item || !item.episodes) return;

    const newEpisodes = item.episodes.filter(ep => ep.id !== episodeId);
    await updateMediaItem(itemId, { episodes: newEpisodes });
  }, [mediaItems, updateMediaItem]);

  // Delete Media Item
  const deleteMediaItem = useCallback(async (itemId) => {
    setMediaItems(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      saveLocal(updated);
      return updated;
    });

    if (user) {
      await remove(ref(db, `users/${user.uid}/mediaTracker/${itemId}`));
    }
  }, [user]);

  return {
    mediaItems,
    loading,
    addMediaItem,
    updateMediaItem,
    incrementWatchCount,
    setWatchStatus,
    toggleEpisodeWatched,
    addEpisodeToItem,
    updateEpisodeInItem,
    reorderEpisodesInItem,
    reorderMediaItems,
    deleteEpisodeFromItem,
    deleteMediaItem,
  };
}
