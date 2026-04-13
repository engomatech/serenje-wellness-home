export const id     = 'billing';
export const name   = 'Patient Accounts';
export const icon   = '💰';
export const desc   = 'Patient financial accounts, admission deposits, balance tracking and responsible-person reminders.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   PERSISTENCE  (localStorage so balances survive page refresh)
   ══════════════════════════════════════════════════════════════════════ */
const BILLING_KEY = 'swh_billing_v1';

function loadData() {
  try {
    const raw = localStorage.getItem(BILLING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveData(data) {
  localStorage.setItem(BILLING_KEY, JSON.stringify(data));
  // Notify app shell to refresh the billing alert bell
  window.dispatchEvent(new CustomEvent('swh:billing-updated'));
}

/* ── Default config ─────────────────────────────────────────────────── */
const DEFAULT_CONFIG = {
  minDeposit:    10000,   // ZMW — minimum required at admission
  dailyRate:     500,     // ZMW — indicative daily service fee
  lowThreshold:  0.30,    // 30 % of minDeposit = low-balance warning
  currency:      'ZMW',
  facilityPhone: '+260 211 000 000',
  facilityEmail: 'accounts@serenjewellness.org',
};

/* ── Seed initial data ──────────────────────────────────────────────── */
function init() {
  if (loadData()) return;
  const today = new Date().toISOString().slice(0, 10);
  const data = {
    config: { ...DEFAULT_CONFIG },
    accounts: {
      R001: { responsiblePerson: { name: 'Mr. James Tembo',    rel: 'Husband',  phone: '+260 977 100 001' }, transactions: [{ id: 1, type: 'deposit', amount: 15000, date: '2026-03-10', method: 'Bank transfer', ref: 'SWH-001', notes: 'Admission deposit', by: 'Accounts' }, { id: 2, type: 'charge', amount: 500, date: today, method: '', ref: '', notes: 'Daily service fee', by: 'System' }] },
      R002: { responsiblePerson: { name: 'Mrs. Grace Mwale',   rel: 'Wife',     phone: '+260 977 100 002' }, transactions: [{ id: 3, type: 'deposit', amount: 8000, date: '2026-03-14', method: 'Cash', ref: 'SWH-002', notes: 'Admission deposit', by: 'Accounts' }, { id: 4, type: 'charge', amount: 500, date: today, method: '', ref: '', notes: 'Daily service fee', by: 'System' }] },
      R003: { responsiblePerson: { name: 'Mr. Peter Lungu',    rel: 'Brother',  phone: '+260 977 100 003' }, transactions: [{ id: 5, type: 'deposit', amount: 12000, date: '2026-03-18', method: 'Mobile money', ref: 'SWH-003', notes: 'Admission deposit', by: 'Accounts' }] },
      R004: { responsiblePerson: { name: 'Mrs. Alice Sakala',  rel: 'Daughter', phone: '+260 977 100 004' }, transactions: [{ id: 6, type: 'deposit', amount: 3000, date: '2026-03-20', method: 'Cash', ref: 'SWH-004', notes: 'Partial admission deposit — balance pending', by: 'Accounts' }] },
      R005: { responsiblePerson: { name: 'Mr. David Mutale',   rel: 'Spouse',   phone: '+260 977 100 005' }, transactions: [] },
    },
  };
  saveData(data);
}

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: 'R001', name: 'Agnes Tembo',     age: 34, gender: 'Female', room: 'Room A, Bed 1', admitDate: '2026-03-10', substance: 'Alcohol' },
  { id: 'R002', name: 'Bernard Mwale',   age: 45, gender: 'Male',   room: 'Room A, Bed 2', admitDate: '2026-03-14', substance: 'Cannabis' },
  { id: 'R003', name: 'Catherine Lungu', age: 29, gender: 'Female', room: 'Room B, Bed 1', admitDate: '2026-03-18', substance: 'Opioids' },
  { id: 'R004', name: 'David Sakala',    age: 52, gender: 'Male',   room: 'Room B, Bed 2', admitDate: '2026-03-20', substance: 'Alcohol' },
  { id: 'R005', name: 'Esther Mutale',   age: 38, gender: 'Female', room: 'Room C, Bed 1', admitDate: '2026-03-25', substance: 'Stimulants' },
];

function fmt(n) {
  return Number(n).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getBalance(txns) {
  return txns.reduce((sum, t) => {
    if (t.type === 'deposit' || t.type === 'refund') return sum + Number(t.amount);
    return sum - Number(t.amount);
  }, 0);
}

function accountStatus(balance, config) {
  const low = config.minDeposit * config.lowThreshold;
  if (balance <= 0)           return { label: 'Depleted',    cls: 'bl-status--red',   icon: '🔴' };
  if (balance < config.minDeposit * 0.5 && balance < low) return { label: 'Critical', cls: 'bl-status--red',   icon: '🔴' };
  if (balance < config.minDeposit) return { label: 'Low',    cls: 'bl-status--amber', icon: '🟡' };
  return                             { label: 'Sufficient',  cls: 'bl-status--green', icon: '🟢' };
}

/* Public helper used by app.js notification bell */
export function getLowBalanceCount() {
  const data = loadData();
  if (!data) return 0;
  const cfg = data.config;
  return Object.values(data.accounts).filter(acc => {
    const bal = getBalance(acc.transactions || []);
    return bal < cfg.minDeposit;
  }).length;
}

/* ══════════════════════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  view:   'accounts',  // accounts | account | settings
  pid:    null,
  modal:  null,        // null | 'deposit' | 'charge' | 'reminder' | 'edit-rp'
};

/* ══════════════════════════════════════════════════════════════════════
   RENDER ENTRY
   ══════════════════════════════════════════════════════════════════════ */
export function render(container) {
  init();
  container.innerHTML = '';
  container.className = 'bl-root';

  if (state.view === 'accounts') renderAccounts(container);
  else if (state.view === 'account')  renderAccount(container);
  else if (state.view === 'settings') renderSettings(container);

  bindEvents(container);
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: ACCOUNTS LIST
   ══════════════════════════════════════════════════════════════════════ */
function renderAccounts(container) {
  const data = loadData();
  const cfg  = data.config;

  const rows = PATIENTS.map(p => {
    const acc = data.accounts[p.id] || { responsiblePerson: {}, transactions: [] };
    const bal = getBalance(acc.transactions);
    const st  = accountStatus(bal, cfg);
    const hasDeposit = acc.transactions.some(t => t.type === 'deposit');
    return { p, acc, bal, st, hasDeposit };
  });

  const depleted = rows.filter(r => r.st.label === 'Depleted' || r.st.label === 'Critical').length;
  const low      = rows.filter(r => r.st.label === 'Low').length;
  const ok       = rows.filter(r => r.st.label === 'Sufficient').length;
  const noDeposit= rows.filter(r => !r.hasDeposit).length;

  container.innerHTML = `
    <div class="bl-header">
      <div class="bl-header-inner">
        <div class="bl-title-row">
          <span class="bl-hicon">💰</span>
          <div>
            <h1 class="bl-title">Patient Accounts</h1>
            <p class="bl-subtitle">Minimum deposit: ${cfg.currency} ${fmt(cfg.minDeposit)} · Daily rate: ${cfg.currency} ${fmt(cfg.dailyRate)}</p>
          </div>
        </div>
        <button class="bl-btn bl-btn--outline" data-action="go-settings">⚙️ Settings</button>
      </div>
    </div>

    <div class="bl-body">
      <!-- Summary KPIs -->
      <div class="bl-kpi-row">
        <div class="bl-kpi bl-kpi--red">
          <div class="bl-kpi-num">${depleted}</div>
          <div class="bl-kpi-label">Depleted / Critical</div>
        </div>
        <div class="bl-kpi bl-kpi--amber">
          <div class="bl-kpi-num">${low}</div>
          <div class="bl-kpi-label">Low Balance</div>
        </div>
        <div class="bl-kpi bl-kpi--green">
          <div class="bl-kpi-num">${ok}</div>
          <div class="bl-kpi-label">Sufficient</div>
        </div>
        <div class="bl-kpi bl-kpi--blue">
          <div class="bl-kpi-num">${noDeposit}</div>
          <div class="bl-kpi-label">No Deposit Yet</div>
        </div>
      </div>

      ${depleted > 0 || noDeposit > 0 ? `
      <div class="bl-alert-banner">
        ⚠️ <strong>${depleted + noDeposit} patient(s) require immediate financial attention.</strong>
        No treatment should proceed until a minimum deposit of ${cfg.currency} ${fmt(cfg.minDeposit)} is on account.
      </div>` : ''}

      <!-- Patient account rows -->
      <div class="bl-account-list">
        ${rows.map(({ p, acc, bal, st, hasDeposit }) => {
          const rp = acc.responsiblePerson || {};
          const pct = Math.min(100, Math.round((bal / cfg.minDeposit) * 100));
          const barColor = st.cls.includes('red') ? '#dc2626' : st.cls.includes('amber') ? '#d97706' : '#059669';
          return `
          <div class="bl-account-row${!hasDeposit ? ' bl-row--no-deposit' : ''}" data-action="open-account" data-pid="${p.id}">
            <div class="bl-row-left">
              <div class="bl-row-avatar">${p.name.charAt(0)}</div>
            </div>
            <div class="bl-row-body">
              <div class="bl-row-name">${p.name} <span class="bl-row-id">${p.id}</span></div>
              <div class="bl-row-meta">${p.room} · Admitted ${fmtDate(p.admitDate)}</div>
              <div class="bl-row-rp">${rp.name ? `👤 ${rp.name} (${rp.rel || '—'}) · ${rp.phone || '—'}` : '⚠️ No responsible person recorded'}</div>
              <div class="bl-row-bar-wrap">
                <div class="bl-row-bar" style="width:${pct}%;background:${barColor}"></div>
              </div>
            </div>
            <div class="bl-row-right">
              <div class="bl-row-balance">${cfg.currency} ${fmt(bal)}</div>
              <span class="bl-status-badge ${st.cls}">${st.icon} ${st.label}</span>
              ${!hasDeposit ? '<span class="bl-no-deposit-pill">No deposit</span>' : ''}
              <div class="bl-row-actions" onclick="event.stopPropagation()">
                <button class="bl-btn bl-btn--sm bl-btn--primary" data-action="quick-deposit" data-pid="${p.id}">+ Deposit</button>
                <button class="bl-btn bl-btn--sm bl-btn--outline" data-action="quick-remind" data-pid="${p.id}">📨 Remind</button>
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SINGLE ACCOUNT
   ══════════════════════════════════════════════════════════════════════ */
function renderAccount(container) {
  const data = loadData();
  const cfg  = data.config;
  const p    = PATIENTS.find(x => x.id === state.pid);
  const acc  = data.accounts[state.pid] || { responsiblePerson: {}, transactions: [] };
  const bal  = getBalance(acc.transactions);
  const st   = accountStatus(bal, cfg);
  const rp   = acc.responsiblePerson || {};

  const totalDeposited = acc.transactions.filter(t => t.type === 'deposit' || t.type === 'refund').reduce((s,t) => s + Number(t.amount), 0);
  const totalCharged   = acc.transactions.filter(t => t.type === 'charge').reduce((s,t) => s + Number(t.amount), 0);
  const shortfall      = Math.max(0, cfg.minDeposit - bal);

  container.innerHTML = `
    <div class="bl-header">
      <div class="bl-header-inner">
        <button class="bl-back" data-action="go-accounts">← All Accounts</button>
        <div class="bl-title-row">
          <span class="bl-hicon">💰</span>
          <div>
            <h1 class="bl-title">${p.name} — Account</h1>
            <p class="bl-subtitle">${p.id} · ${p.room} · ${p.substance}</p>
          </div>
        </div>
        <div class="bl-header-actions">
          <span class="bl-status-badge ${st.cls} bl-status--lg">${st.icon} ${st.label}</span>
          <button class="bl-btn bl-btn--primary" data-action="open-modal" data-modal="deposit">+ Record Deposit</button>
          <button class="bl-btn bl-btn--outline" data-action="open-modal" data-modal="reminder">📨 Send Reminder</button>
        </div>
      </div>
    </div>

    <div class="bl-body">

      ${bal < cfg.minDeposit ? `
      <div class="bl-treatment-block">
        🚫 <strong>Treatment hold:</strong> Balance of ${cfg.currency} ${fmt(bal)} is below the minimum deposit of ${cfg.currency} ${fmt(cfg.minDeposit)}.
        Shortfall: <strong>${cfg.currency} ${fmt(shortfall)}</strong>. No treatment or consultation may proceed until this is resolved.
      </div>` : ''}

      <!-- Balance summary -->
      <div class="bl-balance-summary">
        <div class="bl-bal-card bl-bal--main">
          <div class="bl-bal-label">Current Balance</div>
          <div class="bl-bal-amount" style="color:${st.cls.includes('red')?'#dc2626':st.cls.includes('amber')?'#d97706':'#059669'}">${cfg.currency} ${fmt(bal)}</div>
          <div class="bl-bal-sub">Minimum required: ${cfg.currency} ${fmt(cfg.minDeposit)}</div>
          <div class="bl-bal-bar-wrap"><div class="bl-bal-bar" style="width:${Math.min(100,Math.round(bal/cfg.minDeposit*100))}%;background:${st.cls.includes('red')?'#dc2626':st.cls.includes('amber')?'#d97706':'#059669'}"></div></div>
        </div>
        <div class="bl-bal-card">
          <div class="bl-bal-label">Total Deposited</div>
          <div class="bl-bal-amount bl-bal--green">${cfg.currency} ${fmt(totalDeposited)}</div>
        </div>
        <div class="bl-bal-card">
          <div class="bl-bal-label">Total Charged</div>
          <div class="bl-bal-amount bl-bal--red">${cfg.currency} ${fmt(totalCharged)}</div>
        </div>
        <div class="bl-bal-card">
          <div class="bl-bal-label">Days at Current Rate</div>
          <div class="bl-bal-amount">${cfg.dailyRate > 0 ? Math.floor(bal / cfg.dailyRate) : '—'}</div>
          <div class="bl-bal-sub">@ ${cfg.currency} ${fmt(cfg.dailyRate)}/day</div>
        </div>
      </div>

      <!-- Responsible person -->
      <div class="bl-card">
        <div class="bl-card-title">Responsible Person / Account Holder
          <button class="bl-btn bl-btn--sm bl-btn--outline" data-action="open-modal" data-modal="edit-rp" style="margin-left:auto">✏️ Edit</button>
        </div>
        ${rp.name ? `
        <div class="bl-rp-grid">
          <div class="bl-rp-item"><span>Name</span><strong>${rp.name}</strong></div>
          <div class="bl-rp-item"><span>Relationship</span><strong>${rp.rel || '—'}</strong></div>
          <div class="bl-rp-item"><span>Phone</span><strong>${rp.phone || '—'}</strong></div>
          <div class="bl-rp-item"><span>Email</span><strong>${rp.email || '—'}</strong></div>
          <div class="bl-rp-item"><span>WhatsApp</span><strong>${rp.whatsapp || rp.phone || '—'}</strong></div>
        </div>` : `<p class="bl-empty">No responsible person recorded. <button class="bl-link" data-action="open-modal" data-modal="edit-rp">Add now →</button></p>`}
      </div>

      <!-- Transaction history -->
      <div class="bl-card">
        <div class="bl-card-title">Transaction History
          <button class="bl-btn bl-btn--sm bl-btn--outline" data-action="open-modal" data-modal="charge" style="margin-left:auto">+ Add Charge</button>
        </div>
        ${acc.transactions.length === 0 ? '<p class="bl-empty">No transactions recorded yet.</p>' : ''}
        <div class="bl-txn-list">
          ${[...acc.transactions].reverse().map(t => {
            const isCredit = t.type === 'deposit' || t.type === 'refund';
            return `
            <div class="bl-txn-row">
              <div class="bl-txn-type-icon${isCredit ? ' bl-txn--credit' : ' bl-txn--debit'}">${isCredit ? '↑' : '↓'}</div>
              <div class="bl-txn-body">
                <div class="bl-txn-desc">${t.notes || (t.type === 'deposit' ? 'Deposit' : 'Charge')}</div>
                <div class="bl-txn-meta">${fmtDate(t.date)} · ${t.method || t.type} ${t.ref ? '· Ref: ' + t.ref : ''} · By: ${t.by || '—'}</div>
              </div>
              <div class="bl-txn-amount ${isCredit ? 'bl-txn-amt--green' : 'bl-txn-amt--red'}">
                ${isCredit ? '+' : '-'} ${cfg.currency} ${fmt(t.amount)}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>

    <!-- MODALS -->
    ${state.modal === 'deposit'  ? renderDepositModal(cfg)    : ''}
    ${state.modal === 'charge'   ? renderChargeModal(cfg)     : ''}
    ${state.modal === 'reminder' ? renderReminderModal(p, acc, bal, cfg, shortfall) : ''}
    ${state.modal === 'edit-rp'  ? renderEditRPModal(rp)      : ''}`;
}

/* ── MODALS ─────────────────────────────────────────────────────────── */
function renderDepositModal(cfg) {
  const today = new Date().toISOString().slice(0, 10);
  return `
  <div class="bl-modal-backdrop" data-action="close-modal">
    <div class="bl-modal" onclick="event.stopPropagation()">
      <div class="bl-modal-header">
        <h3>Record Deposit / Payment</h3>
        <button class="bl-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="bl-modal-body">
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Amount (${cfg.currency})</label>
            <input class="bl-input" type="number" id="dep-amount" min="1" placeholder="e.g. 10000" autofocus>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Date Received</label>
            <input class="bl-input" type="date" id="dep-date" value="${today}">
          </div>
        </div>
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Payment Method</label>
            <select class="bl-select" id="dep-method">
              <option>Cash</option>
              <option>Bank transfer</option>
              <option>Mobile money (MTN)</option>
              <option>Mobile money (Airtel)</option>
              <option>Cheque</option>
              <option>Other</option>
            </select>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Receipt / Reference No.</label>
            <input class="bl-input" id="dep-ref" placeholder="e.g. SWH-2026-042">
          </div>
        </div>
        <div class="bl-field">
          <label class="bl-field-label">Received By</label>
          <input class="bl-input" id="dep-by" placeholder="Accounts staff name">
        </div>
        <div class="bl-field">
          <label class="bl-field-label">Notes</label>
          <textarea class="bl-textarea" id="dep-notes" rows="2" placeholder="Additional notes about this payment..."></textarea>
        </div>
      </div>
      <div class="bl-modal-footer">
        <button class="bl-btn bl-btn--secondary" data-action="close-modal">Cancel</button>
        <button class="bl-btn bl-btn--primary" data-action="save-deposit">💾 Save Deposit</button>
      </div>
    </div>
  </div>`;
}

function renderChargeModal(cfg) {
  const today = new Date().toISOString().slice(0, 10);
  return `
  <div class="bl-modal-backdrop" data-action="close-modal">
    <div class="bl-modal" onclick="event.stopPropagation()">
      <div class="bl-modal-header">
        <h3>Add Service Charge</h3>
        <button class="bl-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="bl-modal-body">
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Amount (${cfg.currency})</label>
            <input class="bl-input" type="number" id="chg-amount" min="1" placeholder="e.g. 500" autofocus>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Date</label>
            <input class="bl-input" type="date" id="chg-date" value="${today}">
          </div>
        </div>
        <div class="bl-field">
          <label class="bl-field-label">Charge Type</label>
          <select class="bl-select" id="chg-type">
            <option value="Daily service fee">Daily service fee</option>
            <option value="Consultation fee">Consultation fee</option>
            <option value="Medication">Medication</option>
            <option value="Laboratory / investigations">Laboratory / investigations</option>
            <option value="Therapy session">Therapy session</option>
            <option value="Admin fee">Admin fee</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="bl-field">
          <label class="bl-field-label">Notes</label>
          <textarea class="bl-textarea" id="chg-notes" rows="2" placeholder="Details of the charge..."></textarea>
        </div>
      </div>
      <div class="bl-modal-footer">
        <button class="bl-btn bl-btn--secondary" data-action="close-modal">Cancel</button>
        <button class="bl-btn bl-btn--primary" data-action="save-charge">💾 Save Charge</button>
      </div>
    </div>
  </div>`;
}

function renderReminderModal(p, acc, bal, cfg, shortfall) {
  const rp = acc.responsiblePerson || {};
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const st = accountStatus(bal, cfg);
  const urgent = bal <= 0 || bal < cfg.minDeposit * cfg.lowThreshold;

  const message = `Dear ${rp.name || '[Responsible Person]'},

${urgent ? '⚠️ URGENT — ' : ''}Account Update: ${p.name} — Serenje Wellness Home

We wish to inform you that ${p.name}'s treatment account currently has a balance of ${cfg.currency} ${fmt(bal)}.${
  bal < cfg.minDeposit ? `\n\nThe minimum required deposit is ${cfg.currency} ${fmt(cfg.minDeposit)}. The current shortfall is ${cfg.currency} ${fmt(shortfall)}.` : ''}${
  bal <= 0 ? '\n\n🚫 IMPORTANT: Treatment and consultations are on hold until a deposit is received.' : ''}

To ensure ${p.name.split(' ')[0]}'s treatment continues without interruption, please arrange a top-up payment at your earliest convenience.

Payment options:
• Cash at the facility (ask for Accounts)
• Bank transfer — please request details from reception
• Mobile money — MTN/Airtel

For queries, please contact us:
📞 ${cfg.facilityPhone}
✉️  ${cfg.facilityEmail}

Thank you for your continued support of ${p.name.split(' ')[0]}'s recovery journey.

Serenje Wellness Home — Accounts Department
${today}`;

  return `
  <div class="bl-modal-backdrop" data-action="close-modal">
    <div class="bl-modal bl-modal--wide" onclick="event.stopPropagation()">
      <div class="bl-modal-header">
        <h3>📨 Responsible Person Reminder</h3>
        <button class="bl-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="bl-modal-body">
        ${rp.name ? `
        <div class="bl-remind-contact">
          <div class="bl-remind-to"><strong>To:</strong> ${rp.name} (${rp.rel || '—'})</div>
          <div class="bl-remind-phone">📞 ${rp.phone || '—'} &nbsp;|&nbsp; 💬 WhatsApp: ${rp.whatsapp || rp.phone || '—'}</div>
        </div>` : `<div class="bl-remind-warn">⚠️ No responsible person recorded for this patient. <a data-action="close-modal" class="bl-link">Close</a> and add one first.</div>`}
        <div class="bl-field">
          <label class="bl-field-label">Message (copy and send via WhatsApp, SMS or email)</label>
          <textarea class="bl-textarea bl-textarea--msg" id="reminder-msg" rows="16">${message}</textarea>
        </div>
      </div>
      <div class="bl-modal-footer">
        <button class="bl-btn bl-btn--secondary" data-action="close-modal">Close</button>
        <button class="bl-btn bl-btn--primary" data-action="copy-reminder">📋 Copy Message</button>
      </div>
    </div>
  </div>`;
}

function renderEditRPModal(rp) {
  return `
  <div class="bl-modal-backdrop" data-action="close-modal">
    <div class="bl-modal" onclick="event.stopPropagation()">
      <div class="bl-modal-header">
        <h3>Responsible Person Details</h3>
        <button class="bl-modal-close" data-action="close-modal">✕</button>
      </div>
      <div class="bl-modal-body">
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Full Name</label>
            <input class="bl-input" id="rp-name" value="${rp.name || ''}" placeholder="e.g. Mr. John Banda" autofocus>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Relationship to Patient</label>
            <select class="bl-select" id="rp-rel">
              <option value="">— Select —</option>
              ${['Spouse','Parent','Sibling','Child','Other relative','Friend','Employer','Guardian','Sponsor','Social worker','Other'].map(r => `<option${rp.rel===r?' selected':''}>${r}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Phone Number</label>
            <input class="bl-input" id="rp-phone" value="${rp.phone || ''}" placeholder="+260...">
          </div>
          <div class="bl-field">
            <label class="bl-field-label">WhatsApp (if different)</label>
            <input class="bl-input" id="rp-whatsapp" value="${rp.whatsapp || ''}" placeholder="+260...">
          </div>
        </div>
        <div class="bl-field">
          <label class="bl-field-label">Email Address</label>
          <input class="bl-input" id="rp-email" value="${rp.email || ''}" placeholder="name@example.com">
        </div>
      </div>
      <div class="bl-modal-footer">
        <button class="bl-btn bl-btn--secondary" data-action="close-modal">Cancel</button>
        <button class="bl-btn bl-btn--primary" data-action="save-rp">💾 Save</button>
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SETTINGS
   ══════════════════════════════════════════════════════════════════════ */
function renderSettings(container) {
  const data = loadData();
  const cfg  = data.config;
  container.innerHTML = `
    <div class="bl-header">
      <div class="bl-header-inner">
        <button class="bl-back" data-action="go-accounts">← Accounts</button>
        <div class="bl-title-row">
          <span class="bl-hicon">⚙️</span>
          <div><h1 class="bl-title">Billing Settings</h1><p class="bl-subtitle">Configure minimum deposit, rates and facility contact details</p></div>
        </div>
      </div>
    </div>
    <div class="bl-body">
      <div class="bl-card">
        <div class="bl-card-title">Financial Thresholds</div>
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Minimum Admission Deposit (${cfg.currency})</label>
            <input class="bl-input" type="number" id="cfg-min" value="${cfg.minDeposit}" min="0">
            <span class="bl-field-hint">Patients must have this amount on account before treatment begins</span>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Daily Service Rate (${cfg.currency})</label>
            <input class="bl-input" type="number" id="cfg-rate" value="${cfg.dailyRate}" min="0">
            <span class="bl-field-hint">Used to estimate how many days current balance covers</span>
          </div>
        </div>
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Low Balance Warning Threshold</label>
            <select class="bl-select" id="cfg-threshold">
              ${[['10%','0.10'],['20%','0.20'],['25%','0.25'],['30%','0.30'],['40%','0.40'],['50%','0.50']].map(([l,v]) => `<option value="${v}"${cfg.lowThreshold==v?' selected':''}>${l} of minimum deposit</option>`).join('')}
            </select>
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Currency</label>
            <select class="bl-select" id="cfg-currency">
              ${['ZMW','USD','EUR','GBP','ZAR'].map(c => `<option${cfg.currency===c?' selected':''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="bl-card">
        <div class="bl-card-title">Facility Contact (used in reminders)</div>
        <div class="bl-field-row">
          <div class="bl-field">
            <label class="bl-field-label">Phone Number</label>
            <input class="bl-input" id="cfg-phone" value="${cfg.facilityPhone}" placeholder="+260...">
          </div>
          <div class="bl-field">
            <label class="bl-field-label">Email Address</label>
            <input class="bl-input" id="cfg-email" value="${cfg.facilityEmail}" placeholder="accounts@...">
          </div>
        </div>
      </div>
      <div class="bl-save-row">
        <button class="bl-btn bl-btn--primary" data-action="save-settings">💾 Save Settings</button>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   EVENTS
   ══════════════════════════════════════════════════════════════════════ */
function bindEvents(container) {
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'go-accounts':
        state.view = 'accounts'; state.pid = null; state.modal = null;
        render(container); break;

      case 'open-account':
        state.view = 'account'; state.pid = el.dataset.pid; state.modal = null;
        render(container); break;

      case 'go-settings':
        state.view = 'settings'; state.modal = null;
        render(container); break;

      case 'quick-deposit':
        state.view = 'account'; state.pid = el.dataset.pid; state.modal = 'deposit';
        render(container); break;

      case 'quick-remind':
        state.view = 'account'; state.pid = el.dataset.pid; state.modal = 'reminder';
        render(container); break;

      case 'open-modal':
        state.modal = el.dataset.modal;
        render(container); break;

      case 'close-modal':
        state.modal = null;
        render(container); break;

      case 'save-deposit':    saveDeposit(container); break;
      case 'save-charge':     saveCharge(container); break;
      case 'save-rp':         saveRP(container); break;
      case 'save-settings':   saveSettings(container); break;
      case 'copy-reminder':   copyReminder(container); break;
    }
  });
}

/* ── SAVE FUNCTIONS ─────────────────────────────────────────────────── */
function saveDeposit(container) {
  const amount = parseFloat(container.querySelector('#dep-amount')?.value);
  if (!amount || amount <= 0) { alert('Please enter a valid amount.'); return; }
  const data = loadData();
  if (!data.accounts[state.pid]) data.accounts[state.pid] = { responsiblePerson: {}, transactions: [] };
  data.accounts[state.pid].transactions.push({
    id:     Date.now(),
    type:   'deposit',
    amount,
    date:   container.querySelector('#dep-date')?.value   || '',
    method: container.querySelector('#dep-method')?.value || '',
    ref:    container.querySelector('#dep-ref')?.value    || '',
    by:     container.querySelector('#dep-by')?.value     || '',
    notes:  container.querySelector('#dep-notes')?.value  || 'Deposit',
  });
  saveData(data);
  state.modal = null;
  render(container);
  showToast(container, `Deposit of ${data.config.currency} ${fmt(amount)} recorded`);
}

function saveCharge(container) {
  const amount = parseFloat(container.querySelector('#chg-amount')?.value);
  if (!amount || amount <= 0) { alert('Please enter a valid amount.'); return; }
  const data = loadData();
  if (!data.accounts[state.pid]) data.accounts[state.pid] = { responsiblePerson: {}, transactions: [] };
  const type = container.querySelector('#chg-type')?.value || 'Charge';
  data.accounts[state.pid].transactions.push({
    id:     Date.now(),
    type:   'charge',
    amount,
    date:   container.querySelector('#chg-date')?.value   || '',
    method: type,
    ref:    '',
    by:     'System',
    notes:  (container.querySelector('#chg-notes')?.value || type),
  });
  saveData(data);
  state.modal = null;
  render(container);
  showToast(container, `Charge of ${data.config.currency} ${fmt(amount)} added`);
}

function saveRP(container) {
  const data = loadData();
  if (!data.accounts[state.pid]) data.accounts[state.pid] = { responsiblePerson: {}, transactions: [] };
  data.accounts[state.pid].responsiblePerson = {
    name:     container.querySelector('#rp-name')?.value     || '',
    rel:      container.querySelector('#rp-rel')?.value      || '',
    phone:    container.querySelector('#rp-phone')?.value    || '',
    whatsapp: container.querySelector('#rp-whatsapp')?.value || '',
    email:    container.querySelector('#rp-email')?.value    || '',
  };
  saveData(data);
  state.modal = null;
  render(container);
  showToast(container, 'Responsible person updated');
}

function saveSettings(container) {
  const data = loadData();
  data.config.minDeposit    = parseFloat(container.querySelector('#cfg-min')?.value)       || data.config.minDeposit;
  data.config.dailyRate     = parseFloat(container.querySelector('#cfg-rate')?.value)      || data.config.dailyRate;
  data.config.lowThreshold  = parseFloat(container.querySelector('#cfg-threshold')?.value) || data.config.lowThreshold;
  data.config.currency      = container.querySelector('#cfg-currency')?.value              || data.config.currency;
  data.config.facilityPhone = container.querySelector('#cfg-phone')?.value                 || data.config.facilityPhone;
  data.config.facilityEmail = container.querySelector('#cfg-email')?.value                 || data.config.facilityEmail;
  saveData(data);
  render(container);
  showToast(container, 'Settings saved');
}

function copyReminder(container) {
  const msg = container.querySelector('#reminder-msg')?.value || '';
  if (navigator.clipboard) {
    navigator.clipboard.writeText(msg).then(() => showToast(container, 'Message copied to clipboard'));
  } else {
    const ta = container.querySelector('#reminder-msg');
    if (ta) { ta.select(); document.execCommand('copy'); showToast(container, 'Message copied'); }
  }
}

function showToast(container, msg) {
  let t = document.querySelector('.bl-toast');
  if (!t) { t = document.createElement('div'); t.className = 'bl-toast'; document.body.appendChild(t); }
  t.textContent = '✓ ' + msg;
  t.classList.add('bl-toast--show');
  setTimeout(() => t.classList.remove('bl-toast--show'), 2500);
}
