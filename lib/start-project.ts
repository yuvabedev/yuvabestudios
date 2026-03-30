export const START_PROJECT_EMAIL = "sales@yuvabe.com";

const startProjectHrefSet = new Set(["#", "#process", "/#process"]);

export type StartProjectDraft = {
  name: string;
  email: string;
  phone: string;
  needs: string[];
  notes: string;
  source?: string;
};

// The main CTA routes all converge on one modal, so we normalize the known legacy hrefs here.
export function isStartProjectHref(href: string) {
  return startProjectHrefSet.has(href.trim());
}

// This mailto builder keeps the first-pass modal functional without inventing a fake backend.
export function buildStartProjectMailto({
  name,
  email,
  phone,
  needs,
  notes,
  source,
}: StartProjectDraft) {
  const subject = name
    ? `Start project inquiry - ${name}`
    : "Start project inquiry";
  const bodyLines = [
    `Name: ${name || "-"}`,
    `Email: ${email || "-"}`,
    `Phone: ${phone || "-"}`,
    `CTA source: ${source || "-"}`,
    `What they need help with: ${needs.length > 0 ? needs.join(", ") : "-"}`,
    "",
    "Extra context:",
    notes || "-",
  ];

  return `mailto:${START_PROJECT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
}
