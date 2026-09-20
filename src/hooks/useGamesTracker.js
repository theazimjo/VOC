import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, set, update, remove } from 'firebase/database';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

export const PRESET_GAME_GENRES = [
  'Action', 'Adventure', 'RPG', 'Open World', 'Story-Rich',
  'FPS', 'Shooter', 'Souls-like', 'Strategy', 'Survival',
  'Horror', 'Cyberpunk', 'Sci-Fi', 'Fantasy', 'Metroidvania',
  'Platformer', 'Simulation', 'Sports', 'Racing', 'Fighting',
  'Indie', 'Puzzle', 'Stealth', 'Tactical'
];

export const GAME_PLATFORMS = [
  'PC', 'PlayStation 5', 'PlayStation 4', 'Xbox Series X/S',
  'Xbox One', 'Nintendo Switch', 'Steam Deck', 'Mobile'
];

export const DEFAULT_GAME_ITEMS = [
  {
    id: 'the-last-of-us-part-1',
    title: 'The Last of Us Part I',
    platform: 'PlayStation 5',
    status: 'completed', // 'playing' | 'completed' | 'plan_to_play' | 'on_hold' | 'dropped'
    releaseYear: 2022,
    genres: ['Action', 'Adventure', 'Story-Rich', 'Survival'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1888930/header.jpg',
    link: 'https://store.playstation.com',
    playtimeHours: 35,
    completionPct: 100,
    description: "Vayron bo'lgan dunyoda Djoel va Elli ismli o'smir qizning xatarli va hissiyotlarga boy fojiaviy sayohati.",
    rating: 9.8,
    createdAt: '2026-09-01T10:00:00Z',
    updatedAt: '2026-09-20T10:00:00Z',
    lastPlayedAt: '2026-09-20T10:00:00Z'
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    platform: 'PC',
    status: 'completed',
    releaseYear: 2018,
    genres: ['Open World', 'Action', 'Adventure', 'Story-Rich'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/header.jpg',
    link: 'https://store.steampowered.com/app/1174180/Red_Dead_Redemption_2/',
    playtimeHours: 120,
    completionPct: 100,
    description: "Amerikaning yovvoyi g'arbiy davri intihosida Artur Morgan va Van der Linde toudasi a'zolarining omon qolish uchun ayovsiz kurashi.",
    rating: 9.9,
    createdAt: '2026-09-02T10:00:00Z',
    updatedAt: '2026-09-19T10:00:00Z',
    lastPlayedAt: '2026-09-19T10:00:00Z'
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    platform: 'PlayStation 5',
    status: 'playing',
    releaseYear: 2022,
    genres: ['Action', 'Adventure', 'Fantasy'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1593500/header.jpg',
    link: 'https://store.playstation.com',
    playtimeHours: 45,
    completionPct: 65,
    description: "Kratos va Atrey Skandinaviya xudolari fojiasi hamda Ragnarok halokatining oldini olish uchun To'qqiz Olam bo'ylab jang qiladilar.",
    rating: 9.7,
    createdAt: '2026-09-05T10:00:00Z',
    updatedAt: '2026-09-20T12:00:00Z',
    lastPlayedAt: '2026-09-20T12:00:00Z'
  },
  {
    id: 'the-witcher-3-wild-hunt',
    title: 'The Witcher 3: Wild Hunt',
    platform: 'PC',
    status: 'completed',
    releaseYear: 2015,
    genres: ['RPG', 'Open World', 'Fantasy', 'Story-Rich'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/header.jpg',
    link: 'https://store.steampowered.com/app/292030/The_Witcher_3_Wild_Hunt/',
    playtimeHours: 150,
    completionPct: 100,
    description: "Afsonaviy vedmak Geralt Riviyskiy bashorat qilingan taqdir farzandi Tsirini topish uchun ulkan sehrli dunyo bo'ylab yo'l oladi.",
    rating: 9.8,
    createdAt: '2026-09-03T10:00:00Z',
    updatedAt: '2026-09-18T10:00:00Z',
    lastPlayedAt: '2026-09-18T10:00:00Z'
  },
  {
    id: 'elden-ring',
    title: 'Elden Ring',
    platform: 'PC',
    status: 'playing',
    releaseYear: 2022,
    genres: ['Souls-like', 'Open World', 'RPG', 'Action'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    link: 'https://store.steampowered.com/app/1245620/ELDEN_RING/',
    playtimeHours: 90,
    completionPct: 80,
    description: "Orol Olamlarida Elden Uzuk parchalangach, Tushkun Qahramon Elchisi sifatida Elden Lordi unvoniga erishish uchun xatarli dunyo sarguzashtlari.",
    rating: 9.6,
    createdAt: '2026-09-04T10:00:00Z',
    updatedAt: '2026-09-19T14:00:00Z',
    lastPlayedAt: '2026-09-19T14:00:00Z'
  },
  {
    id: 'cyberpunk-2077',
    title: 'Cyberpunk 2077',
    platform: 'PC',
    status: 'completed',
    releaseYear: 2020,
    genres: ['Cyberpunk', 'Open World', 'RPG', 'Sci-Fi'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    link: 'https://store.steampowered.com/app/1091500/Cyberpunk_2077/',
    playtimeHours: 85,
    completionPct: 100,
    description: "Nayt-Siti kiber-megapolisida 'V' ismli yollanma qotil abadiylik implantatini qo'lga kiritish uchun o'z hayotini xavfga qo'yadi.",
    rating: 9.2,
    createdAt: '2026-09-06T10:00:00Z',
    updatedAt: '2026-09-17T10:00:00Z',
    lastPlayedAt: '2026-09-17T10:00:00Z'
  },
  {
    id: 'gta-v',
    title: 'Grand Theft Auto V',
    platform: 'PC',
    status: 'completed',
    releaseYear: 2013,
    genres: ['Action', 'Open World', 'Crime'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
    link: 'https://store.steampowered.com',
    playtimeHours: 110,
    completionPct: 100,
    description: "Maykl, Trevor va Franklin ismli uch jinoyatchi Los-Santos shahrida yirik va xatarli o'g'rilik operatsiyalarini amalga oshiradilar.",
    rating: 9.7,
    createdAt: '2026-09-07T10:00:00Z',
    updatedAt: '2026-09-16T10:00:00Z',
    lastPlayedAt: '2026-09-16T10:00:00Z'
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    platform: 'Nintendo Switch',
    status: 'plan_to_play',
    releaseYear: 2017,
    genres: ['Metroidvania', 'Indie', 'Action'],
    coverUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/367520/header.jpg',
    link: 'https://store.steampowered.com/app/367520/Hollow_Knight/',
    playtimeHours: 0,
    completionPct: 0,
    description: "Hallowown qadimgi ostki qirolligida mitti ritsar qadimiy sir va qarg'ishlarni ochish uchun sirli g'orlarga sho'ng'iydi.",
    rating: 9.5,
    createdAt: '2026-09-08T10:00:00Z',
    updatedAt: '2026-09-08T10:00:00Z',
    lastPlayedAt: ''
  }
];

export function computeGlobalGameStats(items) {
  if (!items || items.length === 0) {
    return {
      totalPlayedHours: 0,
      totalGamesCount: 0,
      completedCount: 0,
      playingCount: 0,
      planToPlayCount: 0
    };
  }

  let totalPlayedHours = 0;
  let completedCount = 0;
  let playingCount = 0;
  let planToPlayCount = 0;

  items.forEach(item => {
    const hrs = typeof item.playtimeHours === 'number' ? item.playtimeHours : (parseFloat(item.playtimeHours) || 0);
    totalPlayedHours += hrs;

    if (item.status === 'completed') completedCount++;
    else if (item.status === 'playing') playingCount++;
    else if (item.status === 'plan_to_play') planToPlayCount++;
  });

  return {
    totalPlayedHours,
    totalGamesCount: items.length,
    completedCount,
    playingCount,
    planToPlayCount
  };
}

function sanitizeGameItem(item) {
  if (!item) return item;
  let coverUrl = item.coverUrl || '';
  if (coverUrl.includes('media-amazon.com')) {
    const defaultMatch = DEFAULT_GAME_ITEMS.find(d => d.id === item.id);
    if (defaultMatch) {
      coverUrl = defaultMatch.coverUrl;
    } else {
      coverUrl = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80';
    }
  }
  return {
    ...item,
    coverUrl
  };
}

export function useGamesTracker() {
  const { user } = useAuth();
  const [gameItems, setGameItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      const localData = localStorage.getItem('voc_games_tracker_v3');
      if (localData) {
        try {
          const parsed = JSON.parse(localData);
          setGameItems(Array.isArray(parsed) ? parsed.map(sanitizeGameItem) : DEFAULT_GAME_ITEMS);
        } catch {
          setGameItems(DEFAULT_GAME_ITEMS);
        }
      } else {
        setGameItems(DEFAULT_GAME_ITEMS);
      }
      setLoading(false);
      return;
    }

    const gamesRef = ref(db, `users/${user.uid}/gamesTracker`);
    const unsubscribe = onValue(gamesRef, (snapshot) => {
      if (snapshot.exists()) {
        const val = snapshot.val();
        const itemsArray = Object.keys(val).map((key) => sanitizeGameItem({
          id: key,
          ...val[key],
        }));
        setGameItems(itemsArray);
      } else {
        const seedPayload = {};
        DEFAULT_GAME_ITEMS.forEach((item) => {
          seedPayload[item.id] = {
            ...item,
            createdAt: new Date().toISOString(),
          };
        });
        set(gamesRef, seedPayload);
        setGameItems(DEFAULT_GAME_ITEMS);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase gamesTracker error:", error);
      setGameItems(DEFAULT_GAME_ITEMS);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const saveLocal = (items) => {
    try {
      localStorage.setItem('voc_games_tracker_v3', JSON.stringify(items));
    } catch {
      // ignore
    }
  };

  // Add Game Item
  const addGameItem = useCallback(async (itemData) => {
    const nowIso = new Date().toISOString();
    const newItem = {
      id: `game_${Date.now()}`,
      title: itemData.title || 'Untitled Game',
      platform: itemData.platform || 'PC',
      status: itemData.status || 'plan_to_play',
      releaseYear: parseInt(itemData.releaseYear, 10) || new Date().getFullYear(),
      genres: itemData.genres || [],
      coverUrl: itemData.coverUrl || '',
      link: itemData.link || '',
      playtimeHours: parseFloat(itemData.playtimeHours) || 0,
      completionPct: parseInt(itemData.completionPct, 10) || 0,
      description: itemData.description || '',
      rating: parseFloat(itemData.rating) || 8.0,
      createdAt: nowIso,
      updatedAt: nowIso,
      lastPlayedAt: itemData.status === 'playing' ? nowIso : ''
    };

    setGameItems(prev => {
      const updated = [newItem, ...prev];
      saveLocal(updated);
      return updated;
    });

    if (user) {
      await set(ref(db, `users/${user.uid}/gamesTracker/${newItem.id}`), newItem);
    }

    return newItem;
  }, [user]);

  // Update Game Item
  const updateGameItem = useCallback(async (itemId, updateData) => {
    const nowIso = new Date().toISOString();

    setGameItems(prev => {
      const updated = prev.map(item => {
        if (item.id === itemId) {
          const isNowPlaying = (updateData.status || item.status) === 'playing';
          return {
            ...item,
            ...updateData,
            updatedAt: nowIso,
            lastPlayedAt: isNowPlaying ? nowIso : (item.lastPlayedAt || nowIso)
          };
        }
        return item;
      });
      saveLocal(updated);
      return updated;
    });

    if (user) {
      const payload = {
        ...updateData,
        updatedAt: nowIso,
      };
      if (updateData.status === 'playing') {
        payload.lastPlayedAt = nowIso;
      }
      await update(ref(db, `users/${user.uid}/gamesTracker/${itemId}`), payload);
    }
  }, [user]);

  // Set Game Status
  const setGameStatus = useCallback(async (itemId, status) => {
    const nowIso = new Date().toISOString();
    const updateObj = {
      status,
      updatedAt: nowIso,
    };
    if (status === 'playing') {
      updateObj.lastPlayedAt = nowIso;
    }
    await updateGameItem(itemId, updateObj);
  }, [updateGameItem]);

  // Delete Game Item
  const deleteGameItem = useCallback(async (itemId) => {
    setGameItems(prev => {
      const updated = prev.filter(i => i.id !== itemId);
      saveLocal(updated);
      return updated;
    });

    if (user) {
      await remove(ref(db, `users/${user.uid}/gamesTracker/${itemId}`));
    }
  }, [user]);

  // Reorder Game Items
  const reorderGameItems = useCallback(async (newOrder) => {
    setGameItems(newOrder);
    saveLocal(newOrder);

    if (user) {
      const seedPayload = {};
      newOrder.forEach((item) => {
        seedPayload[item.id] = item;
      });
      await set(ref(db, `users/${user.uid}/gamesTracker`), seedPayload);
    }
  }, [user]);

  return {
    gameItems,
    loading,
    addGameItem,
    updateGameItem,
    setGameStatus,
    deleteGameItem,
    reorderGameItems,
  };
}
