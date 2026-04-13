/**
 * Serenje Wellness Home — SATM System
 * Substance Use Disorder Screening, Assessment, Treatment & Management
 *
 * Hash-based router with module registry.
 * Each module in /modules/ exports: { id, name, icon, desc, status, badge?, render(container) }
 *
 * Tech Spec: SUD_SATM_TechSpec_v1.0 | Version 1.0, April 2026
 */

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
  {
    label: 'Overview',
    items: ['dashboard', 'modules'],
  },
  {
    label: 'Clinical Pathway',
    items: ['intake', 'screening', 'assessment', 'treatment', 'casemanagement', 'discharge'],
  },
  {
    label: 'Operations',
    items: ['reporting', 'scheduling', 'announcements'],
  },
  {
    label: 'Administration',
    items: ['hr', 'training', 'itsystems', 'settings'],
  },
];

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
  document.getElementById('breadcrumb').textContent =
    `SATM System → ${mod.name}`;

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

window.addEventListener('hashchange', onRoute);
window.addEventListener('DOMContentLoaded', () => { setDate(); onRoute(); });
