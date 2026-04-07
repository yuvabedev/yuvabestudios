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

// The shared subject keeps both the UI and the email delivery route aligned on one inquiry label.
export function buildStartProjectSubject({
  name,
}: Pick<StartProjectDraft, "name">) {
  return name ? `Start project inquiry - ${name}` : "Start project inquiry";
}

// The inquiry body is shared so every delivery path formats submissions the same way.
export function buildStartProjectMessage({
  name,
  email,
  phone,
  needs,
  notes,
  source,
}: StartProjectDraft) {
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

  return bodyLines.join("\n");
}
