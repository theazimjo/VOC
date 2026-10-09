import { useState } from 'react';
import { Check, Copy, Send, UserPlus } from 'lucide-react';
import { createStudentAccount } from '../../services/studentAccounts';
import { Button, Field, Row, Section } from '../../pages/corp/super-admin/ui';

// "Create account" for a student who has no email (or no phone to sign up with):
// the teacher or admin enters a name and a phone number or username, and gets a
// login + password to hand over. The student is already in the group and signs
// in on the usual screen. Used by the admin's Add Students and the teacher's Invite.
export default function CreateStudentPanel({ groupId, groupName, onCreated }) {
  const [name, setName] = useState('');
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [made, setMade] = useState(null);
  const [copied, setCopied] = useState('');

  // digits and + mean a phone number, anything else a username
  const isPhone = /^[\d\s()+.-]+$/.test(loginInput.trim()) && loginInput.replace(/\D/g, '').length >= 7;

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = await createStudentAccount({
        groupId,
        name,
        phone: isPhone ? loginInput : '',
        username: isPhone ? '' : loginInput,
        password,
      });
      setMade(result);
      onCreated?.(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const message = made
    ? `VOCABRY\n${made.name}\nLogin: ${made.login}\nParol: ${made.password}\nKirish: ${window.location.origin}`
    : '';

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(''), 1600);
    } catch {
      /* clipboard blocked: the text is on screen */
    }
  };

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: 'VOCABRY', text: message }); return; } catch { /* dismissed */ }
    }
    window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  };

  const another = () => {
    setMade(null);
    setName('');
    setLoginInput('');
    setPassword('');
    setError('');
  };

  if (made) {
    return (
      <>
        <p className="sa-flow-lead" style={{ marginTop: 14 }}>
          <strong>{made.name}</strong> is in {made.groupName || groupName}. Give them these to sign in. The password is shown only now.
        </p>
        <Section>
          <Row title={isPhoneLogin(made.login) ? 'Phone number' : 'Login'} detail={<span className="sa-mono">{made.login}</span>} chevron={false}
            accessory={copied === 'login' ? <Check size={16} className="tone-text-green" /> : <Copy size={15} className="sa-row-chevron" />}
            onClick={() => copy(made.login, 'login')} />
          <Row title="Password" detail={<span className="sa-mono">{made.password}</span>} chevron={false}
            accessory={copied === 'password' ? <Check size={16} className="tone-text-green" /> : <Copy size={15} className="sa-row-chevron" />}
            onClick={() => copy(made.password, 'password')} />
        </Section>
        <div className="sa-actions-stack">
          <Button onClick={share}><Send size={18} /> Send via Telegram</Button>
          <Button variant="tinted" onClick={() => copy(message, 'all')}>
            {copied === 'all' ? <Check size={18} /> : <Copy size={18} />} {copied === 'all' ? 'Copied' : 'Copy everything'}
          </Button>
          <Button variant="tinted" onClick={another}><UserPlus size={18} /> Add another student</Button>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={submit}>
      <p className="sa-flow-lead" style={{ marginTop: 14 }}>For a student without an email. They sign in with the phone number or username below.</p>
      <Field label="Student name">
        <input className="sa-input" required autoComplete="off" placeholder="Ali Valiyev" value={name} onChange={(e) => setName(e.target.value)} />
      </Field>
      <Field label="Phone number or username" hint={isPhone ? 'They sign in with this phone number.' : 'e.g. ali.01, 3 to 24 letters, digits, . _ -'}>
        <input className="sa-input" required autoComplete="off" placeholder="+998 90 123 45 67" value={loginInput} onChange={(e) => setLoginInput(e.target.value)} />
      </Field>
      <Field label="Password" hint="Leave empty and we will make an easy one.">
        <input className="sa-input" autoComplete="off" placeholder="Generated" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Field>
      {error && <p className="sa-flow-error">{error}</p>}
      <Button type="submit" block disabled={busy || !name.trim() || !loginInput.trim()}>{busy ? 'Creating...' : 'Create account'}</Button>
    </form>
  );
}

const isPhoneLogin = (login) => /^\+\d{7,15}$/.test(login);
