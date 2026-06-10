const postureRank = { P0: 0, P1: 1, P2: 2, P3: 3 };

const personas = [
  { id: "student", name: "Alya Putri", group: "EDU-Students", device: "Personal laptop" },
  { id: "teacher", name: "Bima Rahman", group: "EDU-Teachers", device: "Managed faculty laptop" },
  { id: "academic", name: "Citra Admin", group: "EDU-Academic-Admins", device: "Managed staff laptop" },
  { id: "itadmin", name: "Dimas IT", group: "EDU-IT-Admins", device: "Privileged admin workstation" },
  { id: "developer", name: "Eka Developer", group: "EDU-Developers", device: "Developer workstation" },
  { id: "contractor", name: "Fajar Vendor", group: "EDU-Contractors", device: "Contractor endpoint" },
];

const apps = [
  { name: "Student Portal", segment: "SEG-MED-STUDENT-PORTAL", connector: "CG-EDU-WEB", sensitivity: "Medium", port: "443" },
  { name: "LMS", segment: "SEG-MED-LMS", connector: "CG-EDU-WEB", sensitivity: "Medium", port: "443" },
  { name: "Grade Management", segment: "SEG-HIGH-GRADE-MGMT", connector: "CG-EDU-ADMIN", sensitivity: "High", port: "443" },
  { name: "Admin Dashboard", segment: "SEG-HIGH-ADMIN", connector: "CG-EDU-ADMIN", sensitivity: "High", port: "443" },
  { name: "Internal API Dev", segment: "SEG-HIGH-API-DEV", connector: "CG-EDU-API", sensitivity: "High", port: "443" },
  { name: "Contractor App", segment: "SEG-HIGH-CONTRACTOR", connector: "CG-EDU-CONTRACTOR", sensitivity: "Medium-High", port: "443" },
  { name: "Student Records Database", segment: "SEG-CRITICAL-DB", connector: "Restricted backend path", sensitivity: "Critical", port: "5432" },
];

const allowRules = [
  { id: "ZPA-001", group: "EDU-Students", app: "Student Portal", minPosture: "P0" },
  { id: "ZPA-002", group: "EDU-Students", app: "LMS", minPosture: "P0" },
  { id: "ZPA-005", group: "EDU-Teachers", app: "LMS", minPosture: "P1" },
  { id: "ZPA-006", group: "EDU-Teachers", app: "Grade Management", minPosture: "P1" },
  { id: "ZPA-008", group: "EDU-Academic-Admins", app: "Admin Dashboard", minPosture: "P2" },
  { id: "ZPA-010", group: "EDU-IT-Admins", app: "Admin Dashboard", minPosture: "P2" },
  { id: "ZPA-011", group: "EDU-Developers", app: "Internal API Dev", minPosture: "P1" },
  { id: "ZPA-013", group: "EDU-Contractors", app: "Contractor App", minPosture: "P1" },
];

const state = {
  logs: [],
  allowed: 0,
  denied: 0,
};

const personaInput = document.querySelector("#persona");
const appInput = document.querySelector("#app");
const form = document.querySelector("#accessForm");
const decision = document.querySelector("#decision");
const reason = document.querySelector("#reason");
const traceList = document.querySelector("#traceList");
const logBody = document.querySelector("#logBody");
const appGrid = document.querySelector("#appGrid");
const sessionCount = document.querySelector("#sessionCount");
const blockedCount = document.querySelector("#blockedCount");
const riskState = document.querySelector("#riskState");
const incidentLevel = document.querySelector("#incidentLevel");
const incidentActions = document.querySelector("#incidentActions");
const exportLogs = document.querySelector("#exportLogs");

function init() {
  personaInput.innerHTML = personas
    .map((persona) => `<option value="${persona.id}">${persona.name} - ${persona.group}</option>`)
    .join("");

  appInput.innerHTML = apps.map((app) => `<option>${app.name}</option>`).join("");

  appGrid.innerHTML = apps
    .map(
      (app) => `
        <article class="app-card">
          <strong>${app.name}</strong>
          <span>${app.segment}</span>
          <div class="app-meta">
            <em class="pill">${app.sensitivity}</em>
            <em class="pill">${app.connector}</em>
            <em class="pill">TCP ${app.port}</em>
          </div>
        </article>
      `,
    )
    .join("");

  renderTrace([
    { state: "warn", title: "No request evaluated", detail: "Submit a private application request to generate policy evidence." },
  ]);
  renderIncident("No active incident", [
    ["Ready state", "Incident actions will appear when suspicious or denied access events are generated."],
  ]);
}

function evaluateAccess(request) {
  const selectedApp = apps.find((item) => item.name === request.app);
  const rule = allowRules.find((item) => item.group === request.persona.group && item.app === request.app);
  const trace = [];

  trace.push({
    state: "pass",
    title: "Identity resolved",
    detail: `${request.persona.name} mapped to ${request.persona.group} through simulated IdP.`,
  });

  if (!request.mfa) {
    trace.push({ state: "fail", title: "MFA verification failed", detail: "ZPA policy requires MFA before private app access." });
    return deny("ZPA-MFA-DENY", "MFA is required for private application access.", trace, selectedApp);
  }
  trace.push({ state: "pass", title: "MFA verified", detail: "Authentication context is acceptable for policy evaluation." });

  if (!request.connector) {
    trace.push({ state: "fail", title: "Client Connector unhealthy", detail: "Endpoint signal is missing or unhealthy." });
    return deny("ZPA-POSTURE-DENY", "Client Connector health check failed.", trace, selectedApp);
  }
  trace.push({ state: "pass", title: "Client Connector healthy", detail: `${request.persona.device} is sending endpoint context.` });

  if (request.locationRisk === "high") {
    trace.push({ state: "fail", title: "High location risk", detail: "Impossible travel or risky location requires containment." });
    return deny("ZPA-RISK-DENY", "High-risk location blocked before application connection.", trace, selectedApp);
  }

  if (request.locationRisk === "medium") {
    trace.push({ state: "warn", title: "Medium location risk", detail: "Request can continue, but audit priority is increased." });
  } else {
    trace.push({ state: "pass", title: "Location risk acceptable", detail: "Known campus or home network context." });
  }

  if (request.app === "Student Records Database") {
    trace.push({ state: "fail", title: "Critical asset protected", detail: "Database is not published as a normal human-user application segment." });
    return deny("ZPA-DB-DENY", "Critical database access is denied for all normal user personas.", trace, selectedApp);
  }

  if (!rule) {
    trace.push({ state: "fail", title: "No allow rule matched", detail: `${request.persona.group} has no approved policy for ${request.app}.` });
    return deny("ZPA-DEFAULT-DENY", "No matching allow policy exists for this identity and application segment.", trace, selectedApp);
  }

  trace.push({ state: "pass", title: "Application segment matched", detail: `${selectedApp.segment} through ${selectedApp.connector}.` });

  if (postureRank[request.posture] < postureRank[rule.minPosture]) {
    trace.push({ state: "fail", title: "Device posture insufficient", detail: `${request.app} requires ${rule.minPosture} or higher posture.` });
    return deny("ZPA-POSTURE-DENY", `Device posture ${request.posture} is below required ${rule.minPosture}.`, trace, selectedApp);
  }

  trace.push({ state: "pass", title: "Least privilege rule matched", detail: `${rule.id} allows ${request.persona.group} to reach ${request.app}.` });

  return {
    decision: "Allow",
    policy: rule.id,
    reason: `Access brokered to ${request.app}; private network remains hidden.`,
    trace,
    app: selectedApp,
  };
}

function deny(policy, message, trace, app) {
  return {
    decision: "Deny",
    policy,
    reason: message,
    trace,
    app,
  };
}

function renderTrace(items) {
  traceList.innerHTML = items
    .map(
      (item) => `
        <div class="trace-item ${item.state}">
          <span class="trace-icon">${item.state === "pass" ? "✓" : item.state === "warn" ? "!" : "×"}</span>
          <div>
            <strong>${item.title}</strong>
            <small>${item.detail}</small>
          </div>
          <span class="pill">${item.state}</span>
        </div>
      `,
    )
    .join("");
}

function renderLogs() {
  if (!state.logs.length) {
    logBody.innerHTML = '<tr><td colspan="5">No access decisions yet.</td></tr>';
    return;
  }

  logBody.innerHTML = state.logs
    .slice(0, 12)
    .map(
      (log) => `
        <tr>
          <td>${log.time}</td>
          <td>${log.user}</td>
          <td>${log.app}</td>
          <td>${log.policy}</td>
          <td>${log.decision}</td>
        </tr>
      `,
    )
    .join("");
}

function renderIncident(label, actions) {
  incidentLevel.textContent = label;
  incidentActions.innerHTML = actions
    .map(
      ([title, detail]) => `
        <div class="action">
          <strong>${title}</strong>
          <small>${detail}</small>
        </div>
      `,
    )
    .join("");
}

function updateKpis(result) {
  if (result.decision === "Allow") {
    state.allowed += 1;
  } else {
    state.denied += 1;
  }

  sessionCount.textContent = String(state.allowed);
  blockedCount.textContent = String(state.denied);

  const highRisk = state.logs.filter((log) => log.decision === "Deny").length >= 3 || result.policy.includes("DB");
  riskState.textContent = highRisk ? "Elevated" : state.denied ? "Watch" : "Normal";
}

function updateIncident(result, request) {
  if (result.decision === "Allow") {
    renderIncident("No active incident", [
      ["Monitor session", `Allow event for ${request.persona.name} should remain visible in ZPA audit logs.`],
      ["Validate scope", `${request.app} is reachable only as an application segment, not as broad network access.`],
    ]);
    return;
  }

  const actions = [
    ["Preserve evidence", `Export ZPA event ${result.policy}, IdP sign-in context, and endpoint posture status.`],
    ["Contain access", "Revoke active session or apply emergency deny rule if repeated attempts continue."],
    ["Review identity", `Check ${request.persona.group} membership and recent IdP changes.`],
  ];

  if (result.policy.includes("DB") || request.app.includes("Admin")) {
    actions.push(["Escalate severity", "Notify application owner because the requested application is sensitive or critical."]);
  }

  renderIncident("Incident review required", actions);
}

function toCsv(logs) {
  const header = "time,user,group,posture,app,policy,decision,reason";
  const rows = logs.map((log) =>
    [log.time, log.user, log.group, log.posture, log.app, log.policy, log.decision, log.reason]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );
  return [header, ...rows].join("\n");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const persona = personas.find((item) => item.id === personaInput.value);
  const request = {
    persona,
    posture: document.querySelector("#posture").value,
    app: appInput.value,
    mfa: document.querySelector("#mfa").checked,
    connector: document.querySelector("#connector").checked,
    locationRisk: document.querySelector("#locationRisk").value,
  };

  const result = evaluateAccess(request);
  decision.textContent = result.decision;
  decision.className = `decision ${result.decision.toLowerCase()}`;
  reason.textContent = result.reason;
  renderTrace(result.trace);

  state.logs.unshift({
    time: new Date().toLocaleTimeString(),
    user: request.persona.name,
    group: request.persona.group,
    posture: request.posture,
    app: request.app,
    policy: result.policy,
    decision: result.decision,
    reason: result.reason,
  });

  updateKpis(result);
  updateIncident(result, request);
  renderLogs();
});

exportLogs.addEventListener("click", () => {
  const blob = new Blob([toCsv(state.logs)], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "ztna-simulated-audit-log.csv";
  link.click();
  URL.revokeObjectURL(url);
});

init();
