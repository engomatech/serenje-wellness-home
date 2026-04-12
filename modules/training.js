export const id     = 'training';
export const name   = 'Training';
export const icon   = '🎓';
export const desc   = 'CPD tracking, certification records, training schedules and e-learning.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Training calendar, staff CPD log, certificate uploads.');
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
