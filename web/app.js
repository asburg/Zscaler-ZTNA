const rank = { P0: 0, P1: 1, P2: 2, P3: 3 };

const state = {
  users: [
    { id: "u-student", name: "Alya Putri", group: "EDU-Students" },
    { id: "u-teacher", name: "Bima Rahman", group: "EDU-Teachers" },
    { id: "u-academic", name: "Citra Admin", group: "EDU-Academic-Admins" },
    { id: "u-it", name: "Dimas IT", group: "EDU-IT-Admins" },
    { id: "u-dev", name: "Eka Developer", group: "EDU-Developers" },
    { id: "u-vendor", name: "Fajar Vendor", group: "EDU-Contractors" },
  ],
  devices: [
    { id: "d-student", userId: "u-student", name: "Alya-Personal-Laptop", posture: "P0", health: "Healthy" },
    { id: "d-teacher", userId: "u-teacher", name: "Bima-Faculty-Laptop", posture: "P1", health: "Healthy" },
    { id: "d-academic", userId: "u-academic", name: "Citra-Managed-Laptop", posture: "P2", health: "Healthy" },
    { id: "d-it", userId: "u-it", name: "Dimas-Admin-Workstation", posture: "P3", health: "Healthy" },
    { id: "d-dev", userId: "u-dev", name: "Eka-Dev-Workstation", posture: "P1", health: "Healthy" },
    { id: "d-vendor", userId: "u-vendor", name: "Fajar-Contractor-Endpoint", posture: "P1", health: "Healthy" },
  ],
  apps: [
    { id: "app-student", name: "Student Portal", segment: "SEG-MED-STUDENT-PORTAL", connector: "CG-EDU-WEB", sensitivity: "Medium", port: "443", health: "Available" },
    { id: "app-lms", name: "LMS", segment: "SEG-MED-LMS", connector: "CG-EDU-WEB", sensitivity: "Medium", port: "443", health: "Available" },
    { id: "app-grade", name: "Grade Management", segment: "SEG-HIGH-GRADE-MGMT", connector: "CG-EDU-ADMIN", sensitivity: "High", port: "443", health: "Available" },
    { id: "app-admin", name: "Admin Dashboard", segment: "SEG-HIGH-ADMIN", connector: "CG-EDU-ADMIN", sensitivity: "High", port: "443", health: "Available" },
    { id: "app-api", name: "Internal API Dev", segment: "SEG-HIGH-API-DEV", connector: "CG-EDU-API", sensitivity: "High", port: "443", health: "Available" },
    { id: "app-contractor", name: "Contractor App", segment: "SEG-HIGH-CONTRACTOR", connector: "CG-EDU-CONTRACTOR", sensitivity: "Medium-High", port: "443", health: "Available" },
    { id: "app-db", name: "Student Records Database", segment: "SEG-CRITICAL-DB", connector: "Restricted backend path", sensitivity: "Critical", port: "5432", health: "Protected" },
  ],
  connectors: [
    { id: "con-web", group: "CG-EDU-WEB", site: "Internal Web Subnet", status: "Healthy", heartbeat: "12 sec ago", apps: ["Student Portal", "LMS"], cpu: "18%", latency: "22 ms" },
    { id: "con-admin", group: "CG-EDU-ADMIN", site: "Restricted Admin Subnet", status: "Healthy", heartbeat: "18 sec ago", apps: ["Grade Management", "Admin Dashboard"], cpu: "24%", latency: "31 ms" },
    { id: "con-api", group: "CG-EDU-API", site: "Developer API Subnet", status: "Healthy", heartbeat: "15 sec ago", apps: ["Internal API Dev"], cpu: "16%", latency: "28 ms" },
    { id: "con-contractor", group: "CG-EDU-CONTRACTOR", site: "Project App Subnet", status: "Healthy", heartbeat: "21 sec ago", apps: ["Contractor App"], cpu: "12%", latency: "34 ms" },
  ],
  zdx: [
    { user: "Alya Putri", app: "Student Portal", score: 92, latency: "38 ms", device: "Good", path: "Good" },
    { user: "Bima Rahman", app: "LMS", score: 88, latency: "46 ms", device: "Good", path: "Fair" },
    { user: "Citra Admin", app: "Admin Dashboard", score: 81, latency: "59 ms", device: "Good", path: "Fair" },
    { user: "Fajar Vendor", app: "Contractor App", score: 76, latency: "71 ms", device: "Fair", path: "Fair" },
  ],
  ziaEvents: [
    { time: "09:41:22", user: "Alya Putri", url: "hxxps://credential-check.example", category: "Phishing", action: "Blocked" },
    { time: "10:03:10", user: "Bima Rahman", url: "hxxps://course-media.example", category: "Policy", action: "Allowed" },
    { time: "10:18:49", user: "Eka Developer", url: "hxxps://package-mirror.example", category: "Malware", action: "Blocked" },
    { time: "10:44:01", user: "Fajar Vendor", url: "hxxps://file-share.example", category: "Policy", action: "Isolated" },
  ],
  policies: [
    { id: "ZPA-001", group: "EDU-Students", appId: "app-student", minPosture: "P0" },
    { id: "ZPA-002", group: "EDU-Students", appId: "app-lms", minPosture: "P0" },
    { id: "ZPA-005", group: "EDU-Teachers", appId: "app-lms", minPosture: "P1" },
    { id: "ZPA-006", group: "EDU-Teachers", appId: "app-grade", minPosture: "P1" },
    { id: "ZPA-008", group: "EDU-Academic-Admins", appId: "app-admin", minPosture: "P2" },
    { id: "ZPA-010", group: "EDU-IT-Admins", appId: "app-admin", minPosture: "P2" },
    { id: "ZPA-011", group: "EDU-Developers", appId: "app-api", minPosture: "P1" },
    { id: "ZPA-013", group: "EDU-Contractors", appId: "app-contractor", minPosture: "P1" },
  ],
  sessions: [],
  logs: [],
  adminLogs: [],
  cases: [],
};

const els = {
  userSelect: document.querySelector("#userSelect"),
  appSelect: document.querySelector("#appSelect"),
  deviceSelect: document.querySelector("#deviceSelect"),
  riskSelect: document.querySelector("#riskSelect"),
  mfaToggle: document.querySelector("#mfaToggle"),
  connectorToggle: document.querySelector("#connectorToggle"),
  accessForm: document.querySelector("#accessForm"),
  decisionBadge: document.querySelector("#decisionBadge"),
  decisionCopy: document.querySelector("#decisionCopy"),
  traceList: document.querySelector("#traceList"),
  appCards: document.querySelector("#appCards"),
  appSearch: document.querySelector("#appSearch"),
  connectorCards: document.querySelector("#connectorCards"),
  policyBody: document.querySelector("#policyBody"),
  policyCount: document.querySelector("#policyCount"),
  policySearch: document.querySelector("#policySearch"),
  ruleForm: document.querySelector("#ruleForm"),
  ruleGroup: document.querySelector("#ruleGroup"),
  ruleApp: document.querySelector("#ruleApp"),
  rulePosture: document.querySelector("#rulePosture"),
  sessionBody: document.querySelector("#sessionBody"),
  deviceList: document.querySelector("#deviceList"),
  logBody: document.querySelector("#logBody"),
  logFilter: document.querySelector("#logFilter"),
  logSearch: document.querySelector("#logSearch"),
  zdxCards: document.querySelector("#zdxCards"),
  ziaBody: document.querySelector("#ziaBody"),
  ziaFilter: document.querySelector("#ziaFilter"),
  responseList: document.querySelector("#responseList"),
  responseState: document.querySelector("#responseState"),
  recentList: document.querySelector("#recentList"),
  kpiApps: document.querySelector("#kpiApps"),
  kpiSessions: document.querySelector("#kpiSessions"),
  kpiBlocked: document.querySelector("#kpiBlocked"),
  kpiRisk: document.querySelector("#kpiRisk"),
  detailDrawer: document.querySelector("#detailDrawer"),
  drawerEyebrow: document.querySelector("#drawerEyebrow"),
  drawerTitle: document.querySelector("#drawerTitle"),
  drawerBody: document.querySelector("#drawerBody"),
  closeDrawer: document.querySelector("#closeDrawer"),
};

function byId(list, id) {
  return list.find((item) => item.id === id);
}

function now() {
  return new Date().toLocaleTimeString();
}

function fillSelects() {
  els.userSelect.innerHTML = state.users.map((user) => `<option value="${user.id}">${user.name} - ${user.group}</option>`).join("");
  els.appSelect.innerHTML = state.apps.map((app) => `<option value="${app.id}">${app.name}</option>`).join("");
  els.ruleGroup.innerHTML = [...new Set(state.users.map((user) => user.group))]
    .map((group) => `<option>${group}</option>`)
    .join("");
  els.ruleApp.innerHTML = state.apps.map((app) => `<option value="${app.id}">${app.name}</option>`).join("");
  syncDeviceSelect();
}

function syncDeviceSelect() {
  const userId = els.userSelect.value;
  const devices = state.devices.filter((device) => device.userId === userId);
  els.deviceSelect.innerHTML = devices.map((device) => `<option value="${device.id}">${device.name} - ${device.posture}</option>`).join("");
}

function evaluate(request) {
  const trace = [];
  const app = byId(state.apps, request.appId);
  const user = byId(state.users, request.userId);
  const device = byId(state.devices, request.deviceId);
  const policy = state.policies.find((rule) => rule.group === user.group && rule.appId === app.id);

  trace.push(["pass", "Identity resolved", `${user.name} is a member of ${user.group}.`]);

  if (!request.mfa) {
    trace.push(["fail", "MFA required", "The identity provider did not return a verified MFA claim."]);
    return denied("ZPA-MFA-DENY", "MFA verification failed.", trace, app);
  }
  trace.push(["pass", "MFA verified", "Authentication requirement satisfied."]);

  if (!request.connector || device.health !== "Healthy") {
    trace.push(["fail", "Endpoint context failed", `${device.name} is not reporting a healthy Client Connector state.`]);
    return denied("ZPA-CONNECTOR-DENY", "Client Connector or endpoint health check failed.", trace, app);
  }
  trace.push(["pass", "Client Connector healthy", `${device.name} reports posture ${device.posture}.`]);

  if (request.risk === "high") {
    trace.push(["fail", "Risk policy blocked", "High-risk network context is not allowed for private applications."]);
    return denied("ZPA-RISK-DENY", "Request blocked by network risk policy.", trace, app);
  }
  trace.push([request.risk === "medium" ? "warn" : "pass", "Network risk evaluated", `${request.risk} risk request accepted for policy evaluation.`]);

  if (app.sensitivity === "Critical") {
    trace.push(["fail", "Critical asset restricted", "Critical database segment is not available for user-launched sessions."]);
    return denied("ZPA-DB-DENY", "Critical application segment blocked.", trace, app);
  }

  if (!policy) {
    trace.push(["fail", "Default deny", `${user.group} has no allow rule for ${app.name}.`]);
    return denied("ZPA-DEFAULT-DENY", "No matching allow rule found.", trace, app);
  }

  trace.push(["pass", "Application segment matched", `${app.segment} via ${app.connector}.`]);

  if (rank[device.posture] < rank[policy.minPosture]) {
    trace.push(["fail", "Posture insufficient", `${app.name} requires ${policy.minPosture}; device is ${device.posture}.`]);
    return denied("ZPA-POSTURE-DENY", "Device posture does not meet policy.", trace, app);
  }

  trace.push(["pass", "Least privilege policy matched", `${policy.id} permits ${user.group} to open ${app.name}.`]);

  return {
    decision: "Allow",
    policy: policy.id,
    reason: `${app.name} opened through ${app.connector}.`,
    trace,
    app,
  };
}

function denied(policy, reason, trace, app) {
  return { decision: "Deny", policy, reason, trace, app };
}

function renderTrace(trace) {
  els.traceList.innerHTML = trace
    .map(
      ([stateName, title, detail]) => `
        <div class="trace-item ${stateName}">
          <span class="trace-icon">${stateName === "pass" ? "OK" : stateName === "warn" ? "!" : "X"}</span>
          <div>
            <strong>${title}</strong>
            <small>${detail}</small>
          </div>
          <span class="pill">${stateName}</span>
        </div>
      `,
    )
    .join("");
}

function renderApps() {
  const term = (els.appSearch.value || "").toLowerCase();
  const apps = state.apps.filter((app) => [app.name, app.segment, app.connector, app.sensitivity].join(" ").toLowerCase().includes(term));
  els.appCards.innerHTML = apps
    .map(
      (app) => `
        <article class="app-card">
          <header>
            <div>
              <strong>${app.name}</strong>
              <small>${app.segment}</small>
            </div>
            <span class="pill">${app.health}</span>
          </header>
          <div class="meta-row">
            <span class="pill">${app.sensitivity}</span>
            <span class="pill">${app.connector}</span>
            <span class="pill">TCP ${app.port}</span>
          </div>
          <div class="app-actions">
            <button type="button" data-launch="${app.id}">Launch</button>
            <button class="ghost" type="button" data-detail-app="${app.id}">Details</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderConnectors() {
  els.connectorCards.innerHTML = state.connectors
    .map(
      (connector) => `
        <article class="app-card">
          <header>
            <div>
              <strong>${connector.group}</strong>
              <small>${connector.site}</small>
            </div>
            <span class="pill">${connector.status}</span>
          </header>
          <div class="metric-row">
            <div class="metric-box"><strong>${connector.heartbeat}</strong><small>Heartbeat</small></div>
            <div class="metric-box"><strong>${connector.cpu}</strong><small>CPU</small></div>
            <div class="metric-box"><strong>${connector.latency}</strong><small>Latency</small></div>
          </div>
          <div class="app-actions">
            <button type="button" data-detail-connector="${connector.id}">Details</button>
            <button class="ghost" type="button" data-check-connector="${connector.id}">Check</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderPolicies() {
  const term = (els.policySearch.value || "").toLowerCase();
  const policies = state.policies.filter((rule) => {
    const app = byId(state.apps, rule.appId);
    return [rule.id, rule.group, app.name, rule.minPosture].join(" ").toLowerCase().includes(term);
  });
  els.policyCount.textContent = `${state.policies.length} rules`;
  els.policyBody.innerHTML = policies
    .map((rule) => {
      const app = byId(state.apps, rule.appId);
      return `
        <tr>
          <td>${rule.id}</td>
          <td>${rule.group}</td>
          <td>${app.name}</td>
          <td>${rule.minPosture}+</td>
          <td>
            <button class="ghost" type="button" data-detail-policy="${rule.id}">Details</button>
            <button class="ghost" type="button" data-delete-policy="${rule.id}">Delete</button>
          </td>
        </tr>
      `;
    })
    .join("");
}

function renderSessions() {
  if (!state.sessions.length) {
    els.sessionBody.innerHTML = '<tr><td colspan="5" class="empty">No active sessions.</td></tr>';
    return;
  }
  els.sessionBody.innerHTML = state.sessions
    .map(
      (session) => `
        <tr>
          <td>${session.user}</td>
          <td>${session.app}</td>
          <td>${session.connector}</td>
          <td>${session.duration}</td>
          <td><button class="danger" type="button" data-revoke="${session.id}">Revoke</button></td>
        </tr>
      `,
    )
    .join("");
}

function renderDevices() {
  els.deviceList.innerHTML = state.devices
    .map((device) => {
      const user = byId(state.users, device.userId);
      return `
        <div class="device-item">
          <div>
            <strong>${device.name}</strong>
            <small>${user.name} - ${device.posture} - ${device.health}</small>
          </div>
          <select data-device-posture="${device.id}">
            ${Object.keys(rank).map((level) => `<option ${level === device.posture ? "selected" : ""}>${level}</option>`).join("")}
          </select>
        </div>
      `;
    })
    .join("");
}

function renderLogs() {
  const filter = els.logFilter.value;
  const term = (els.logSearch.value || "").toLowerCase();
  const logs = state.logs.filter((log) => {
    const matchesDecision = filter === "all" || log.decision === filter;
    const matchesSearch = [log.time, log.user, log.group, log.device, log.app, log.policy, log.decision, log.reason].join(" ").toLowerCase().includes(term);
    return matchesDecision && matchesSearch;
  });
  if (!logs.length) {
    els.logBody.innerHTML = '<tr><td colspan="5" class="empty">No matching logs.</td></tr>';
    return;
  }
  els.logBody.innerHTML = logs
    .slice(0, 30)
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

function renderZdx() {
  els.zdxCards.innerHTML = state.zdx
    .map(
      (item) => `
        <article class="app-card">
          <header>
            <div>
              <strong>${item.user}</strong>
              <small>${item.app}</small>
            </div>
            <span class="pill">${item.score}</span>
          </header>
          <div class="metric-row">
            <div class="metric-box"><strong>${item.latency}</strong><small>Latency</small></div>
            <div class="metric-box"><strong>${item.device}</strong><small>Device</small></div>
            <div class="metric-box"><strong>${item.path}</strong><small>Path</small></div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderZia() {
  const filter = els.ziaFilter.value;
  const events = state.ziaEvents.filter((event) => filter === "all" || event.category === filter);
  els.ziaBody.innerHTML = events
    .map(
      (event) => `
        <tr>
          <td>${event.time}</td>
          <td>${event.user}</td>
          <td>${event.url}</td>
          <td>${event.category}</td>
          <td>${event.action}</td>
        </tr>
      `,
    )
    .join("");
}

function renderRecent() {
  if (!state.logs.length) {
    els.recentList.innerHTML = '<div class="recent-item"><span class="pill">Idle</span><div><strong>No recent access events</strong><small>Use Quick Access to open a private application session.</small></div><span class="pill">Ready</span></div>';
    return;
  }
  els.recentList.innerHTML = state.logs
    .slice(0, 5)
    .map(
      (log) => `
        <div class="recent-item">
          <span class="pill">${log.time}</span>
          <div>
            <strong>${log.user} - ${log.app}</strong>
            <small>${log.policy}: ${log.reason}</small>
          </div>
          <span class="pill">${log.decision}</span>
        </div>
      `,
    )
    .join("");
}

function renderCases() {
  els.responseState.textContent = state.cases.length ? `${state.cases.length} open case` : "No open case";
  if (!state.cases.length) {
    els.responseList.innerHTML = '<div class="response-item"><strong>Queue clear</strong><small>No containment action is currently required.</small></div>';
    return;
  }
  els.responseList.innerHTML = state.cases
    .map(
      (item) => `
        <div class="response-item">
          <strong>${item.title}</strong>
          <small>${item.detail}</small>
          <div class="response-actions">
            <button type="button" data-contain="${item.id}">Apply Containment</button>
            <button class="ghost" type="button" data-close-case="${item.id}">Close</button>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderKpis() {
  const deniedCount = state.logs.filter((log) => log.decision === "Deny").length;
  els.kpiApps.textContent = String(state.apps.length);
  els.kpiSessions.textContent = String(state.sessions.length);
  els.kpiBlocked.textContent = String(deniedCount);
  els.kpiRisk.textContent = state.cases.length ? "Elevated" : deniedCount ? "Watch" : "Normal";
}

function renderAll() {
  renderApps();
  renderConnectors();
  renderPolicies();
  renderSessions();
  renderDevices();
  renderLogs();
  renderZdx();
  renderZia();
  renderRecent();
  renderCases();
  renderKpis();
}

function detailRows(rows) {
  return `<div class="detail-grid">${rows.map(([label, value]) => `<div class="detail-row"><span>${label}</span><strong>${value}</strong></div>`).join("")}</div>`;
}

function openDrawer(type, title, rows) {
  els.drawerEyebrow.textContent = type;
  els.drawerTitle.textContent = title;
  els.drawerBody.innerHTML = detailRows(rows);
  els.detailDrawer.classList.add("open");
  els.detailDrawer.setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  els.detailDrawer.classList.remove("open");
  els.detailDrawer.setAttribute("aria-hidden", "true");
}

function showPage(pageName) {
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.toggle("active", page.dataset.page === pageName);
  });
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === pageName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function addLog({ user, app, result, device }) {
  state.logs.unshift({
    time: now(),
    user: user.name,
    group: user.group,
    app: app.name,
    device: device.name,
    policy: result.policy,
    decision: result.decision,
    reason: result.reason,
  });
}

function addCase(user, app, result) {
  if (result.decision !== "Deny") return;
  state.cases.unshift({
    id: `case-${Date.now()}`,
    title: `${result.policy}: ${user.name} blocked from ${app.name}`,
    detail: `${result.reason} Review identity group, posture, connector health, and application segment policy.`,
  });
}

function openSession(user, app, result) {
  if (result.decision !== "Allow") return;
  state.sessions.unshift({
    id: `sess-${Date.now()}`,
    user: user.name,
    app: app.name,
    connector: app.connector,
    duration: "00:00",
  });
}

function submitAccess(appIdOverride) {
  const request = {
    userId: els.userSelect.value,
    appId: appIdOverride || els.appSelect.value,
    deviceId: els.deviceSelect.value,
    risk: els.riskSelect.value,
    mfa: els.mfaToggle.checked,
    connector: els.connectorToggle.checked,
  };
  const user = byId(state.users, request.userId);
  const app = byId(state.apps, request.appId);
  const device = byId(state.devices, request.deviceId);
  const result = evaluate(request);

  els.decisionBadge.textContent = result.decision;
  els.decisionBadge.className = `decision ${result.decision.toLowerCase()}`;
  els.decisionCopy.textContent = result.reason;
  renderTrace(result.trace);

  addLog({ user, app, result, device });
  addCase(user, app, result);
  openSession(user, app, result);
  renderAll();
}

function exportCsv() {
  const header = "time,user,group,device,app,policy,decision,reason";
  const rows = state.logs.map((log) =>
    [log.time, log.user, log.group, log.device, log.app, log.policy, log.decision, log.reason]
      .map((value) => `"${String(value).replaceAll('"', '""')}"`)
      .join(","),
  );
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "secure-access-audit-log.csv";
  link.click();
  URL.revokeObjectURL(url);
}

els.userSelect.addEventListener("change", syncDeviceSelect);
els.accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  submitAccess();
});

els.ruleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = `ZPA-${String(state.policies.length + 101).padStart(3, "0")}`;
  state.policies.push({
    id,
    group: els.ruleGroup.value,
    appId: els.ruleApp.value,
    minPosture: els.rulePosture.value,
  });
  state.logs.unshift({
    time: now(),
    user: "Policy Admin",
    group: "System",
    device: "Console",
    app: byId(state.apps, els.ruleApp.value).name,
    policy: id,
    decision: "Policy Update",
    reason: `Allow rule created for ${els.ruleGroup.value}.`,
  });
  state.adminLogs.unshift({ time: now(), admin: "Policy Admin", action: "Create Policy", target: id });
  renderAll();
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  const pageLink = target.dataset.pageLink || target.dataset.goPage;
  if (pageLink) {
    event.preventDefault();
    showPage(pageLink);
  }

  const launchApp = target.dataset.launch;
  if (launchApp) {
    els.appSelect.value = launchApp;
    showPage("access");
    submitAccess(launchApp);
  }

  const detailApp = target.dataset.detailApp;
  if (detailApp) {
    const app = byId(state.apps, detailApp);
    const assigned = state.policies.filter((policy) => policy.appId === app.id).map((policy) => policy.id).join(", ") || "No allow policy";
    openDrawer("Application Segment", app.name, [
      ["Segment", app.segment],
      ["Connector Group", app.connector],
      ["Port", `TCP ${app.port}`],
      ["Sensitivity", app.sensitivity],
      ["Health", app.health],
      ["Assigned Policies", assigned],
    ]);
  }

  const detailPolicy = target.dataset.detailPolicy;
  if (detailPolicy) {
    const policy = state.policies.find((item) => item.id === detailPolicy);
    const app = byId(state.apps, policy.appId);
    openDrawer("Access Policy", policy.id, [
      ["User Group", policy.group],
      ["Application", app.name],
      ["Application Segment", app.segment],
      ["Minimum Posture", `${policy.minPosture}+`],
      ["Action", "Allow"],
      ["Priority", "First match by group and app segment"],
    ]);
  }

  const detailConnector = target.dataset.detailConnector;
  if (detailConnector) {
    const connector = byId(state.connectors, detailConnector);
    openDrawer("App Connector Group", connector.group, [
      ["Placement", connector.site],
      ["Status", connector.status],
      ["Last Heartbeat", connector.heartbeat],
      ["CPU", connector.cpu],
      ["Latency", connector.latency],
      ["Protected Apps", connector.apps.join(", ")],
    ]);
  }

  const checkConnector = target.dataset.checkConnector;
  if (checkConnector) {
    const connector = byId(state.connectors, checkConnector);
    connector.heartbeat = "just now";
    state.logs.unshift({
      time: now(),
      user: "Connector Monitor",
      group: "System",
      device: connector.group,
      app: connector.apps.join(", "),
      policy: "CONNECTOR-CHECK",
      decision: "Healthy",
      reason: `${connector.group} health check completed.`,
    });
    renderAll();
  }

  const policyId = target.dataset.deletePolicy;
  if (policyId) {
    state.policies = state.policies.filter((rule) => rule.id !== policyId);
    renderAll();
  }

  const sessionId = target.dataset.revoke;
  if (sessionId) {
    const session = state.sessions.find((item) => item.id === sessionId);
    state.sessions = state.sessions.filter((item) => item.id !== sessionId);
    state.logs.unshift({
      time: now(),
      user: "Security Admin",
      group: "System",
      device: "Console",
      app: session ? session.app : "Unknown",
      policy: "SESSION-REVOKE",
      decision: "Revoked",
      reason: "Active private application session terminated.",
    });
    renderAll();
  }

  if (target.id === "revokeAll") {
    state.sessions = [];
    renderAll();
  }

  if (target.id === "refreshApps") {
    state.apps = state.apps.map((app) => ({ ...app, health: app.health === "Protected" ? "Protected" : "Available" }));
    renderAll();
  }

  if (target.id === "refreshConnectors") {
    state.connectors = state.connectors.map((connector) => ({ ...connector, heartbeat: "just now", status: "Healthy" }));
    renderAll();
  }

  const containId = target.dataset.contain;
  if (containId) {
    const item = state.cases.find((entry) => entry.id === containId);
    state.logs.unshift({
      time: now(),
      user: "Incident Responder",
      group: "Security",
      device: "Console",
      app: item ? item.title : "Response queue",
      policy: "CONTAINMENT",
      decision: "Applied",
      reason: "Emergency deny, session revocation, and evidence preservation actions recorded.",
    });
    state.sessions = [];
    renderAll();
  }

  const closeCaseId = target.dataset.closeCase;
  if (closeCaseId) {
    state.cases = state.cases.filter((item) => item.id !== closeCaseId);
    renderAll();
  }

  if (target.id === "exportLogs") {
    exportCsv();
  }

  if (target.id === "closeDrawer" || target.id === "detailDrawer") {
    closeDrawer();
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLSelectElement)) return;
  const deviceId = target.dataset.devicePosture;
  if (deviceId) {
    const device = byId(state.devices, deviceId);
    device.posture = target.value;
    state.logs.unshift({
      time: now(),
      user: "Device Posture",
      group: "System",
      device: device.name,
      app: "Client Connector",
      policy: "POSTURE-UPDATE",
      decision: "Updated",
      reason: `${device.name} posture changed to ${device.posture}.`,
    });
    syncDeviceSelect();
    renderAll();
  }
});

els.logFilter.addEventListener("change", renderLogs);
els.logSearch.addEventListener("input", renderLogs);
els.appSearch.addEventListener("input", renderApps);
els.policySearch.addEventListener("input", renderPolicies);
els.ziaFilter.addEventListener("change", renderZia);
els.closeDrawer.addEventListener("click", closeDrawer);

fillSelects();
renderTrace([["pass", "Control plane ready", "Identity, posture, policy, application, and response modules are available."]]);
renderAll();
