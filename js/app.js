/**
 * Serenje Wellness Home — SATM System
 * Substance Use Disorder Screening, Assessment, Treatment & Management
 *
 * Hash-based router with module registry.
 * Each module in /modules/ exports: { id, name, icon, desc, status, badge?, render(container) }
 *
 * Tech Spec: SUD_SATM_TechSpec_v1.0 | Version 1.0, April 2026
 */

import { initAuth, getSession, login, logout, changePassword, validateNewPassword, STAFF_PASSWORD } from './auth.js';

/* ── CLINICAL PATHWAY (M1–M7) ─────────────────────────────────────── */
import * as Intake         from '../modules/residents.js';       // M1
import * as Screening      from '../modules/screening.js';       // M2
import * as Assessment     from '../modules/assessment.js';      // M3
import * as Treatment      from '../modules/treatment.js';       // M4
import * as CaseManagement from '../modules/clinical.js';        // M5
import * as Discharge      from '../modules/discharge.js';       // M6
import * as Reporting      from '../modules/reports.js';         // M7

/* ── OPERATIONS ────────────────────────────────────────────────────── */
import * as Scheduling     from '../modules/scheduling.js';
import * as Announcements  from '../modules/announcements.js';

/* ── ADMINISTRATION ────────────────────────────────────────────────── */
import * as HR             from '../modules/hr.js';
import * as Training       from '../modules/training.js';
import * as ITSystems      from '../modules/it-systems.js';
import * as Settings       from '../modules/settings.js';

/* ── OVERVIEW ──────────────────────────────────────────────────────── */
import * as Dashboard      from '../modules/dashboard.js';

/* ── VIRTUAL MODULE: All Modules grid ─────────────────────────────── */
const ModulesView = {
  id: 'modules', name: 'All Modules', icon: '⊞', desc: '', status: 'live', badge: null,
  render: () => renderHome(),
};

/* ── MODULE REGISTRY ───────────────────────────────────────────────── */
export const MODULES = [
  Dashboard,
  ModulesView,
  /* Clinical Pathway */
  Intake,
  Screening,
  Assessment,
  Treatment,
  CaseManagement,
  Discharge,
  Reporting,
  /* Operations */
  Scheduling,
  Announcements,
  /* Administration */
  HR,
  Training,
  ITSystems,
  Settings,
];

/* ── NAV GROUPS ────────────────────────────────────────────────────── */
const NAV = [
  { label: 'Overview',         items: ['dashboard', 'modules'] },
  { label: 'Clinical Pathway', items: ['intake', 'screening', 'assessment', 'treatment', 'casemanagement', 'discharge'] },
  { label: 'Operations',       items: ['reporting', 'scheduling', 'announcements'] },
  { label: 'Administration',   items: ['hr', 'training', 'itsystems', 'settings'] },
];

/* ══════════════════════════════════════════════════════════════════════
   AUTH UI — login screen and password change screen
   ══════════════════════════════════════════════════════════════════════ */
function showLoginScreen(errorMsg = '') {
  hideAppShell();
  let overlay = document.getElementById('auth-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';

  overlay.innerHTML = `
    <div class="auth-card">
      <div class="auth-logo">
        <span class="auth-logo-icon">💙</span>
        <div>
          <div class="auth-logo-name">Serenje Wellness Home</div>
          <div class="auth-logo-sub">Staff Portal — SATM System</div>
        </div>
      </div>

      <h2 class="auth-heading">Sign in to your account</h2>

      ${errorMsg ? `<div class="auth-error">${errorMsg}</div>` : ''}

      <form class="auth-form" id="login-form" novalidate>
        <div class="auth-field">
          <label for="auth-user">Username</label>
          <input id="auth-user" type="text" placeholder="admin or staff" autocomplete="username" autofocus>
        </div>
        <div class="auth-field">
          <label for="auth-pass">Password</label>
          <div class="auth-pw-wrap">
            <input id="auth-pass" type="password" placeholder="Enter password" autocomplete="current-password">
            <button type="button" class="auth-pw-toggle" id="pw-toggle" title="Show/hide password">👁️</button>
          </div>
        </div>
        <button class="auth-submit" type="submit">Sign In →</button>
      </form>

      <div class="auth-staff-hint">
        <div class="auth-staff-hint-title">👥 Shared Staff Account</div>
        <div class="auth-staff-hint-row"><span>Username</span><code>staff</code></div>
        <div class="auth-staff-hint-row"><span>Password</span><code>${STAFF_PASSWORD}</code></div>
        <div class="auth-staff-hint-note">Admin account credentials are issued separately.</div>
      </div>
    </div>`;

  document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    const username = document.getElementById('auth-user').value.trim();
    const password = document.getElementById('auth-pass').value;
    if (!username || !password) return;
    const result = login(username, password);
    if (!result.ok) {
      showLoginScreen(result.error);
      return;
    }
    if (result.session.firstLogin && result.session.role === 'admin') {
      showChangePasswordScreen(result.session);
      return;
    }
    bootApp(result.session);
  });

  document.getElementById('pw-toggle').addEventListener('click', () => {
    const inp = document.getElementById('auth-pass');
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });
}

function showChangePasswordScreen(session) {
  hideAppShell();
  let overlay = document.getElementById('auth-overlay');
  if (!overlay) { overlay = document.createElement('div'); overlay.id = 'auth-overlay'; document.body.appendChild(overlay); }
  overlay.style.display = 'flex';

  overlay.innerHTML = `
    <div class="auth-card">
      <div class="auth-logo">
        <span class="auth-logo-icon">💙</span>
        <div>
          <div class="auth-logo-name">Serenje Wellness Home</div>
          <div class="auth-logo-sub">Administrator Setup</div>
        </div>
      </div>

      <h2 class="auth-heading">Set your Admin password</h2>
      <p class="auth-intro">Welcome, Administrator. For security, you must set a new password before accessing the system. You will not be able to skip this step.</p>

      <div id="chpw-error" class="auth-error" style="display:none"></div>

      <form class="auth-form" id="chpw-form" novalidate>
        <div class="auth-field">
          <label for="chpw-new">New Password</label>
          <div class="auth-pw-wrap">
            <input id="chpw-new" type="password" placeholder="New password" autocomplete="new-password" autofocus>
            <button type="button" class="auth-pw-toggle" id="chpw-toggle1" title="Show/hide">👁️</button>
          </div>
        </div>
        <div class="auth-field">
          <label for="chpw-confirm">Confirm New Password</label>
          <div class="auth-pw-wrap">
            <input id="chpw-confirm" type="password" placeholder="Confirm password" autocomplete="new-password">
            <button type="button" class="auth-pw-toggle" id="chpw-toggle2" title="Show/hide">👁️</button>
          </div>
        </div>
        <div class="auth-pw-rules">
          Password must be: at least 8 characters · one uppercase · one lowercase · one number
        </div>
        <button class="auth-submit" type="submit">Set Password &amp; Continue →</button>
      </form>
    </div>`;

  document.getElementById('chpw-toggle1').addEventListener('click', () => {
    const i = document.getElementById('chpw-new');
    i.type = i.type === 'password' ? 'text' : 'password';
  });
  document.getElementById('chpw-toggle2').addEventListener('click', () => {
    const i = document.getElementById('chpw-confirm');
    i.type = i.type === 'password' ? 'text' : 'password';
  });

  document.getElementById('chpw-form').addEventListener('submit', e => {
    e.preventDefault();
    const newPw  = document.getElementById('chpw-new').value;
    const confirm = document.getElementById('chpw-confirm').value;
    const errEl  = document.getElementById('chpw-error');

    const validErr = validateNewPassword(newPw);
    if (validErr) { errEl.textContent = validErr; errEl.style.display = ''; return; }
    if (newPw !== confirm) { errEl.textContent = 'Passwords do not match.'; errEl.style.display = ''; return; }

    const result = changePassword(session.username, newPw);
    if (!result.ok) { errEl.textContent = result.error; errEl.style.display = ''; return; }

    session.firstLogin = false;
    bootApp(session);
  });
}

function hideAuthOverlay() {
  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.style.display = 'none';
}

function hideAppShell() {
  document.querySelector('.topbar')?.style.setProperty('display','none');
  document.querySelector('.app-body')?.style.setProperty('display','none');
}

function showAppShell() {
  document.querySelector('.topbar')?.style.removeProperty('display');
  document.querySelector('.app-body')?.style.removeProperty('display');
}

/* ══════════════════════════════════════════════════════════════════════
   TOPBAR — dynamic user info + logout
   ══════════════════════════════════════════════════════════════════════ */
function renderTopbarUser(session) {
  const right = document.getElementById('topbar-right');
  if (!right) return;
  const roleLabel = session.role === 'admin' ? 'Administrator' : 'Staff';
  const roleBadge = session.role === 'admin'
    ? '<span class="topbar-role-badge topbar-role--admin">Admin</span>'
    : '<span class="topbar-role-badge topbar-role--staff">Staff</span>';
  right.innerHTML = `
    <span class="today" id="today-label"></span>
    ${roleBadge}
    <span class="topbar-username">${session.displayName}</span>
    <button class="topbar-logout" id="logout-btn" title="Sign out">⏻ Sign Out</button>`;
  setDate();
  document.getElementById('logout-btn').addEventListener('click', () => {
    if (confirm('Sign out of Serenje Wellness Home?')) logout();
  });
}

/* ══════════════════════════════════════════════════════════════════════
   BOOT — called after successful auth
   ══════════════════════════════════════════════════════════════════════ */
function bootApp(session) {
  hideAuthOverlay();
  showAppShell();
  renderTopbarUser(session);
  onRoute();

  window.addEventListener('hashchange', onRoute);
}

/* ── ROUTER ────────────────────────────────────────────────────────── */
function getRoute() {
  return location.hash.replace('#', '') || 'dashboard';
}
function navigate(id) { location.hash = id; }

/* ── SIDEBAR ───────────────────────────────────────────────────────── */
function renderSidebar(activeId) {
  const sidebar = document.getElementById('sidebar');
  const byId = Object.fromEntries(MODULES.map(m => [m.id, m]));

  sidebar.innerHTML = NAV.map(group => `
    <div class="sidebar-section-label">${group.label}</div>
    ${group.items.map(id => {
      const m = byId[id];
      if (!m) return '';
      const isActive = activeId === id;
      const badgeHtml = m.badge
        ? `<span class="badge ${m.badgeStyle || ''}">${m.badge}</span>` : '';
      const dimmed = m.status === 'planned' ? ' nav-item--planned' : '';
      return `
        <div class="nav-item${isActive ? ' active' : ''}${dimmed}" data-route="${m.id}" title="${m.status === 'planned' ? 'Coming soon' : ''}">
          <span class="nav-icon">${m.icon}</span>
          <span>${m.name}</span>
          ${badgeHtml}
          ${m.status === 'planned' ? '<span class="nav-planned-dot"></span>' : ''}
        </div>`;
    }).join('')}
  `).join('');

  sidebar.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });
}

/* ── HOME (Module Grid) ────────────────────────────────────────────── */
function renderHome() {
  document.getElementById('page-title').textContent = 'All Modules';
  document.getElementById('breadcrumb').textContent = 'Serenje Wellness Home SATM → Overview';

  const clinical = MODULES.filter(m => ['intake','screening','assessment','treatment','casemanagement','discharge','reporting'].includes(m.id));
  const ops      = MODULES.filter(m => ['scheduling','announcements'].includes(m.id));
  const admin    = MODULES.filter(m => ['hr','training','itsystems','settings'].includes(m.id));

  const section = (title, mods) => `
    <div class="mg-section-label">${title}</div>
    <div class="module-grid">
      ${mods.map(m => `
        <div class="module-card" data-route="${m.id}">
          <div class="mc-icon">${m.icon}</div>
          <div class="mc-name">${m.name}</div>
          <div class="mc-desc">${m.desc}</div>
          <span class="mc-status status-${m.status}">
            ${m.status === 'live'    ? '● Live'        : ''}
            ${m.status === 'build'   ? '● In Progress' : ''}
            ${m.status === 'planned' ? '○ Planned'     : ''}
          </span>
        </div>`).join('')}
    </div>`;

  document.getElementById('main-content').innerHTML = `
    ${section('Clinical Pathway — M1 to M7', clinical)}
    ${section('Operations', ops)}
    ${section('Administration', admin)}`;

  document.querySelectorAll('.module-card').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });
}

/* ── MODULE RENDER ─────────────────────────────────────────────────── */
function renderModule(id) {
  const mod = MODULES.find(m => m.id === id);
  if (!mod) { navigate('dashboard'); return; }

  document.getElementById('page-title').textContent = mod.name;
  document.getElementById('breadcrumb').textContent = `SATM System → ${mod.name}`;

  const content = document.getElementById('main-content');
  content.innerHTML = '';
  mod.render(content);
}

/* ── DATE ──────────────────────────────────────────────────────────── */
function setDate() {
  const el = document.getElementById('today-label');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });
}

/* ── ROUTE HANDLER ─────────────────────────────────────────────────── */
function onRoute() {
  const route = getRoute();
  renderSidebar(route === 'modules' ? null : route);
  if (route === 'modules') renderHome();
  else renderModule(route);
}

/* ══════════════════════════════════════════════════════════════════════
   ENTRY POINT
   ══════════════════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  const session = getSession();

  if (!session) {
    showLoginScreen();
    return;
  }

  if (session.firstLogin && session.role === 'admin') {
    showChangePasswordScreen(session);
    return;
  }

  bootApp(session);
});
