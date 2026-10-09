import { auth } from '../firebase';

// A teacher or admin creates a student's account (phone number or username + password,
// no email needed). The server does it: see api/create-student.js.
export async function createStudentAccount({ groupId, name, phone, username, password }) {
  const idToken = await auth.currentUser?.getIdToken();
  if (!idToken) throw new Error('Please sign in again.');
  const res = await fetch('/api/create-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken, groupId, name, phone, username, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not create the account.');
  return data; // { uid, login, password, name, groupName }
}
