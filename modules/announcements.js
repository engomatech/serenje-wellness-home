export const id     = 'announcements';
export const name   = 'Announcements';
export const icon   = '📢';
export const desc   = 'Internal notices, policy updates and centre-wide communications.';
export const status = 'planned';
export const badge  = '2';

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Notice board, compose announcement, read receipts.');
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
