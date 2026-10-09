// Rules for the sign-in name of a student account that a teacher or admin creates
// (no email needed). Pure, so it can be unit-tested. Files starting with "_"
// are helpers, not deployed endpoints.
//
// A student signs in with a phone number or a short username plus a password.
// Firebase needs an email, so a made-up one is derived from it - the same idea
// the staff phone login already uses (teacher_<digits>@markaz.uz):
//
//   phone    +998 90 123 45 67  ->  student_998901234567@markaz.uz
//   username max.01             ->  u_max.01@markaz.uz
//
// The login screen (src/components/Auth/loginIdentifier.js) builds the same names.

export const STUDENT_EMAIL_DOMAIN = 'markaz.uz';

const NAME_MAX = 60;
const USERNAME_RE = /^[a-z0-9][a-z0-9._-]{2,23}$/;

const str = (v) => (typeof v === 'string' ? v.trim() : '');

/** @returns {{ ok: true, name: string, login: string, email: string, phone: string } | { ok: false, error: string }} */
export function validateStudent(input) {
  const name = str(input?.name).replace(/\s+/g, ' ');
  if (name.length < 2 || name.length > NAME_MAX) {
    return { ok: false, error: "Ism 2-60 ta belgidan iborat bo'lsin." };
  }

  const phoneDigits = str(input?.phone).replace(/\D/g, '');
  const username = str(input?.username).toLowerCase();

  if (phoneDigits) {
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return { ok: false, error: "Telefon raqami 7-15 ta raqamdan iborat bo'lsin." };
    }
    return { ok: true, name, login: `+${phoneDigits}`, phone: `+${phoneDigits}`, email: `student_${phoneDigits}@${STUDENT_EMAIL_DOMAIN}` };
  }
  if (username) {
    if (!USERNAME_RE.test(username)) {
      return { ok: false, error: "Login 3-24 ta belgi: kichik lotin harflar, raqamlar, nuqta, chiziqcha." };
    }
    return { ok: true, name, login: username, phone: '', email: `u_${username}@${STUDENT_EMAIL_DOMAIN}` };
  }
  return { ok: false, error: "Telefon raqami yoki login kerak." };
}

// Easy to read out and type on a phone: no 0/o, 1/l/i.
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789';

export function makePassword(random = Math.random, length = 8) {
  let out = '';
  for (let i = 0; i < length; i += 1) out += ALPHABET[Math.floor(random() * ALPHABET.length)];
  return out;
}
