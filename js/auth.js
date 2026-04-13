/**
 * Serenje Wellness Home — Authentication Module
 * Pure client-side auth with SHA-256 password hashing.
 * Works on HTTP (no Web Crypto dependency).
 *
 * Accounts:
 *   admin  — Administrator, forced password change on first login
 *   staff  — Shared staff account, read access
 */

/* ══════════════════════════════════════════════════════════════════════
   SHA-256  (pure JS — works on HTTP and HTTPS)
   ══════════════════════════════════════════════════════════════════════ */
function sha256(str) {
  const rot = (x, n) => (x >>> n) | (x << (32 - n));
  const K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2,
  ];

  // UTF-8 encode
  const encoded = unescape(encodeURIComponent(str));
  const bytes = Array.from(encoded).map(c => c.charCodeAt(0));
  const len = bytes.length;

  // Pad
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0x00);
  const bitLen = len * 8;
  for (let i = 7; i >= 0; i--) bytes.push((bitLen / Math.pow(2, i * 8)) & 0xff);

  // Process blocks
  let h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];

  for (let i = 0; i < bytes.length; i += 64) {
    const w = new Array(64).fill(0);
    for (let j = 0; j < 16; j++) {
      w[j] = (bytes[i+j*4]<<24)|(bytes[i+j*4+1]<<16)|(bytes[i+j*4+2]<<8)|bytes[i+j*4+3];
    }
    for (let j = 16; j < 64; j++) {
      const s0 = rot(w[j-15],7)^rot(w[j-15],18)^(w[j-15]>>>3);
      const s1 = rot(w[j-2],17)^rot(w[j-2],19)^(w[j-2]>>>10);
      w[j] = (w[j-16]+s0+w[j-7]+s1)|0;
    }
    let [a,b,c,d,e,f,g,hh] = h;
    for (let j = 0; j < 64; j++) {
      const S1   = rot(e,6)^rot(e,11)^rot(e,25);
      const ch   = (e&f)^(~e&g);
      const tmp1 = (hh+S1+ch+K[j]+w[j])|0;
      const S0   = rot(a,2)^rot(a,13)^rot(a,22);
      const maj  = (a&b)^(a&c)^(b&c);
      const tmp2 = (S0+maj)|0;
      hh=g; g=f; f=e; e=(d+tmp1)|0; d=c; c=b; b=a; a=(tmp1+tmp2)|0;
    }
    h = h.map((v,i) => (v+[a,b,c,d,e,f,g,hh][i])|0);
  }

  return h.map(v => (v>>>0).toString(16).padStart(8,'0')).join('');
}

/* ══════════════════════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════════════════════ */
const CREDS_KEY   = 'swh_creds_v1';
const SESSION_KEY = 'swh_session_v1';

// Default admin password — must be changed on first login
const DEFAULT_ADMIN_PASS = 'Admin@Serenje1';
// Shared staff password — displayed on login screen
export const STAFF_PASSWORD = 'Welcome1';

/* ══════════════════════════════════════════════════════════════════════
   INIT — seed credentials on first run
   ══════════════════════════════════════════════════════════════════════ */
export function initAuth() {
  if (!localStorage.getItem(CREDS_KEY)) {
    const creds = {
      admin: {
        hash:        sha256(DEFAULT_ADMIN_PASS),
        role:        'admin',
        displayName: 'Administrator',
        firstLogin:  true,
      },
      staff: {
        hash:        sha256(STAFF_PASSWORD),
        role:        'user',
        displayName: 'Staff User',
        firstLogin:  false,
      },
    };
    localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
  }
}

/* ══════════════════════════════════════════════════════════════════════
   SESSION
   ══════════════════════════════════════════════════════════════════════ */
export function getSession() {
  try {
    const s = sessionStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch { return null; }
}

function setSession(session) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/* ══════════════════════════════════════════════════════════════════════
   LOGIN
   ══════════════════════════════════════════════════════════════════════ */
export function login(username, password) {
  const creds = JSON.parse(localStorage.getItem(CREDS_KEY) || '{}');
  const user  = creds[username.trim().toLowerCase()];

  if (!user) return { ok: false, error: 'Invalid username or password.' };
  if (sha256(password) !== user.hash) return { ok: false, error: 'Invalid username or password.' };

  const session = {
    username:    username.trim().toLowerCase(),
    role:        user.role,
    displayName: user.displayName,
    firstLogin:  user.firstLogin,
  };
  setSession(session);
  return { ok: true, session };
}

/* ══════════════════════════════════════════════════════════════════════
   LOGOUT
   ══════════════════════════════════════════════════════════════════════ */
export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  location.hash = '';
  location.reload();
}

/* ══════════════════════════════════════════════════════════════════════
   CHANGE PASSWORD
   ══════════════════════════════════════════════════════════════════════ */
export function changePassword(username, newPassword) {
  const creds = JSON.parse(localStorage.getItem(CREDS_KEY) || '{}');
  if (!creds[username]) return { ok: false, error: 'Account not found.' };

  creds[username].hash       = sha256(newPassword);
  creds[username].firstLogin = false;
  localStorage.setItem(CREDS_KEY, JSON.stringify(creds));

  // Patch live session
  const session = getSession();
  if (session && session.username === username) {
    session.firstLogin = false;
    setSession(session);
  }
  return { ok: true };
}

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════ */
export function isAdmin() {
  return getSession()?.role === 'admin';
}

export function validateNewPassword(pw) {
  if (pw.length < 8)            return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(pw))        return 'Must contain at least one uppercase letter.';
  if (!/[a-z]/.test(pw))        return 'Must contain at least one lowercase letter.';
  if (!/[0-9]/.test(pw))        return 'Must contain at least one number.';
  return null; // valid
}
