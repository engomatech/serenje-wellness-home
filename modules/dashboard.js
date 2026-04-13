export const id     = 'dashboard';
export const name   = 'Dashboard';
export const icon   = '🏠';
export const desc   = 'Live overview — census, staffing, alerts and daily stats.';
export const status = 'live';
export const badge  = null;

/* ── DATA (replace with real API calls later) ── */
const STATS = [
  { icon: '🛏️',  label: 'Residents in Programme', value: '24',  sub: '2 discharges this week',      color: 'green' },
  { icon: '🔴',  label: 'High Relapse Risk',       value: '3',   sub: 'MDT review required',         color: 'red'   },
  { icon: '🔍',  label: 'Screenings Pending',      value: '2',   sub: 'Awaiting clinician review',   color: 'gold'  },
  { icon: '📋',  label: 'Treatment Plans Active',  value: '21',  sub: '3 due for MDT review',        color: 'blue'  },
];

const ALERTS = [
  { level: 'urgent', icon: '🔴', title: 'High Relapse Risk — R002, R004, R005',  time: 'Now',       detail: 'Weekly MDT relapse-risk scores flagged High. Treatment plan review required.' },
  { level: 'urgent', icon: '💊', title: 'MAR Overdue — Morning Round, Room A',   time: '08:30',     detail: '4 residents pending medication administration sign-off.' },
  { level: 'warn',   icon: '🔍', title: '2 Screenings Awaiting Clinician Review', time: 'Today',     detail: 'AUDIT and ASSIST results scored. Psychologist action required for escalation.' },
  { level: 'warn',   icon: '📋', title: 'MDT Review Due — 3 Treatment Plans',    time: 'This week', detail: 'Plans for R001, R003, R007 are at weekly review checkpoint.' },
  { level: 'info',   icon: '📄', title: 'Incident Report #IR-004 Unresolved',    time: 'Yesterday', detail: 'Hypoglycaemic episode — awaiting Clinical Director sign-off.' },
  { level: 'info',   icon: '🚪', title: 'Discharge Planning — R006 at Midpoint', time: 'This week', detail: 'Social Worker to initiate discharge planning form for R006.' },
];

const ACTIVITY = [
  { icon: '🔍', text: 'AUDIT screening completed — R008, score 24 (Dependent). Escalated to Assessment.',  time: '08:15' },
  { icon: '📝', text: 'SOAP note submitted — Individual counselling, R002 — N. Banda',                     time: '07:52' },
  { icon: '💊', text: 'MAR signed off — Morning medications, Room A — T. Phiri',                           time: '07:30' },
  { icon: '🧠', text: 'Comprehensive Assessment completed — R008, ASAM Level III recommended',             time: '07:10' },
  { icon: '📋', text: 'Treatment plan updated — R003, trauma-informed intervention added',                 time: 'Yesterday' },
  { icon: '🚪', text: 'Discharge summary generated — R006, planned completion 18 Apr 2026',               time: 'Yesterday' },
];

const ON_DUTY = [
  { initials: 'NB', name: 'N. Banda',   role: 'Senior Nurse',     shift: 'Morning', ward: 'Room A' },
  { initials: 'PM', name: 'P. Mwansa',  role: 'Care Assistant',   shift: 'Morning', ward: 'Room B' },
  { initials: 'CM', name: 'C. Mulenga', role: 'Physiotherapist',  shift: 'Morning', ward: 'Therapy' },
  { initials: 'ML', name: 'M. Lungu',   role: 'Care Assistant',   shift: 'Evening', ward: 'Room A' },
  { initials: 'TP', name: 'T. Phiri',   role: 'Senior Nurse',     shift: 'Evening', ward: 'Room B' },
];

const QUICK_ACTIONS = [
  { icon: '📋', label: 'Log Incident',   route: 'clinical'   },
  { icon: '🛏️', label: 'Add Resident',  route: 'residents'  },
  { icon: '📅', label: 'View Roster',   route: 'scheduling' },
  { icon: '📢', label: 'Post Notice',   route: 'announcements' },
];

/* ── RENDER ── */
export function render(container) {
  container.innerHTML = `
    <!-- Stats Row -->
    <div class="db-stats-row">
      ${STATS.map(s => `
        <div class="db-stat-card db-stat-${s.color}">
          <div class="db-stat-icon">${s.icon}</div>
          <div class="db-stat-body">
            <div class="db-stat-value">${s.value}</div>
            <div class="db-stat-label">${s.label}</div>
            <div class="db-stat-sub">${s.sub}</div>
          </div>
        </div>`).join('')}
    </div>

    <!-- Main Grid -->
    <div class="db-grid">

      <!-- LEFT: Alerts + Activity -->
      <div class="db-col-left">

        <!-- Alerts -->
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">⚠️ Active Alerts</span>
            <span class="db-card-count">${ALERTS.length}</span>
          </div>
          <div class="db-alerts">
            ${ALERTS.map(a => `
              <div class="db-alert db-alert-${a.level}">
                <div class="db-alert-icon">${a.icon}</div>
                <div class="db-alert-body">
                  <div class="db-alert-title">${a.title}</div>
                  <div class="db-alert-detail">${a.detail}</div>
                </div>
                <div class="db-alert-time">${a.time}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Activity Feed -->
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">📰 Recent Activity</span>
          </div>
          <div class="db-feed">
            ${ACTIVITY.map(a => `
              <div class="db-feed-item">
                <div class="db-feed-icon">${a.icon}</div>
                <div class="db-feed-text">${a.text}</div>
                <div class="db-feed-time">${a.time}</div>
              </div>`).join('')}
          </div>
        </div>

      </div>

      <!-- RIGHT: On Duty + Quick Actions -->
      <div class="db-col-right">

        <!-- Quick Actions -->
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">⚡ Quick Actions</span>
          </div>
          <div class="db-actions">
            ${QUICK_ACTIONS.map(a => `
              <button class="db-action-btn" data-route="${a.route}">
                <span>${a.icon}</span>
                <span>${a.label}</span>
              </button>`).join('')}
          </div>
        </div>

        <!-- On Duty -->
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">👤 Staff On Duty</span>
            <span class="db-card-count">${ON_DUTY.length}</span>
          </div>
          <div class="db-duty-list">
            ${ON_DUTY.map(s => `
              <div class="db-duty-item">
                <div class="db-duty-avatar">${s.initials}</div>
                <div class="db-duty-info">
                  <div class="db-duty-name">${s.name}</div>
                  <div class="db-duty-role">${s.role} · ${s.ward}</div>
                </div>
                <span class="db-shift-pill db-shift-${s.shift.toLowerCase()}">${s.shift}</span>
              </div>`).join('')}
          </div>
        </div>

        <!-- Centre Status -->
        <div class="db-card db-status-card">
          <div class="db-card-header">
            <span class="db-card-title">🏥 Centre Status</span>
          </div>
          <div class="db-status-rows">
            <div class="db-status-row">
              <span>Bed Occupancy</span>
              <div class="db-bar-wrap"><div class="db-bar" style="width:80%"></div></div>
              <span class="db-bar-label">24 / 30</span>
            </div>
            <div class="db-status-row">
              <span>Staffing Level</span>
              <div class="db-bar-wrap"><div class="db-bar db-bar-blue" style="width:75%"></div></div>
              <span class="db-bar-label">12 / 16</span>
            </div>
            <div class="db-status-row">
              <span>Tasks Complete</span>
              <div class="db-bar-wrap"><div class="db-bar db-bar-gold" style="width:65%"></div></div>
              <span class="db-bar-label">13 / 20</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  /* wire quick-action buttons to router */
  container.querySelectorAll('.db-action-btn[data-route]').forEach(btn => {
    btn.addEventListener('click', () => { location.hash = btn.dataset.route; });
  });
}
