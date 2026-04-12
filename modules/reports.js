export const id     = 'reports';
export const name   = 'Reports';
export const icon   = '📊';
export const desc   = 'Occupancy, financial, clinical and compliance reports with export.';
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
