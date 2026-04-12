# Serenje Wellness Home — Staff Portal

Internal staff portal for Serenje Wellness Home. Built as a modular, browser-based system with no framework dependencies.

**Live URL:** `http://localhost:3000` (run via `npx serve .`)

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code only |
| `dev`  | Integration branch — all features merge here first |
| `feature/module-name` | One branch per module being built |

**Workflow:** `feature/*` → PR into `dev` → tested → PR into `main`

---

## Architecture

```
serenje-wellness-home/
├── index.html          # App shell & entry point
├── css/
│   └── main.css        # Shared design tokens & component styles
├── js/
│   └── app.js          # Hash router + module registry
└── modules/
    ├── dashboard.js    # ✅ Live
    ├── residents.js    # 🔄 Next
    ├── clinical.js     # 📋 Planned
    ├── scheduling.js   # 📋 Planned
    ├── hr.js           # 📋 Planned
    ├── training.js     # 📋 Planned
    ├── reports.js      # 📋 Planned
    ├── announcements.js# 📋 Planned
    ├── it-systems.js   # 📋 Planned
    └── settings.js     # 📋 Planned
```

Each module exports: `id`, `name`, `icon`, `desc`, `status`, `badge`, and a `render(container)` function. Self-contained — no cross-module imports.

---

## Module Roadmap

| # | Module | Status | Description |
|---|--------|--------|-------------|
| 1 | Dashboard | ✅ Live | Stats, alerts, activity feed, staff on duty |
| 2 | Residents | 🔄 In Progress | Profiles, admissions, discharges, next-of-kin |
| 3 | Clinical Care | 📋 Planned | Care plans, medications, incidents, wound charts |
| 4 | Scheduling | 📋 Planned | Shift rosters, cover requests, on-call calendar |
| 5 | HR & Payroll | 📋 Planned | Staff records, leave requests, payslips |
| 6 | Announcements | 📋 Planned | Notices, policy updates, read receipts |
| 7 | Reports | 📋 Planned | Occupancy, clinical, financial, compliance |
| 8 | Training | 📋 Planned | CPD tracking, certifications, e-learning |
| 9 | IT & Systems | 📋 Planned | CRM, support tickets, system health |
| 10 | Settings | 📋 Planned | User profiles, roles, audit logs |

---

## Getting Started

```bash
# Serve locally
npx serve . --listen 3000

# Or with Python
python -m http.server 3000
```

---

*Powered by eNgoma · Internal Use Only*
