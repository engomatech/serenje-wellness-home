export const id     = 'assessment';
export const name   = 'Assessment';
export const icon   = '🧠';
export const desc   = 'M3 — Comprehensive biopsychosocial assessment, ASAM severity rating, dual-diagnosis identification and assessment summary report.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = `
    <div class="module-placeholder">
      <div class="ph-icon">🧠</div>
      <h2>Comprehensive Assessment — M3</h2>
      <p>Structured biopsychosocial evaluation covering all six ASAM dimensions to determine the appropriate level of care.</p>
      <div class="ph-instruments">
        ${[
          { code:'Domain 1', name:'Substance Use History',           detail:'All substances, routes, frequency, overdose, prior treatment' },
          { code:'Domain 2', name:'Medical History',                 detail:'Physical health, medications, HIV/HCV/TB, detox history' },
          { code:'Domain 3', name:'Mental Health History',           detail:'Psychiatric diagnoses, suicidal ideation, hospitalisations' },
          { code:'Domain 4', name:'Trauma History',                  detail:'ACEs, abuse, losses, PTSD symptoms (PC-PTSD-5)' },
          { code:'Domain 5', name:'Social & Family History',         detail:'Housing, employment, finances, legal history, support network' },
          { code:'Domain 6', name:'Cognitive & Psychological',       detail:'Insight, readiness to change (URICA), coping strategies' },
          { code:'Domain 7', name:'Spiritual & Cultural',            detail:'Beliefs, cultural considerations, personal recovery values' },
          { code:'ASAM',     name:'Severity Rating',                 detail:'Six-dimension ASAM rating → Level of Care recommendation' },
        ].map(i => `
          <div class="ph-instrument-row">
            <span class="ph-instrument-code">${i.code}</span>
            <span class="ph-instrument-name">${i.name}</span>
            <span class="ph-instrument-target">${i.detail}</span>
          </div>`).join('')}
      </div>
      <div class="ph-pill">Next: Structured assessment form + auto-generated Assessment Summary Report for MDT</div>
    </div>`;
}
