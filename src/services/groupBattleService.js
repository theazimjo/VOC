import { ref, set, update, onValue } from 'firebase/database';
import { db } from '../firebase';

/**
 * Subscribe to live battle updates for a group in Firebase Realtime DB.
 */
export function subscribeGroupBattle(groupId, onData) {
  if (!groupId) return () => {};
  const battleRef = ref(db, `groupBattles/${groupId}`);
  return onValue(battleRef, (snapshot) => {
    onData(snapshot.exists() ? snapshot.val() : null);
  });
}

/**
 * Teacher creates a new Live Battle lobby.
 */
export async function createGroupBattle(groupId, teacherUid, selectedSets, questions, teacherName) {
  const battleRef = ref(db, `groupBattles/${groupId}`);
  const payload = {
    groupId,
    teacherUid,
    teacherName: teacherName || 'Teacher',
    status: 'lobby', // 'lobby' | 'active' | 'finished'
    createdAt: Date.now(),
    selectedSets: selectedSets || [],
    questions: questions || [],
    participants: {}
  };
  await set(battleRef, payload);
  return payload;
}

/**
 * Student joins the live battle lobby.
 */
export async function joinGroupBattle(groupId, studentUid, studentName) {
  const participantRef = ref(db, `groupBattles/${groupId}/participants/${studentUid}`);
  const payload = {
    uid: studentUid,
    name: studentName || 'Student',
    score: 0,
    correctCount: 0,
    totalAnswered: 0,
    finished: false,
    joinedAt: Date.now()
  };
  await set(participantRef, payload);
  return payload;
}

/**
 * Teacher starts the battle for all joined students.
 */
export async function startGroupBattle(groupId) {
  const statusRef = ref(db, `groupBattles/${groupId}/status`);
  await set(statusRef, 'active');
}

/**
 * Student updates score on each answer with anti-double-click protection.
 */
export async function updateGroupBattleScore(groupId, studentUid, scoreData) {
  const participantRef = ref(db, `groupBattles/${groupId}/participants/${studentUid}`);
  await update(participantRef, {
    score: scoreData.score || 0,
    correctCount: scoreData.correctCount || 0,
    totalAnswered: scoreData.totalAnswered || 0,
    finished: scoreData.finished || false,
    updatedAt: Date.now()
  });
}

/**
 * Teacher or system finishes the battle.
 */
export async function endGroupBattle(groupId) {
  const battleRef = ref(db, `groupBattles/${groupId}`);
  await update(battleRef, { status: 'finished', endedAt: Date.now() });
}
