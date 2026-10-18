const caseStudies = {
  ai: {
    kicker: "AI PRODUCT MANAGEMENT · EXPERIENCE OVERVIEW",
    title: "AI product experiences",
    label: "Generalized experience — no confidential product details",
    intro: "My AI product management work sits at the intersection of user needs, business value, and technical delivery. This page deliberately describes my operating approach rather than disclosing proprietary features or internal systems.",
    sections: [
      ["Product question", "Where can AI meaningfully reduce friction, improve a decision, or unlock a workflow — and where would a simpler solution be better?"],
      ["How I approach it", "Clarify the target user and job to be done; map the current journey; define the smallest valuable scope; align product, engineering, data, design, and business stakeholders; and agree on success measures before delivery."],
      ["What I would measure", "Task completion and time saved; activation and repeat usage; answer or output quality; user corrections and fallback rates; latency and cost; and safety or escalation signals appropriate to the use case."],
      ["Evidence boundary", "This is an experience overview, not a claim that the specific interface shown in the portfolio was shipped. Add approved, product-specific details only where disclosure is authorized."]
    ]
  },
  portal: {
    kicker: "0–1 PRODUCT · PAST WORK",
    title: "Startup Assessment Portal",
    label: "Past product work · generalized for public sharing",
    intro: "A CRM-style assessment portal for a startup evaluation ecosystem. The product goal was to replace fragmented assessment activities with a more structured workflow and a clearer view of progress and decisions.",
    sections: [
      ["Problem framing", "Fragmented inputs and inconsistent assessment steps can create avoidable coordination overhead, incomplete information, and limited visibility into decision status."],
      ["Product approach", "Structure the intake and assessment journey; clarify required information; make milestones visible; support consistent evaluation; and create a shared view for internal stakeholders."],
      ["Delivery focus", "Translate stakeholder needs into requirements and user stories, prioritize the minimum workflow needed, align delivery milestones, and validate usability and data completeness with internal users."],
      ["Reported outcome", "A previously documented result was a 40% reduction in assessment cycle time. Confirm the measurement window, baseline, and scope before publishing this metric externally."],
      ["What I learned", "Workflow products create value when they make the right action obvious, remove handoff friction, and make decision status visible — not simply when they digitize an existing form."]
    ]
  },
  intel: {
    kicker: "STRATEGY & ENABLEMENT · PAST WORK",
    title: "Enterprise sales intelligence",
    label: "Past strategy work · generalized for public sharing",
    intro: "Research and account intelligence work designed to turn market signals, competitor positioning, and customer context into practical inputs for enterprise sales and pursuit decisions.",
    sections: [
      ["The challenge", "Sales teams need relevant insight at the moment of decision, not another long research document. The product-like challenge is to make intelligence discoverable, credible, timely, and actionable."],
      ["Approach", "Combine market and competitor research with account context; synthesize findings into reusable battlecards and sales triggers; and tailor outputs to the decisions teams need to make."],
      ["Reported outcome", "A previously documented resume outcome associated with competitive sales assets was a 10% improvement in bid win rate. Validate attribution and measurement before public use; the metric is not presented as causal proof here."],
      ["Product lesson", "Information becomes valuable when it changes an action. Adoption depends on workflow fit, freshness, clarity, and trust in the signal."]
    ]
  },
  eval: {
    kicker: "AI QUALITY · ILLUSTRATIVE CONCEPT",
    title: "AI quality & evaluation playbook",
    label: "Concept only · not represented as shipped work",
    intro: "A public-facing concept for showing how a product team could evaluate an AI feature before and after release. The interface and sample score bars are illustrative, not real model results.",
    sections: [
      ["Start with the user job", "Define what a good outcome looks like for the user and which failure modes matter most in the real workflow."],
      ["Build an evaluation set", "Create representative test cases, edge cases, and failure examples. Use synthetic or approved data, and document known limitations."],
      ["Evaluate multiple dimensions", "Consider relevance, groundedness, task success, safety, latency, cost, and the need for human review. Weight metrics according to the use case rather than optimizing a single score."],
      ["Close the loop", "Combine offline evaluations with production feedback and monitored outcomes. Set thresholds, route failures, review regressions, and iterate before widening rollout."],
      ["Important distinction", "The visual percentages on the concept card are decorative mock data only. They must never be interpreted as model performance or business results."]
    ]
  }
};

const dialog = document.getElementById("case-dialog");
const caseContent = document.getElementById("case-content");
document.querySelectorAll(".open-case").forEach(button => {
  button.addEventListener("click", () => {
    const item = caseStudies[button.dataset.case];
    if (!item) return;
    caseContent.innerHTML = `<span class="section-kicker">${item.kicker}</span><h2>${item.title}</h2><div class="case-label">${item.label}</div><p>${item.intro}</p>${item.sections.map(([heading, body]) => `<h3>${heading}</h3><p>${body}</p>`).join("")}<div class="case-callout">Portfolio principle: be specific about the problem and your decisions; be careful with confidential details and claims that cannot be substantiated.</div>`;
    dialog.showModal();
  });
});
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    const filter = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card => {
      card.hidden = filter !== "all" && card.dataset.kind !== filter;
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("copy-email").addEventListener("click", async event => {
  const button = event.currentTarget;
  const email = button.dataset.email;
  const status = document.getElementById("copy-status");
  if (!email || email === "ADD_YOUR_EMAIL_HERE") {
    status.textContent = "Add your professional email to script.js / index.html before publishing this contact button.";
    return;
  }
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "Email copied to clipboard.";
  } catch {
    status.textContent = `Email: ${email}`;
  }
});
