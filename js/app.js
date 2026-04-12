/**
 * Serenje Wellness Home — App Shell
 * Simple hash-based router with module registry.
 * Each module in /modules/ exports: { id, name, icon, desc, status, render() }
 */

import * as Dashboard      from '../modules/dashboard.js';
import * as Residents      from '../modules/residents.js';
import * as Clinical       from '../modules/clinical.js';
import * as Scheduling     from '../modules/scheduling.js';
import * as HR             from '../modules/hr.js';
import * as Training       from '../modules/training.js';
import * as Reports        from '../modules/reports.js';
import * as Announcements  from '../modules/announcements.js';
import * as ITSystems      from '../modules/it-systems.js';
import * as Settings       from '../modules/settings.js';

/* ── VIRTUAL MODULE: All Modules view ── */
const ModulesView = {
  id: 'modules', name: 'All Modules', icon: '⊞', desc: '', status: 'live', badge: null,
  render: (c) => { renderHome(); }
};

/* ── MODULE REGISTRY ────────────────────────────────── */
export const MODULES = [
  Dashboard,
  ModulesView,
  Residents,
  Clinical,
  Scheduling,
  HR,
  Training,
  Reports,
  Announcements,
  ITSystems,
  Settings,
];

/* ── NAV GROUPS ─────────────────────────────────────── */
const NAV = [
  {
    label: 'Overview',
    items: ['dashboard', 'modules'],
  },
  {
    label: 'Care',
    items: ['residents', 'clinical', 'scheduling'],
  },
  {
    label: 'People',
    items: ['hr', 'training'],
  },
  {
    label: 'Operations',
    items: ['reports', 'announcements', 'it-systems'],
  },
  {
    label: 'Admin',
    items: ['settings'],
  },
];

/* ── ROUTER ─────────────────────────────────────────── */
function getRoute() {
  return location.hash.replace('#', '') || 'dashboard';
}

function navigate(id) {
  location.hash = id;
}

/* ── RENDER ─────────────────────────────────────────── */
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
        ? `<span class="badge ${m.badgeStyle || ''}">${m.badge}</span>`
        : '';
      return `
        <div class="nav-item ${isActive ? 'active' : ''}" data-route="${m.id}">
          <span class="nav-icon">${m.icon}</span>
          <span>${m.name}</span>
          ${badgeHtml}
        </div>`;
    }).join('')}
  `).join('');

  sidebar.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });
}

function renderHome() {
  document.getElementById('page-title').textContent = 'All Modules';
  document.getElementById('breadcrumb').textContent = 'Serenje Wellness Home → Overview';

  const html = `
    <div class="module-grid">
      ${MODULES.filter(m => m.id !== 'dashboard').map(m => `
        <div class="module-card" data-route="${m.id}">
          <div class="mc-icon">${m.icon}</div>
          <div class="mc-name">${m.name}</div>
          <div class="mc-desc">${m.desc}</div>
          <span class="mc-status status-${m.status}">
            ${m.status === 'live'    ? '&#9679; Live'        : ''}
            ${m.status === 'build'   ? '&#9679; In Progress' : ''}
            ${m.status === 'planned' ? '&#9675; Planned'     : ''}
          </span>
        </div>
      `).join('')}
    </div>`;

  document.getElementById('main-content').innerHTML = html;

  document.querySelectorAll('.module-card').forEach(el => {
    el.addEventListener('click', () => navigate(el.dataset.route));
  });
}

function renderModule(id) {
  const mod = MODULES.find(m => m.id === id);
  if (!mod) { navigate('home'); return; }

  document.getElementById('page-title').textContent = mod.name;
  document.getElementById('breadcrumb').textContent =
    `Serenje Wellness Home → ${mod.name}`;

  const content = document.getElementById('main-content');
  content.innerHTML = '';
  mod.render(content);
}

/* ── DATE DISPLAY ───────────────────────────────────── */
function setDate() {
  const el = document.getElementById('today-label');
  if (el) el.textContent = new Date().toLocaleDateString('en-GB', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
  });
}

/* ── INIT ────────────────────────────────────────────── */
function onRoute() {
  const route = getRoute();
  renderSidebar(route === 'modules' ? null : route);
  if (route === 'modules') renderHome();
  else renderModule(route);
}

window.addEventListener('hashchange', onRoute);
window.addEventListener('DOMContentLoaded', () => { setDate(); onRoute(); });
