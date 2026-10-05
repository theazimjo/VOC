import { describe, it, expect } from 'vitest';
import { groupTrend, homeworkStats, studentRows, studentStatus, topicStats } from './groupInsights';

const NOW = Date.parse('2026-09-26T12:00:00Z');
const ago = (d) => new Date(NOW - d * 86400000).toISOString();

const pack = {
  id: 'p1',
  title: 'Beginner',
  months: [{ id: 'm1', units: [{ id: 'u1', title: 'Family', words: [1, 2] }, { id: 'u2', title: 'Colors', words: [1] }] }],
};
const unit = (m, d) => ({ masteryPercent: m, lastActivity: ago(d) });
const group = {
  assignedPacks: ['p1'],
  students: {
    a: { name: 'Ali', progress: { p1: { units: { m1_u1: unit(90, 1), m1_u2: unit(80, 1) } } } },
    b: { name: 'Vali', progress: { p1: { units: { m1_u1: unit(30, 10) } } } },
    c: { name: 'Sami' },
  },
  homeworkList: {
    old: { name: 'HW1', assignedAt: ago(9), items: [{ packId: 'p1', monthId: 'm1', unitId: 'u1' }] },
    new: { name: 'HW2', assignedAt: ago(1), items: [{ packId: 'p1', monthId: 'm1', unitId: 'u1' }, { packId: 'p1', monthId: 'm1', unitId: 'u2' }] },
  },
};

describe('group insights', () => {
  const hwList = Object.values(group.homeworkList);
  const rows = studentRows(group, hwList, NOW);

  it('builds student rows', () => {
    const ali = rows.find((r) => r.uid === 'a');
    expect(ali).toMatchObject({ mastery: 85, activeWeek: true, homeworkDone: 2 });
    expect(rows.find((r) => r.uid === 'c')).toMatchObject({ mastery: null, last: null, homeworkDone: 0 });
  });

  it('averages each topic over students who started it', () => {
    const [course] = topicStats(group, { p1: pack });
    expect(course.topics).toEqual([
      { key: 'm1_u1', title: 'Family', words: 2, started: 2, total: 3, avg: 60, mastered: 1 },
      { key: 'm1_u2', title: 'Colors', words: 1, started: 1, total: 3, avg: 80, mastered: 1 },
    ]);
  });

  it('counts homework done / started, newest first', () => {
    const hs = homeworkStats(group, rows);
    expect(hs.items.map((h) => [h.name, h.done, h.started, h.total])).toEqual([['HW2', 1, 1, 3], ['HW1', 1, 1, 3]]);
    expect(hs.rate).toBe(33); // 2 of 6
    expect(hs.items[0].students.map((x) => [x.uid, x.state])).toEqual([['a', 'done'], ['b', 'started'], ['c', 'none']]);
  });

  it('describes each student in words', () => {
    expect(rows.map((r) => studentStatus(r, NOW).label)).toEqual(['Faol', 'Sust', 'Boshlamagan']);
    expect(studentStatus(rows[1], NOW).note).toBe('10 kundan beri mashq qilmagan');
    expect(studentStatus({ last: NOW - 3600000, mastery: 20 }, NOW).label).toBe('Qiynalyapti');
  });

  it("picks the group's line out of the center history", () => {
    const history = {
      '2026-09-24': { avg: 50, groups: { g1: { avg: 40, practiced: 1, total: 2 } } },
      '2026-09-25': { avg: 55 },
    };
    const trend = groupTrend(history, 'g1', { avg: 60, practiced: 2, total: 2 }, '2026-09-26');
    expect(trend.map((p) => [p.day, p.avg])).toEqual([['2026-09-24', 40], ['2026-09-26', 60]]);
  });
});
