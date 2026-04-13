export const id     = 'treatment';
export const name   = 'Treatment Planning';
export const icon   = '📝';
export const desc   = 'M4 — ICD-11 coded diagnoses, personalised SMART care plans, MDT collaboration, medication-assisted treatment and weekly review scheduling.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = `
    <div class="module-placeholder">
      <div class="ph-icon">📝</div>
      <h2>Treatment Planning — M4</h2>
      <p>MDT-collaborative, patient-centred treatment plans with ICD-11 coding, SMART goals and full version history.</p>
      <div class="ph-instruments">
        ${[
          { code:'Diagnosis',     name:'ICD-11 Coded Diagnoses',         detail:'Primary SUD + secondary co-occurring disorders' },
          { code:'SMART Goals',   name:'Treatment Goals',                 detail:'Short-term (weekly), medium (monthly), long-term (programme)' },
          { code:'Interventions', name:'Assigned Interventions',          detail:'Group therapy, counselling, skills, MAT, family therapy' },
          { code:'MAT',           name:'Medication-Assisted Treatment',   detail:'Prescribed medications, dosage, frequency, review dates' },
          { code:'Trauma',        name:'Trauma-Informed Care Notes',      detail:'Specific accommodations based on trauma history' },
          { code:'MDT Roles',     name:'Team Assignments',                detail:'Psychologist, Psychiatrist, Social Worker, Counsellor' },
          { code:'MDT Review',    name:'Weekly Review Schedule',          detail:'Pre-populated MDT dates, plan version history, approvals' },
        ].map(i => `
          <div class="ph-instrument-row">
            <span class="ph-instrument-code">${i.code}</span>
            <span class="ph-instrument-name">${i.name}</span>
            <span class="ph-instrument-target">${i.detail}</span>
          </div>`).join('')}
      </div>
      <div class="ph-pill">Next: MDT collaborative plan editor with Clinical Director approval workflow</div>
    </div>`;
}
