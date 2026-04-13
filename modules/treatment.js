export const id     = 'treatment';
export const name   = 'Treatment Planning';
export const icon   = '📝';
export const desc   = 'M4 — ICD-11 diagnoses, SMART care plans, MDT collaboration, MAT and weekly review scheduling.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   PATIENTS  (mirrors M1-M3 data)
   ══════════════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: 'R001', name: 'Agnes Tembo',     age: 34, gender: 'Female', room: 'Room A, Bed 1', primarySubstance: 'Alcohol',    admitDate: '2026-03-10', loc: 'Level III — Residential' },
  { id: 'R002', name: 'Bernard Mwale',   age: 45, gender: 'Male',   room: 'Room A, Bed 2', primarySubstance: 'Cannabis',   admitDate: '2026-03-14', loc: 'Level II — Intensive Outpatient' },
  { id: 'R003', name: 'Catherine Lungu', age: 29, gender: 'Female', room: 'Room B, Bed 1', primarySubstance: 'Opioids',    admitDate: '2026-03-18', loc: 'Level III — Residential' },
  { id: 'R004', name: 'David Sakala',    age: 52, gender: 'Male',   room: 'Room B, Bed 2', primarySubstance: 'Alcohol',    admitDate: '2026-03-20', loc: 'Level III — Residential' },
  { id: 'R005', name: 'Esther Mutale',   age: 38, gender: 'Female', room: 'Room C, Bed 1', primarySubstance: 'Stimulants', admitDate: '2026-03-25', loc: 'Level II — Intensive Outpatient' },
];

/* ══════════════════════════════════════════════════════════════════════
   REFERENCE DATA
   ══════════════════════════════════════════════════════════════════════ */
const ICD11_SUD = [
  { code:'6C40.1', label:'Alcohol dependence' },
  { code:'6C40.0', label:'Alcohol harmful use' },
  { code:'6C43.1', label:'Cannabis dependence' },
  { code:'6C43.0', label:'Cannabis harmful use' },
  { code:'6C47.1', label:'Opioid dependence' },
  { code:'6C47.0', label:'Opioid harmful use' },
  { code:'6C4A.1', label:'Sedative/hypnotic/anxiolytic dependence' },
  { code:'6C4B.1', label:'Cocaine dependence' },
  { code:'6C4C.1', label:'Stimulant (amphetamine-type) dependence' },
  { code:'6C4E.1', label:'MDMA/ecstasy dependence' },
  { code:'6C4G.1', label:'Inhalant dependence' },
  { code:'6C4H.1', label:'NPS (new psychoactive substance) dependence' },
  { code:'6C4Z',   label:'Other specified substance use disorder' },
  { code:'QE11',   label:'Nicotine/tobacco use disorder' },
];
const ICD11_COMORBID = [
  { code:'6A70',    label:'Major Depressive Disorder' },
  { code:'6A60',    label:'Bipolar disorder, type I' },
  { code:'6A61',    label:'Bipolar disorder, type II' },
  { code:'6B00',    label:'Generalised Anxiety Disorder' },
  { code:'6B01',    label:'Panic Disorder' },
  { code:'6B04',    label:'Social Anxiety Disorder' },
  { code:'6B40',    label:'Post-Traumatic Stress Disorder (PTSD)' },
  { code:'6B41',    label:'Complex PTSD' },
  { code:'6A20',    label:'Schizophrenia' },
  { code:'6A21',    label:'Schizoaffective Disorder' },
  { code:'6A05.0',  label:'ADHD, predominantly inattentive' },
  { code:'6A05.1',  label:'ADHD, predominantly hyperactive-impulsive' },
  { code:'6D11.5',  label:'Borderline Personality Disorder' },
  { code:'6B20',    label:'Obsessive-Compulsive Disorder (OCD)' },
];

const INTERVENTION_TYPES = [
  'Individual CBT-SUD',
  'Motivational Interviewing (MI)',
  'Group Therapy — Psychoeducation',
  'Group Therapy — Relapse Prevention',
  'Group Therapy — Life Skills',
  'Group Therapy — Anger Management',
  'Group Therapy — Trauma-Informed',
  'Family Therapy',
  '12-Step Facilitation',
  'EMDR (Trauma)',
  'Mindfulness-Based Relapse Prevention (MBRP)',
  'Contingency Management',
  'MAT Monitoring',
  'Nutritional Counselling',
  'Vocational / Occupational Therapy',
  'Chaplaincy / Spiritual Support',
  'Peer Support / Sponsor',
  'Psychiatric Review',
  'Social Work Session',
  'Discharge Planning',
];

const MDT_ROLES = [
  { id: 'psychologist',   label: 'Psychologist' },
  { id: 'psychiatrist',   label: 'Psychiatrist' },
  { id: 'social_worker',  label: 'Social Worker' },
  { id: 'counsellor',     label: 'Counsellor' },
  { id: 'nurse',          label: 'Registered Nurse' },
  { id: 'clinical_dir',   label: 'Clinical Director' },
  { id: 'dietitian',      label: 'Dietitian / Nutritionist' },
  { id: 'chaplain',       label: 'Chaplain' },
];

const MAT_OPTIONS = [
  { name:'Methadone',               route:'Oral', unit:'mg', hint:'Usually 20–120 mg/day. Dose individually titrated.' },
  { name:'Buprenorphine/Naloxone',  route:'Sublingual', unit:'mg', hint:'Usually 2–24 mg/day buprenorphine.' },
  { name:'Naltrexone (oral)',        route:'Oral', unit:'mg', hint:'50 mg daily.' },
  { name:'Naltrexone (depot inj.)', route:'IM injection', unit:'mg', hint:'380 mg monthly.' },
  { name:'Acamprosate',             route:'Oral', unit:'mg', hint:'666 mg three times daily.' },
  { name:'Disulfiram',              route:'Oral', unit:'mg', hint:'250–500 mg daily. Only with full informed consent.' },
  { name:'Nicotine patch',          route:'Transdermal', unit:'mg/16h', hint:'7, 14, or 21 mg patches.' },
  { name:'Nicotine gum/lozenge',    route:'Oral', unit:'mg', hint:'2 mg or 4 mg.' },
  { name:'Varenicline',             route:'Oral', unit:'mg', hint:'0.5 mg once daily, increasing to 1 mg twice daily.' },
  { name:'Bupropion (SR)',          route:'Oral', unit:'mg', hint:'150 mg once/twice daily.' },
  { name:'Diazepam (detox)',        route:'Oral', unit:'mg', hint:'Reducing regime for alcohol/benzo withdrawal.' },
  { name:'Chlordiazepoxide',        route:'Oral', unit:'mg', hint:'Reducing regime for alcohol withdrawal.' },
  { name:'Other (specify in notes)',route:'—', unit:'', hint:'' },
];

/* ══════════════════════════════════════════════════════════════════════
   MODULE STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  view:    'select',    // select | plan | summary
  section: 'overview', // overview | diagnoses | goals | interventions | mat | mdt | reviews
  patient: null,
  plans:   {},          // { [patientId]: TreatmentPlan }
  editingGoal: null,    // { tier, idx } or null
  editingIntv: null,    // idx or null
  editingMed:  null,    // idx or null
};

function getPlan(pid) {
  if (!state.plans[pid]) {
    const today = new Date().toISOString().slice(0, 10);
    const p = PATIENTS.find(x => x.id === pid);
    const reviewDate = addDays(today, 7);
    state.plans[pid] = {
      status: 'draft',
      createdAt: today,
      version: 1,
      clinician: 'Dr. M. Banda (Psychologist)',
      levelOfCare: p?.loc || '',
      diagnoses: { primary: null, secondary: [], severity: '', specifier: '', notes: '' },
      goals: { short: [], medium: [], long: [] },
      interventions: [],
      mat: { indicated: false, medications: [], notes: '' },
      mdt: { team: {}, notes: '' },
      reviews: [],
      traumaAccommodations: '',
      planNotes: '',
    };
    // Pre-populate a first review date
    state.plans[pid].reviews.push({
      id: Date.now(),
      date: reviewDate,
      type: 'Weekly MDT Review',
      attendees: ['psychologist','counsellor','nurse'],
      status: 'scheduled',
      notes: '',
    });
  }
  return state.plans[pid];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function fmtDate(d) {
  if (!d) return '';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
}

/* ══════════════════════════════════════════════════════════════════════
   RENDER ENTRY
   ══════════════════════════════════════════════════════════════════════ */
export function render(container) {
  container.innerHTML = '';
  container.className = 'tp-root';

  if (state.view === 'select')  renderSelect(container);
  else if (state.view === 'plan')    renderPlan(container);
  else if (state.view === 'summary') renderSummary(container);

  bindEvents(container);
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SELECT PATIENT
   ══════════════════════════════════════════════════════════════════════ */
function renderSelect(container) {
  container.innerHTML = `
    <div class="tp-header">
      <div class="tp-header-inner">
        <div class="tp-title-row">
          <span class="tp-hicon">📝</span>
          <div>
            <h1 class="tp-title">Treatment Planning</h1>
            <p class="tp-subtitle">M4 — ICD-11 diagnoses · SMART goals · MDT collaboration · MAT · Review scheduling</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tp-body">
      <h2 class="tp-section-h">Select Patient</h2>
      <p class="tp-section-sub">Treatment plans are informed by M3 Comprehensive Assessment and ASAM Level of Care.</p>
      <div class="tp-patient-list">
        ${PATIENTS.map(p => {
          const plan = state.plans[p.id];
          const planStatus = plan ? plan.status : null;
          const statusBadge = planStatus
            ? `<span class="tp-status-badge tp-status-${planStatus}">${statusLabel(planStatus)}</span>`
            : '<span class="tp-status-badge tp-status-none">No plan yet</span>';
          return `
          <div class="tp-patient-row" data-action="select-patient" data-pid="${p.id}">
            <div class="tp-pat-avatar">${p.name.charAt(0)}</div>
            <div class="tp-pat-body">
              <div class="tp-pat-name">${p.name} <span class="tp-pat-id">${p.id}</span></div>
              <div class="tp-pat-meta">${p.age}y · ${p.gender} · ${p.room} · Admitted ${fmtDate(p.admitDate)}</div>
              <div class="tp-pat-meta">Primary: <strong>${p.primarySubstance}</strong> · ASAM: <em>${p.loc}</em></div>
            </div>
            <div class="tp-pat-right">
              ${statusBadge}
              <span class="tp-pat-arrow">›</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function statusLabel(s) {
  return { draft:'Draft', active:'Active', review:'Under Review', completed:'Completed' }[s] || s;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: TREATMENT PLAN (section-based)
   ══════════════════════════════════════════════════════════════════════ */
function renderPlan(container) {
  const p    = PATIENTS.find(x => x.id === state.patient);
  const plan = getPlan(p.id);

  const sections = [
    { id:'overview',      icon:'🗂️',  label:'Plan Overview' },
    { id:'diagnoses',     icon:'🔖',  label:'ICD-11 Diagnoses' },
    { id:'goals',         icon:'🎯',  label:'SMART Goals' },
    { id:'interventions', icon:'🛠️',  label:'Interventions' },
    { id:'mat',           icon:'💊',  label:'MAT' },
    { id:'mdt',           icon:'👥',  label:'MDT Team' },
    { id:'reviews',       icon:'📅',  label:'Review Schedule' },
  ];

  container.innerHTML = `
    <div class="tp-header">
      <div class="tp-header-inner">
        <button class="tp-back" data-action="go-select">← All Patients</button>
        <div class="tp-title-row">
          <span class="tp-hicon">📝</span>
          <div>
            <h1 class="tp-title">${p.name} — Treatment Plan</h1>
            <p class="tp-subtitle">${p.id} · ${p.primarySubstance} · ${p.loc} · v${plan.version}</p>
          </div>
        </div>
        <div class="tp-header-actions">
          <span class="tp-status-badge tp-status-${plan.status}">${statusLabel(plan.status)}</span>
          <button class="tp-btn tp-btn--outline" data-action="go-summary">📄 View Plan</button>
          ${plan.status === 'draft' ? `<button class="tp-btn tp-btn--primary" data-action="activate-plan">✅ Activate Plan</button>` : ''}
        </div>
      </div>
    </div>

    <div class="tp-layout">
      <!-- Section nav -->
      <nav class="tp-section-nav">
        ${sections.map(s => `
          <button class="tp-snav-item${state.section === s.id ? ' tp-snav--active' : ''}" data-action="go-section" data-sec="${s.id}">
            <span class="tp-snav-icon">${s.icon}</span>
            <span class="tp-snav-label">${s.label}</span>
            ${getSectionBadge(s.id, plan)}
          </button>`).join('')}
      </nav>

      <!-- Main content -->
      <div class="tp-section-content" id="tp-section-main">
        ${renderSection(state.section, p, plan)}
      </div>
    </div>`;
}

function getSectionBadge(sec, plan) {
  const counts = {
    diagnoses:     plan.diagnoses.primary ? '✓' : null,
    goals:         plan.goals.short.length + plan.goals.medium.length + plan.goals.long.length || null,
    interventions: plan.interventions.length || null,
    mat:           plan.mat.indicated ? (plan.mat.medications.length || '!') : null,
    mdt:           Object.keys(plan.mdt.team).filter(k => plan.mdt.team[k]).length || null,
    reviews:       plan.reviews.length || null,
  };
  const v = counts[sec];
  if (!v) return '';
  return `<span class="tp-snav-badge">${v}</span>`;
}

function renderSection(sec, p, plan) {
  switch (sec) {
    case 'overview':      return secOverview(p, plan);
    case 'diagnoses':     return secDiagnoses(p, plan);
    case 'goals':         return secGoals(p, plan);
    case 'interventions': return secInterventions(p, plan);
    case 'mat':           return secMAT(p, plan);
    case 'mdt':           return secMDT(p, plan);
    case 'reviews':       return secReviews(p, plan);
    default:              return secOverview(p, plan);
  }
}

/* ── SECTION: OVERVIEW ──────────────────────────────────────────────── */
function secOverview(p, plan) {
  const totalGoals = plan.goals.short.length + plan.goals.medium.length + plan.goals.long.length;
  const cards = [
    { icon:'🔖', label:'Primary Diagnosis', value: plan.diagnoses.primary
        ? `${plan.diagnoses.primary.code} — ${plan.diagnoses.primary.label}` : 'Not set', action:'diagnoses', alert: !plan.diagnoses.primary },
    { icon:'🎯', label:'SMART Goals', value: `${totalGoals} goal${totalGoals !== 1 ? 's' : ''} set`, action:'goals', alert: totalGoals === 0 },
    { icon:'🛠️', label:'Interventions', value: `${plan.interventions.length} assigned`, action:'interventions', alert: plan.interventions.length === 0 },
    { icon:'💊', label:'MAT', value: plan.mat.indicated ? `${plan.mat.medications.length} medication(s)` : 'Not indicated', action:'mat', alert: false },
    { icon:'👥', label:'MDT Team', value: `${Object.values(plan.mdt.team).filter(Boolean).length} members assigned`, action:'mdt', alert: Object.values(plan.mdt.team).filter(Boolean).length === 0 },
    { icon:'📅', label:'Next Review', value: plan.reviews.length ? fmtDate(plan.reviews.find(r => r.status === 'scheduled')?.date || plan.reviews[0].date) : 'Not scheduled', action:'reviews', alert: plan.reviews.length === 0 },
  ];

  return `
  <div class="tp-overview">
    <div class="tp-ov-meta">
      <div class="tp-ov-meta-item"><span>Plan created</span><strong>${fmtDate(plan.createdAt)}</strong></div>
      <div class="tp-ov-meta-item"><span>Level of Care</span><strong>${plan.levelOfCare || '—'}</strong></div>
      <div class="tp-ov-meta-item"><span>Lead Clinician</span>
        <input class="tp-inline-input" id="ov-clinician" value="${plan.clinician}" placeholder="Clinician name & role">
      </div>
      <div class="tp-ov-meta-item"><span>Version</span><strong>v${plan.version}</strong></div>
    </div>

    <div class="tp-ov-cards">
      ${cards.map(c => `
      <div class="tp-ov-card${c.alert ? ' tp-ov-card--alert' : ''}" data-action="go-section" data-sec="${c.action}">
        <div class="tp-ov-card-icon">${c.icon}</div>
        <div class="tp-ov-card-body">
          <div class="tp-ov-card-label">${c.label}</div>
          <div class="tp-ov-card-value">${c.value}</div>
        </div>
        <div class="tp-ov-card-arrow">›</div>
      </div>`).join('')}
    </div>

    <div class="tp-ov-notes">
      <label class="tp-field-label">Trauma-Informed Care Accommodations</label>
      <textarea class="tp-textarea" id="ov-trauma" rows="2" placeholder="Specific accommodations based on trauma history (e.g. female therapist only, no group confrontation, quiet room allocation...)">${plan.traumaAccommodations}</textarea>
    </div>
    <div class="tp-ov-notes">
      <label class="tp-field-label">Plan Notes / Clinical Director Remarks</label>
      <textarea class="tp-textarea" id="ov-notes" rows="2" placeholder="General plan notes, MDT discussion points, special considerations...">${plan.planNotes}</textarea>
    </div>
    <div class="tp-save-row">
      <button class="tp-btn tp-btn--primary" data-action="save-overview">💾 Save Overview</button>
    </div>
  </div>`;
}

/* ── SECTION: DIAGNOSES ─────────────────────────────────────────────── */
function secDiagnoses(p, plan) {
  const d = plan.diagnoses;
  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Record ICD-11 coded primary SUD diagnosis and all co-occurring / secondary disorders. These diagnoses drive the treatment plan, SMART goals and intervention selection.</p>
    </div>

    <!-- Primary diagnosis -->
    <div class="tp-card">
      <div class="tp-card-title">Primary SUD Diagnosis</div>
      <div class="tp-field-row">
        <div class="tp-field">
          <label class="tp-field-label">ICD-11 Code & Diagnosis</label>
          <select class="tp-select" id="dx-primary">
            <option value="">— Select primary SUD diagnosis —</option>
            ${ICD11_SUD.map(x => `<option value="${x.code}|${x.label}"${d.primary?.code === x.code ? ' selected' : ''}>${x.code} — ${x.label}</option>`).join('')}
          </select>
        </div>
        <div class="tp-field">
          <label class="tp-field-label">Severity Specifier</label>
          <select class="tp-select" id="dx-severity">
            <option value="">— Select —</option>
            ${['Mild','Moderate','Severe','In early remission','In sustained remission','On maintenance therapy','In a controlled environment'].map(s => `<option${d.severity === s ? ' selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Additional Specifiers / Clinical Notes</label>
        <textarea class="tp-textarea" id="dx-notes" rows="2" placeholder="e.g. With withdrawal, With perceptual disturbances, course specifiers...">${d.notes}</textarea>
      </div>
    </div>

    <!-- Secondary/co-occurring -->
    <div class="tp-card">
      <div class="tp-card-title">Co-occurring / Secondary Diagnoses</div>
      <div class="tp-field">
        <label class="tp-field-label">ICD-11 Co-occurring Disorders</label>
        <div class="tp-dx-check-grid">
          ${ICD11_COMORBID.map(x => `
          <label class="tp-check-item">
            <input type="checkbox" name="dx-secondary" value="${x.code}|${x.label}"
              ${d.secondary.some(s => s.code === x.code) ? ' checked' : ''}> ${x.code} — ${x.label}
          </label>`).join('')}
        </div>
      </div>
      <div class="tp-field" style="margin-top:.75rem">
        <label class="tp-field-label">Other Diagnosis (free text / ICD-11 code)</label>
        <input class="tp-input" id="dx-other" placeholder="e.g. F10.26 — Alcohol dependence with comorbid depression..." value="${d.other || ''}">
      </div>
    </div>

    <div class="tp-save-row">
      <button class="tp-btn tp-btn--primary" data-action="save-diagnoses">💾 Save Diagnoses</button>
    </div>
  </div>`;
}

/* ── SECTION: SMART GOALS ───────────────────────────────────────────── */
function secGoals(p, plan) {
  const tiers = [
    { id:'short',  label:'Short-Term Goals', timeframe:'Weekly (1-4 weeks)', color:'#2563eb' },
    { id:'medium', label:'Medium-Term Goals', timeframe:'Monthly (1-3 months)', color:'#7c3aed' },
    { id:'long',   label:'Long-Term Goals',   timeframe:'Programme duration (3-12 months)', color:'#059669' },
  ];

  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Goals must be <strong>S</strong>pecific, <strong>M</strong>easurable, <strong>A</strong>chievable, <strong>R</strong>elevant and <strong>T</strong>ime-bound. Involve the patient in setting all goals.</p>
    </div>

    ${tiers.map(tier => `
    <div class="tp-card">
      <div class="tp-card-title" style="border-left:3px solid ${tier.color}; padding-left:.75rem">
        ${tier.label}
        <span class="tp-card-sub">${tier.timeframe}</span>
      </div>

      ${plan.goals[tier.id].length === 0 ? `<p class="tp-empty">No goals set. Add the first goal below.</p>` : ''}

      <div class="tp-goal-list" id="goals-${tier.id}">
        ${plan.goals[tier.id].map((g, i) => renderGoalRow(g, tier.id, i)).join('')}
      </div>

      ${state.editingGoal?.tier === tier.id && state.editingGoal?.idx === -1 ? renderGoalForm(null, tier.id) : `
      <button class="tp-btn tp-btn--add" data-action="add-goal" data-tier="${tier.id}">+ Add Goal</button>`}
    </div>`).join('')}
  </div>`;
}

function renderGoalRow(g, tier, idx) {
  if (state.editingGoal?.tier === tier && state.editingGoal?.idx === idx) {
    return renderGoalForm(g, tier, idx);
  }
  const statusCol = { active:'#059669', achieved:'#1e40af', discontinued:'#dc2626', 'on-hold':'#d97706' };
  return `
  <div class="tp-goal-row">
    <div class="tp-goal-main">
      <div class="tp-goal-text">${g.goal}</div>
      <div class="tp-goal-meta">
        <span>Indicator: ${g.indicator || '—'}</span>
        <span>Target: ${g.target || '—'}</span>
        <span class="tp-goal-status" style="color:${statusCol[g.status] || '#6b7280'}">${g.status}</span>
      </div>
    </div>
    <div class="tp-goal-actions">
      <button class="tp-icon-btn" data-action="edit-goal" data-tier="${tier}" data-idx="${idx}" title="Edit">✏️</button>
      <button class="tp-icon-btn" data-action="delete-goal" data-tier="${tier}" data-idx="${idx}" title="Delete">🗑️</button>
    </div>
  </div>`;
}

function renderGoalForm(g, tier, idx = -1) {
  return `
  <div class="tp-goal-form" data-tier="${tier}" data-idx="${idx}">
    <div class="tp-field">
      <label class="tp-field-label">Goal Statement <span class="tp-field-hint">(Specific, patient-centred)</span></label>
      <textarea class="tp-textarea" id="gf-goal" rows="2" placeholder="e.g. Abstain from alcohol for 7 consecutive days by end of week 1">${g?.goal || ''}</textarea>
    </div>
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Measurable Indicator</label>
        <input class="tp-input" id="gf-indicator" placeholder="e.g. 0 standard drinks per day" value="${g?.indicator || ''}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Target / Milestone</label>
        <input class="tp-input" id="gf-target" placeholder="e.g. Zero on daily diary, urine screen negative" value="${g?.target || ''}">
      </div>
    </div>
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Status</label>
        <select class="tp-select" id="gf-status">
          ${['active','achieved','on-hold','discontinued'].map(s => `<option${(g?.status||'active') === s ? ' selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Responsible Clinician</label>
        <input class="tp-input" id="gf-clinician" placeholder="e.g. Psychologist, Counsellor" value="${g?.clinician || ''}">
      </div>
    </div>
    <div class="tp-form-btns">
      <button class="tp-btn tp-btn--secondary tp-btn--sm" data-action="cancel-goal">Cancel</button>
      <button class="tp-btn tp-btn--primary tp-btn--sm" data-action="save-goal" data-tier="${tier}" data-idx="${idx}">Save Goal</button>
    </div>
  </div>`;
}

/* ── SECTION: INTERVENTIONS ─────────────────────────────────────────── */
function secInterventions(p, plan) {
  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Assign therapeutic interventions linked to treatment goals. Each intervention should have a named responsible clinician, frequency and schedule.</p>
    </div>

    <div class="tp-card">
      <div class="tp-card-title">Assigned Interventions</div>
      ${plan.interventions.length === 0 ? `<p class="tp-empty">No interventions assigned yet.</p>` : ''}
      <div class="tp-intv-list">
        ${plan.interventions.map((intv, i) => state.editingIntv === i ? renderIntvForm(intv, i) : renderIntvRow(intv, i)).join('')}
      </div>
      ${state.editingIntv === -1 ? renderIntvForm(null, -1) : `
      <button class="tp-btn tp-btn--add" data-action="add-intv">+ Add Intervention</button>`}
    </div>
  </div>`;
}

function renderIntvRow(intv, idx) {
  const freqCol = { Daily:'#059669', 'Twice weekly':'#2563eb', Weekly:'#7c3aed', 'Bi-weekly':'#d97706', Monthly:'#6b7280' };
  return `
  <div class="tp-intv-row">
    <div class="tp-intv-icon">🛠️</div>
    <div class="tp-intv-body">
      <div class="tp-intv-name">${intv.type}</div>
      <div class="tp-intv-meta">
        <span class="tp-intv-freq" style="color:${freqCol[intv.frequency]||'#6b7280'}">${intv.frequency}</span>
        <span>· ${intv.clinician || 'Clinician TBD'}</span>
        ${intv.linkedGoal ? `<span>· Goal: ${intv.linkedGoal}</span>` : ''}
      </div>
    </div>
    <div class="tp-intv-status tp-intv-status--${intv.status||'active'}">${intv.status||'active'}</div>
    <div class="tp-goal-actions">
      <button class="tp-icon-btn" data-action="edit-intv" data-idx="${idx}" title="Edit">✏️</button>
      <button class="tp-icon-btn" data-action="delete-intv" data-idx="${idx}" title="Delete">🗑️</button>
    </div>
  </div>`;
}

function renderIntvForm(intv, idx) {
  return `
  <div class="tp-intv-form" data-idx="${idx}">
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Intervention Type</label>
        <select class="tp-select" id="if-type">
          <option value="">— Select —</option>
          ${INTERVENTION_TYPES.map(t => `<option${intv?.type === t ? ' selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Frequency</label>
        <select class="tp-select" id="if-freq">
          <option value="">— Select —</option>
          ${['Daily','Twice weekly','Weekly','Bi-weekly','Monthly','As required'].map(f => `<option${intv?.frequency === f ? ' selected' : ''}>${f}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Responsible Clinician / Facilitator</label>
        <input class="tp-input" id="if-clinician" placeholder="e.g. Psychologist, Group Facilitator" value="${intv?.clinician || ''}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Status</label>
        <select class="tp-select" id="if-status">
          ${['active','completed','on-hold','discontinued'].map(s => `<option${(intv?.status||'active') === s ? ' selected' : ''}>${s}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="tp-field">
      <label class="tp-field-label">Linked Goal (optional)</label>
      <input class="tp-input" id="if-goal" placeholder="e.g. Abstinence — short-term goal 1" value="${intv?.linkedGoal || ''}">
    </div>
    <div class="tp-form-btns">
      <button class="tp-btn tp-btn--secondary tp-btn--sm" data-action="cancel-intv">Cancel</button>
      <button class="tp-btn tp-btn--primary tp-btn--sm" data-action="save-intv" data-idx="${idx}">Save Intervention</button>
    </div>
  </div>`;
}

/* ── SECTION: MAT ───────────────────────────────────────────────────── */
function secMAT(p, plan) {
  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Medication-Assisted Treatment (MAT) must be prescribed by a qualified physician or psychiatrist. All medications require patient informed consent and regular review.</p>
    </div>

    <div class="tp-card">
      <div class="tp-card-title">MAT Indication</div>
      <div class="tp-mat-toggle">
        <label class="tp-toggle-label">
          <input type="checkbox" id="mat-indicated" ${plan.mat.indicated ? 'checked' : ''}> MAT is indicated for this patient
        </label>
      </div>
      <div class="tp-field" style="margin-top:.75rem">
        <label class="tp-field-label">MAT Clinical Notes</label>
        <textarea class="tp-textarea" id="mat-notes" rows="2" placeholder="Rationale, informed consent documented, prescribing physician...">${plan.mat.notes}</textarea>
      </div>
      <div class="tp-save-row" style="border:none;padding-top:.5rem">
        <button class="tp-btn tp-btn--primary tp-btn--sm" data-action="save-mat-indication">Save</button>
      </div>
    </div>

    <div class="tp-card" id="mat-meds-card" ${!plan.mat.indicated ? 'style="opacity:.45;pointer-events:none"' : ''}>
      <div class="tp-card-title">Prescribed Medications</div>
      ${plan.mat.medications.length === 0 ? `<p class="tp-empty">No medications prescribed.</p>` : ''}
      <div class="tp-med-list">
        ${plan.mat.medications.map((med, i) => state.editingMed === i ? renderMedForm(med, i) : renderMedRow(med, i)).join('')}
      </div>
      ${state.editingMed === -1 ? renderMedForm(null, -1) : `
      <button class="tp-btn tp-btn--add" data-action="add-med" ${!plan.mat.indicated ? 'disabled' : ''}>+ Prescribe Medication</button>`}
    </div>
  </div>`;
}

function renderMedRow(med, idx) {
  const active = med.status === 'active';
  return `
  <div class="tp-med-row${active ? '' : ' tp-med-row--inactive'}">
    <div class="tp-med-icon">💊</div>
    <div class="tp-med-body">
      <div class="tp-med-name">${med.name} <span class="tp-med-dose">${med.dose} ${med.unit}</span></div>
      <div class="tp-med-meta">
        ${med.route} · ${med.frequency} · Prescriber: ${med.prescriber || '—'}
        · Start: ${fmtDate(med.startDate)} · Review: ${fmtDate(med.reviewDate)}
      </div>
    </div>
    <span class="tp-med-status tp-med-status--${med.status||'active'}">${med.status||'active'}</span>
    <div class="tp-goal-actions">
      <button class="tp-icon-btn" data-action="edit-med" data-idx="${idx}" title="Edit">✏️</button>
      <button class="tp-icon-btn" data-action="delete-med" data-idx="${idx}" title="Discontinue">🗑️</button>
    </div>
  </div>`;
}

function renderMedForm(med, idx) {
  const today = new Date().toISOString().slice(0,10);
  const review = med?.reviewDate || addDays(today, 14);
  return `
  <div class="tp-med-form" data-idx="${idx}">
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Medication</label>
        <select class="tp-select" id="mf-name" data-action="mat-name-change">
          <option value="">— Select medication —</option>
          ${MAT_OPTIONS.map(m => `<option value="${m.name}|${m.route}|${m.unit}|${m.hint}"${med?.name === m.name ? ' selected' : ''}>${m.name}</option>`).join('')}
        </select>
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Route</label>
        <input class="tp-input" id="mf-route" placeholder="Route of administration" value="${med?.route || ''}">
      </div>
    </div>
    <div class="tp-mat-hint" id="mf-hint" style="${med?.hint ? '' : 'display:none'}">${med?.hint || ''}</div>
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Dose</label>
        <input class="tp-input" id="mf-dose" type="number" min="0" step="0.5" placeholder="Dose" value="${med?.dose || ''}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Unit</label>
        <input class="tp-input" id="mf-unit" placeholder="mg / mcg / mg/16h" value="${med?.unit || ''}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Frequency</label>
        <select class="tp-select" id="mf-freq">
          <option value="">— Select —</option>
          ${['Once daily','Twice daily','Three times daily','Every 8 hours','Weekly','Monthly injection','As prescribed'].map(f => `<option${med?.frequency === f ? ' selected' : ''}>${f}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="tp-field-row">
      <div class="tp-field">
        <label class="tp-field-label">Prescribing Physician</label>
        <input class="tp-input" id="mf-prescriber" placeholder="Dr. Name" value="${med?.prescriber || ''}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Start Date</label>
        <input class="tp-input" type="date" id="mf-start" value="${med?.startDate || today}">
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Review Date</label>
        <input class="tp-input" type="date" id="mf-review" value="${review}">
      </div>
    </div>
    <div class="tp-field">
      <label class="tp-field-label">Status</label>
      <select class="tp-select" id="mf-status" style="max-width:200px">
        ${['active','on-hold','discontinued'].map(s => `<option${(med?.status||'active') === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="tp-form-btns">
      <button class="tp-btn tp-btn--secondary tp-btn--sm" data-action="cancel-med">Cancel</button>
      <button class="tp-btn tp-btn--primary tp-btn--sm" data-action="save-med" data-idx="${idx}">Save Medication</button>
    </div>
  </div>`;
}

/* ── SECTION: MDT TEAM ──────────────────────────────────────────────── */
function secMDT(p, plan) {
  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Assign MDT team members responsible for this patient's treatment. Each role should be filled by a named clinician to ensure accountability.</p>
    </div>

    <div class="tp-card">
      <div class="tp-card-title">MDT Team Assignments</div>
      <div class="tp-mdt-grid">
        ${MDT_ROLES.map(role => `
        <div class="tp-mdt-row">
          <label class="tp-mdt-role-label">${role.label}</label>
          <input class="tp-input" id="mdt-${role.id}" placeholder="Clinician name" value="${plan.mdt.team[role.id] || ''}">
        </div>`).join('')}
      </div>
    </div>

    <div class="tp-card">
      <div class="tp-card-title">MDT Communication Notes</div>
      <textarea class="tp-textarea" id="mdt-notes" rows="3" placeholder="MDT case conference notes, referrals, consultation requests, disagreements on care plan...">${plan.mdt.notes}</textarea>
    </div>

    <div class="tp-save-row">
      <button class="tp-btn tp-btn--primary" data-action="save-mdt">💾 Save MDT Team</button>
    </div>
  </div>`;
}

/* ── SECTION: REVIEW SCHEDULE ───────────────────────────────────────── */
function secReviews(p, plan) {
  const today = new Date().toISOString().slice(0,10);
  return `
  <div class="tp-sec-body">
    <div class="tp-sec-intro">
      <p>Schedule weekly MDT reviews, clinical reviews and plan revision dates. Reviews should be documented and plan version incremented after each substantive change.</p>
    </div>

    <div class="tp-card">
      <div class="tp-card-title">Schedule New Review</div>
      <div class="tp-field-row">
        <div class="tp-field">
          <label class="tp-field-label">Review Type</label>
          <select class="tp-select" id="rv-type">
            <option>Weekly MDT Review</option>
            <option>Clinical Director Review</option>
            <option>Monthly Progress Review</option>
            <option>Crisis Review</option>
            <option>Discharge Planning Review</option>
            <option>Family Meeting</option>
            <option>Medication Review</option>
          </select>
        </div>
        <div class="tp-field">
          <label class="tp-field-label">Date</label>
          <input class="tp-input" type="date" id="rv-date" value="${addDays(today,7)}">
        </div>
      </div>
      <div class="tp-field">
        <label class="tp-field-label">Attendees</label>
        <div class="tp-check-grid" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
          ${MDT_ROLES.map(r => `
          <label class="tp-check-item">
            <input type="checkbox" name="rv-attendees" value="${r.id}"
              ${['psychologist','counsellor','nurse'].includes(r.id) ? ' checked' : ''}> ${r.label}
          </label>`).join('')}
        </div>
      </div>
      <div class="tp-save-row" style="border:none;padding-top:.5rem">
        <button class="tp-btn tp-btn--primary tp-btn--sm" data-action="add-review">+ Schedule Review</button>
      </div>
    </div>

    <!-- Upcoming & past reviews -->
    <div class="tp-card">
      <div class="tp-card-title">Review Log <span class="tp-card-sub">(${plan.reviews.length} total)</span></div>
      ${plan.reviews.length === 0 ? '<p class="tp-empty">No reviews scheduled.</p>' : ''}
      <div class="tp-review-list">
        ${[...plan.reviews].sort((a,b) => a.date.localeCompare(b.date)).map((rv, i) => {
          const past = rv.date < today;
          const statusC = { scheduled:'#2563eb', completed:'#059669', cancelled:'#dc2626' };
          return `
          <div class="tp-review-row">
            <div class="tp-review-left">
              <div class="tp-review-date${past && rv.status === 'scheduled' ? ' tp-review-date--overdue' : ''}">${fmtDate(rv.date)}</div>
              <div class="tp-review-type">${rv.type}</div>
              <div class="tp-review-meta">${rv.attendees.map(a => MDT_ROLES.find(r=>r.id===a)?.label||a).join(', ')}</div>
              ${rv.notes ? `<div class="tp-review-notes">${rv.notes}</div>` : ''}
            </div>
            <div class="tp-review-right">
              <span class="tp-review-status" style="color:${statusC[rv.status]||'#6b7280'}">${rv.status}</span>
              ${rv.status === 'scheduled' ? `
              <button class="tp-btn tp-btn--outline tp-btn--sm" data-action="complete-review" data-rid="${rv.id}">Mark Complete</button>` : ''}
              <button class="tp-icon-btn" data-action="delete-review" data-rid="${rv.id}" title="Remove">🗑️</button>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SUMMARY (printable treatment plan)
   ══════════════════════════════════════════════════════════════════════ */
function renderSummary(container) {
  const p    = PATIENTS.find(x => x.id === state.patient);
  const plan = getPlan(p.id);
  const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });

  container.innerHTML = `
    <div class="tp-header">
      <div class="tp-header-inner">
        <button class="tp-back" data-action="go-plan">← Back to Plan</button>
        <div class="tp-title-row">
          <span class="tp-hicon">📄</span>
          <div>
            <h1 class="tp-title">Treatment Plan — ${p.name}</h1>
            <p class="tp-subtitle">${p.id} · v${plan.version} · Generated ${today}</p>
          </div>
        </div>
        <button class="tp-btn tp-btn--outline" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
    <div class="tp-body tp-summary-body">

      <!-- Header block -->
      <div class="tp-sum-head">
        <div class="tp-sum-head-grid">
          <div><span>Patient</span><strong>${p.name}</strong></div>
          <div><span>ID</span><strong>${p.id}</strong></div>
          <div><span>Age / Gender</span><strong>${p.age}y · ${p.gender}</strong></div>
          <div><span>Admission</span><strong>${fmtDate(p.admitDate)}</strong></div>
          <div><span>Room</span><strong>${p.room}</strong></div>
          <div><span>ASAM Level</span><strong>${plan.levelOfCare || '—'}</strong></div>
          <div><span>Lead Clinician</span><strong>${plan.clinician}</strong></div>
          <div><span>Plan Status</span><strong class="tp-status-badge tp-status-${plan.status}">${statusLabel(plan.status)}</strong></div>
        </div>
      </div>

      <!-- Diagnoses -->
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">🔖 ICD-11 Diagnoses</div>
        ${plan.diagnoses.primary ? `
        <div class="tp-sum-dx-primary">
          <span class="tp-dx-code">${plan.diagnoses.primary.code}</span>
          <span class="tp-dx-label">${plan.diagnoses.primary.label}</span>
          ${plan.diagnoses.severity ? `<span class="tp-dx-severity">· ${plan.diagnoses.severity}</span>` : ''}
        </div>` : '<p class="tp-empty">No primary diagnosis recorded.</p>'}
        ${plan.diagnoses.secondary.length > 0 ? `
        <div class="tp-sum-dx-secondary">
          <div class="tp-sum-dx-sub-title">Co-occurring Disorders:</div>
          ${plan.diagnoses.secondary.map(d => `<span class="tp-dx-tag">${d.code} — ${d.label}</span>`).join('')}
        </div>` : ''}
        ${plan.diagnoses.notes ? `<div class="tp-sum-dx-notes">${plan.diagnoses.notes}</div>` : ''}
      </div>

      <!-- SMART Goals -->
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">🎯 SMART Treatment Goals</div>
        ${['short','medium','long'].map(tier => {
          const goals = plan.goals[tier];
          if (goals.length === 0) return '';
          const label = { short:'Short-Term (1-4 weeks)', medium:'Medium-Term (1-3 months)', long:'Long-Term (programme)' }[tier];
          return `
          <div class="tp-sum-tier">
            <div class="tp-sum-tier-label">${label}</div>
            ${goals.map((g, i) => `
            <div class="tp-sum-goal">
              <span class="tp-sum-goal-num">${i+1}</span>
              <div class="tp-sum-goal-body">
                <div class="tp-sum-goal-text">${g.goal}</div>
                <div class="tp-sum-goal-meta">
                  ${g.indicator ? `Indicator: ${g.indicator}` : ''}
                  ${g.target ? `· Target: ${g.target}` : ''}
                  ${g.clinician ? `· Responsible: ${g.clinician}` : ''}
                  <span class="tp-sum-goal-status tp-sum-status--${g.status}">${g.status}</span>
                </div>
              </div>
            </div>`).join('')}
          </div>`;
        }).join('')}
      </div>

      <!-- Interventions -->
      ${plan.interventions.length > 0 ? `
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">🛠️ Assigned Interventions</div>
        <div class="tp-sum-intv-grid">
          ${plan.interventions.map(intv => `
          <div class="tp-sum-intv-card">
            <div class="tp-sum-intv-name">${intv.type}</div>
            <div class="tp-sum-intv-meta">${intv.frequency} · ${intv.clinician || '—'}</div>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- MAT -->
      ${plan.mat.indicated ? `
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">💊 Medication-Assisted Treatment (MAT)</div>
        ${plan.mat.medications.length === 0 ? '<p class="tp-empty">MAT indicated but no medications prescribed yet.</p>' : ''}
        ${plan.mat.medications.map(med => `
        <div class="tp-sum-med-row">
          <div class="tp-sum-med-name">${med.name} <span class="tp-sum-med-dose">${med.dose} ${med.unit}</span></div>
          <div class="tp-sum-med-meta">${med.route} · ${med.frequency} · Prescriber: ${med.prescriber||'—'} · Start: ${fmtDate(med.startDate)} · Review: ${fmtDate(med.reviewDate)}</div>
        </div>`).join('')}
        ${plan.mat.notes ? `<div class="tp-sum-mat-notes">${plan.mat.notes}</div>` : ''}
      </div>` : ''}

      <!-- MDT Team -->
      ${Object.values(plan.mdt.team).some(Boolean) ? `
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">👥 MDT Team</div>
        <div class="tp-sum-mdt-grid">
          ${MDT_ROLES.filter(r => plan.mdt.team[r.id]).map(r => `
          <div class="tp-sum-mdt-card">
            <div class="tp-sum-mdt-role">${r.label}</div>
            <div class="tp-sum-mdt-name">${plan.mdt.team[r.id]}</div>
          </div>`).join('')}
        </div>
        ${plan.mdt.notes ? `<div class="tp-sum-mat-notes" style="margin-top:.75rem">${plan.mdt.notes}</div>` : ''}
      </div>` : ''}

      <!-- Trauma accommodations -->
      ${plan.traumaAccommodations ? `
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">🛡️ Trauma-Informed Care Accommodations</div>
        <p class="tp-sum-prose">${plan.traumaAccommodations}</p>
      </div>` : ''}

      <!-- Review schedule -->
      ${plan.reviews.length > 0 ? `
      <div class="tp-sum-section">
        <div class="tp-sum-section-title">📅 Review Schedule</div>
        <div class="tp-sum-review-list">
          ${[...plan.reviews].sort((a,b)=>a.date.localeCompare(b.date)).map(rv => `
          <div class="tp-sum-review-row">
            <span class="tp-sum-review-date">${fmtDate(rv.date)}</span>
            <span class="tp-sum-review-type">${rv.type}</span>
            <span class="tp-review-status" style="color:${rv.status==='completed'?'#059669':rv.status==='scheduled'?'#2563eb':'#dc2626'}">${rv.status}</span>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Sign-off -->
      <div class="tp-sum-section tp-sig-block">
        <div class="tp-sum-section-title">Clinical Authorisation</div>
        <div class="tp-sig-row">
          <div class="tp-sig-field"><div class="tp-sig-line"></div><div class="tp-sig-label">Lead Clinician</div></div>
          <div class="tp-sig-field"><div class="tp-sig-line"></div><div class="tp-sig-label">Psychiatrist / Medical Officer</div></div>
          <div class="tp-sig-field"><div class="tp-sig-line"></div><div class="tp-sig-label">Clinical Director</div></div>
          <div class="tp-sig-field"><div class="tp-sig-line"></div><div class="tp-sig-label">Date</div></div>
        </div>
        <div class="tp-sig-note">Serenje Wellness Home · SATM System · Powered by eNgoma · Plan v${plan.version}</div>
      </div>
    </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   EVENT BINDING
   ══════════════════════════════════════════════════════════════════════ */
function bindEvents(container) {
  container.addEventListener('click', e => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'select-patient':
        state.patient = el.dataset.pid;
        state.section = 'overview';
        state.view = 'plan';
        render(container); break;

      case 'go-select':
        state.view = 'select';
        render(container); break;

      case 'go-plan':
        state.view = 'plan';
        render(container); break;

      case 'go-section':
        state.section = el.dataset.sec;
        state.editingGoal = null;
        state.editingIntv = null;
        state.editingMed  = null;
        render(container); break;

      case 'go-summary':
        state.view = 'summary';
        render(container); break;

      case 'activate-plan': {
        const plan = getPlan(state.patient);
        plan.status = 'active';
        render(container); break;
      }

      case 'save-overview': saveOverview(container); break;
      case 'save-diagnoses': saveDiagnoses(container); break;

      case 'add-goal':
        state.editingGoal = { tier: el.dataset.tier, idx: -1 };
        render(container); break;
      case 'edit-goal':
        state.editingGoal = { tier: el.dataset.tier, idx: parseInt(el.dataset.idx) };
        render(container); break;
      case 'cancel-goal':
        state.editingGoal = null;
        render(container); break;
      case 'save-goal':
        saveGoal(container, el.dataset.tier, parseInt(el.dataset.idx)); break;
      case 'delete-goal': {
        const plan = getPlan(state.patient);
        plan.goals[el.dataset.tier].splice(parseInt(el.dataset.idx), 1);
        render(container); break;
      }

      case 'add-intv':
        state.editingIntv = -1;
        render(container); break;
      case 'edit-intv':
        state.editingIntv = parseInt(el.dataset.idx);
        render(container); break;
      case 'cancel-intv':
        state.editingIntv = null;
        render(container); break;
      case 'save-intv':
        saveIntv(container, parseInt(el.dataset.idx)); break;
      case 'delete-intv': {
        const plan = getPlan(state.patient);
        plan.interventions.splice(parseInt(el.dataset.idx), 1);
        render(container); break;
      }

      case 'save-mat-indication': saveMatIndication(container); break;
      case 'add-med':
        state.editingMed = -1;
        render(container); break;
      case 'edit-med':
        state.editingMed = parseInt(el.dataset.idx);
        render(container); break;
      case 'cancel-med':
        state.editingMed = null;
        render(container); break;
      case 'save-med':
        saveMed(container, parseInt(el.dataset.idx)); break;
      case 'delete-med': {
        const plan = getPlan(state.patient);
        plan.mat.medications.splice(parseInt(el.dataset.idx), 1);
        render(container); break;
      }

      case 'save-mdt': saveMDT(container); break;

      case 'add-review':    addReview(container); break;
      case 'complete-review': {
        const plan = getPlan(state.patient);
        const rv = plan.reviews.find(r => r.id === parseInt(el.dataset.rid));
        if (rv) { rv.status = 'completed'; plan.version += 1; }
        render(container); break;
      }
      case 'delete-review': {
        const plan = getPlan(state.patient);
        plan.reviews = plan.reviews.filter(r => r.id !== parseInt(el.dataset.rid));
        render(container); break;
      }
    }
  });

  // MAT medication selector — auto-fill route/unit/hint
  container.addEventListener('change', e => {
    if (e.target.id === 'mat-indicated') {
      const plan = getPlan(state.patient);
      plan.mat.indicated = e.target.checked;
      const card = container.querySelector('#mat-meds-card');
      if (card) card.style.cssText = plan.mat.indicated ? '' : 'opacity:.45;pointer-events:none';
    }
    if (e.target.id === 'mf-name') {
      const val = e.target.value;
      if (!val) return;
      const [name, route, unit, hint] = val.split('|');
      const routeEl = container.querySelector('#mf-route');
      const unitEl  = container.querySelector('#mf-unit');
      const hintEl  = container.querySelector('#mf-hint');
      if (routeEl) routeEl.value = route;
      if (unitEl)  unitEl.value  = unit;
      if (hintEl)  { hintEl.textContent = hint; hintEl.style.display = hint ? '' : 'none'; }
    }
  });
}

/* ── SAVE FUNCTIONS ─────────────────────────────────────────────────── */
function saveOverview(container) {
  const plan = getPlan(state.patient);
  plan.clinician         = container.querySelector('#ov-clinician')?.value || plan.clinician;
  plan.traumaAccommodations = container.querySelector('#ov-trauma')?.value || '';
  plan.planNotes         = container.querySelector('#ov-notes')?.value || '';
  showSavedToast(container, 'Overview saved');
}

function saveDiagnoses(container) {
  const plan = getPlan(state.patient);
  const primaryRaw = container.querySelector('#dx-primary')?.value;
  if (primaryRaw) {
    const [code, label] = primaryRaw.split('|');
    plan.diagnoses.primary = { code, label };
  }
  plan.diagnoses.severity = container.querySelector('#dx-severity')?.value || '';
  plan.diagnoses.notes    = container.querySelector('#dx-notes')?.value || '';
  plan.diagnoses.other    = container.querySelector('#dx-other')?.value || '';
  // Secondary checkboxes
  const checked = container.querySelectorAll('input[name="dx-secondary"]:checked');
  plan.diagnoses.secondary = Array.from(checked).map(cb => {
    const [code, label] = cb.value.split('|');
    return { code, label };
  });
  showSavedToast(container, 'Diagnoses saved');
}

function saveGoal(container, tier, idx) {
  const plan = getPlan(state.patient);
  const goal = {
    goal:      container.querySelector('#gf-goal')?.value || '',
    indicator: container.querySelector('#gf-indicator')?.value || '',
    target:    container.querySelector('#gf-target')?.value || '',
    status:    container.querySelector('#gf-status')?.value || 'active',
    clinician: container.querySelector('#gf-clinician')?.value || '',
  };
  if (!goal.goal.trim()) return;
  if (idx === -1) plan.goals[tier].push(goal);
  else plan.goals[tier][idx] = goal;
  state.editingGoal = null;
  render(container);
}

function saveIntv(container, idx) {
  const plan = getPlan(state.patient);
  const intv = {
    type:       container.querySelector('#if-type')?.value || '',
    frequency:  container.querySelector('#if-freq')?.value || '',
    clinician:  container.querySelector('#if-clinician')?.value || '',
    status:     container.querySelector('#if-status')?.value || 'active',
    linkedGoal: container.querySelector('#if-goal')?.value || '',
  };
  if (!intv.type) return;
  if (idx === -1) plan.interventions.push(intv);
  else plan.interventions[idx] = intv;
  state.editingIntv = null;
  render(container);
}

function saveMatIndication(container) {
  const plan = getPlan(state.patient);
  plan.mat.indicated = container.querySelector('#mat-indicated')?.checked || false;
  plan.mat.notes     = container.querySelector('#mat-notes')?.value || '';
  render(container);
}

function saveMed(container, idx) {
  const plan = getPlan(state.patient);
  const nameRaw = container.querySelector('#mf-name')?.value || '';
  const name = nameRaw.split('|')[0];
  const med = {
    name,
    route:      container.querySelector('#mf-route')?.value || '',
    dose:       container.querySelector('#mf-dose')?.value || '',
    unit:       container.querySelector('#mf-unit')?.value || '',
    frequency:  container.querySelector('#mf-freq')?.value || '',
    prescriber: container.querySelector('#mf-prescriber')?.value || '',
    startDate:  container.querySelector('#mf-start')?.value || '',
    reviewDate: container.querySelector('#mf-review')?.value || '',
    status:     container.querySelector('#mf-status')?.value || 'active',
    hint:       nameRaw.split('|')[3] || '',
  };
  if (!med.name) return;
  if (idx === -1) plan.mat.medications.push(med);
  else plan.mat.medications[idx] = med;
  state.editingMed = null;
  render(container);
}

function saveMDT(container) {
  const plan = getPlan(state.patient);
  MDT_ROLES.forEach(role => {
    plan.mdt.team[role.id] = container.querySelector(`#mdt-${role.id}`)?.value || '';
  });
  plan.mdt.notes = container.querySelector('#mdt-notes')?.value || '';
  showSavedToast(container, 'MDT Team saved');
}

function addReview(container) {
  const plan = getPlan(state.patient);
  const type = container.querySelector('#rv-type')?.value || 'Weekly MDT Review';
  const date = container.querySelector('#rv-date')?.value || '';
  if (!date) return;
  const attendees = Array.from(container.querySelectorAll('input[name="rv-attendees"]:checked')).map(cb => cb.value);
  plan.reviews.push({ id: Date.now(), date, type, attendees, status: 'scheduled', notes: '' });
  render(container);
}

function showSavedToast(container, msg) {
  let t = container.querySelector('.tp-toast');
  if (!t) { t = document.createElement('div'); t.className = 'tp-toast'; container.appendChild(t); }
  t.textContent = '✓ ' + msg;
  t.classList.add('tp-toast--show');
  setTimeout(() => t.classList.remove('tp-toast--show'), 2200);
}
