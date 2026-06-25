import { ep01 } from './ep01';

// ─── EPISODE REGISTRY ─────────────────────────────────────────────────────────
// ep01 is fully implemented. ep02-ep30 are stubs (coming soon).

const stub = (id, num, title, act, actTitle, summary) => ({
  id, title, actNumber: act, actTitle, readTime: '10 min', summary,
  nodes: [
    {
      id: 'intro', type: 'narration', bg: 'village',
      text: `[${title}] — This episode is coming soon. The story continues...`,
    },
    {
      id: 'end', type: 'cliffhanger', bg: 'village',
      text: 'To be continued...',
      nextEpisode: `ep${String(num + 1).padStart(2, '0')}`,
    },
  ],
});

export const EPISODES = {
  ep01,
  ep02: stub('ep02', 2,  'The Cursed Mother',       1, 'Act I — Contracts of the Misty Valley',     'Esh investigates the rune beneath the village well—and discovers who carved it twelve years ago.'),
  ep03: stub('ep03', 3,  "The Elder's Secret",       1, 'Act I — Contracts of the Misty Valley',     'Depending on past choices, Elder Tokhir tries to repay his debt—or eliminate the one person who knows his shame.'),
  ep04: stub('ep04', 4,  'Breath of the Forest',     1, 'Act I — Contracts of the Misty Valley',     'On the road north, Esh crosses paths with Sitora—a sorceress protecting a forest spirit that has begun attacking loggers.'),
  ep05: stub('ep05', 5,  'A Deal with Leshy',        1, 'Act I — Contracts of the Misty Valley',     'Esh meets the ancient forest guardian. Kill it for the loggers—or protect the old wood at a human cost.'),
  ep06: stub('ep06', 6,  'Blood at the Tavern',      1, 'Act I — Contracts of the Misty Valley',     'A bar fight escalates when local soldiers recognize the witcher from a bounty notice.'),
  ep07: stub('ep07', 7,  "The Bek's Commission",     1, 'Act I — Contracts of the Misty Valley',     'A powerful regional lord hires Esh: his daughter has been cursed to transform into a Alvast under moonlight.'),
  ep08: stub('ep08', 8,  'The Moon-Locked Night',    1, 'Act I — Contracts of the Misty Valley',     'Esh investigates the palace—and discovers the curse was placed by someone inside its walls.'),
  ep09: stub('ep09', 9,  'Dance with the Alvast',    1, 'Act I — Contracts of the Misty Valley',     'A harrowing boss fight against the transformed girl. Kill her—or take the curse into himself.'),
  ep10: stub('ep10', 10, 'The Border of Gargariya',  1, 'Act I — Contracts of the Misty Valley',     'Royal armies march into the Misty Valley. The age of contracts is over. Act I ends.'),

  ep11: stub('ep11', 11, 'The Smell of Blood',       2, 'Act II — The Cynical Crown',               'Esh crosses a war-ruined landscape. Mercenary hunters are on his trail.'),
  ep12: stub('ep12', 12, 'Audience with the King',   2, 'Act II — The Cynical Crown',               'The Northern King hires Esh to kill a spy—who turns out to be Sitora.'),
  ep13: stub('ep13', 13, 'The Escape',               2, 'Act II — The Cynical Crown',               'Break out of the royal dungeon—or carry out the assassination.'),
  ep14: stub('ep14', 14, 'Delayed Consequences',     2, 'Act II — The Cynical Crown',               'Every enemy Esh made in Act I sends hunters after him at once.'),
  ep15: stub('ep15', 15, 'The Black Knights',        2, 'Act II — The Cynical Crown',               'The Imperial elite guard use forbidden ancient signs.'),
  ep16: stub('ep16', 16, 'Night of Betrayal',        2, 'Act II — The Cynical Crown',               "A king's general plans a coup. Esh must choose which throne to support."),
  ep17: stub('ep17', 17, 'The Palace Fight',         2, 'Act II — The Cynical Crown',               'A gauntlet of combat through palace corridors.'),
  ep18: stub('ep18', 18, 'An Old Friend Returns',    2, 'Act II — The Cynical Crown',               'Someone Esh spared in Act I appears at the worst possible moment—to save his life.'),
  ep19: stub('ep19', 19, 'Shadow of the Emperor',    2, 'Act II — The Cynical Crown',               'Esh uncovers the Imperial laboratory creating artificial mutants.'),
  ep20: stub('ep20', 20, 'Laboratory Collapse',      2, 'Act II — The Cynical Crown',               'A two-phase boss fight. Escape before the entire facility explodes. Act II ends.'),

  ep21: stub('ep21', 21, 'White Darkness',           3, 'Act III — The Grey Apocalypse',            'Summer snow falls. Frost Walkers rise from frozen rivers.'),
  ep22: stub('ep22', 22, 'The Survivor Camp',        3, 'Act III — The Grey Apocalypse',            "Esh gathers every ally who survived the game so far into one last camp."),
  ep23: stub('ep23', 23, 'The High Court',           3, 'Act III — The Grey Apocalypse',            'Starvation sparks violence. Esh must judge—and his verdict shapes the ending.'),
  ep24: stub('ep24', 24, 'The Ancient Tomb',         3, 'Act III — The Grey Apocalypse',            'Esh descends into the first witcher\'s tomb and finds the legendary Silver Simurgh blade.'),
  ep25: stub('ep25', 25, 'The Sword\'s Guardian',   3, 'Act III — The Grey Apocalypse',            'A legendary ancient knight\'s spirit guards the weapon.'),
  ep26: stub('ep26', 26, 'The Road of Fate',         3, 'Act III — The Grey Apocalypse',            'Final preparations. Upgrade everything. There is no going back.'),
  ep27: stub('ep27', 27, 'The Frozen Fortress',      3, 'Act III — The Grey Apocalypse',            'Assault the mountain stronghold at the source of the endless winter.'),
  ep28: stub('ep28', 28, 'Army of Darkness',         3, 'Act III — The Grey Apocalypse',            'A gauntlet of minion waves. Conserve HP and stamina for what comes next.'),
  ep29: stub('ep29', 29, 'The Ice King (Final Boss)',3, 'Act III — The Grey Apocalypse',            'A two-phase battle against the ancient being who froze the world.'),
  ep30: stub('ep30', 30, 'Four Endings',             3, 'Act III — The Grey Apocalypse',            'The ending that plays depends entirely on every choice you made across 30 episodes.'),
};

export const EPISODE_LIST = [
  'ep01','ep02','ep03','ep04','ep05','ep06','ep07','ep08','ep09','ep10',
  'ep11','ep12','ep13','ep14','ep15','ep16','ep17','ep18','ep19','ep20',
  'ep21','ep22','ep23','ep24','ep25','ep26','ep27','ep28','ep29','ep30',
];

export function getEpisode(id) {
  return EPISODES[id] ?? null;
}

export function getEpisodeNumber(id) {
  return parseInt(id.replace('ep', ''), 10);
}

export function isEpisodeFullyWritten(id) {
  return id === 'ep01';
}
