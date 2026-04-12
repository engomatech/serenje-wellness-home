export const id     = 'scheduling';
export const name   = 'Scheduling';
export const icon   = '📅';
export const desc   = 'Shift rosters, staff allocation, on-call calendar and cover requests.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Weekly roster grid, shift swap request form.');
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
