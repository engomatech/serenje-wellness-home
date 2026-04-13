export const id     = 'reporting';
export const name   = 'Reports & M&E';
export const icon   = '📊';
export const desc   = 'M7 — MoH/HPCZ compliance reports, clinical dashboards, outcome metrics and M&E.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Report selector, date-range filter, PDF/CSV export.');
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
