export const id        = 'hr';
export const name      = 'HR & Payroll';
export const icon      = '💼';
export const desc      = 'Staff records, leave requests, payslips and performance reviews.';
export const status    = 'planned';
export const badge     = '3';
export const badgeStyle = 'gold';

export function render(container) {
  container.innerHTML = placeholder(icon, name, desc,
    'Leave request form, staff directory, payslip viewer.');
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
