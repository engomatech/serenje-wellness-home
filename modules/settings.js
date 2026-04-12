export const id     = 'settings';
export const name   = 'Settings';
export const icon   = '⚙️';
export const desc   = 'User profile, system preferences, access roles and audit logs.';
export const status = 'planned';
export const badge  = null;

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Profile editor, role management, audit trail viewer.');
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
