// What a person types on the sign-in screen -> the email addresses to try.
//
//   an email           -> itself
//   a phone number     -> teacher_<digits>@markaz.uz (staff), then student_<digits>@markaz.uz
//   anything else      -> u_<username>@markaz.uz (a username given by a teacher/admin)
//
// Staff and student accounts made without an email carry such made-up addresses
// (see api/_studentAccount.js and corpService.createTeacher).

const DOMAIN = 'markaz.uz';
const PHONE_CHARS = /^[\d\s()+.-]+$/;

export function loginCandidates(input) {
  const trimmed = String(input ?? '').trim();
  if (!trimmed) return [];
  if (trimmed.includes('@')) return [trimmed];
  const digits = trimmed.replace(/\D/g, '');
  if (PHONE_CHARS.test(trimmed) && digits.length >= 7) {
    return [`teacher_${digits}@${DOMAIN}`, `student_${digits}@${DOMAIN}`];
  }
  const username = trimmed.toLowerCase().replace(/\s+/g, '');
  return [`u_${username}@${DOMAIN}`];
}

// The sign-in errors that just mean "not this address" - try the next one.
export const isWrongAccount = (err) => ['auth/invalid-credential', 'auth/user-not-found', 'auth/invalid-email', 'auth/wrong-password'].includes(err?.code);
