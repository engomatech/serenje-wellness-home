export const id     = 'screening';
export const name   = 'Screening';
export const icon   = '🔍';
export const desc   = 'M2 — Evidence-based screening instruments: AUDIT, CAGE, DAST-10, ASSIST, PHQ-9, GAD-7, MDQ, PC-PTSD-5 with auto-scoring and risk flags.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder();
}

function placeholder() {
  return `
    <div class="module-placeholder">
      <div class="ph-icon">🔍</div>
      <h2>Screening — M2</h2>
      <p>Validated screening instruments with automatic scoring and colour-coded risk flags (Green / Amber / Red).</p>
      <div class="ph-instruments">
        ${[
          { code:'AUDIT',     name:'Alcohol Use Disorders Identification Test',   target:'Alcohol' },
          { code:'CAGE',      name:'Cut-Annoyed-Guilty-Eye-opener',               target:'Alcohol (quick)' },
          { code:'DAST-10',   name:'Drug Abuse Screening Test',                   target:'Non-alcohol drugs' },
          { code:'ASSIST',    name:'Alcohol, Smoking & Substance Involvement',    target:'All substances' },
          { code:'PHQ-9',     name:'Patient Health Questionnaire-9',              target:'Depression' },
          { code:'GAD-7',     name:'Generalised Anxiety Disorder-7',              target:'Anxiety' },
          { code:'MDQ',       name:'Mood Disorder Questionnaire',                 target:'Bipolar Disorder' },
          { code:'PC-PTSD-5', name:'Primary Care PTSD Screen',                   target:'Trauma / PTSD' },
          { code:'CAGE-AID',  name:'CAGE Adapted to Include Drugs',               target:'Alcohol + Drugs' },
        ].map(i => `
          <div class="ph-instrument-row">
            <span class="ph-instrument-code">${i.code}</span>
            <span class="ph-instrument-name">${i.name}</span>
            <span class="ph-instrument-target">${i.target}</span>
          </div>`).join('')}
      </div>
      <div class="ph-pill">Next: Administer instruments digitally with auto-scoring & SBIRT escalation</div>
    </div>`;
}
