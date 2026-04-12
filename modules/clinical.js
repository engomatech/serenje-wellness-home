export const id     = 'clinical';
export const name   = 'Clinical Care';
export const icon   = '🏥';
export const desc   = 'Care plans, medication logs, wound charts and incident reports.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Medication administration record, incident form.');
}

function placeholder(icon, name, desc, hint = '') {
  return `
    <div class="module-placeholder">
      <div class="ph-icon">${icon}</div>
      <h2>${name}</h2>
      <p>${desc}</p>
      ${hint ? `<div class="ph-pill">Next: ${hint}</div>` : ''}
    </div>`;
}
