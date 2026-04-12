export const id     = 'residents';
export const name   = 'Residents';
export const icon   = '👥';
export const desc   = 'Resident profiles, admissions, discharges and next-of-kin records.';
export const status = 'live';
export const badge  = null;

/* ── SAMPLE DATA ─────────────────────────────────────────────────────── */
const RESIDENTS = [
  {
    id: 'R001', firstName: 'Agnes',   lastName: 'Tembo',    dob: '1942-03-12', gender: 'Female',
    room: 'Room A', bed: 'Bed 1', admissionDate: '2025-11-04', status: 'Active',
    condition: 'Dementia', diet: 'Soft foods', mobility: 'Wheelchair',
    nok: { name: 'James Tembo',   relation: 'Son',      phone: '+260 97 111 2233' },
    gp:  { name: 'Dr. C. Phiri',  phone: '+260 21 123 456' },
    notes: 'Prefers music therapy in the afternoons. Allergic to penicillin.',
  },
  {
    id: 'R002', firstName: 'Bernard', lastName: 'Mwale',    dob: '1938-07-29', gender: 'Male',
    room: 'Room A', bed: 'Bed 2', admissionDate: '2025-09-15', status: 'Active',
    condition: 'Post-stroke care', diet: 'Regular', mobility: 'Walking frame',
    nok: { name: 'Ruth Mwale',    relation: 'Daughter', phone: '+260 96 555 7788' },
    gp:  { name: 'Dr. A. Banda',  phone: '+260 21 987 654' },
    notes: 'Speech therapy on Tuesdays and Thursdays.',
  },
  {
    id: 'R003', firstName: 'Catherine', lastName: 'Lungu',  dob: '1945-01-18', gender: 'Female',
    room: 'Room B', bed: 'Bed 1', admissionDate: '2026-01-10', status: 'Active',
    condition: 'Hip fracture recovery', diet: 'Regular', mobility: 'Limited',
    nok: { name: 'Paul Lungu',    relation: 'Husband',  phone: '+260 95 333 4455' },
    gp:  { name: 'Dr. M. Zulu',   phone: '+260 21 456 789' },
    notes: 'Physiotherapy daily at 10:00. Requires pain management review.',
  },
  {
    id: 'R004', firstName: 'David',   lastName: 'Sakala',   dob: '1940-11-05', gender: 'Male',
    room: 'Room B', bed: 'Bed 2', admissionDate: '2025-08-22', status: 'Active',
    condition: 'Diabetes management', diet: 'Diabetic', mobility: 'Independent',
    nok: { name: 'Grace Sakala',  relation: 'Wife',     phone: '+260 97 222 9900' },
    gp:  { name: 'Dr. C. Phiri',  phone: '+260 21 123 456' },
    notes: 'Blood glucose monitoring twice daily. Enjoys reading.',
  },
  {
    id: 'R005', firstName: 'Esther',  lastName: 'Mutale',   dob: '1950-06-30', gender: 'Female',
    room: 'Room C', bed: 'Bed 1', admissionDate: '2026-02-14', status: 'Active',
    condition: 'Parkinson\'s disease', diet: 'Soft foods', mobility: 'Walking frame',
    nok: { name: 'Peter Mutale',  relation: 'Son',      phone: '+260 96 777 1122' },
    gp:  { name: 'Dr. A. Banda',  phone: '+260 21 987 654' },
    notes: 'Medication schedule strictly monitored. Tremor management program.',
  },
  {
    id: 'R006', firstName: 'Francis', lastName: 'Banda',    dob: '1936-09-14', gender: 'Male',
    room: 'Room C', bed: 'Bed 2', admissionDate: '2025-12-01', status: 'Discharged',
    condition: 'General elderly care', diet: 'Regular', mobility: 'Independent',
    nok: { name: 'Mary Banda',    relation: 'Daughter', phone: '+260 97 888 6677' },
    gp:  { name: 'Dr. M. Zulu',   phone: '+260 21 456 789' },
    notes: 'Discharged 2026-03-10. Follow-up with GP in 2 weeks.',
  },
];

/* ── STATE ───────────────────────────────────────────────────────────── */
let state = {
  residents: JSON.parse(JSON.stringify(RESIDENTS)), // working copy
  view: 'list',        // 'list' | 'profile' | 'add'
  selected: null,      // resident id
  search: '',
  filter: 'All',       // 'All' | 'Active' | 'Discharged'
};

/* ── HELPERS ─────────────────────────────────────────────────────────── */
function age(dob) {
  const d = new Date(dob), now = new Date();
  let a = now.getFullYear() - d.getFullYear();
  if (now < new Date(now.getFullYear(), d.getMonth(), d.getDate())) a--;
  return a;
}
function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}
function initials(r) { return (r.firstName[0] + r.lastName[0]).toUpperCase(); }
function statusClass(s) { return s === 'Active' ? 'rs-active' : 'rs-discharged'; }
function nextId(list) {
  const nums = list.map(r => parseInt(r.id.replace('R', ''))).filter(Boolean);
  return 'R' + String(Math.max(0, ...nums) + 1).padStart(3, '0');
}

/* ── FILTERED LIST ───────────────────────────────────────────────────── */
function filtered() {
  return state.residents.filter(r => {
    const q = state.search.toLowerCase();
    const matchSearch = !q || `${r.firstName} ${r.lastName} ${r.room} ${r.condition} ${r.id}`.toLowerCase().includes(q);
    const matchFilter = state.filter === 'All' || r.status === state.filter;
    return matchSearch && matchFilter;
  });
}

/* ══════════════════════════════════════════════════════════════════════
   VIEWS
   ══════════════════════════════════════════════════════════════════════ */

/* ── LIST VIEW ───────────────────────────────────────────────────────── */
function renderList(container) {
  const list = filtered();
  const total     = state.residents.length;
  const active    = state.residents.filter(r => r.status === 'Active').length;
  const discharged = state.residents.filter(r => r.status === 'Discharged').length;

  container.innerHTML = `
    <!-- Top stats -->
    <div class="rs-stats-row">
      <div class="rs-stat">
        <div class="rs-stat-num">${total}</div>
        <div class="rs-stat-lbl">Total Residents</div>
      </div>
      <div class="rs-stat rs-stat--blue">
        <div class="rs-stat-num">${active}</div>
        <div class="rs-stat-lbl">Currently Admitted</div>
      </div>
      <div class="rs-stat rs-stat--grey">
        <div class="rs-stat-num">${discharged}</div>
        <div class="rs-stat-lbl">Discharged</div>
      </div>
      <div class="rs-stat rs-stat--green">
        <div class="rs-stat-num">${30 - active}</div>
        <div class="rs-stat-lbl">Available Beds</div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="rs-toolbar">
      <div class="rs-search-wrap">
        <span class="rs-search-icon">🔍</span>
        <input class="rs-search" id="rs-search" placeholder="Search by name, room, condition…" value="${state.search}" />
      </div>
      <div class="rs-filters">
        ${['All','Active','Discharged'].map(f => `
          <button class="rs-filter-btn ${state.filter === f ? 'active' : ''}" data-filter="${f}">${f}</button>
        `).join('')}
      </div>
      <button class="rs-add-btn" id="rs-add-btn">+ Add Resident</button>
    </div>

    <!-- Table -->
    <div class="rs-table-wrap">
      ${list.length === 0 ? `
        <div class="rs-empty">No residents match your search.</div>
      ` : `
        <table class="rs-table">
          <thead>
            <tr>
              <th>Resident</th>
              <th>ID</th>
              <th>Age</th>
              <th>Room / Bed</th>
              <th>Condition</th>
              <th>Admitted</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${list.map(r => `
              <tr class="rs-row" data-id="${r.id}">
                <td>
                  <div class="rs-name-cell">
                    <div class="rs-avatar">${initials(r)}</div>
                    <div>
                      <div class="rs-full-name">${r.firstName} ${r.lastName}</div>
                      <div class="rs-gender">${r.gender}</div>
                    </div>
                  </div>
                </td>
                <td class="rs-id-cell">${r.id}</td>
                <td>${age(r.dob)}</td>
                <td>${r.room}, ${r.bed}</td>
                <td>${r.condition}</td>
                <td>${fmt(r.admissionDate)}</td>
                <td><span class="rs-status-pill ${statusClass(r.status)}">${r.status}</span></td>
                <td><button class="rs-view-btn" data-id="${r.id}">View →</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `}
    </div>
  `;

  /* events */
  container.querySelector('#rs-search').addEventListener('input', e => {
    state.search = e.target.value;
    renderList(container);
  });
  container.querySelectorAll('.rs-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.filter = btn.dataset.filter;
      renderList(container);
    });
  });
  container.querySelectorAll('.rs-view-btn, .rs-row').forEach(el => {
    el.addEventListener('click', e => {
      const id = el.dataset.id || el.closest('[data-id]')?.dataset.id;
      if (id) { state.selected = id; state.view = 'profile'; render(container); }
    });
  });
  container.querySelector('#rs-add-btn').addEventListener('click', () => {
    state.view = 'add'; render(container);
  });
}

/* ── PROFILE VIEW ─────────────────────────────────────────────────────── */
function renderProfile(container) {
  const r = state.residents.find(x => x.id === state.selected);
  if (!r) { state.view = 'list'; render(container); return; }

  container.innerHTML = `
    <!-- Back -->
    <button class="rs-back-btn" id="rs-back">← Back to Residents</button>

    <div class="rs-profile-grid">

      <!-- LEFT: Identity card -->
      <div class="rs-profile-card">
        <div class="rs-profile-avatar">${initials(r)}</div>
        <div class="rs-profile-name">${r.firstName} ${r.lastName}</div>
        <div class="rs-profile-id">${r.id}</div>
        <span class="rs-status-pill ${statusClass(r.status)} rs-pill-lg">${r.status}</span>

        <div class="rs-profile-details">
          <div class="rs-detail-row"><span>Date of Birth</span><span>${fmt(r.dob)} (${age(r.dob)} yrs)</span></div>
          <div class="rs-detail-row"><span>Gender</span><span>${r.gender}</span></div>
          <div class="rs-detail-row"><span>Room</span><span>${r.room}</span></div>
          <div class="rs-detail-row"><span>Bed</span><span>${r.bed}</span></div>
          <div class="rs-detail-row"><span>Admitted</span><span>${fmt(r.admissionDate)}</span></div>
          <div class="rs-detail-row"><span>Diet</span><span>${r.diet}</span></div>
          <div class="rs-detail-row"><span>Mobility</span><span>${r.mobility}</span></div>
        </div>

        <div class="rs-profile-actions">
          <button class="rs-action-secondary" id="rs-edit-btn">✏️ Edit</button>
          ${r.status === 'Active'
            ? `<button class="rs-action-discharge" id="rs-discharge-btn">Discharge</button>`
            : `<button class="rs-action-readmit" id="rs-readmit-btn">Re-admit</button>`}
        </div>
      </div>

      <!-- RIGHT: Details panels -->
      <div class="rs-profile-right">

        <!-- Condition -->
        <div class="rs-panel">
          <div class="rs-panel-title">🏥 Condition & Care</div>
          <div class="rs-panel-body">
            <div class="rs-detail-row"><span>Primary Condition</span><span>${r.condition}</span></div>
          </div>
          <div class="rs-notes-box">${r.notes || 'No notes recorded.'}</div>
        </div>

        <!-- Next of Kin -->
        <div class="rs-panel">
          <div class="rs-panel-title">👨‍👩‍👧 Next of Kin</div>
          <div class="rs-panel-body">
            <div class="rs-detail-row"><span>Name</span><span>${r.nok.name}</span></div>
            <div class="rs-detail-row"><span>Relationship</span><span>${r.nok.relation}</span></div>
            <div class="rs-detail-row"><span>Phone</span><span><a href="tel:${r.nok.phone}">${r.nok.phone}</a></span></div>
          </div>
        </div>

        <!-- GP -->
        <div class="rs-panel">
          <div class="rs-panel-title">👨‍⚕️ GP / Referring Doctor</div>
          <div class="rs-panel-body">
            <div class="rs-detail-row"><span>Doctor</span><span>${r.gp.name}</span></div>
            <div class="rs-detail-row"><span>Phone</span><span><a href="tel:${r.gp.phone}">${r.gp.phone}</a></span></div>
          </div>
        </div>

      </div>
    </div>
  `;

  container.querySelector('#rs-back').addEventListener('click', () => {
    state.view = 'list'; render(container);
  });
  container.querySelector('#rs-edit-btn').addEventListener('click', () => {
    state.view = 'add'; render(container);
  });
  const dischargeBtn = container.querySelector('#rs-discharge-btn');
  if (dischargeBtn) {
    dischargeBtn.addEventListener('click', () => {
      if (confirm(`Discharge ${r.firstName} ${r.lastName}?`)) {
        r.status = 'Discharged';
        state.view = 'list'; render(container);
      }
    });
  }
  const readmitBtn = container.querySelector('#rs-readmit-btn');
  if (readmitBtn) {
    readmitBtn.addEventListener('click', () => {
      r.status = 'Active';
      r.admissionDate = new Date().toISOString().split('T')[0];
      state.view = 'list'; render(container);
    });
  }
}

/* ── ADD / EDIT FORM ─────────────────────────────────────────────────── */
function renderForm(container) {
  const editing = state.selected && state.view === 'add'
    ? state.residents.find(x => x.id === state.selected) : null;
  const r = editing || {};
  const title = editing ? `Edit — ${r.firstName} ${r.lastName}` : 'Add New Resident';

  container.innerHTML = `
    <button class="rs-back-btn" id="rs-back">← Back</button>
    <div class="rs-form-wrap">
      <div class="rs-form-title">${title}</div>
      <form id="rs-form" novalidate>

        <div class="rs-form-section">Personal Details</div>
        <div class="rs-form-grid">
          <div class="rs-field">
            <label>First Name *</label>
            <input name="firstName" value="${r.firstName||''}" required />
          </div>
          <div class="rs-field">
            <label>Last Name *</label>
            <input name="lastName" value="${r.lastName||''}" required />
          </div>
          <div class="rs-field">
            <label>Date of Birth *</label>
            <input name="dob" type="date" value="${r.dob||''}" required />
          </div>
          <div class="rs-field">
            <label>Gender *</label>
            <select name="gender">
              ${['Male','Female','Other'].map(g => `<option ${r.gender===g?'selected':''}>${g}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="rs-form-section">Room & Admission</div>
        <div class="rs-form-grid">
          <div class="rs-field">
            <label>Room *</label>
            <select name="room">
              ${['Room A','Room B','Room C','Room D','Room E'].map(rm =>
                `<option ${r.room===rm?'selected':''}>${rm}</option>`).join('')}
            </select>
          </div>
          <div class="rs-field">
            <label>Bed *</label>
            <select name="bed">
              ${['Bed 1','Bed 2','Bed 3','Bed 4'].map(b =>
                `<option ${r.bed===b?'selected':''}>${b}</option>`).join('')}
            </select>
          </div>
          <div class="rs-field">
            <label>Admission Date *</label>
            <input name="admissionDate" type="date" value="${r.admissionDate||new Date().toISOString().split('T')[0]}" required />
          </div>
          <div class="rs-field">
            <label>Status</label>
            <select name="status">
              ${['Active','Discharged'].map(s => `<option ${r.status===s?'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="rs-form-section">Care Information</div>
        <div class="rs-form-grid">
          <div class="rs-field">
            <label>Primary Condition *</label>
            <input name="condition" value="${r.condition||''}" required />
          </div>
          <div class="rs-field">
            <label>Diet Requirements</label>
            <select name="diet">
              ${['Regular','Soft foods','Diabetic','Low sodium','Pureed','IV/Tube'].map(d =>
                `<option ${r.diet===d?'selected':''}>${d}</option>`).join('')}
            </select>
          </div>
          <div class="rs-field">
            <label>Mobility</label>
            <select name="mobility">
              ${['Independent','Walking frame','Wheelchair','Bed-bound','Limited'].map(m =>
                `<option ${r.mobility===m?'selected':''}>${m}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="rs-field rs-field--full">
          <label>Clinical Notes</label>
          <textarea name="notes" rows="3">${r.notes||''}</textarea>
        </div>

        <div class="rs-form-section">Next of Kin</div>
        <div class="rs-form-grid">
          <div class="rs-field">
            <label>Full Name *</label>
            <input name="nokName" value="${r.nok?.name||''}" required />
          </div>
          <div class="rs-field">
            <label>Relationship</label>
            <input name="nokRelation" value="${r.nok?.relation||''}" />
          </div>
          <div class="rs-field">
            <label>Phone Number *</label>
            <input name="nokPhone" value="${r.nok?.phone||''}" required />
          </div>
        </div>

        <div class="rs-form-section">GP / Referring Doctor</div>
        <div class="rs-form-grid">
          <div class="rs-field">
            <label>Doctor Name</label>
            <input name="gpName" value="${r.gp?.name||''}" />
          </div>
          <div class="rs-field">
            <label>Phone Number</label>
            <input name="gpPhone" value="${r.gp?.phone||''}" />
          </div>
        </div>

        <div class="rs-form-actions">
          <button type="button" class="rs-action-secondary" id="rs-cancel-btn">Cancel</button>
          <button type="submit" class="rs-submit-btn">${editing ? 'Save Changes' : 'Add Resident'}</button>
        </div>
      </form>
    </div>
  `;

  container.querySelector('#rs-back').addEventListener('click', () => {
    state.view = state.selected ? 'profile' : 'list';
    if (!editing) state.selected = null;
    render(container);
  });
  container.querySelector('#rs-cancel-btn').addEventListener('click', () => {
    state.view = state.selected && editing ? 'profile' : 'list';
    if (!editing) state.selected = null;
    render(container);
  });

  container.querySelector('#rs-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const v  = Object.fromEntries(fd.entries());

    /* validate required */
    const required = ['firstName','lastName','dob','condition','nokName','nokPhone'];
    const missing = required.filter(f => !v[f]?.trim());
    if (missing.length) {
      missing.forEach(f => {
        const el = e.target.querySelector(`[name="${f}"]`);
        if (el) el.classList.add('rs-invalid');
      });
      return;
    }

    if (editing) {
      Object.assign(editing, {
        firstName: v.firstName, lastName: v.lastName, dob: v.dob,
        gender: v.gender, room: v.room, bed: v.bed,
        admissionDate: v.admissionDate, status: v.status,
        condition: v.condition, diet: v.diet, mobility: v.mobility, notes: v.notes,
        nok: { name: v.nokName, relation: v.nokRelation, phone: v.nokPhone },
        gp:  { name: v.gpName,  phone: v.gpPhone },
      });
      state.view = 'profile';
    } else {
      state.residents.push({
        id: nextId(state.residents),
        firstName: v.firstName, lastName: v.lastName, dob: v.dob,
        gender: v.gender, room: v.room, bed: v.bed,
        admissionDate: v.admissionDate, status: v.status || 'Active',
        condition: v.condition, diet: v.diet, mobility: v.mobility, notes: v.notes,
        nok: { name: v.nokName, relation: v.nokRelation, phone: v.nokPhone },
        gp:  { name: v.gpName,  phone: v.gpPhone },
      });
      state.selected = null;
      state.view = 'list';
    }
    render(container);
  });
}

/* ── MAIN RENDER ─────────────────────────────────────────────────────── */
export function render(container) {
  // If editing, keep selected; if navigating away from profile reset
  if (state.view === 'list') state.selected = null;
  if (state.view === 'add' && !state.selected) { /* new resident */ }

  if (state.view === 'profile') renderProfile(container);
  else if (state.view === 'add') renderForm(container);
  else renderList(container);
}
