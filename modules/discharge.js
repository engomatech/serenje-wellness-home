export const id     = 'discharge';
export const name   = 'Discharge & Aftercare';
export const icon   = '🚪';
export const desc   = 'M6 — Discharge planning, discharge summaries, aftercare plans, community referrals and alumni follow-up tracking.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = `
    <div class="module-placeholder">
      <div class="ph-icon">🚪</div>
      <h2>Discharge & Aftercare — M6</h2>
      <p>Structured transition out of the residential programme with continuity of care, aftercare planning and long-term alumni tracking.</p>
      <div class="ph-instruments">
        ${[
          { code:'Planning',    name:'Discharge Planning',         detail:'Initiated at programme midpoint by Social Worker' },
          { code:'Summary',     name:'Discharge Summary',          detail:'Auto-populated from treatment records; diagnosis, meds, progress' },
          { code:'Type',        name:'Discharge Type',             detail:'Planned / Voluntary early / Medical / Administrative' },
          { code:'Referrals',   name:'Referral Letters',           detail:'Outpatient services, NGOs, community organisations, faith groups' },
          { code:'Aftercare',   name:'Aftercare Plan',             detail:'30/90/180-day and 12-month follow-up schedule' },
          { code:'Relapse Prev','name':'Relapse Prevention Plan',  detail:'Documented coping strategies, triggers, emergency contacts' },
          { code:'Alumni',      name:'Alumni Tracking',            detail:'Follow-up contact outcomes at each scheduled touchpoint' },
        ].map(i => `
          <div class="ph-instrument-row">
            <span class="ph-instrument-code">${i.code}</span>
            <span class="ph-instrument-name">${i.name}</span>
            <span class="ph-instrument-target">${i.detail}</span>
          </div>`).join('')}
      </div>
      <div class="ph-pill">Next: Discharge planning form, summary generator, aftercare scheduler and alumni tracker</div>
    </div>`;
}
