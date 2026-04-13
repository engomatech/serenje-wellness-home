export const id     = 'itsystems';
export const name   = 'IT & Systems';
export const icon   = '💻';
export const desc   = 'CRM access, support tickets, system health and digital infrastructure.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'CRM launcher, support ticket form, system status board.');
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
