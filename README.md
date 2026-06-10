# Zscaler ZTNA Capstone Project

Capstone project by **Tristian Yosa**.

This repository contains a design-based and simulation-ready Zero Trust Network Access project for an education technology environment. The project models how Zscaler components can be used to replace broad VPN-style access with identity-aware, policy-driven, private application access.

## Project Position

Access to Zscaler ZIA, ZPA, ZDX, and Zscaler Client Connector normally requires an authorized tenant, enterprise license, and organization or lab-provider approval. Since no live Zscaler tenant is provided for this capstone, this repository is presented as a simulated implementation plan.

> This design assumes an authorized Zscaler tenant or lab environment. Since no live tenant is provided, the deliverable is presented as a simulated implementation plan.

## Scope

- ZIA: secure internet access concept, web security, and internet traffic protection.
- ZPA: private application access without VPN, application segmentation, policy decision, and App Connector model.
- ZDX: user experience monitoring and troubleshooting plan.
- Zscaler Client Connector: endpoint agent concept for user, device, and access context.
- Evidence: architecture design, policy matrix, use case scenario, simulated logs, incident response workflow, and demo prototype.

## Repository Structure

| Path | Purpose |
|---|---|
| `docs/` | Architecture, policy, incident response, and implementation notes |
| `web/` | Browser-based ZTNA simulation prototype |
| `data/` | Structured policy and scenario data used by the prototype |

## Demo Prototype

Open `web/index.html` in a browser. The prototype simulates:

1. A user selecting a role and device posture.
2. A private application request.
3. A ZPA-like policy decision.
4. Allow or deny result.
5. Audit log entry that can be used as simulated evidence.

## Main Use Cases

- Student can access Student Portal and LMS, but cannot access Admin Dashboard.
- Teacher can access LMS and Grade Management, but cannot access Student Records Database.
- Academic Admin can access Admin Dashboard only with stronger posture.
- Developer can access Internal API Dev Environment, but not production student records.
- Contractor can access only the assigned project application.

## Author

Tristian Yosa
