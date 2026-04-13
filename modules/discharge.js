export const id     = 'discharge';
export const name   = 'Discharge & Aftercare';
export const icon   = '🚪';
export const desc   = 'M6 — Discharge planning, clinical summary, aftercare plan, community referrals and alumni follow-up tracking.';
export const status = 'live';
export const badge  = null;

/* ══════════════════════════════════════════════════════════════════════
   PATIENTS  (mirrors M1–M4 data)
   ══════════════════════════════════════════════════════════════════════ */
const PATIENTS = [
  { id: 'R001', name: 'Agnes Tembo',     age: 34, gender: 'Female', room: 'Room A, Bed 1', primarySubstance: 'Alcohol',    admitDate: '2026-03-10', diagnosis: '6C40.1 — Alcohol dependence',          loc: 'Level III — Residential', clinician: 'Dr. M. Banda' },
  { id: 'R002', name: 'Bernard Mwale',   age: 45, gender: 'Male',   room: 'Room A, Bed 2', primarySubstance: 'Cannabis',   admitDate: '2026-03-14', diagnosis: '6C43.1 — Cannabis dependence',         loc: 'Level II — Intensive Outpatient', clinician: 'Dr. M. Banda' },
  { id: 'R003', name: 'Catherine Lungu', age: 29, gender: 'Female', room: 'Room B, Bed 1', primarySubstance: 'Opioids',    admitDate: '2026-03-18', diagnosis: '6C47.1 — Opioid dependence',           loc: 'Level III — Residential', clinician: 'Dr. T. Mwanza' },
  { id: 'R004', name: 'David Sakala',    age: 52, gender: 'Male',   room: 'Room B, Bed 2', primarySubstance: 'Alcohol',    admitDate: '2026-03-20', diagnosis: '6C40.1 — Alcohol dependence (Severe)', loc: 'Level III — Residential', clinician: 'Dr. M. Banda' },
  { id: 'R005', name: 'Esther Mutale',   age: 38, gender: 'Female', room: 'Room C, Bed 1', primarySubstance: 'Stimulants', admitDate: '2026-03-25', diagnosis: '6C4C.1 — Stimulant dependence',        loc: 'Level II — Intensive Outpatient', clinician: 'Dr. T. Mwanza' },
];

/* ══════════════════════════════════════════════════════════════════════
   REFERENCE DATA
   ══════════════════════════════════════════════════════════════════════ */
const DISCHARGE_TYPES = [
  { value: 'planned',    label: 'Planned — Programme completed successfully' },
  { value: 'early_vol',  label: 'Voluntary Early Discharge — Patient request' },
  { value: 'early_clin', label: 'Clinical Early Discharge — Clinician recommended' },
  { value: 'medical',    label: 'Medical Transfer — Hospital admission required' },
  { value: 'admin',      label: 'Administrative Discharge — Rule violation / AMA' },
  { value: 'deceased',   label: 'Deceased' },
];

const REFERRAL_TYPES = [
  'Outpatient SUD counselling',
  'Community mental health centre',
  'Psychiatric outpatient clinic',
  'General practitioner (GP)',
  'MAT clinic (methadone/buprenorphine)',
  'Narcotics/Alcoholics Anonymous (NA/AA)',
  'SMART Recovery group',
  'Faith-based recovery programme',
  'Sober living / halfway house',
  'Vocational rehabilitation',
  'Social welfare services',
  'Legal aid / probation officer',
  'Domestic violence shelter',
  'HIV/AIDS care programme',
  'TB treatment programme',
  'Nutritional support programme',
  'Peer support worker',
  'Family therapy outpatient',
];

const TRIGGER_CATEGORIES = [
  'Stress / work pressure',
  'Relationship conflict',
  'Social occasions / peer pressure',
  'Boredom / unstructured time',
  'Financial difficulties',
  'Grief / bereavement',
  'Physical pain / illness',
  'Insomnia / sleep problems',
  'Loneliness / isolation',
  'Anger / frustration',
  'Passing familiar substance use locations',
  'Exposure to substances / paraphernalia',
  'Negative self-talk / shame',
  'Trauma reminders / anniversaries',
  'Other',
];

const COPING_STRATEGIES = [
  'Call sponsor / support person',
  'Attend NA/AA meeting',
  'Contact Serenje Wellness Home crisis line',
  'Mindfulness / breathing exercises',
  'Physical exercise / walking',
  'Prayer / spiritual practice',
  'Journaling / writing',
  'Contact family member',
  'Use distraction (music, hobby)',
  '5-4-3-2-1 grounding technique',
  'Remove self from triggering environment',
  'Urge surfing technique',
  'Play the tape forward (consequences)',
  'Review personal reasons for recovery',
  'Other (see notes)',
];

const FOLLOWUP_SCHEDULE = [
  { id: 'fu30',  label: '30-Day Follow-up',   days: 30  },
  { id: 'fu90',  label: '90-Day Follow-up',   days: 90  },
  { id: 'fu180', label: '180-Day Follow-up',  days: 180 },
  { id: 'fu365', label: '12-Month Follow-up', days: 365 },
];

/* ══════════════════════════════════════════════════════════════════════
   STATE
   ══════════════════════════════════════════════════════════════════════ */
let state = {
  view:    'select',   // select | plan | summary
  section: 'planning', // planning | summary | aftercare | referrals | relapse | alumni
  patient: null,
  records: {},
};

function getRecord(pid) {
  if (!state.records[pid]) {
    const p = PATIENTS.find(x => x.id === pid);
    const today = new Date().toISOString().slice(0, 10);
    state.records[pid] = {
      /* Planning */
      planningInitiated: today,
      planningClinicianName: p?.clinician || '',
      planningNotes: '',
      plannedDischargeDate: addDays(today, 14),
      dischargeType: '',
      actualDischargeDate: '',

      /* Clinical summary */
      admissionReason: '',
      treatmentSummary: '',
      progressNotes: '',
      goalsAchieved: '',
      goalsPartial: '',
      goalsNotMet: '',
      primaryDiagnosis: p?.diagnosis || '',
      secondaryDiagnoses: '',
      conditionAtDischarge: '',
      matAtDischarge: '',
      matContinuation: '',
      psychiatricStatus: '',
      recommendations: '',

      /* Aftercare */
      residingWith: '',
      housingStability: '',
      employmentPlan: '',
      financialPlan: '',
      transportAccess: '',
      followUps: FOLLOWUP_SCHEDULE.map(f => ({
        id: f.id, label: f.label, days: f.days,
        scheduledDate: addDays(today, f.days),
        outcome: '', contactMethod: 'Phone call', status: 'scheduled', notes: '',
      })),
      aftercareNotes: '',

      /* Referrals */
      referrals: [],

      /* Relapse prevention */
      triggers: [],
      copingStrategies: [],
      warningSignsEarly: '',
      warningSignsMid: '',
      warningSignsLate: '',
      emergencyContactName: '',
      emergencyContactRel: '',
      emergencyContactPhone: '',
      supportGroupPlan: '',
      crisisLineAware: false,
      relapseActionPlan: '',
      rpNotes: '',

      /* Alumni */
      alumniConsent: false,
      alumniContactPref: '',
      alumniNotes: '',

      status: 'planning', // planning | ready | discharged
    };
  }
  return state.records[pid];
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
function fmtDate(d) {
  if (!d) return '—';
  return new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function daysBetween(a, b) {
  return Math.round((new Date(b) - new Date(a)) / 86400000);
}

/* ══════════════════════════════════════════════════════════════════════
   RENDER ENTRY
   ══════════════════════════════════════════════════════════════════════ */
export function render(container) {
  container.innerHTML = '';
  container.className = 'dc-root';

  if (state.view === 'select')   renderSelect(container);
  else if (state.view === 'plan')    renderPlan(container);
  else if (state.view === 'summary') renderSummary(container);

  bindEvents(container);
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: SELECT PATIENT
   ══════════════════════════════════════════════════════════════════════ */
function renderSelect(container) {
  container.innerHTML = `
    <div class="dc-header">
      <div class="dc-header-inner">
        <div class="dc-title-row">
          <span class="dc-hicon">🚪</span>
          <div>
            <h1 class="dc-title">Discharge &amp; Aftercare</h1>
            <p class="dc-subtitle">M6 — Discharge planning · Clinical summary · Aftercare · Referrals · Relapse prevention · Alumni tracking</p>
          </div>
        </div>
      </div>
    </div>
    <div class="dc-body">
      <h2 class="dc-section-h">Select Patient</h2>
      <p class="dc-section-sub">Discharge planning should begin at the midpoint of the treatment programme. All residents require an aftercare plan before discharge.</p>
      <div class="dc-patient-list">
        ${PATIENTS.map(p => {
          const rec = state.records[p.id];
          const status = rec ? rec.status : null;
          const prog = rec ? getSectionProgress(rec) : { done: 0, total: 6 };
          const statusBadge = status
            ? `<span class="dc-status-badge dc-status-${status}">${dcStatusLabel(status)}</span>`
            : '<span class="dc-status-badge dc-status-planning">Not started</span>';
          const los = daysBetween(p.admitDate, new Date().toISOString().slice(0,10));
          return `
          <div class="dc-patient-row" data-action="select-patient" data-pid="${p.id}">
            <div class="dc-pat-avatar">${p.name.charAt(0)}</div>
            <div class="dc-pat-body">
              <div class="dc-pat-name">${p.name} <span class="dc-pat-id">${p.id}</span></div>
              <div class="dc-pat-meta">${p.age}y · ${p.gender} · ${p.room} · Admitted ${fmtDate(p.admitDate)} · LOS: ${los} days</div>
              <div class="dc-pat-meta">${p.diagnosis}</div>
              ${rec ? `<div class="dc-pat-prog">
                <div class="dc-pat-prog-bar"><div class="dc-pat-prog-fill" style="width:${Math.round(prog.done/prog.total*100)}%"></div></div>
                <span>${prog.done}/${prog.total} sections</span>
              </div>` : ''}
            </div>
            <div class="dc-pat-right">
              ${statusBadge}
              <span class="dc-pat-arrow">›</span>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

function dcStatusLabel(s) {
  return { planning: 'Planning', ready: 'Ready to Discharge', discharged: 'Discharged' }[s] || s;
}

function getSectionProgress(rec) {
  let done = 0;
  if (rec.dischargeType && rec.plannedDischargeDate) done++;
  if (rec.treatmentSummary && rec.conditionAtDischarge) done++;
  if (rec.housingStability && rec.residingWith) done++;
  if (rec.referrals.length > 0) done++;
  if (rec.triggers.length > 0 && rec.copingStrategies.length > 0) done++;
  if (rec.alumniConsent !== undefined && rec.emergencyContactName) done++;
  return { done, total: 6 };
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: PLAN  (section nav)
   ══════════════════════════════════════════════════════════════════════ */
function renderPlan(container) {
  const p   = PATIENTS.find(x => x.id === state.patient);
  const rec = getRecord(p.id);
  const prog = getSectionProgress(rec);

  const sections = [
    { id: 'planning',  icon: '🗂️',  label: 'Discharge Planning' },
    { id: 'summary',   icon: '📋',  label: 'Clinical Summary' },
    { id: 'aftercare', icon: '📅',  label: 'Aftercare Plan' },
    { id: 'referrals', icon: '🔗',  label: 'Referrals' },
    { id: 'relapse',   icon: '🛡️',  label: 'Relapse Prevention' },
    { id: 'alumni',    icon: '⭐',   label: 'Alumni Tracking' },
  ];

  container.innerHTML = `
    <div class="dc-header">
      <div class="dc-header-inner">
        <button class="dc-back" data-action="go-select">← All Patients</button>
        <div class="dc-title-row">
          <span class="dc-hicon">🚪</span>
          <div>
            <h1 class="dc-title">${p.name} — Discharge &amp; Aftercare</h1>
            <p class="dc-subtitle">${p.id} · LOS: ${daysBetween(p.admitDate, new Date().toISOString().slice(0,10))} days · ${p.loc}</p>
          </div>
        </div>
        <div class="dc-header-actions">
          <span class="dc-status-badge dc-status-${rec.status}">${dcStatusLabel(rec.status)}</span>
          ${rec.status === 'planning' && prog.done >= 4
            ? `<button class="dc-btn dc-btn--outline" data-action="mark-ready">✅ Mark Ready</button>` : ''}
          ${rec.status === 'ready'
            ? `<button class="dc-btn dc-btn--primary" data-action="confirm-discharge">🚪 Confirm Discharge</button>` : ''}
          <button class="dc-btn dc-btn--outline" data-action="go-dc-summary">📄 View Summary</button>
        </div>
      </div>
    </div>

    <div class="dc-layout">
      <nav class="dc-section-nav">
        ${sections.map(s => `
          <button class="dc-snav-item${state.section === s.id ? ' dc-snav--active' : ''}" data-action="go-section" data-sec="${s.id}">
            <span class="dc-snav-icon">${s.icon}</span>
            <span class="dc-snav-label">${s.label}</span>
            ${getSectionDone(s.id, rec) ? '<span class="dc-snav-badge">✓</span>' : ''}
          </button>`).join('')}
        <div class="dc-snav-divider"></div>
        <div class="dc-snav-prog">
          <div class="dc-snav-prog-bar"><div style="width:${Math.round(prog.done/prog.total*100)}%"></div></div>
          <span>${prog.done} / ${prog.total} complete</span>
        </div>
      </nav>

      <div class="dc-section-content">
        ${renderSection(state.section, p, rec)}
      </div>
    </div>`;
}

function getSectionDone(sec, rec) {
  switch (sec) {
    case 'planning':  return !!(rec.dischargeType && rec.plannedDischargeDate);
    case 'summary':   return !!(rec.treatmentSummary && rec.conditionAtDischarge);
    case 'aftercare': return !!(rec.housingStability && rec.residingWith);
    case 'referrals': return rec.referrals.length > 0;
    case 'relapse':   return rec.triggers.length > 0 && rec.copingStrategies.length > 0;
    case 'alumni':    return !!(rec.emergencyContactName);
    default: return false;
  }
}

function renderSection(sec, p, rec) {
  switch (sec) {
    case 'planning':  return secPlanning(p, rec);
    case 'summary':   return secClinicalSummary(p, rec);
    case 'aftercare': return secAftercare(p, rec);
    case 'referrals': return secReferrals(p, rec);
    case 'relapse':   return secRelapse(p, rec);
    case 'alumni':    return secAlumni(p, rec);
    default:          return secPlanning(p, rec);
  }
}

/* ── SECTION: DISCHARGE PLANNING ───────────────────────────────────── */
function secPlanning(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>Discharge planning should begin at the programme midpoint. Complete all sections before marking the patient as ready for discharge.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Discharge Details</div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Discharge Type</label>
          <select class="dc-select" id="pl-type">
            <option value="">— Select discharge type —</option>
            ${DISCHARGE_TYPES.map(t => `<option value="${t.value}"${rec.dischargeType === t.value ? ' selected' : ''}>${t.label}</option>`).join('')}
          </select>
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Planned Discharge Date</label>
          <input class="dc-input" type="date" id="pl-planned-date" value="${rec.plannedDischargeDate}">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Actual Discharge Date</label>
          <input class="dc-input" type="date" id="pl-actual-date" value="${rec.actualDischargeDate}">
        </div>
      </div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Planning Initiated By</label>
          <input class="dc-input" id="pl-clinician" placeholder="Clinician name &amp; role" value="${rec.planningClinicianName}">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Planning Initiated Date</label>
          <input class="dc-input" type="date" id="pl-init-date" value="${rec.planningInitiated}">
        </div>
      </div>
      <div class="dc-field">
        <label class="dc-field-label">Planning Notes</label>
        <textarea class="dc-textarea" id="pl-notes" rows="3" placeholder="Key planning considerations, family involvement, barriers to discharge...">${rec.planningNotes}</textarea>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Programme Stay Summary</div>
      <div class="dc-info-grid">
        <div class="dc-info-item"><span>Patient</span><strong>${p.name}</strong></div>
        <div class="dc-info-item"><span>Admitted</span><strong>${fmtDate(p.admitDate)}</strong></div>
        <div class="dc-info-item"><span>Length of Stay</span><strong>${daysBetween(p.admitDate, new Date().toISOString().slice(0,10))} days</strong></div>
        <div class="dc-info-item"><span>ASAM Level</span><strong>${p.loc}</strong></div>
        <div class="dc-info-item"><span>Primary Diagnosis</span><strong>${p.diagnosis}</strong></div>
        <div class="dc-info-item"><span>Lead Clinician</span><strong>${p.clinician}</strong></div>
      </div>
    </div>

    <div class="dc-save-row">
      <button class="dc-btn dc-btn--primary" data-action="save-planning">💾 Save Planning Details</button>
    </div>
  </div>`;
}

/* ── SECTION: CLINICAL SUMMARY ──────────────────────────────────────── */
function secClinicalSummary(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>The clinical summary is the formal record of the patient's treatment episode. It will accompany all referral letters and must be reviewed by the Clinical Director before discharge.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Diagnoses at Discharge</div>
      <div class="dc-field">
        <label class="dc-field-label">Primary Diagnosis (ICD-11)</label>
        <input class="dc-input" id="cs-primary-dx" value="${rec.primaryDiagnosis}" placeholder="e.g. 6C40.1 — Alcohol dependence, Severe">
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Secondary / Co-occurring Diagnoses</label>
        <textarea class="dc-textarea" id="cs-secondary-dx" rows="2" placeholder="e.g. 6A70 — Major Depressive Disorder; 6B40 — PTSD">${rec.secondaryDiagnoses}</textarea>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Reason for Admission</div>
      <textarea class="dc-textarea" id="cs-reason" rows="3" placeholder="Presenting complaint, substance use severity, risk factors that led to admission...">${rec.admissionReason}</textarea>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Treatment Summary</div>
      <div class="dc-field">
        <label class="dc-field-label">Treatment Received</label>
        <textarea class="dc-textarea" id="cs-treatment" rows="4" placeholder="List of interventions provided: group therapy (CBT-SUD, relapse prevention, life skills), individual counselling (MI, trauma-focused), MAT, psychiatric review, family therapy sessions, skills groups...">${rec.treatmentSummary}</textarea>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Treatment Goal Outcomes</div>
      <div class="dc-field">
        <label class="dc-field-label">Goals Achieved</label>
        <textarea class="dc-textarea" id="cs-goals-achieved" rows="2" placeholder="Specific goals patient met during treatment...">${rec.goalsAchieved}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Goals Partially Met</label>
        <textarea class="dc-textarea" id="cs-goals-partial" rows="2" placeholder="Goals in progress — continued in aftercare...">${rec.goalsPartial}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Goals Not Met / Carry Forward</label>
        <textarea class="dc-textarea" id="cs-goals-notmet" rows="2" placeholder="Goals to be addressed in continuing outpatient care...">${rec.goalsNotMet}</textarea>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Clinical Status at Discharge</div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Condition at Discharge</label>
          <select class="dc-select" id="cs-condition">
            <option value="">— Select —</option>
            ${['Stable — in remission','Improved — ongoing risk','Partial improvement','Unchanged','Deteriorated','Medical transfer required'].map(o => `<option${rec.conditionAtDischarge === o ? ' selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Psychiatric Status at Discharge</label>
          <select class="dc-select" id="cs-psych-status">
            <option value="">— Select —</option>
            ${['No psychiatric concerns','Stable on medication','Referred for outpatient psychiatric follow-up','Psychiatric symptoms improving','Psychiatric symptoms persistent — urgent follow-up'].map(o => `<option${rec.psychiatricStatus === o ? ' selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">MAT at Discharge</label>
        <input class="dc-input" id="cs-mat" placeholder="e.g. Continuing naltrexone 50mg daily — prescription provided" value="${rec.matAtDischarge}">
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">MAT Continuation Instructions</label>
        <textarea class="dc-textarea" id="cs-mat-cont" rows="2" placeholder="Details for receiving GP/clinic: dosing schedule, monitoring requirements, prescriber contact...">${rec.matContinuation}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Clinical Recommendations</label>
        <textarea class="dc-textarea" id="cs-recs" rows="3" placeholder="Specific recommendations for ongoing care: level of outpatient support needed, frequency of follow-up, warning signs to monitor...">${rec.recommendations}</textarea>
      </div>
    </div>

    <div class="dc-save-row">
      <button class="dc-btn dc-btn--primary" data-action="save-summary">💾 Save Clinical Summary</button>
    </div>
  </div>`;
}

/* ── SECTION: AFTERCARE PLAN ────────────────────────────────────────── */
function secAftercare(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>The aftercare plan bridges the gap between residential treatment and independent recovery. Schedule all follow-up contacts before the patient leaves.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Post-Discharge Living Situation</div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Residing With / Accommodation</label>
          <select class="dc-select" id="ac-residing">
            <option value="">— Select —</option>
            ${['Own home (alone)','With spouse / partner','With parents','With siblings / other family','With friends','Sober living / halfway house','NGO accommodation','Hostel / shelter','Homeless — referral made','Other'].map(o => `<option${rec.residingWith === o ? ' selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Housing Stability</label>
          <select class="dc-select" id="ac-housing">
            <option value="">— Select —</option>
            ${['Stable — low risk','Mostly stable — some concerns','Unstable — follow-up needed','Unsafe — urgent intervention required'].map(o => `<option${rec.housingStability === o ? ' selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Employment / Occupation Plan</label>
          <input class="dc-input" id="ac-employment" placeholder="Returning to work, job seeking, vocational training, NA/AA service..." value="${rec.employmentPlan}">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Financial Support Plan</label>
          <input class="dc-input" id="ac-financial" placeholder="Income source, benefits, family support..." value="${rec.financialPlan}">
        </div>
      </div>
      <div class="dc-field">
        <label class="dc-field-label">Transport Access</label>
        <select class="dc-select" id="ac-transport" style="max-width:300px">
          <option value="">— Select —</option>
          ${['Own vehicle','Public transport accessible','Dependent on family','Limited access — barrier to follow-up','No transport — home visits planned'].map(o => `<option${rec.transportAccess === o ? ' selected' : ''}>${o}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Follow-Up Schedule</div>
      <p class="dc-card-sub-text">All follow-up dates are pre-populated from the actual discharge date. Adjust as needed.</p>
      <div class="dc-followup-list">
        ${rec.followUps.map((fu, i) => `
        <div class="dc-fu-row">
          <div class="dc-fu-label">${fu.label}</div>
          <div class="dc-fu-fields">
            <div class="dc-field">
              <label class="dc-field-label">Date</label>
              <input class="dc-input dc-input--sm" type="date" id="fu-date-${i}" value="${fu.scheduledDate}">
            </div>
            <div class="dc-field">
              <label class="dc-field-label">Contact Method</label>
              <select class="dc-select dc-select--sm" id="fu-method-${i}">
                ${['Phone call','Home visit','Clinic visit','Video call','SMS/WhatsApp'].map(m => `<option${fu.contactMethod === m ? ' selected' : ''}>${m}</option>`).join('')}
              </select>
            </div>
            <div class="dc-field">
              <label class="dc-field-label">Status</label>
              <select class="dc-select dc-select--sm" id="fu-status-${i}">
                ${['scheduled','completed','missed','rescheduled'].map(s => `<option${fu.status === s ? ' selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>
            <div class="dc-field dc-field--wide">
              <label class="dc-field-label">Outcome Notes</label>
              <input class="dc-input dc-input--sm" id="fu-notes-${i}" placeholder="Outcome, relapse, re-admission..." value="${fu.notes}">
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div class="dc-field" style="margin-top:1rem">
        <label class="dc-field-label">Additional Aftercare Notes</label>
        <textarea class="dc-textarea" id="ac-notes" rows="2" placeholder="Any other aftercare considerations...">${rec.aftercareNotes}</textarea>
      </div>
    </div>

    <div class="dc-save-row">
      <button class="dc-btn dc-btn--primary" data-action="save-aftercare">💾 Save Aftercare Plan</button>
    </div>
  </div>`;
}

/* ── SECTION: REFERRALS ─────────────────────────────────────────────── */
function secReferrals(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>Every patient must receive at least one formal referral. Referral letters should be prepared before the discharge date and copies filed in the patient record.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Add Referral</div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Referral Type</label>
          <select class="dc-select" id="ref-type">
            <option value="">— Select type —</option>
            ${REFERRAL_TYPES.map(t => `<option>${t}</option>`).join('')}
          </select>
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Organisation / Facility Name</label>
          <input class="dc-input" id="ref-org" placeholder="e.g. Lusaka Community Mental Health Centre">
        </div>
      </div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Contact Person</label>
          <input class="dc-input" id="ref-contact" placeholder="Name &amp; title">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Contact Number / Email</label>
          <input class="dc-input" id="ref-phone" placeholder="+260...">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Referral Date</label>
          <input class="dc-input" type="date" id="ref-date" value="${new Date().toISOString().slice(0,10)}">
        </div>
      </div>
      <div class="dc-field">
        <label class="dc-field-label">Referral Notes / Reason</label>
        <textarea class="dc-textarea" id="ref-notes" rows="2" placeholder="Specific reason for referral, urgency, patient context to communicate..."></textarea>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:.5rem">
        <button class="dc-btn dc-btn--primary dc-btn--sm" data-action="add-referral">+ Add Referral</button>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Referral Log <span class="dc-card-count">${rec.referrals.length}</span></div>
      ${rec.referrals.length === 0 ? `<p class="dc-empty">No referrals added yet. Add at least one community referral before discharge.</p>` : ''}
      <div class="dc-ref-list">
        ${rec.referrals.map((r, i) => `
        <div class="dc-ref-row">
          <div class="dc-ref-icon">🔗</div>
          <div class="dc-ref-body">
            <div class="dc-ref-type">${r.type}</div>
            <div class="dc-ref-org">${r.org || '—'}</div>
            <div class="dc-ref-meta">${r.contact ? r.contact + ' · ' : ''}${r.phone || ''} · ${fmtDate(r.date)}</div>
            ${r.notes ? `<div class="dc-ref-notes">${r.notes}</div>` : ''}
          </div>
          <div class="dc-ref-actions">
            <select class="dc-select dc-select--sm" data-action="ref-status" data-idx="${i}">
              ${['pending','sent','confirmed','declined'].map(s => `<option${r.status===s?' selected':''}>${s}</option>`).join('')}
            </select>
            <button class="dc-icon-btn" data-action="delete-referral" data-idx="${i}" title="Remove">🗑️</button>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

/* ── SECTION: RELAPSE PREVENTION ────────────────────────────────────── */
function secRelapse(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>The relapse prevention plan is completed collaboratively with the patient. It is their personal document to take home. All sections should be completed in the patient's own words where possible.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">My Triggers</div>
      <label class="dc-field-label">Select all situations that put me at risk:</label>
      <div class="dc-check-grid">
        ${TRIGGER_CATEGORIES.map(t => `
        <label class="dc-check-item">
          <input type="checkbox" name="rp-triggers" value="${t}"${rec.triggers.includes(t) ? ' checked' : ''}> ${t}
        </label>`).join('')}
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">My Coping Strategies</div>
      <label class="dc-field-label">Select what I will do when I feel the urge to use:</label>
      <div class="dc-check-grid">
        ${COPING_STRATEGIES.map(s => `
        <label class="dc-check-item">
          <input type="checkbox" name="rp-coping" value="${s}"${rec.copingStrategies.includes(s) ? ' checked' : ''}> ${s}
        </label>`).join('')}
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Warning Signs</div>
      <p class="dc-card-sub-text">What does relapse look like for me? Helping me recognise I am heading towards relapse.</p>
      <div class="dc-field">
        <label class="dc-field-label">Early Warning Signs <span class="dc-field-hint">(thoughts / attitudes changing)</span></label>
        <textarea class="dc-textarea" id="rp-warn-early" rows="2" placeholder="e.g. Starting to think 'one drink won't hurt', withdrawing from support people, skipping meetings...">${rec.warningSignsEarly}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Mid-Stage Warning Signs <span class="dc-field-hint">(behaviour changes)</span></label>
        <textarea class="dc-textarea" id="rp-warn-mid" rows="2" placeholder="e.g. Returning to old social circles, stopping medication, increased anxiety/depression...">${rec.warningSignsMid}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Late Warning Signs <span class="dc-field-hint">(crisis point — immediately before use)</span></label>
        <textarea class="dc-textarea" id="rp-warn-late" rows="2" placeholder="e.g. Actively seeking substances, contacting dealers, severe cravings...">${rec.warningSignsLate}</textarea>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Emergency Contacts &amp; Crisis Plan</div>
      <div class="dc-field-row">
        <div class="dc-field">
          <label class="dc-field-label">Primary Support Person Name</label>
          <input class="dc-input" id="rp-ec-name" value="${rec.emergencyContactName}" placeholder="Full name">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Relationship</label>
          <input class="dc-input" id="rp-ec-rel" value="${rec.emergencyContactRel}" placeholder="e.g. Spouse, Parent, Sponsor">
        </div>
        <div class="dc-field">
          <label class="dc-field-label">Phone Number</label>
          <input class="dc-input" id="rp-ec-phone" value="${rec.emergencyContactPhone}" placeholder="+260...">
        </div>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">NA/AA or Support Group Attendance Plan</label>
        <input class="dc-input" id="rp-support-group" value="${rec.supportGroupPlan}" placeholder="e.g. AA meeting every Tuesday 6pm — St John's Church, Lusaka">
      </div>
      <div class="dc-toggle-row" style="margin-top:.75rem">
        <label class="dc-toggle-label">
          <input type="checkbox" id="rp-crisis-aware"${rec.crisisLineAware ? ' checked' : ''}> Patient has been given the Serenje Wellness Home crisis/alumni line number
        </label>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">If I Relapse — My Action Plan</label>
        <textarea class="dc-textarea" id="rp-action-plan" rows="3" placeholder="Step 1: Call support person / Step 2: Call Serenje crisis line / Step 3: Attend emergency NA/AA meeting / Step 4: Contact GP / Step 5: Seek re-admission if needed...">${rec.relapseActionPlan}</textarea>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Clinician Notes</label>
        <textarea class="dc-textarea" id="rp-notes" rows="2" placeholder="Any additional relapse prevention notes...">${rec.rpNotes}</textarea>
      </div>
    </div>

    <div class="dc-save-row">
      <button class="dc-btn dc-btn--primary" data-action="save-relapse">💾 Save Relapse Prevention Plan</button>
    </div>
  </div>`;
}

/* ── SECTION: ALUMNI TRACKING ───────────────────────────────────────── */
function secAlumni(p, rec) {
  return `
  <div class="dc-sec-body">
    <div class="dc-sec-intro">
      <p>Alumni tracking supports long-term recovery and provides outcome data for MoH/HPCZ reporting. All follow-up contact requires patient consent.</p>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Alumni Consent &amp; Preferences</div>
      <div class="dc-toggle-row">
        <label class="dc-toggle-label">
          <input type="checkbox" id="al-consent"${rec.alumniConsent ? ' checked' : ''}> Patient consents to alumni follow-up contact after discharge
        </label>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Preferred Contact Method</label>
        <select class="dc-select" id="al-contact-pref" style="max-width:280px">
          <option value="">— Select —</option>
          ${['Phone call','SMS/WhatsApp','Home visit','Clinic visit','Email','No preference'].map(m => `<option${rec.alumniContactPref === m ? ' selected' : ''}>${m}</option>`).join('')}
        </select>
      </div>
      <div class="dc-field" style="margin-top:.75rem">
        <label class="dc-field-label">Alumni Notes</label>
        <textarea class="dc-textarea" id="al-notes" rows="2" placeholder="Special considerations for follow-up contact...">${rec.alumniNotes}</textarea>
      </div>
      <div class="dc-save-row" style="border:none;padding-top:.5rem">
        <button class="dc-btn dc-btn--primary dc-btn--sm" data-action="save-alumni">Save Alumni Preferences</button>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Follow-Up Outcomes</div>
      <p class="dc-card-sub-text">Record outcomes of each scheduled follow-up contact.</p>
      <div class="dc-alumni-list">
        ${rec.followUps.map((fu, i) => `
        <div class="dc-alumni-row">
          <div class="dc-alumni-left">
            <div class="dc-alumni-label">${fu.label}</div>
            <div class="dc-alumni-date">${fmtDate(fu.scheduledDate)} · ${fu.contactMethod}</div>
          </div>
          <div class="dc-alumni-mid">
            <select class="dc-select dc-select--sm" id="al-outcome-status-${i}">
              ${['scheduled','completed','missed','rescheduled','declined'].map(s => `<option${fu.status===s?' selected':''}>${s}</option>`).join('')}
            </select>
          </div>
          <div class="dc-alumni-right">
            <input class="dc-input dc-input--sm" id="al-outcome-${i}" placeholder="Outcome: abstinent, relapsed, re-admitted..." value="${fu.outcome}">
          </div>
        </div>`).join('')}
      </div>
      <div class="dc-save-row" style="border:none;padding-top:.75rem">
        <button class="dc-btn dc-btn--primary dc-btn--sm" data-action="save-followup-outcomes">Save Follow-Up Outcomes</button>
      </div>
    </div>

    <div class="dc-card">
      <div class="dc-card-title">Alumni Outcomes Summary</div>
      <div class="dc-outcomes-grid">
        ${rec.followUps.map(fu => {
          const statusColor = { scheduled:'#6b7280', completed:'#059669', missed:'#dc2626', rescheduled:'#d97706', declined:'#7c3aed' };
          return `
          <div class="dc-outcome-card">
            <div class="dc-outcome-label">${fu.label}</div>
            <div class="dc-outcome-status" style="color:${statusColor[fu.status]||'#6b7280'}">${fu.status}</div>
            <div class="dc-outcome-notes">${fu.outcome || '—'}</div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════════════════
   VIEW: DISCHARGE SUMMARY (printable)
   ══════════════════════════════════════════════════════════════════════ */
function renderSummary(container) {
  const p   = PATIENTS.find(x => x.id === state.patient);
  const rec = getRecord(p.id);
  const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
  const los = daysBetween(p.admitDate, rec.actualDischargeDate || new Date().toISOString().slice(0,10));

  container.innerHTML = `
    <div class="dc-header">
      <div class="dc-header-inner">
        <button class="dc-back" data-action="go-plan">← Back to Plan</button>
        <div class="dc-title-row">
          <span class="dc-hicon">📄</span>
          <div>
            <h1 class="dc-title">Discharge Summary — ${p.name}</h1>
            <p class="dc-subtitle">${p.id} · Generated ${today}</p>
          </div>
        </div>
        <button class="dc-btn dc-btn--outline" onclick="window.print()">🖨️ Print</button>
      </div>
    </div>
    <div class="dc-body dc-sum-body">

      <!-- Patient header -->
      <div class="dc-sum-head">
        <div class="dc-sum-head-top">
          <div class="dc-sum-facility">
            <div class="dc-sum-facility-name">Serenje Wellness Home</div>
            <div class="dc-sum-facility-sub">Substance Use Disorder Treatment Centre · Makeni, Lusaka, Zambia</div>
          </div>
          <div class="dc-sum-doc-label">DISCHARGE SUMMARY</div>
        </div>
        <div class="dc-sum-head-grid">
          <div><span>Patient Name</span><strong>${p.name}</strong></div>
          <div><span>Patient ID</span><strong>${p.id}</strong></div>
          <div><span>Age / Gender</span><strong>${p.age}y · ${p.gender}</strong></div>
          <div><span>Admission Date</span><strong>${fmtDate(p.admitDate)}</strong></div>
          <div><span>Discharge Date</span><strong>${fmtDate(rec.actualDischargeDate) || 'Pending'}</strong></div>
          <div><span>Length of Stay</span><strong>${los} days</strong></div>
          <div><span>Discharge Type</span><strong>${DISCHARGE_TYPES.find(t=>t.value===rec.dischargeType)?.label || '—'}</strong></div>
          <div><span>Lead Clinician</span><strong>${rec.planningClinicianName || p.clinician}</strong></div>
        </div>
      </div>

      <!-- Diagnoses -->
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">🔖 Diagnoses at Discharge</div>
        <div class="dc-sum-row"><span>Primary Diagnosis</span><strong>${rec.primaryDiagnosis || '—'}</strong></div>
        ${rec.secondaryDiagnoses ? `<div class="dc-sum-row"><span>Co-occurring Disorders</span><strong>${rec.secondaryDiagnoses}</strong></div>` : ''}
        ${rec.conditionAtDischarge ? `<div class="dc-sum-row"><span>Condition at Discharge</span><strong>${rec.conditionAtDischarge}</strong></div>` : ''}
        ${rec.psychiatricStatus ? `<div class="dc-sum-row"><span>Psychiatric Status</span><strong>${rec.psychiatricStatus}</strong></div>` : ''}
      </div>

      <!-- Admission & Treatment -->
      ${rec.admissionReason ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">📥 Reason for Admission</div>
        <p class="dc-sum-prose">${rec.admissionReason}</p>
      </div>` : ''}

      ${rec.treatmentSummary ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">🛠️ Treatment Received</div>
        <p class="dc-sum-prose">${rec.treatmentSummary}</p>
      </div>` : ''}

      <!-- Goal outcomes -->
      ${(rec.goalsAchieved || rec.goalsPartial || rec.goalsNotMet) ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">🎯 Treatment Goal Outcomes</div>
        ${rec.goalsAchieved ? `<div class="dc-sum-goal-block dc-goal--achieved"><span class="dc-goal-label">✅ Achieved</span><p>${rec.goalsAchieved}</p></div>` : ''}
        ${rec.goalsPartial  ? `<div class="dc-sum-goal-block dc-goal--partial"><span class="dc-goal-label">🔄 Partially Met</span><p>${rec.goalsPartial}</p></div>` : ''}
        ${rec.goalsNotMet   ? `<div class="dc-sum-goal-block dc-goal--notmet"><span class="dc-goal-label">⏭️ Carry Forward</span><p>${rec.goalsNotMet}</p></div>` : ''}
      </div>` : ''}

      <!-- MAT -->
      ${(rec.matAtDischarge || rec.matContinuation) ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">💊 Medication-Assisted Treatment</div>
        ${rec.matAtDischarge ? `<div class="dc-sum-row"><span>MAT at Discharge</span><strong>${rec.matAtDischarge}</strong></div>` : ''}
        ${rec.matContinuation ? `<p class="dc-sum-prose" style="margin-top:.5rem">${rec.matContinuation}</p>` : ''}
      </div>` : ''}

      <!-- Recommendations -->
      ${rec.recommendations ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">📋 Clinical Recommendations</div>
        <p class="dc-sum-prose">${rec.recommendations}</p>
      </div>` : ''}

      <!-- Referrals -->
      ${rec.referrals.length > 0 ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">🔗 Community Referrals</div>
        <div class="dc-sum-ref-list">
          ${rec.referrals.map(r => `
          <div class="dc-sum-ref-row">
            <span class="dc-sum-ref-type">${r.type}</span>
            <span class="dc-sum-ref-org">${r.org || ''}</span>
            <span class="dc-sum-ref-contact">${r.contact || ''} ${r.phone || ''}</span>
            <span class="dc-sum-ref-status dc-sum-ref-${r.status}">${r.status}</span>
          </div>`).join('')}
        </div>
      </div>` : ''}

      <!-- Aftercare -->
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">📅 Aftercare Plan</div>
        ${rec.residingWith ? `<div class="dc-sum-row"><span>Residing with</span><strong>${rec.residingWith}</strong></div>` : ''}
        ${rec.housingStability ? `<div class="dc-sum-row"><span>Housing stability</span><strong>${rec.housingStability}</strong></div>` : ''}
        ${rec.employmentPlan ? `<div class="dc-sum-row"><span>Employment/occupation</span><strong>${rec.employmentPlan}</strong></div>` : ''}
        ${rec.supportGroupPlan ? `<div class="dc-sum-row"><span>Support group</span><strong>${rec.supportGroupPlan}</strong></div>` : ''}
        <div class="dc-sum-followup-grid">
          ${rec.followUps.map(fu => `
          <div class="dc-sum-fu-card">
            <div class="dc-sum-fu-label">${fu.label}</div>
            <div class="dc-sum-fu-date">${fmtDate(fu.scheduledDate)}</div>
            <div class="dc-sum-fu-method">${fu.contactMethod}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- Relapse prevention summary -->
      ${(rec.triggers.length > 0 || rec.copingStrategies.length > 0 || rec.emergencyContactName) ? `
      <div class="dc-sum-section">
        <div class="dc-sum-section-title">🛡️ Relapse Prevention Plan</div>
        ${rec.triggers.length > 0 ? `<div class="dc-sum-row"><span>Identified Triggers</span><strong>${rec.triggers.join(' · ')}</strong></div>` : ''}
        ${rec.copingStrategies.length > 0 ? `<div class="dc-sum-row"><span>Coping Strategies</span><strong>${rec.copingStrategies.join(' · ')}</strong></div>` : ''}
        ${rec.emergencyContactName ? `<div class="dc-sum-row"><span>Primary Support Person</span><strong>${rec.emergencyContactName} (${rec.emergencyContactRel}) · ${rec.emergencyContactPhone}</strong></div>` : ''}
        ${rec.relapseActionPlan ? `<div class="dc-sum-row" style="align-items:flex-start"><span>Relapse Action Plan</span><p style="margin:0;font-size:.83rem">${rec.relapseActionPlan}</p></div>` : ''}
      </div>` : ''}

      <!-- Sign-off -->
      <div class="dc-sum-section dc-sig-block">
        <div class="dc-sum-section-title">Clinical Authorisation</div>
        <div class="dc-sig-row">
          <div class="dc-sig-field"><div class="dc-sig-line"></div><div class="dc-sig-label">Discharging Clinician</div></div>
          <div class="dc-sig-field"><div class="dc-sig-line"></div><div class="dc-sig-label">Clinical Director</div></div>
          <div class="dc-sig-field"><div class="dc-sig-line"></div><div class="dc-sig-label">Patient Signature</div></div>
          <div class="dc-sig-field"><div class="dc-sig-line"></div><div class="dc-sig-label">Date</div></div>
        </div>
        <div class="dc-sig-note">Serenje Wellness Home · SATM System · Powered by eNgoma</div>
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
        state.section = 'planning';
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
        render(container); break;

      case 'go-dc-summary':
        state.view = 'summary';
        render(container); break;

      case 'mark-ready': {
        const rec = getRecord(state.patient);
        rec.status = 'ready';
        render(container); break;
      }
      case 'confirm-discharge': {
        const rec = getRecord(state.patient);
        rec.status = 'discharged';
        if (!rec.actualDischargeDate) rec.actualDischargeDate = new Date().toISOString().slice(0,10);
        render(container); break;
      }

      case 'save-planning':    savePlanning(container); break;
      case 'save-summary':     saveClinicalSummary(container); break;
      case 'save-aftercare':   saveAftercare(container); break;
      case 'save-relapse':     saveRelapse(container); break;
      case 'save-alumni':      saveAlumni(container); break;
      case 'save-followup-outcomes': saveFollowupOutcomes(container); break;

      case 'add-referral':     addReferral(container); break;
      case 'delete-referral': {
        const rec = getRecord(state.patient);
        rec.referrals.splice(parseInt(el.dataset.idx), 1);
        render(container); break;
      }
    }
  });

  // Referral status change
  container.addEventListener('change', e => {
    if (e.target.dataset.action === 'ref-status') {
      const rec = getRecord(state.patient);
      const idx = parseInt(e.target.dataset.idx);
      if (rec.referrals[idx]) rec.referrals[idx].status = e.target.value;
    }
  });
}

/* ── SAVE FUNCTIONS ─────────────────────────────────────────────────── */
function savePlanning(container) {
  const rec = getRecord(state.patient);
  rec.dischargeType       = container.querySelector('#pl-type')?.value || '';
  rec.plannedDischargeDate= container.querySelector('#pl-planned-date')?.value || '';
  rec.actualDischargeDate = container.querySelector('#pl-actual-date')?.value || '';
  rec.planningClinicianName = container.querySelector('#pl-clinician')?.value || '';
  rec.planningInitiated   = container.querySelector('#pl-init-date')?.value || '';
  rec.planningNotes       = container.querySelector('#pl-notes')?.value || '';
  // Update followup dates from actual discharge date
  const base = rec.actualDischargeDate || rec.plannedDischargeDate;
  if (base) {
    rec.followUps.forEach(fu => { fu.scheduledDate = addDays(base, fu.days); });
  }
  showToast(container, 'Planning details saved');
}

function saveClinicalSummary(container) {
  const rec = getRecord(state.patient);
  rec.primaryDiagnosis   = container.querySelector('#cs-primary-dx')?.value || '';
  rec.secondaryDiagnoses = container.querySelector('#cs-secondary-dx')?.value || '';
  rec.admissionReason    = container.querySelector('#cs-reason')?.value || '';
  rec.treatmentSummary   = container.querySelector('#cs-treatment')?.value || '';
  rec.goalsAchieved      = container.querySelector('#cs-goals-achieved')?.value || '';
  rec.goalsPartial       = container.querySelector('#cs-goals-partial')?.value || '';
  rec.goalsNotMet        = container.querySelector('#cs-goals-notmet')?.value || '';
  rec.conditionAtDischarge = container.querySelector('#cs-condition')?.value || '';
  rec.psychiatricStatus  = container.querySelector('#cs-psych-status')?.value || '';
  rec.matAtDischarge     = container.querySelector('#cs-mat')?.value || '';
  rec.matContinuation    = container.querySelector('#cs-mat-cont')?.value || '';
  rec.recommendations    = container.querySelector('#cs-recs')?.value || '';
  showToast(container, 'Clinical summary saved');
}

function saveAftercare(container) {
  const rec = getRecord(state.patient);
  rec.residingWith    = container.querySelector('#ac-residing')?.value || '';
  rec.housingStability= container.querySelector('#ac-housing')?.value || '';
  rec.employmentPlan  = container.querySelector('#ac-employment')?.value || '';
  rec.financialPlan   = container.querySelector('#ac-financial')?.value || '';
  rec.transportAccess = container.querySelector('#ac-transport')?.value || '';
  rec.aftercareNotes  = container.querySelector('#ac-notes')?.value || '';
  rec.followUps.forEach((fu, i) => {
    fu.scheduledDate  = container.querySelector(`#fu-date-${i}`)?.value || fu.scheduledDate;
    fu.contactMethod  = container.querySelector(`#fu-method-${i}`)?.value || fu.contactMethod;
    fu.status         = container.querySelector(`#fu-status-${i}`)?.value || fu.status;
    fu.notes          = container.querySelector(`#fu-notes-${i}`)?.value || fu.notes;
  });
  showToast(container, 'Aftercare plan saved');
}

function saveRelapse(container) {
  const rec = getRecord(state.patient);
  rec.triggers         = Array.from(container.querySelectorAll('input[name="rp-triggers"]:checked')).map(cb => cb.value);
  rec.copingStrategies = Array.from(container.querySelectorAll('input[name="rp-coping"]:checked')).map(cb => cb.value);
  rec.warningSignsEarly = container.querySelector('#rp-warn-early')?.value || '';
  rec.warningSignsMid   = container.querySelector('#rp-warn-mid')?.value || '';
  rec.warningSignsLate  = container.querySelector('#rp-warn-late')?.value || '';
  rec.emergencyContactName  = container.querySelector('#rp-ec-name')?.value || '';
  rec.emergencyContactRel   = container.querySelector('#rp-ec-rel')?.value || '';
  rec.emergencyContactPhone = container.querySelector('#rp-ec-phone')?.value || '';
  rec.supportGroupPlan  = container.querySelector('#rp-support-group')?.value || '';
  rec.crisisLineAware   = container.querySelector('#rp-crisis-aware')?.checked || false;
  rec.relapseActionPlan = container.querySelector('#rp-action-plan')?.value || '';
  rec.rpNotes           = container.querySelector('#rp-notes')?.value || '';
  showToast(container, 'Relapse prevention plan saved');
}

function saveAlumni(container) {
  const rec = getRecord(state.patient);
  rec.alumniConsent    = container.querySelector('#al-consent')?.checked || false;
  rec.alumniContactPref= container.querySelector('#al-contact-pref')?.value || '';
  rec.alumniNotes      = container.querySelector('#al-notes')?.value || '';
  showToast(container, 'Alumni preferences saved');
}

function saveFollowupOutcomes(container) {
  const rec = getRecord(state.patient);
  rec.followUps.forEach((fu, i) => {
    fu.status  = container.querySelector(`#al-outcome-status-${i}`)?.value || fu.status;
    fu.outcome = container.querySelector(`#al-outcome-${i}`)?.value || fu.outcome;
  });
  showToast(container, 'Follow-up outcomes saved');
}

function addReferral(container) {
  const rec = getRecord(state.patient);
  const type  = container.querySelector('#ref-type')?.value;
  const org   = container.querySelector('#ref-org')?.value || '';
  const contact = container.querySelector('#ref-contact')?.value || '';
  const phone = container.querySelector('#ref-phone')?.value || '';
  const date  = container.querySelector('#ref-date')?.value || '';
  const notes = container.querySelector('#ref-notes')?.value || '';
  if (!type) return;
  rec.referrals.push({ type, org, contact, phone, date, notes, status: 'pending' });
  render(container);
}

function showToast(container, msg) {
  let t = container.querySelector('.dc-toast');
  if (!t) { t = document.createElement('div'); t.className = 'dc-toast'; container.appendChild(t); }
  t.textContent = '✓ ' + msg;
  t.classList.add('dc-toast--show');
  setTimeout(() => t.classList.remove('dc-toast--show'), 2200);
}
