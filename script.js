/* Cybersecurity Career Finder
   script.js
   - Allows 1–2 answers per question (checkboxes)
   - Expanded to 25 questions for finer matching
*/

const roles = {
  "security_analyst": { title: "Security Analyst", desc: "Monitors systems, analyzes alerts, investigates incidents and improves security posture." },
  "soc_analyst": { title: "SOC Analyst", desc: "Works in a Security Operations Center monitoring alerts, triaging incidents and escalating when needed." },
  "incident_responder": { title: "Incident Responder", desc: "Leads response to breaches, performs containment, remediation and post-incident analysis." },
  "pentester": { title: "Penetration Tester", desc: "Simulates attacks to find vulnerabilities; reports findings and recommends mitigation." },
  "security_engineer": { title: "Security Engineer", desc: "Designs and implements security controls, integrates tools, automates defenses." },
  "cloud_security": { title: "Cloud Security Engineer", desc: "Secures cloud infrastructure (IAM, logging, networks, containers)." },
  "grc": { title: "GRC Analyst", desc: "Governance, Risk, and Compliance: policy, audits, risk assessments and controls." },
  "forensic_analyst": { title: "Forensic Analyst", desc: "Performs digital forensics, evidence collection and deep investigations." },
  "malware_analyst": { title: "Malware Analyst", desc: "Reverse-engineers malware to understand behavior and build detection." },
  "network_security": { title: "Network Security Engineer", desc: "Protects and designs networks: firewalls, segmentation, IDS/IPS and routing security." },
  "devsecops": { title: "DevSecOps / AppSec Engineer", desc: "Embeds security into CI/CD, code scanning, container and app security." },
  "security_architect": { title: "Security Architect", desc: "Designs the overall security architecture and strategy (senior role)." }
};

// Questions (25 total). Select 1–2 per question.
const questions = [
  {
    id: "q1",
    text: "Which describes your main interest?",
    desc: "Pick 1 or 2 that most appeal to you.",
    options: [
      { id:"a", text:"Finding & fixing technical vulnerabilities (hands-on)","adds":["pentester","security_engineer","devsecops"] },
      { id:"b", text:"Monitoring & responding to threats in real time","adds":["soc_analyst","security_analyst","incident_responder"] },
      { id:"c", text:"Policy, audits, and compliance work","adds":["grc"] },
      { id:"d", text:"Deep investigations and digital evidence","adds":["forensic_analyst","incident_responder"] }
    ]
  },
  {
    id: "q2",
    text: "What's your current / recent job or major?",
    desc: "Choose the closest (1 or 2).",
    options: [
      { id:"a", text:"Computer Science / Dev / Backend","adds":["devsecops","security_engineer","pentester"] },
      { id:"b", text:"Networking / Sysadmin / IT","adds":["network_security","security_engineer","cloud_security"] },
      { id:"c", text:"Criminal justice / Forensics / Investigations","adds":["forensic_analyst"] },
      { id:"d", text:"Business / Management / Law","adds":["grc","security_architect"] }
    ]
  },
  {
    id: "q3",
    text: "How do you prefer to work?",
    desc: "Choose 1 or 2.",
    options: [
      { id:"a", text:"Fast-paced, triage & action (alerts)","adds":["soc_analyst","incident_responder","security_analyst"] },
      { id:"b", text:"Long investigations or deep research","adds":["forensic_analyst","malware_analyst","incident_responder"] },
      { id:"c", text:"Design and build long-term systems","adds":["security_architect","security_engineer","cloud_security"] },
      { id:"d", text:"Short projects with creativity (pentests)","adds":["pentester","security_engineer"] }
    ]
  },
  {
    id: "q4",
    text: "Technical skills: which do you enjoy most?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Scripting & automation (Python, Bash)","adds":["security_engineer","devsecops","pentester"] },
      { id:"b", text:"Linux, packet analysis, routing","adds":["network_security","soc_analyst","incident_responder"] },
      { id:"c", text:"Cloud platforms (AWS/Azure/GCP)","adds":["cloud_security","devsecops","security_architect"] },
      { id:"d", text:"Reverse-engineering / low-level debugging","adds":["malware_analyst","pentester","forensic_analyst"] }
    ]
  },
  {
    id: "q5",
    text: "Do you enjoy social engineering and thinking like an attacker?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Yes — I like creative attack scenarios","adds":["pentester","soc_analyst"] },
      { id:"b", text:"Somewhat — useful occasionally","adds":["security_analyst","security_engineer"] },
      { id:"c", text:"No — prefer defenses/policies","adds":["grc","security_architect"] }
    ]
  },
  {
    id: "q6",
    text: "Preferred environment?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Corporate SOC (team, shift work)","adds":["soc_analyst","security_analyst"] },
      { id:"b", text:"Consulting / pen test firm (project-based)","adds":["pentester","security_architect"] },
      { id:"c", text:"Cloud provider / platform team","adds":["cloud_security","security_engineer"] },
      { id:"d", text:"Legal/forensics lab or government","adds":["forensic_analyst","malware_analyst"] }
    ]
  },
  {
    id: "q7",
    text: "How comfortable are you with coding?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Very comfortable (write tools, scripts)","adds":["devsecops","security_engineer","pentester"] },
      { id:"b", text:"Comfortable (read & tweak code)","adds":["pentester","cloud_security"] },
      { id:"c", text:"Minimal coding (config & analysis)","adds":["soc_analyst","grc","security_architect"] }
    ]
  },
  {
    id: "q8",
    text: "Do you prefer hands-on hardware/network work?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Yes — switches, routers, firewalls","adds":["network_security","security_engineer"] },
      { id:"b", text:"Some — basics OK","adds":["security_analyst","soc_analyst"] },
      { id:"c", text:"No — focus on apps or policy","adds":["devsecops","grc","security_architect"] }
    ]
  },
  {
    id: "q9",
    text: "Interest in regulations & compliance (PCI, GDPR, ISO)?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"High — I enjoy policy & audit","adds":["grc"] },
      { id:"b", text:"Medium — useful to know","adds":["security_architect","security_engineer"] },
      { id:"c", text:"Low — prefer technical work","adds":["pentester","malware_analyst"] }
    ]
  },
  {
    id: "q10",
    text: "Do you enjoy teaching, writing reports, presenting to non-technical folks?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Yes — I love clear communication","adds":["grc","security_architect","security_analyst"] },
      { id:"b", text:"Some — when needed","adds":["incident_responder","security_engineer"] },
      { id:"c", text:"No — prefer lab work","adds":["malware_analyst","pentester"] }
    ]
  },
  {
    id: "q11",
    text: "How do you handle stress and urgent incidents?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"I thrive under pressure","adds":["incident_responder","soc_analyst"] },
      { id:"b", text:"Prefer controlled, analytical work","adds":["forensic_analyst","malware_analyst"] },
      { id:"c", text:"Prefer planning and architecture","adds":["security_architect","grc"] }
    ]
  },
  {
    id: "q12",
    text: "Do you like long-term projects vs short engagements?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Short engagements & varied projects","adds":["pentester","consulting_pentester"] },
      { id:"b", text:"Long-term system improvement","adds":["security_engineer","security_architect","cloud_security"] },
      { id:"c", text:"Ongoing monitoring & ops","adds":["soc_analyst","security_analyst"] }
    ]
  },
  {
    id: "q13",
    text: "What tool types do you want to work with?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"SIEM, EDR, log tools","adds":["soc_analyst","security_analyst"] },
      { id:"b", text:"Cloud infra, IaC, K8s","adds":["cloud_security","devsecops"] },
      { id:"c", text:"Exploit frameworks, pentest suites","adds":["pentester","malware_analyst"] },
      { id:"d", text:"Forensic suites, disk/memory analysis","adds":["forensic_analyst","incident_responder"] }
    ]
  },
  {
    id: "q14",
    text: "Are you interested in malware and reverse-engineering?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Yes — very interested","adds":["malware_analyst","forensic_analyst"] },
      { id:"b", text:"Somewhat — curious","adds":["pentester","incident_responder"] },
      { id:"c", text:"Not really","adds":["grc","security_architect"] }
    ]
  },
  {
    id: "q15",
    text: "Career priorities (pick most important)",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"High pay & senior roles","adds":["security_architect","cloud_security","malware_analyst"] },
      { id:"b", text:"Work-life balance & predictable hours","adds":["grc","security_engineer"] },
      { id:"c", text:"Excitement & variety","adds":["pentester","soc_analyst"] }
    ]
  },
  {
    id: "q16",
    text: "Do you prefer team leadership or hands-on tech?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Leadership / architecture","adds":["security_architect","grc"] },
      { id:"b", text:"Hands-on individual contributor","adds":["pentester","malware_analyst","incident_responder"] },
      { id:"c", text:"Hybrid","adds":["security_engineer","cloud_security"] }
    ]
  },
  {
    id: "q17",
    text: "Do you already hold experience / certs? (pick best fit)",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Security certs (CompTIA Security+, CEH, CISSP)","adds":["security_analyst","grc","security_architect"] },
      { id:"b", text:"Networking certs (CCNA, JNCIA)","adds":["network_security","security_engineer"] },
      { id:"c", text:"Cloud certs (AWS/Azure/GCP)","adds":["cloud_security","devsecops"] },
      { id:"d", text:"None yet","adds":["security_analyst","soc_analyst"] }
    ]
  },
  {
    id: "q18",
    text: "What would you like to learn most next year?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Incident handling & forensics","adds":["incident_responder","forensic_analyst"] },
      { id:"b", text:"Offensive techniques & pentesting","adds":["pentester","malware_analyst"] },
      { id:"c", text:"Cloud security & IaC","adds":["cloud_security","devsecops"] },
      { id:"d", text:"Risk management & compliance","adds":["grc","security_architect"] }
    ]
  },
  {
    id: "q19",
    text: "Preferred operating environments?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Linux-first (servers, terminals, tooling)","adds":["soc_analyst","incident_responder","security_engineer","pentester"] },
      { id:"b", text:"Windows enterprise (AD, GPO, EDR)","adds":["security_analyst","incident_responder","network_security"] },
      { id:"c", text:"Cloud-native (AWS/Azure/GCP)","adds":["cloud_security","devsecops","security_architect"] },
      { id:"d", text:"Specialized lab/forensics VMs","adds":["forensic_analyst","malware_analyst"] }
    ]
  },
  {
    id: "q20",
    text: "Client-facing & presentation comfort?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"High — love presenting to stakeholders","adds":["grc","security_architect","pentester"] },
      { id:"b", text:"Medium — can present as needed","adds":["security_engineer","security_analyst"] },
      { id:"c", text:"Low — prefer behind-the-scenes","adds":["malware_analyst","forensic_analyst"] }
    ]
  },
  {
    id: "q21",
    text: "Are you okay with shift work / on-call rotations?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Yes — fine with nights/weekends on-call","adds":["soc_analyst","incident_responder"] },
      { id:"b", text:"Occasionally — limited rotations","adds":["security_analyst","network_security"] },
      { id:"c", text:"Prefer standard business hours","adds":["grc","security_architect","cloud_security","security_engineer"] }
    ]
  },
  {
    id: "q22",
    text: "What kinds of artifacts do you enjoy producing most?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Runbooks/playbooks & detection rules","adds":["soc_analyst","security_analyst","incident_responder"] },
      { id:"b", text:"Exploits, PoCs & attack simulations","adds":["pentester","malware_analyst"] },
      { id:"c", text:"Architectural diagrams & standards","adds":["security_architect","security_engineer","cloud_security"] },
      { id:"d", text:"Policies, audit reports & risk registers","adds":["grc"] }
    ]
  },

  // NEW: q23–q25
  {
    id: "q23",
    text: "Which industries interest you most for security work?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Finance / banking / fintech","adds":["grc","security_analyst","incident_responder"] },
      { id:"b", text:"Government / defense / law enforcement","adds":["forensic_analyst","malware_analyst","incident_responder"] },
      { id:"c", text:"Big tech / SaaS / cloud platforms","adds":["cloud_security","devsecops","security_engineer","security_architect"] },
      { id:"d", text:"Consulting / agency / red-team services","adds":["pentester","security_architect"] }
    ]
  },
  {
    id: "q24",
    text: "How do you feel about travel or visiting client sites?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Love travel and variety of locations","adds":["pentester","security_architect","incident_responder"] },
      { id:"b", text:"Okay with occasional travel","adds":["security_analyst","network_security","security_engineer"] },
      { id:"c", text:"Prefer mostly-remote / home-based","adds":["malware_analyst","devsecops","cloud_security","grc"] }
    ]
  },
  {
    id: "q25",
    text: "Long-term, how do you see your career evolving?",
    desc: "Pick 1 or 2.",
    options: [
      { id:"a", text:"Into leadership, strategy and architecture","adds":["security_architect","grc"] },
      { id:"b", text:"As a deep technical specialist (guru level)","adds":["malware_analyst","forensic_analyst","pentester","devsecops"] },
      { id:"c", text:"Hybrid: strong technical skills plus mentoring others","adds":["security_engineer","cloud_security","security_analyst"] }
    ]
  }
];

// Alias so "consulting_pentester" reuses pentester definition
roles["consulting_pentester"] = roles["pentester"];

// ===== Render (checkbox version) =====
const questionsDiv = document.getElementById('questions');

function renderQuestions() {
  questionsDiv.innerHTML = '';
  questions.forEach((q, idx) => {
    const qEl = document.createElement('div');
    qEl.className = 'question';
    qEl.setAttribute('data-qid', q.id);

    const hint = `<div class="hint">Select up to <strong>2</strong> answers (pick 1 or 2).</div>`;

    qEl.innerHTML = `
      <div class="q-head">
        <h4>${idx+1}. ${q.text}</h4>
        <div class="q-desc">${q.desc || ''} ${hint}</div>
      </div>
      <div class="options" role="group" aria-labelledby="${q.id}">
        ${q.options.map((opt,i)=>
          `<label class="option"><input type="checkbox" name="${q.id}" value="${i}" data-q="${q.id}"> ${opt.text}</label>`
        ).join('')}
      </div>
    `;
    questionsDiv.appendChild(qEl);
  });

  attachLimitHandlers();
}

renderQuestions();

// ===== Per-question max=2 enforcement =====
function attachLimitHandlers() {
  questions.forEach(q => {
    const inputs = Array.from(document.querySelectorAll(`input[name="${q.id}"]`));
    inputs.forEach(inp => {
      inp.addEventListener('change', () => {
        const checked = inputs.filter(i=>i.checked);
        if (checked.length >= 2) {
          inputs.forEach(i => { if (!i.checked) i.disabled = true; });
        } else {
          inputs.forEach(i => i.disabled = false);
        }
      });
    });
  });
}

// ===== Scoring =====
function scoreAnswers(formData) {
  const tally = {};
  Object.keys(roles).forEach(k => tally[k]=0);

  questions.forEach(q => {
    const vals = formData.getAll(q.id);
    if (!vals || vals.length === 0) return;
    vals.forEach(vStr => {
      const idx = parseInt(vStr, 10);
      const opt = q.options[idx];
      if (!opt || !opt.adds) return;
      opt.adds.forEach(r => {
        if (!tally[r]) tally[r] = 0;
        tally[r] += 1; // simple +1 weighting
      });
    });
  });

  const sorted = Object.keys(tally)
    .map(k => ({ key:k, score:tally[k], title: roles[k]?.title || k }))
    .sort((a,b) => b.score - a.score);

  return { tally, sorted };
}

// ===== UI handlers =====
const quizForm = document.getElementById('quizForm');
const resultsEl = document.getElementById('results');
const topRolesEl = document.getElementById('topRoles');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const restartBtn = document.getElementById('restartBtn');
const copyBtn = document.getElementById('copyBtn');

quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validate each question has 1..2 checked
  for (let q of questions) {
    const checked = quizForm.querySelectorAll(`input[name="${q.id}"]:checked`);
    if (checked.length === 0) {
      alert(`Please select at least 1 answer for: "${q.text}"`);
      const first = quizForm.querySelector(`input[name="${q.id}"]`);
      if (first) first.focus();
      return;
    }
    if (checked.length > 2) {
      alert(`Please select no more than 2 answers for: "${q.text}"`);
      return;
    }
  }

  submitBtn.disabled = true;
  const fd = new FormData(quizForm);
  const { sorted } = scoreAnswers(fd);

  const top = sorted.filter(s => s.score>0).slice(0,3);
  showTopRoles(top, sorted);
  submitBtn.disabled = false;
});

function showTopRoles(top, sorted) {
  topRolesEl.innerHTML = '';
  if (top.length === 0) {
    topRolesEl.innerHTML = `<p>No clear match — try changing answers or gaining experience in your areas of interest.</p>`;
  } else {
    top.forEach((t, idx) => {
      const role = roles[t.key];
      const el = document.createElement('div');
      el.className = 'role-card';
      el.innerHTML = `<div><h4>${idx+1}. ${role.title} <span class="role-score">${t.score}</span></h4><p>${role.desc}</p></div>`;
      topRolesEl.appendChild(el);
    });

    const more = sorted.slice(3,6).filter(s=>s.score>0);
    if (more.length) {
      const moreEl = document.createElement('div');
      moreEl.style.marginTop = '8px';
      moreEl.innerHTML = `<strong>Other possibilities:</strong> ${more.map(m=>roles[m.key].title).join(', ')}`;
      topRolesEl.appendChild(moreEl);
    }
  }

  resultsEl.hidden = false;
  resultsEl.scrollIntoView({behavior:'smooth'});
}

resetBtn.addEventListener('click', () => {
  quizForm.reset();
  resultsEl.hidden = true;
  questions.forEach(q => {
    const inputs = Array.from(document.querySelectorAll(`input[name="${q.id}"]`));
    inputs.forEach(i => i.disabled = false);
  });
});

restartBtn.addEventListener('click', () => {
  quizForm.reset();
  resultsEl.hidden = true;
  questions.forEach(q => {
    const inputs = Array.from(document.querySelectorAll(`input[name="${q.id}"]`));
    inputs.forEach(i => i.disabled = false);
  });
  window.scrollTo({top:0,behavior:'smooth'});
});

copyBtn.addEventListener('click', () => {
  const text = topRolesEl.innerText || topRolesEl.textContent;
  navigator.clipboard?.writeText(text).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy results', 1200);
  }).catch(()=> {
    alert('Copy failed — select and copy manually.');
  });
});
