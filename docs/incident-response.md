# Incident Response Workflow

## 1. Purpose

This workflow defines how the simulated education technology organization responds to suspicious access in a ZTNA environment.

## 2. Detection Sources

| Source | Evidence |
|---|---|
| ZPA user activity logs | Application requested, policy decision, timestamp, user, source context |
| Identity Provider logs | Sign-in result, MFA result, group membership, risky sign-in |
| Endpoint posture | Managed status, OS health, endpoint protection, posture failure |
| Application logs | Function accessed, account used, error or success result |
| Database logs | Sensitive data access attempt |

## 3. Response Steps

1. Detect suspicious activity.
2. Triage user, device, application, timestamp, and policy decision.
3. Preserve logs and screenshots before making changes.
4. Revoke identity session when account risk is suspected.
5. Apply emergency deny policy if sensitive application access is involved.
6. Check endpoint posture and isolate the device if needed.
7. Review application and database logs for impact.
8. Restore access only after identity and device health are verified.
9. Update policy, posture rules, and validation test cases.

## 4. Simulated Incident Scenarios

| Scenario | Expected Response |
|---|---|
| Student requests Admin Dashboard | Deny access, log event, verify no privilege escalation. |
| Teacher requests Student Records Database | Deny access, review whether application segment is exposed. |
| Contractor requests unrelated app | Deny access, review contractor group membership. |
| IT admin uses unmanaged device | Deny privileged access, require compliant managed device. |
| Multiple denied requests across apps | Treat as reconnaissance and preserve event sequence. |
