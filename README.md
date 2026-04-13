# Serenje Wellness Home — SATM System

**Substance Use Disorder Screening, Assessment, Treatment & Management System**
Serenje Wellness Home · Makeni, Lusaka, Zambia

> Technical Specification: `SUD_SATM_TechSpec_v1.0` · Version 1.0, April 2026
> Prepared by: Chilufya Musosha, Technology & Innovation Lead

---

## System Purpose

A purpose-built clinical information platform that digitises and standardises all clinical workflows at Serenje Wellness Home — from initial patient intake and validated screening, through comprehensive assessment, personalised treatment planning, daily case management, discharge, and aftercare follow-up.

Aligned with:
- **WHO/UNODC** International Standards for the Treatment of Drug Use Disorders (2020)
- **SAMHSA SBIRT** (Screening, Brief Intervention, Referral to Treatment)
- **ICD-11** diagnostic classification
- **Zambia Health Professions Act (2009)** and MoH/HPCZ reporting requirements

---

## Module Roadmap (M1–M7)

| Module | Name | Status | Description |
|--------|------|--------|-------------|
| M1 | Patient Intake | ✅ Live (prototype) | Registration, demographics, consent, referral source, presenting complaint |
| M2 | Screening | 🔲 Next | AUDIT, CAGE, DAST-10, ASSIST, PHQ-9, GAD-7, MDQ, PC-PTSD-5 with auto-scoring |
| M3 | Assessment | 🔲 Planned | Biopsychosocial assessment, ASAM severity rating, dual-diagnosis identification |
| M4 | Treatment Planning | 🔲 Planned | ICD-11 diagnoses, SMART goals, MDT collaboration, MAT, weekly review schedule |
| M5 | Case Management | ✅ Live (prototype) | SOAP notes, MAR, relapse-risk scoring, session attendance, incident management |
| M6 | Discharge & Aftercare | 🔲 Planned | Discharge planning, aftercare plan, alumni tracking, community referrals |
| M7 | Reports & M&E | 🔲 Planned | MoH/HPCZ reports, clinical dashboards, outcome metrics, audit trails |

### Supporting Modules

| Module | Status | Description |
|--------|--------|-------------|
| Dashboard | ✅ Live | Clinical KPIs, relapse-risk alerts, MDT flags, activity feed |
| Scheduling | 🔲 Planned | Shift rosters, session scheduling, on-call calendar |
| Announcements | 🔲 Planned | Internal notices, policy updates |
| HR & Payroll | 🔲 Planned | Staff records, supervision logs, CPD tracking |
| Training | 🔲 Planned | Staff training records, competency tracking |
| IT & Systems | 🔲 Planned | System health, support, access management |
| Settings & Access | 🔲 Planned | RBAC for 11 user roles |

---

## Gap Analysis: Current Build vs Spec

### ✅ What Aligns

| Built | Spec Reference | Notes |
|-------|---------------|-------|
| Patient Intake (M1) | §5.1 | Demographics, NOK, admissions. Needs: referral source, consent forms, presenting complaint, substance info |
| Case Management (M5) | §5.5 | Care plans, MAR, incident reports. Needs: SOAP notes, session attendance, relapse-risk scoring tool |
| Dashboard | §5.7.2 | Clinical Director dashboard. Needs: occupancy, risk flags, MDT review pending, compliance deadlines |
| Blue/white UI | — | Clean, accessible UI suitable for clinical staff |
| Modular architecture | §6.1 | Ready for React migration; module-per-file structure is aligned |

### 🔲 What's Missing (Priority Order)

| Gap | Spec Reference | Priority |
|-----|---------------|----------|
| M2 Screening instruments (9 tools with auto-scoring) | §5.2 | 🔴 High |
| M3 Biopsychosocial assessment + ASAM rating | §5.3 | 🔴 High |
| M4 Treatment Planning (ICD-11, MDT workflow) | §5.4 | 🔴 High |
| M6 Discharge & Aftercare + alumni tracking | §5.6 | 🟡 Medium |
| RBAC — 11 user roles with permission matrix | §4 | 🔴 High |
| React.js + Vite frontend (spec-mandated stack) | §6.1 | 🟡 Migration |
| Node.js + Express backend API | §6.1 | 🟡 Phase 2 |
| PostgreSQL database | §6.1 | 🟡 Phase 2 |
| JWT + TOTP 2FA authentication | §6.2 | 🟡 Phase 2 |
| Offline capability with sync | §8 | 🟠 Phase 3 |
| MoH/HPCZ regulatory reports | §5.7.1 | 🟡 Phase 4 |

---

## Tech Stack

### Specified (Production Target)

| Layer | Technology |
|-------|-----------|
| Frontend | React.js + Vite |
| Backend / API | Node.js + Express.js |
| Database | PostgreSQL |
| Session / Cache | Redis |
| Authentication | JWT + TOTP 2FA |
| File Storage | Local VPS (encrypted) |
| Web Server | Nginx + SSL/TLS |
| Hosting | InterServer KVM VPS (Ubuntu) |
| Backup | Daily encrypted snapshots |

### Current (UI Prototype)
Vanilla JS ES Modules + static HTML/CSS — served via `npx serve`.
This is the **clickable prototype / UX validation layer** before the React migration.

---

## User Roles (RBAC)

| Role | Mapped Position | Access Level |
|------|----------------|-------------|
| Super Administrator | IT / Operations Lead | Full system |
| Clinical Director | Clinical Director | All clinical + reports + MDT |
| Psychologist | Clinical Services | Patient records, screening, assessment, session notes |
| Social Worker | Clinical Services | Intake, family engagement, discharge planning |
| Psychiatrist | Clinical Services | Full clinical, medication, dual-diagnosis |
| Medical Practitioner | Clinical Services | Medical history, lab, detox monitoring |
| Counsellor / Therapist | Clinical Services | Session notes, group logs, relapse-risk |
| Finance Officer | Admin, Finance | Billing only — no clinical data |
| HR Officer | Admin, HR | Staff records — no patient data |
| Outreach Officer | Admin, Outreach | Referral intake, anonymised stats |
| M&E Officer | Operations | Dashboards, anonymised aggregate data |
| Security Officer | Operations | Incident log (non-clinical), access log |

---

## Implementation Roadmap

Following the 24-week delivery plan from the Technical Specification:

| Phase | Weeks | Deliverables |
|-------|-------|-------------|
| 1 — Foundation | 1–4 | Server, DB schema, auth (JWT + 2FA), RBAC, M1 Patient Registration |
| 2 — Screening & Assessment | 5–10 | M2 all instruments with auto-scoring; M3 biopsychosocial + ASAM; assessment summary report |
| 3 — Treatment & Case Management | 11–18 | M4 treatment planning + MDT; M5 daily progress, MAR, relapse-risk tool, incident management |
| 4 — Discharge, Reporting & Go-live | 19–24 | M6 discharge & aftercare; M7 reports + dashboards; UAT; security hardening; staff training |

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable, production-ready code |
| `dev` | Integration — all features merge here first |
| `feature/module-name` | One branch per module or feature |

---

## Running Locally

```bash
# Serve the prototype
npx serve . --listen 3000
```

Visit `http://localhost:3000`

---

*Powered by eNgoma · Serenje Wellness Home & Chilufya Musosha · Confidential — Internal Use Only*
