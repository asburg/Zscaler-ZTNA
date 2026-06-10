# ZPA Policy Matrix

## 1. Policy Objective

The policy model follows deny-by-default logic. Allow rules are created only when a role has a documented business need for a specific private application.

## 2. User Groups

| Group | Description |
|---|---|
| EDU-Students | Learners who need Student Portal and LMS access. |
| EDU-Teachers | Teaching staff who need LMS and Grade Management access. |
| EDU-Academic-Admins | Staff who manage academic workflows. |
| EDU-IT-Admins | Technical administrators with privileged access needs. |
| EDU-Developers | Developers who need internal development API access. |
| EDU-Contractors | External users with scoped project access. |

## 3. Application Segments

| Segment | Sensitivity | Normal Access |
|---|---|---|
| Student Portal | Medium | Students, Teachers |
| LMS | Medium | Students, Teachers |
| Grade Management | High | Teachers, Academic Admins |
| Admin Dashboard | High | Academic Admins, IT Admins |
| Internal API Dev | High | Developers |
| Contractor App | Medium to High | Contractors |
| Student Records Database | Critical | Backend/service path only |

## 4. Policy Rules

| Policy ID | Group | Application | Posture | MFA | Decision |
|---|---|---|---|---|---|
| ZPA-001 | EDU-Students | Student Portal | P0+ | Required | Allow |
| ZPA-002 | EDU-Students | LMS | P0+ | Required | Allow |
| ZPA-003 | EDU-Students | Admin Dashboard | Any | Required | Deny |
| ZPA-004 | EDU-Teachers | LMS | P1+ | Required | Allow |
| ZPA-005 | EDU-Teachers | Grade Management | P1+ | Required | Allow |
| ZPA-006 | EDU-Teachers | Student Records Database | Any | Required | Deny |
| ZPA-007 | EDU-Academic-Admins | Admin Dashboard | P2+ | Required | Allow |
| ZPA-008 | EDU-IT-Admins | Admin Dashboard | P2+ | Required | Allow |
| ZPA-009 | EDU-Developers | Internal API Dev | P1+ | Required | Allow |
| ZPA-010 | EDU-Developers | Student Records Database | Any | Required | Deny |
| ZPA-011 | EDU-Contractors | Contractor App | P1+ | Required | Allow |
| ZPA-012 | EDU-Contractors | Admin Dashboard | Any | Required | Deny |
| ZPA-013 | All Users | Student Records Database | Any | Required | Deny |
