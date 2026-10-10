// Premium memory analytics: forgetting curves (per word and for the whole vocabulary), memory
// strength, accuracy trends. All of it uses the scheduler's own forgetting model, recall =
// exp(-days / stability), so the curve, the review date and the "what if I review" projections
// always agree with each other (the engine schedules a review when recall reaches 75%).
import { weeklyGrowth } from './statsAnalytics';
import {
  computeRecallProbability, resolveStability, resolveCorrectCount, simulateReviewDayOptions,
} from '@voc/memory-engine';

const DAY = 86400000;
export const TARGET_RECALL = 0.75; // the engine reviews a word when recall falls to this

export const reviewedWords = (words) => (words || []).filter((w) => w.lastReviewed && Number.isFinite(new Date(w.lastReviewed).getTime()));

const mean = (a) => (a.length ? a.reduce((s, x) => s + x, 0) / a.length : 0);

// Average predicted recall of the whole vocabulary if nothing is reviewed from now on.
export function vocabCurve(words, now = Date.now(), days = [0, 1, 2, 3, 5, 7, 10, 14, 21, 30]) {
  const rev = reviewedWords(words);
  if (rev.length === 0) return null;
  const recallAt = (w, t) => computeRecallProbability(resolveStability(w), (t - new Date(w.lastReviewed).getTime()) / DAY);
  const points = days.map((d) => ({ day: d, p: mean(rev.map((w) => recallAt(w, now + d * DAY))) }));
  const atRisk = rev.filter((w) => recallAt(w, now) < TARGET_RECALL).length;
  return { points, atRisk, reviewed: rev.length };
}

// Memory strength tier from stability (days), same thresholds as the engine's memory health.
export function strengthTier(stability, hasReview) {
  if (!hasReview) return 'new';
  if (stability >= 20) return 'strong';
  if (stability >= 10) return 'good';
  if (stability >= 5) return 'medium';
  return 'weak';
}

export function wordMemory(word, now = Date.now()) {
  const hasReview = Boolean(word.lastReviewed);
  const stability = resolveStability(word);
  const last = hasReview ? new Date(word.lastReviewed).getTime() : null;
  const recall = hasReview ? computeRecallProbability(stability, (now - last) / DAY) : null;
  const n = Number(word.reviewCount) || (hasReview ? 1 : 0);
  const correct = Math.min(n, resolveCorrectCount(word));
  const history = (Array.isArray(word.recallHistory) ? word.recallHistory : [])
    .filter((h) => h && h.ts && Number.isFinite(new Date(h.ts).getTime()))
    .map((h) => ({ ts: new Date(h.ts).getTime(), result: Boolean(h.result), predictedP: h.predictedP, confidence: h.confidence, responseTime: h.responseTime, gap: h.t }))
    .sort((a, b) => a.ts - b.ts);
  const times = history.map((h) => Number(h.responseTime)).filter((x) => Number.isFinite(x) && x > 0);
  const nextMs = word.nextReview ? new Date(word.nextReview).getTime() : null;
  return {
    hasReview, stability, last, recall, reviews: n, correct,
    wrong: Number(word.wrongCount) || Math.max(0, n - correct),
    accuracy: n > 0 ? Math.round((correct / n) * 100) : null,
    avgResponse: times.length ? Math.round(mean(times) * 10) / 10 : null,
    nextMs: Number.isFinite(nextMs) ? nextMs : null,
    daysToReview: Number.isFinite(nextMs) ? Math.ceil((nextMs - now) / DAY) : null,
    tier: strengthTier(stability, hasReview),
    difficulty: typeof word.difficulty === 'number' ? Math.round(word.difficulty * 100) : null,
    history,
  };
}

// Recall of one word over time, from its last review to `ahead` days from now.
export function wordCurve(word, now = Date.now(), ahead = 30, steps = 48) {
  if (!word.lastReviewed) return [];
  const start = new Date(word.lastReviewed).getTime();
  const stability = resolveStability(word);
  const end = now + ahead * DAY;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = start + ((end - start) * i) / steps;
    return { t, p: computeRecallProbability(stability, (t - start) / DAY) };
  });
}

// What a review on day 1 / 3 / 7 / 14 would do to recall 30 days from now.
export function whatIf(word, days = [1, 3, 7, 14], horizon = 30) {
  return simulateReviewDayOptions(resolveStability(word), days, horizon).map((r) => ({
    day: r.reviewDay, without: r.withoutReview, withReview: r.withReview, newStability: r.newStabilityAfterReview,
  }));
}

const STABILITY_BUCKETS = [
  { key: 'd1', max: 1 }, { key: 'd3', max: 3 }, { key: 'd7', max: 7 }, { key: 'd14', max: 14 }, { key: 'd30', max: 30 }, { key: 'more', max: Infinity },
];
export function stabilityBuckets(words) {
  const out = STABILITY_BUCKETS.map((b) => ({ key: b.key, count: 0 }));
  reviewedWords(words).forEach((w) => {
    const s = resolveStability(w);
    const i = STABILITY_BUCKETS.findIndex((b) => s < b.max);
    out[i === -1 ? out.length - 1 : i].count += 1;
  });
  return out;
}

// Review accuracy per week for the last `n` weeks (Monday start), from every word's recallHistory.
export function accuracyByWeek(words, n = 8, now = Date.now()) {
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const weeks = Array.from({ length: n }, (_, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() - (n - 1 - i) * 7);
    return { start: d, total: 0, correct: 0 };
  });
  const first = weeks[0].start.getTime();
  (words || []).forEach((w) => (w.recallHistory || []).forEach((h) => {
    const t = new Date(h?.ts).getTime();
    if (!Number.isFinite(t) || t < first) return;
    const idx = Math.min(n - 1, Math.floor((t - first) / (7 * DAY)));
    weeks[idx].total += 1;
    if (h.result) weeks[idx].correct += 1;
  }));
  return weeks.map((w) => ({ ...w, rate: w.total > 0 ? Math.round((w.correct / w.total) * 100) : null }));
}

// Accuracy by time of day (local hour of each review).
export function accuracyByTimeOfDay(words) {
  const slots = [
    { key: 'night', from: 0, to: 6 }, { key: 'morning', from: 6, to: 12 }, { key: 'afternoon', from: 12, to: 18 }, { key: 'evening', from: 18, to: 24 },
  ].map((s) => ({ ...s, total: 0, correct: 0 }));
  (words || []).forEach((w) => (w.recallHistory || []).forEach((h) => {
    const t = new Date(h?.ts);
    if (!Number.isFinite(t.getTime())) return;
    const slot = slots.find((s) => t.getHours() >= s.from && t.getHours() < s.to);
    slot.total += 1;
    if (h.result) slot.correct += 1;
  }));
  return slots.map((s) => ({ key: s.key, total: s.total, rate: s.total > 0 ? Math.round((s.correct / s.total) * 100) : null }));
}

// Words ranked for the explorer. `risk`: lowest predicted recall first; `strong`: highest stability first.
export function rankWords(words, mode, now = Date.now()) {
  const rows = reviewedWords(words).map((w) => ({ word: w, mem: wordMemory(w, now) }));
  if (mode === 'strong') rows.sort((a, b) => b.mem.stability - a.mem.stability);
  else if (mode === 'hard') rows.sort((a, b) => (b.mem.wrong - a.mem.wrong) || (a.mem.recall - b.mem.recall));
  else rows.sort((a, b) => a.mem.recall - b.mem.recall);
  return { rows };
}

// ---- Speed, word types, weekly report -----------------------------------------------------
const validTime = (x) => Number.isFinite(Number(x)) && Number(x) > 0 && Number(x) <= 60;

// Average answer time (seconds) per week for the last `n` weeks; faster means more fluent recall.
export function speedByWeek(words, n = 8, now = Date.now()) {
  const today = new Date(now); today.setHours(0, 0, 0, 0);
  const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  const weeks = Array.from({ length: n }, (_, i) => {
    const d = new Date(monday); d.setDate(monday.getDate() - (n - 1 - i) * 7);
    return { start: d, sum: 0, count: 0 };
  });
  const first = weeks[0].start.getTime();
  (words || []).forEach((w) => (w.recallHistory || []).forEach((h) => {
    const t = new Date(h?.ts).getTime();
    if (!Number.isFinite(t) || t < first || !validTime(h.responseTime)) return;
    const idx = Math.min(n - 1, Math.floor((t - first) / (7 * DAY)));
    weeks[idx].sum += Number(h.responseTime);
    weeks[idx].count += 1;
  }));
  return weeks.map((w) => ({ start: w.start, count: w.count, avg: w.count > 0 ? Math.round((w.sum / w.count) * 10) / 10 : null }));
}

// Fastest and slowest words by average answer time (needs at least 2 timed answers).
export function wordSpeeds(words, min = 2) {
  const rows = [];
  (words || []).forEach((w) => {
    const times = (w.recallHistory || []).map((h) => Number(h?.responseTime)).filter(validTime);
    if (times.length >= min) rows.push({ word: w, avg: Math.round(mean(times) * 10) / 10, n: times.length });
  });
  rows.sort((a, b) => a.avg - b.avg);
  return { fastest: rows.slice(0, 3), slowest: rows.slice(-3).reverse() };
}

// Accuracy and memory strength by part of speech (groups with at least 3 words that were reviewed).
export function posAccuracy(words) {
  const map = {};
  reviewedWords(words).forEach((w) => {
    const key = (w.partOfSpeech || 'other').toLowerCase();
    const g = map[key] || (map[key] = { key, words: 0, reviews: 0, correct: 0, stability: 0 });
    const n = Number(w.reviewCount) || 1;
    g.words += 1;
    g.reviews += n;
    g.correct += Math.min(n, resolveCorrectCount(w));
    g.stability += resolveStability(w);
  });
  return Object.values(map)
    .filter((g) => g.words >= 3)
    .map((g) => ({ key: g.key, words: g.words, accuracy: Math.round((g.correct / g.reviews) * 100), stability: Math.round((g.stability / g.words) * 10) / 10 }))
    .sort((a, b) => b.accuracy - a.accuracy);
}

// This week against the last one: reviews, accuracy, answer speed and new words.
export function weeklyReport(words, now = Date.now()) {
  const acc = accuracyByWeek(words, 2, now);
  const spd = speedByWeek(words, 2, now);
  const grow = weeklyGrowth(words, 2, now);
  return {
    reviews: { prev: acc[0].total, cur: acc[1].total },
    accuracy: { prev: acc[0].rate, cur: acc[1].rate },
    speed: { prev: spd[0].avg, cur: spd[1].avg },
    added: { prev: grow[0].count, cur: grow[1].count },
  };
}
