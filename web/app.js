const postureRank = { P0: 0, P1: 1, P2: 2, P3: 3 };

const allowRules = [
  { group: "EDU-Students", app: "Student Portal", minPosture: "P0" },
  { group: "EDU-Students", app: "LMS", minPosture: "P0" },
  { group: "EDU-Teachers", app: "LMS", minPosture: "P1" },
  { group: "EDU-Teachers", app: "Grade Management", minPosture: "P1" },
  { group: "EDU-Academic-Admins", app: "Admin Dashboard", minPosture: "P2" },
  { group: "EDU-IT-Admins", app: "Admin Dashboard", minPosture: "P2" },
  { group: "EDU-Developers", app: "Internal API Dev", minPosture: "P1" },
  { group: "EDU-Contractors", app: "Contractor App", minPosture: "P1" },
];

const criticalDenyApps = new Set(["Student Records Database"]);

const form = document.querySelector("#accessForm");
const decision = document.querySelector("#decision");
const reason = document.querySelector("#reason");
const logBody = document.querySelector("#logBody");

function evaluateAccess({ group, posture, app, mfa }) {
  if (!mfa) {
    return {
      decision: "Deny",
      reason: "MFA is required before any private application access is evaluated.",
    };
  }

  if (criticalDenyApps.has(app)) {
    return {
      decision: "Deny",
      reason: "Critical database assets are not exposed as normal human-user ZPA application segments.",
    };
  }

  const rule = allowRules.find((item) => item.group === group && item.app === app);
  if (!rule) {
    return {
      decision: "Deny",
      reason: "No matching allow rule exists for this group and application segment.",
    };
  }

  if (postureRank[posture] < postureRank[rule.minPosture]) {
    return {
      decision: "Deny",
      reason: `This application requires at least ${rule.minPosture} posture.`,
    };
  }

  return {
    decision: "Allow",
    reason: `Matched allow rule for ${group} to access ${app} with ${posture} posture.`,
  };
}

function addLog(entry) {
  if (logBody.children.length === 1 && logBody.children[0].children.length === 1) {
    logBody.innerHTML = "";
  }

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${new Date().toLocaleTimeString()}</td>
    <td>${entry.group}</td>
    <td>${entry.posture}</td>
    <td>${entry.app}</td>
    <td>${entry.result.decision}</td>
    <td>${entry.result.reason}</td>
  `;
  logBody.prepend(row);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const entry = {
    group: document.querySelector("#group").value,
    posture: document.querySelector("#posture").value,
    app: document.querySelector("#app").value,
    mfa: document.querySelector("#mfa").checked,
  };
  entry.result = evaluateAccess(entry);

  decision.textContent = entry.result.decision;
  decision.className = `decision ${entry.result.decision.toLowerCase()}`;
  reason.textContent = entry.result.reason;
  addLog(entry);
});
