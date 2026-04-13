export const id     = 'clinical';
export const name   = 'Clinical Care';
export const icon   = '🏥';
export const desc   = 'Care plans, medication logs, wound charts and incident reports.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   SAMPLE DATA
   ══════════════════════════════════════════════════════════════════════ */
const RESIDENTS = [
  { id: 'R001', name: 'Agnes Tembo',     room: 'Room A', bed: 'Bed 1' },
  { id: 'R002', name: 'Bernard Mwale',   room: 'Room A', bed: 'Bed 2' },
  { id: 'R003', name: 'Catherine Lungu', room: 'Room B', bed: 'Bed 1' },
  { id: 'R004', name: 'David Sakala',    room: 'Room B', bed: 'Bed 2' },
  { id: 'R005', name: 'Esther Mutale',   room: 'Room C', bed: 'Bed 1' },
];

const CARE_PLANS = [
  {
    id: 'CP001', residentId: 'R001', reviewDate: '2026-05-04', status: 'Active',
    goals: [
      { goal: 'Maintain cognitive engagement', intervention: 'Music therapy 3x/week, memory games daily' },
      { goal: 'Prevent skin breakdown', intervention: 'Repositioning every 2 hours, moisture barrier cream' },
      { goal: 'Manage dementia behaviours', intervention: 'Structured daily routine, calm environment' },
    ],
    allergies: 'Penicillin',
    updatedBy: 'N. Banda', updatedOn: '2026-04-01',
  },
  {
    id: 'CP002', residentId: 'R002', reviewDate: '2026-04-15', status: 'Review Due',
    goals: [
      { goal: 'Improve speech and communication', intervention: 'Speech therapy Tue & Thu, communication board' },
      { goal: 'Regain upper limb function', intervention: 'Physiotherapy daily 09:00–09:45' },
      { goal: 'Monitor blood pressure', intervention: 'BP checks twice daily, medication compliance' },
    ],
    allergies: 'None known',
    updatedBy: 'T. Phiri', updatedOn: '2026-03-15',
  },
  {
    id: 'CP003', residentId: 'R003', reviewDate: '2026-05-10', status: 'Active',
    goals: [
      { goal: 'Pain management post-hip fracture', intervention: 'Prescribed analgesia, pain scale assessment 3x/day' },
      { goal: 'Restore mobility', intervention: 'Physiotherapy daily 10:00, bed-to-chair transfers with assistance' },
      { goal: 'Prevent DVT', intervention: 'Compression stockings, leg exercises, hydration' },
    ],
    allergies: 'Aspirin',
    updatedBy: 'N. Banda', updatedOn: '2026-04-05',
  },
  {
    id: 'CP004', residentId: 'R004', reviewDate: '2026-04-22', status: 'Active',
    goals: [
      { goal: 'Maintain stable blood glucose', intervention: 'BGL monitoring 06:00 & 18:00, diabetic diet' },
      { goal: 'Foot care and circulation', intervention: 'Daily foot inspection, diabetic footwear' },
      { goal: 'Weight management', intervention: 'Monthly weight check, dietician review quarterly' },
    ],
    allergies: 'Sulfonamides',
    updatedBy: 'T. Phiri', updatedOn: '2026-03-22',
  },
  {
    id: 'CP005', residentId: 'R005', reviewDate: '2026-05-14', status: 'Active',
    goals: [
      { goal: 'Medication management for Parkinson\'s', intervention: 'Strict medication schedule, tremor assessment weekly' },
      { goal: 'Fall prevention', intervention: 'Walking frame at all times, non-slip footwear, bed alarm' },
      { goal: 'Maintain nutrition', intervention: 'Soft foods, assistance at mealtimes, weight check weekly' },
    ],
    allergies: 'None known',
    updatedBy: 'N. Banda', updatedOn: '2026-04-08',
  },
];

const MEDICATIONS = [
  { id: 'M001', residentId: 'R001', name: 'Aricept (Donepezil)', dose: '10mg', route: 'Oral', frequency: 'Once daily', times: ['20:00'], prescribedBy: 'Dr. C. Phiri', startDate: '2025-11-04', status: 'Active' },
  { id: 'M002', residentId: 'R001', name: 'Risperidone', dose: '0.5mg', route: 'Oral', frequency: 'Twice daily', times: ['08:00','20:00'], prescribedBy: 'Dr. C. Phiri', startDate: '2026-01-10', status: 'Active' },
  { id: 'M003', residentId: 'R002', name: 'Aspirin', dose: '75mg', route: 'Oral', frequency: 'Once daily', times: ['08:00'], prescribedBy: 'Dr. A. Banda', startDate: '2025-09-15', status: 'Active' },
  { id: 'M004', residentId: 'R002', name: 'Ramipril', dose: '5mg', route: 'Oral', frequency: 'Once daily', times: ['08:00'], prescribedBy: 'Dr. A. Banda', startDate: '2025-09-15', status: 'Active' },
  { id: 'M005', residentId: 'R003', name: 'Paracetamol', dose: '1g', route: 'Oral', frequency: 'Four times daily', times: ['06:00','12:00','18:00','22:00'], prescribedBy: 'Dr. M. Zulu', startDate: '2026-01-10', status: 'Active' },
  { id: 'M006', residentId: 'R003', name: 'Enoxaparin', dose: '40mg', route: 'Subcutaneous', frequency: 'Once daily', times: ['18:00'], prescribedBy: 'Dr. M. Zulu', startDate: '2026-01-10', status: 'Active' },
  { id: 'M007', residentId: 'R004', name: 'Metformin', dose: '500mg', route: 'Oral', frequency: 'Twice daily', times: ['08:00','18:00'], prescribedBy: 'Dr. C. Phiri', startDate: '2025-08-22', status: 'Active' },
  { id: 'M008', residentId: 'R004', name: 'Gliclazide', dose: '80mg', route: 'Oral', frequency: 'Once daily', times: ['08:00'], prescribedBy: 'Dr. C. Phiri', startDate: '2025-08-22', status: 'Active' },
  { id: 'M009', residentId: 'R005', name: 'Levodopa/Carbidopa', dose: '100/25mg', route: 'Oral', frequency: 'Three times daily', times: ['07:00','13:00','19:00'], prescribedBy: 'Dr. A. Banda', startDate: '2026-02-14', status: 'Active' },
  { id: 'M010', residentId: 'R005', name: 'Amantadine', dose: '100mg', route: 'Oral', frequency: 'Twice daily', times: ['08:00','14:00'], prescribedBy: 'Dr. A. Banda', startDate: '2026-02-14', status: 'Active' },
];

const INCIDENTS = [
  { id: 'IR001', residentId: 'R003', type: 'Fall', severity: 'Moderate', date: '2026-04-10', time: '14:35', description: 'Resident attempted to transfer from bed to chair without calling for assistance. Found on floor beside bed. No visible injuries. Doctor notified.', actionTaken: 'Full body assessment, neurological obs every 4hrs, bed alarm activated, family notified.', reportedBy: 'P. Mwansa', status: 'Under Review', followUpDate: '2026-04-17' },
  { id: 'IR002', residentId: 'R001', type: 'Medication Error', severity: 'Minor', date: '2026-04-08', time: '20:15', description: 'Risperidone 0.5mg administered 15 minutes late due to staffing handover delay.', actionTaken: 'Dose administered. Pharmacist informed. Resident monitored with no adverse effects noted.', reportedBy: 'T. Phiri', status: 'Resolved', followUpDate: '2026-04-09' },
  { id: 'IR003', residentId: 'R002', type: 'Behaviour', severity: 'Minor', date: '2026-04-06', time: '10:00', description: 'Resident became agitated during morning physiotherapy session. Refused to continue.', actionTaken: 'Session paused. Resident calmed with music and rest period. Resumed after 30 minutes.', reportedBy: 'N. Banda', status: 'Resolved', followUpDate: '' },
  { id: 'IR004', residentId: 'R004', type: 'Medical', severity: 'Major', date: '2026-04-03', time: '07:10', description: 'Blood glucose reading of 2.8 mmol/L. Resident pale and diaphoretic.', actionTaken: 'Fast-acting glucose administered. GP contacted. Readings taken every 30 mins. Medication reviewed.', reportedBy: 'N. Banda', status: 'Resolved', followUpDate: '2026-04-04' },
];

/* ══════════════════════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  tab: 'careplans',        // 'careplans' | 'medications' | 'incidents'
  view: 'list',            // 'list' | 'detail' | 'add'
  selected: null,
  residentFilter: 'All',
  incidentData: JSON.parse(JSON.stringify(INCIDENTS)),
  medData:      JSON.parse(JSON.stringify(MEDICATIONS)),
  planData:     JSON.parse(JSON.stringify(CARE_PLANS)),
};

/* ══════════════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════════════ */
function resName(id) { return RESIDENTS.find(r => r.id === id)?.name || id; }
function resRoom(id) { const r = RESIDENTS.find(r => r.id === id); return r ? `${r.room}, ${r.bed}` : ''; }
function fmt(d) { return d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'; }
function severityClass(s) {
  return { Major:'cl-sev-major', Moderate:'cl-sev-moderate', Minor:'cl-sev-minor' }[s] || '';
}
function statusClass(s) {
  return { Active:'cl-badge-active', 'Review Due':'cl-badge-review', Resolved:'cl-badge-resolved', 'Under Review':'cl-badge-under', Discontinued:'cl-badge-disc' }[s] || '';
}
function nextId(arr, prefix) {
  const nums = arr.map(x => parseInt(x.id.replace(prefix,''))).filter(Boolean);
  return prefix + String(Math.max(0,...nums)+1).padStart(3,'0');
}

/* ══════════════════════════════════════════════════════════════════════
   TAB BAR
   ══════════════════════════════════════════════════════════════════════ */
function tabBar() {
  return `
    <div class="cl-tabs">
      ${[
        { key:'careplans',  label:'📋 Care Plans',  count: state.planData.filter(p=>p.status==='Review Due').length },
        { key:'medications',label:'💊 Medications',  count: state.medData.filter(m=>m.status==='Active').length },
        { key:'incidents',  label:'⚠️ Incidents',   count: state.incidentData.filter(i=>i.status==='Under Review').length },
      ].map(t => `
        <button class="cl-tab ${state.tab===t.key?'active':''}" data-tab="${t.key}">
          ${t.label}
          ${t.count ? `<span class="cl-tab-badge">${t.count}</span>` : ''}
        </button>
      `).join('')}
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   CARE PLANS
   ══════════════════════════════════════════════════════════════════════ */
function renderCarePlans(container) {
  if (state.view === 'detail' && state.selected) {
    renderCarePlanDetail(container); return;
  }

  const plans = state.planData;
  container.innerHTML = `
    ${tabBar()}
    <div class="cl-toolbar">
      <div class="cl-stats-mini">
        <span>Total: <strong>${plans.length}</strong></span>
        <span>Review Due: <strong class="cl-warn">${plans.filter(p=>p.status==='Review Due').length}</strong></span>
      </div>
      <button class="cl-primary-btn" id="cl-add-plan">+ New Care Plan</button>
    </div>
    <div class="cl-card-grid">
      ${plans.map(p => `
        <div class="cl-plan-card" data-id="${p.id}">
          <div class="cl-plan-header">
            <div class="cl-plan-avatar">${resName(p.residentId).split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div>
              <div class="cl-plan-name">${resName(p.residentId)}</div>
              <div class="cl-plan-room">${resRoom(p.residentId)}</div>
            </div>
            <span class="cl-badge ${statusClass(p.status)}">${p.status}</span>
          </div>
          <div class="cl-plan-goals">
            ${p.goals.map(g => `<div class="cl-goal-item">✓ ${g.goal}</div>`).join('')}
          </div>
          <div class="cl-plan-footer">
            <span>⚠️ Allergies: ${p.allergies}</span>
            <span>Review: ${fmt(p.reviewDate)}</span>
          </div>
          <div class="cl-plan-meta">Updated by ${p.updatedBy} on ${fmt(p.updatedOn)}</div>
        </div>
      `).join('')}
    </div>`;

  bindTabs(container);
  container.querySelectorAll('.cl-plan-card').forEach(el => {
    el.addEventListener('click', () => { state.selected = el.dataset.id; state.view = 'detail'; renderCarePlans(container); });
  });
  container.querySelector('#cl-add-plan')?.addEventListener('click', () => {
    state.view = 'add'; renderCarePlanForm(container);
  });
}

function renderCarePlanDetail(container) {
  const p = state.planData.find(x => x.id === state.selected);
  if (!p) { state.view = 'list'; renderCarePlans(container); return; }

  container.innerHTML = `
    ${tabBar()}
    <button class="cl-back-btn" id="cl-back">← Back to Care Plans</button>
    <div class="cl-detail-wrap">
      <div class="cl-detail-header">
        <div>
          <div class="cl-detail-title">${resName(p.residentId)}</div>
          <div class="cl-detail-sub">${resRoom(p.residentId)} · Plan ID: ${p.id}</div>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <span class="cl-badge ${statusClass(p.status)}">${p.status}</span>
          <button class="cl-secondary-btn" id="cl-edit-plan">✏️ Edit</button>
        </div>
      </div>

      <div class="cl-alert-row">
        <div class="cl-info-chip">⚠️ Allergies: <strong>${p.allergies}</strong></div>
        <div class="cl-info-chip">📅 Review Due: <strong>${fmt(p.reviewDate)}</strong></div>
        <div class="cl-info-chip">✍️ Updated by <strong>${p.updatedBy}</strong> on <strong>${fmt(p.updatedOn)}</strong></div>
      </div>

      <div class="cl-goals-table-wrap">
        <div class="cl-section-label">Care Goals & Interventions</div>
        <table class="cl-goals-table">
          <thead><tr><th>#</th><th>Goal</th><th>Intervention</th></tr></thead>
          <tbody>
            ${p.goals.map((g,i) => `
              <tr>
                <td>${i+1}</td>
                <td><strong>${g.goal}</strong></td>
                <td>${g.intervention}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`;

  bindTabs(container);
  container.querySelector('#cl-back').addEventListener('click', () => { state.view = 'list'; state.selected = null; renderCarePlans(container); });
  container.querySelector('#cl-edit-plan').addEventListener('click', () => { state.view = 'add'; renderCarePlanForm(container); });
}

function renderCarePlanForm(container) {
  const editing = state.selected ? state.planData.find(x => x.id === state.selected) : null;
  const p = editing || { goals: [{goal:'',intervention:''}], allergies:'', reviewDate:'', status:'Active' };

  container.innerHTML = `
    ${tabBar()}
    <button class="cl-back-btn" id="cl-back">← Back</button>
    <div class="cl-form-wrap">
      <div class="cl-form-title">${editing ? 'Edit Care Plan — '+resName(p.residentId) : 'New Care Plan'}</div>
      <form id="cl-plan-form">
        ${!editing ? `
        <div class="cl-field">
          <label>Resident *</label>
          <select name="residentId" required>
            <option value="">Select resident…</option>
            ${RESIDENTS.map(r => `<option value="${r.id}">${r.name} (${r.room})</option>`).join('')}
          </select>
        </div>` : ''}
        <div class="cl-form-row">
          <div class="cl-field">
            <label>Status</label>
            <select name="status">
              ${['Active','Review Due'].map(s => `<option ${p.status===s?'selected':''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="cl-field">
            <label>Review Date *</label>
            <input type="date" name="reviewDate" value="${p.reviewDate||''}" required />
          </div>
          <div class="cl-field">
            <label>Allergies</label>
            <input name="allergies" value="${p.allergies||''}" placeholder="None known" />
          </div>
        </div>

        <div class="cl-section-label">Care Goals</div>
        <div id="cl-goals-list">
          ${p.goals.map((g,i) => goalRow(g, i)).join('')}
        </div>
        <button type="button" class="cl-secondary-btn" id="cl-add-goal" style="margin-bottom:1rem">+ Add Goal</button>

        <div class="cl-form-actions">
          <button type="button" class="cl-secondary-btn" id="cl-cancel">Cancel</button>
          <button type="submit" class="cl-primary-btn">${editing ? 'Save Changes' : 'Create Plan'}</button>
        </div>
      </form>
    </div>`;

  bindTabs(container);
  container.querySelector('#cl-back').addEventListener('click', () => {
    state.view = editing ? 'detail' : 'list'; if (!editing) state.selected = null; renderCarePlans(container);
  });
  container.querySelector('#cl-cancel').addEventListener('click', () => {
    state.view = editing ? 'detail' : 'list'; if (!editing) state.selected = null; renderCarePlans(container);
  });
  container.querySelector('#cl-add-goal').addEventListener('click', () => {
    const list = container.querySelector('#cl-goals-list');
    const idx = list.querySelectorAll('.cl-goal-row').length;
    list.insertAdjacentHTML('beforeend', goalRow({goal:'',intervention:''}, idx));
  });
  container.querySelector('#cl-plan-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const goals = [...container.querySelectorAll('.cl-goal-row')].map(row => ({
      goal: row.querySelector('.cl-goal-input').value,
      intervention: row.querySelector('.cl-int-input').value,
    })).filter(g => g.goal.trim());

    if (editing) {
      Object.assign(editing, { status: fd.get('status'), reviewDate: fd.get('reviewDate'), allergies: fd.get('allergies'), goals, updatedBy:'Staff', updatedOn: new Date().toISOString().split('T')[0] });
      state.view = 'detail';
    } else {
      state.planData.push({ id: nextId(state.planData,'CP'), residentId: fd.get('residentId'), status: fd.get('status'), reviewDate: fd.get('reviewDate'), allergies: fd.get('allergies') || 'None known', goals, updatedBy:'Staff', updatedOn: new Date().toISOString().split('T')[0] });
      state.view = 'list'; state.selected = null;
    }
    renderCarePlans(container);
  });
}

function goalRow(g, i) {
  return `
    <div class="cl-goal-row">
      <div class="cl-field" style="flex:1"><label>Goal ${i+1}</label><input class="cl-goal-input" value="${g.goal}" placeholder="Care goal…" /></div>
      <div class="cl-field" style="flex:2"><label>Intervention</label><input class="cl-int-input" value="${g.intervention}" placeholder="How it will be achieved…" /></div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   MEDICATIONS (MAR)
   ══════════════════════════════════════════════════════════════════════ */
function renderMedications(container) {
  if (state.view === 'add') { renderMedForm(container); return; }

  const grouped = {};
  RESIDENTS.forEach(r => { grouped[r.id] = { resident: r, meds: state.medData.filter(m => m.residentId === r.id) }; });

  container.innerHTML = `
    ${tabBar()}
    <div class="cl-toolbar">
      <div class="cl-stats-mini">
        <span>Active medications: <strong>${state.medData.filter(m=>m.status==='Active').length}</strong></span>
      </div>
      <button class="cl-primary-btn" id="cl-add-med">+ Prescribe Medication</button>
    </div>
    <div class="cl-mar-grid">
      ${Object.values(grouped).map(({ resident, meds }) => `
        <div class="cl-mar-card">
          <div class="cl-mar-card-header">
            <div class="cl-plan-avatar">${resident.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
            <div>
              <div class="cl-plan-name">${resident.name}</div>
              <div class="cl-plan-room">${resident.room}, ${resident.bed}</div>
            </div>
            <span class="cl-med-count">${meds.filter(m=>m.status==='Active').length} active</span>
          </div>
          ${meds.length === 0 ? '<div class="cl-mar-empty">No medications prescribed</div>' : `
          <table class="cl-mar-table">
            <thead><tr><th>Medication</th><th>Dose</th><th>Route</th><th>Times</th><th>Status</th></tr></thead>
            <tbody>
              ${meds.map(m => `
                <tr>
                  <td><strong>${m.name}</strong><div class="cl-mar-sub">Dr. ${m.prescribedBy.replace('Dr. ','')}</div></td>
                  <td>${m.dose}</td>
                  <td>${m.route}</td>
                  <td>${m.times.join(', ')}</td>
                  <td>
                    <span class="cl-badge ${m.status==='Active'?'cl-badge-active':'cl-badge-disc'}">${m.status}</span>
                    ${m.status==='Active' ? `<button class="cl-disc-btn" data-med="${m.id}">Discontinue</button>` : ''}
                  </td>
                </tr>`).join('')}
            </tbody>
          </table>`}
        </div>
      `).join('')}
    </div>`;

  bindTabs(container);
  container.querySelector('#cl-add-med')?.addEventListener('click', () => { state.view = 'add'; renderMedications(container); });
  container.querySelectorAll('.cl-disc-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (confirm('Discontinue this medication?')) {
        const med = state.medData.find(m => m.id === btn.dataset.med);
        if (med) med.status = 'Discontinued';
        renderMedications(container);
      }
    });
  });
}

function renderMedForm(container) {
  container.innerHTML = `
    ${tabBar()}
    <button class="cl-back-btn" id="cl-back">← Back to Medications</button>
    <div class="cl-form-wrap">
      <div class="cl-form-title">Prescribe New Medication</div>
      <form id="cl-med-form">
        <div class="cl-form-row">
          <div class="cl-field">
            <label>Resident *</label>
            <select name="residentId" required>
              <option value="">Select resident…</option>
              ${RESIDENTS.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
            </select>
          </div>
          <div class="cl-field">
            <label>Medication Name *</label>
            <input name="medName" placeholder="e.g. Paracetamol" required />
          </div>
        </div>
        <div class="cl-form-row">
          <div class="cl-field"><label>Dose *</label><input name="dose" placeholder="e.g. 500mg" required /></div>
          <div class="cl-field">
            <label>Route *</label>
            <select name="route">
              ${['Oral','Subcutaneous','Intravenous','Topical','Inhaled','Sublingual'].map(r=>`<option>${r}</option>`).join('')}
            </select>
          </div>
          <div class="cl-field">
            <label>Frequency *</label>
            <select name="frequency">
              ${['Once daily','Twice daily','Three times daily','Four times daily','As required','Weekly'].map(f=>`<option>${f}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="cl-form-row">
          <div class="cl-field"><label>Administration Times (comma separated) *</label><input name="times" placeholder="08:00, 20:00" required /></div>
          <div class="cl-field"><label>Prescribed By *</label><input name="prescribedBy" placeholder="Dr. Name" required /></div>
          <div class="cl-field"><label>Start Date</label><input type="date" name="startDate" value="${new Date().toISOString().split('T')[0]}" /></div>
        </div>
        <div class="cl-form-actions">
          <button type="button" class="cl-secondary-btn" id="cl-cancel">Cancel</button>
          <button type="submit" class="cl-primary-btn">Prescribe</button>
        </div>
      </form>
    </div>`;

  bindTabs(container);
  const back = () => { state.view = 'list'; renderMedications(container); };
  container.querySelector('#cl-back').addEventListener('click', back);
  container.querySelector('#cl-cancel').addEventListener('click', back);
  container.querySelector('#cl-med-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.medData.push({
      id: nextId(state.medData,'M'), residentId: fd.get('residentId'),
      name: fd.get('medName'), dose: fd.get('dose'), route: fd.get('route'),
      frequency: fd.get('frequency'),
      times: fd.get('times').split(',').map(t=>t.trim()),
      prescribedBy: fd.get('prescribedBy'), startDate: fd.get('startDate'), status: 'Active',
    });
    state.view = 'list'; renderMedications(container);
  });
}

/* ══════════════════════════════════════════════════════════════════════
   INCIDENTS
   ══════════════════════════════════════════════════════════════════════ */
function renderIncidents(container) {
  if (state.view === 'detail' && state.selected) { renderIncidentDetail(container); return; }
  if (state.view === 'add') { renderIncidentForm(container); return; }

  const list = state.incidentData;
  container.innerHTML = `
    ${tabBar()}
    <div class="cl-toolbar">
      <div class="cl-stats-mini">
        <span>Total: <strong>${list.length}</strong></span>
        <span class="cl-warn">Under Review: <strong>${list.filter(i=>i.status==='Under Review').length}</strong></span>
      </div>
      <button class="cl-primary-btn" id="cl-add-inc">+ Log Incident</button>
    </div>
    <div class="cl-incident-list">
      ${list.length === 0 ? '<div class="cl-empty">No incidents recorded.</div>' : list.map(inc => `
        <div class="cl-incident-row" data-id="${inc.id}">
          <div class="cl-inc-left">
            <div class="cl-inc-sev ${severityClass(inc.severity)}">${inc.severity}</div>
            <div>
              <div class="cl-inc-type">${inc.type}</div>
              <div class="cl-inc-who">${resName(inc.residentId)} · ${resRoom(inc.residentId)}</div>
            </div>
          </div>
          <div class="cl-inc-desc">${inc.description.slice(0,90)}…</div>
          <div class="cl-inc-right">
            <div class="cl-inc-date">${fmt(inc.date)} ${inc.time}</div>
            <span class="cl-badge ${statusClass(inc.status)}">${inc.status}</span>
            <div class="cl-inc-by">By ${inc.reportedBy}</div>
          </div>
        </div>`).join('')}
    </div>`;

  bindTabs(container);
  container.querySelector('#cl-add-inc')?.addEventListener('click', () => { state.view = 'add'; renderIncidents(container); });
  container.querySelectorAll('.cl-incident-row').forEach(el => {
    el.addEventListener('click', () => { state.selected = el.dataset.id; state.view = 'detail'; renderIncidents(container); });
  });
}

function renderIncidentDetail(container) {
  const inc = state.incidentData.find(x => x.id === state.selected);
  if (!inc) { state.view = 'list'; renderIncidents(container); return; }

  container.innerHTML = `
    ${tabBar()}
    <button class="cl-back-btn" id="cl-back">← Back to Incidents</button>
    <div class="cl-detail-wrap">
      <div class="cl-detail-header">
        <div>
          <div class="cl-detail-title">${inc.type} — ${resName(inc.residentId)}</div>
          <div class="cl-detail-sub">Report ID: ${inc.id} · ${resRoom(inc.residentId)}</div>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center">
          <span class="cl-inc-sev ${severityClass(inc.severity)}">${inc.severity}</span>
          <span class="cl-badge ${statusClass(inc.status)}">${inc.status}</span>
          ${inc.status === 'Under Review' ? `<button class="cl-primary-btn" id="cl-resolve-btn">Mark Resolved</button>` : ''}
        </div>
      </div>
      <div class="cl-alert-row">
        <div class="cl-info-chip">📅 Date: <strong>${fmt(inc.date)} at ${inc.time}</strong></div>
        <div class="cl-info-chip">👤 Reported by: <strong>${inc.reportedBy}</strong></div>
        ${inc.followUpDate ? `<div class="cl-info-chip">🔁 Follow-up: <strong>${fmt(inc.followUpDate)}</strong></div>` : ''}
      </div>
      <div class="cl-inc-detail-panels">
        <div class="cl-panel">
          <div class="cl-panel-title">📝 Description</div>
          <div class="cl-panel-body cl-para">${inc.description}</div>
        </div>
        <div class="cl-panel">
          <div class="cl-panel-title">✅ Action Taken</div>
          <div class="cl-panel-body cl-para">${inc.actionTaken}</div>
        </div>
      </div>
    </div>`;

  bindTabs(container);
  container.querySelector('#cl-back').addEventListener('click', () => { state.view = 'list'; state.selected = null; renderIncidents(container); });
  container.querySelector('#cl-resolve-btn')?.addEventListener('click', () => {
    inc.status = 'Resolved'; state.view = 'list'; state.selected = null; renderIncidents(container);
  });
}

function renderIncidentForm(container) {
  container.innerHTML = `
    ${tabBar()}
    <button class="cl-back-btn" id="cl-back">← Back to Incidents</button>
    <div class="cl-form-wrap">
      <div class="cl-form-title">Log New Incident</div>
      <form id="cl-inc-form">
        <div class="cl-form-row">
          <div class="cl-field">
            <label>Resident *</label>
            <select name="residentId" required>
              <option value="">Select resident…</option>
              ${RESIDENTS.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
            </select>
          </div>
          <div class="cl-field">
            <label>Incident Type *</label>
            <select name="type" required>
              ${['Fall','Medication Error','Behaviour','Medical','Safeguarding','Property','Other'].map(t=>`<option>${t}</option>`).join('')}
            </select>
          </div>
          <div class="cl-field">
            <label>Severity *</label>
            <select name="severity" required>
              ${['Minor','Moderate','Major'].map(s=>`<option>${s}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="cl-form-row">
          <div class="cl-field"><label>Date *</label><input type="date" name="date" value="${new Date().toISOString().split('T')[0]}" required /></div>
          <div class="cl-field"><label>Time *</label><input type="time" name="time" required /></div>
          <div class="cl-field"><label>Reported By *</label><input name="reportedBy" placeholder="Staff name" required /></div>
          <div class="cl-field"><label>Follow-up Date</label><input type="date" name="followUpDate" /></div>
        </div>
        <div class="cl-field"><label>Description *</label><textarea name="description" rows="4" placeholder="Describe what happened…" required></textarea></div>
        <div class="cl-field"><label>Action Taken *</label><textarea name="actionTaken" rows="4" placeholder="Describe actions taken…" required></textarea></div>
        <div class="cl-form-actions">
          <button type="button" class="cl-secondary-btn" id="cl-cancel">Cancel</button>
          <button type="submit" class="cl-primary-btn">Submit Report</button>
        </div>
      </form>
    </div>`;

  bindTabs(container);
  const back = () => { state.view = 'list'; renderIncidents(container); };
  container.querySelector('#cl-back').addEventListener('click', back);
  container.querySelector('#cl-cancel').addEventListener('click', back);
  container.querySelector('#cl-inc-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    state.incidentData.unshift({
      id: nextId(state.incidentData,'IR'), residentId: fd.get('residentId'),
      type: fd.get('type'), severity: fd.get('severity'),
      date: fd.get('date'), time: fd.get('time'),
      description: fd.get('description'), actionTaken: fd.get('actionTaken'),
      reportedBy: fd.get('reportedBy'), status: 'Under Review',
      followUpDate: fd.get('followUpDate') || '',
    });
    state.view = 'list'; renderIncidents(container);
  });
}

/* ══════════════════════════════════════════════════════════════════════
   SHARED
   ══════════════════════════════════════════════════════════════════════ */
function bindTabs(container) {
  container.querySelectorAll('.cl-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.tab = btn.dataset.tab;
      state.view = 'list';
      state.selected = null;
      render(container);
    });
  });
}

/* ── MAIN RENDER ── */
export function render(container) {
  if (state.tab === 'careplans')  renderCarePlans(container);
  else if (state.tab === 'medications') renderMedications(container);
  else if (state.tab === 'incidents')   renderIncidents(container);
}
