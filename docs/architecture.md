# ZTNA Architecture Design

## 1. Overview

This project models Zero Trust Network Access for an education technology organization. The environment contains Student Portal, Learning Management System, Grade Management, Admin Dashboard, Internal API, Contractor Application, and Student Records Database.

The design replaces broad VPN access with private application access. Users do not receive network-level reachability. Each request is evaluated based on identity, group membership, device posture, application segment, and risk context.

## 2. Zscaler Component Mapping

| Component | Role in Design |
|---|---|
| Zscaler Client Connector | Represents the endpoint agent that forwards user and device context. |
| Zscaler Private Access | Provides private application access without exposing internal apps to the internet. |
| Zscaler Internet Access | Represents secure internet access and web security for outbound traffic. |
| Zscaler Digital Experience | Represents user experience monitoring and troubleshooting. |
| Identity Provider | Supplies user identity, group membership, and MFA state. |
| App Connector | Provides outbound-only connectivity from private apps to the Zscaler cloud. |

## 3. Access Flow

1. User opens a private application.
2. Client Connector or browser access collects identity, device, and application context.
3. Identity Provider verifies the user and MFA state.
4. Policy engine checks user group, posture, application segment, and risk signals.
5. If allowed, the request is brokered to the private application through ZPA.
6. If denied, the application remains hidden and the event is logged.

## 4. Security Rationale

The main security goal is to reduce blast radius. In a VPN model, successful authentication may expose a broad internal network. In this design, successful authentication is not enough. The user must also match the correct application segment and device posture requirement.

Critical data such as the Student Records Database is not exposed as a normal human-user application segment. It is documented as a protected asset so that explicit denial and monitoring can be validated.
