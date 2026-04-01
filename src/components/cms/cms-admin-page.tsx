'use client';

import { FormEvent, useEffect, useState } from 'react';
import { LogIn, LogOut, Save, Shield } from 'lucide-react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { EMPTY_SITE_CONSTANTS, readSiteConstants, type SiteConstants } from '@/lib/site-constants';

type ConstantForm = SiteConstants;

const DEFAULT_CONSTANTS: ConstantForm = {
  ...EMPTY_SITE_CONSTANTS,
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message.replace('Firebase: ', '').replace(/\s*\(auth\/.*?\)\.?/i, '').trim();
  }

  return 'Something went wrong. Please try again.';
}

export default function CmsAdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [form, setForm] = useState<ConstantForm>(DEFAULT_CONSTANTS);
  const [authReady, setAuthReady] = useState(false);
  const [loadingConstants, setLoadingConstants] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadConstants() {
    setLoadingConstants(true);
    setError(null);

    try {
      const constants = await readSiteConstants();
      setForm({
        kg: constants.kg,
        km: constants.km,
        liter: constants.liter,
      });
    } catch (loadError) {
      setError(getErrorMessage(loadError));
    } finally {
      setLoadingConstants(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setUser(currentUser);
      setAuthReady(true);
      setMessage(null);

      if (currentUser) {
        await loadConstants();
      } else {
        setForm(DEFAULT_CONSTANTS);
      }
    });

    return () => unsubscribe();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setMessage('Login successful.');
      setPassword('');
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      setError('Please sign in first.');
      return;
    }

    if (!form.kg || !form.km || !form.liter) {
      setError('Please fill all three values.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const updatedAt = serverTimestamp();
      const updatedBy = user.email ?? user.uid;
      const batch = writeBatch(db);

      batch.set(
        doc(db, 'constant', 'metrics'),
        {
          kg: Number(form.kg),
          km: Number(form.km),
          liter: Number(form.liter),
          updatedAt,
          updatedBy,
        },
        { merge: true }
      );

      batch.set(doc(db, 'constant', 'kg'), { key: 'kg', value: Number(form.kg), updatedAt, updatedBy }, { merge: true });
      batch.set(doc(db, 'constant', 'km'), { key: 'km', value: Number(form.km), updatedAt, updatedBy }, { merge: true });
      batch.set(doc(db, 'constant', 'liter'), { key: 'liter', value: Number(form.liter), updatedAt, updatedBy }, { merge: true });

      await batch.commit();

      setMessage('Values saved to the Firestore `constant` collection.');
    } catch (saveError) {
      setError(getErrorMessage(saveError));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await signOut(auth);
      setEmail('');
      setPassword('');
      setMessage('Signed out.');
    } catch (logoutError) {
      setError(getErrorMessage(logoutError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #06130d 0%, #0b1720 100%)',
        color: '#f8fafc',
        padding: '32px 16px',
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: '0 auto',
          border: '1px solid rgba(148, 163, 184, 0.2)',
          borderRadius: 24,
          background: 'rgba(15, 23, 42, 0.82)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px 24px 12px', borderBottom: '1px solid rgba(148, 163, 184, 0.14)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                display: 'grid',
                placeItems: 'center',
                background: 'rgba(34, 197, 94, 0.16)',
                color: '#4ade80',
              }}
            >
              <Shield size={20} />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#86efac' }}>
                Private Route
              </p>
              <h1 style={{ margin: '4px 0 0', fontSize: 28, fontWeight: 800 }}>CARBON-X CMS</h1>
            </div>
          </div>
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: 1.6 }}>
            Hidden admin panel for updating `kg`, `km`, and `liter` values stored in Firestore collection `constant`.
          </p>
        </div>

        {!authReady ? (
          <div style={{ padding: 24, color: '#cbd5e1' }}>Checking admin session...</div>
        ) : !user ? (
          <form onSubmit={handleLogin} style={{ padding: 24, display: 'grid', gap: 16 }}>
            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>Admin email</span>
              <input
                type='email'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder='admin@example.com'
                required
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.26)',
                  background: '#0f172a',
                  color: '#f8fafc',
                }}
              />
            </label>

            <label style={{ display: 'grid', gap: 8 }}>
              <span style={{ fontWeight: 600 }}>Password</span>
              <input
                type='password'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder='Enter password'
                required
                style={{
                  padding: '12px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(148, 163, 184, 0.26)',
                  background: '#0f172a',
                  color: '#f8fafc',
                }}
              />
            </label>

            <button
              type='submit'
              disabled={submitting}
              style={{
                border: 0,
                borderRadius: 12,
                padding: '12px 16px',
                fontWeight: 700,
                background: '#16a34a',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              <LogIn size={18} />
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        ) : (
          <div style={{ padding: 24, display: 'grid', gap: 18 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                flexWrap: 'wrap',
                alignItems: 'center',
                padding: 16,
                borderRadius: 16,
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(148, 163, 184, 0.16)',
              }}
            >
              <div>
                <p style={{ margin: 0, fontSize: 12, color: '#86efac', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Signed in as
                </p>
                <p style={{ margin: '6px 0 0', fontWeight: 700 }}>{user.email}</p>
              </div>

              <button
                type='button'
                onClick={handleLogout}
                disabled={submitting}
                style={{
                  border: '1px solid rgba(248, 250, 252, 0.18)',
                  borderRadius: 12,
                  padding: '10px 14px',
                  background: 'transparent',
                  color: '#f8fafc',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
                {([
                  { key: 'kg', label: 'kg' },
                  { key: 'km', label: 'km' },
                  { key: 'liter', label: 'liter' },
                ] as const).map((field) => (
                  <label key={field.key} style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontWeight: 700 }}>{field.label}</span>
                    <input
                      type='number'
                      min='0'
                      step='0.01'
                      value={form[field.key]}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          [field.key]: event.target.value,
                        }))
                      }
                      required
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: '1px solid rgba(148, 163, 184, 0.26)',
                        background: '#0f172a',
                        color: '#f8fafc',
                      }}
                    />
                  </label>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button
                  type='submit'
                  disabled={submitting}
                  style={{
                    border: 0,
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontWeight: 700,
                    background: '#16a34a',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <Save size={18} />
                  {submitting ? 'Saving...' : 'Save constants'}
                </button>

                <button
                  type='button'
                  onClick={loadConstants}
                  disabled={loadingConstants || submitting}
                  style={{
                    border: '1px solid rgba(248, 250, 252, 0.18)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    fontWeight: 700,
                    background: 'transparent',
                    color: '#f8fafc',
                    cursor: 'pointer',
                  }}
                >
                  {loadingConstants ? 'Refreshing...' : 'Refresh values'}
                </button>
              </div>
            </form>
          </div>
        )}

        {message ? (
          <div style={{ padding: '0 24px 24px', color: '#86efac', fontWeight: 600 }}>{message}</div>
        ) : null}

        {error ? (
          <div style={{ padding: '0 24px 24px', color: '#fca5a5', fontWeight: 600 }}>{error}</div>
        ) : null}
      </div>
    </main>
  );
}
