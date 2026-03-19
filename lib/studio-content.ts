import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";

import { unstable_noStore as noStore } from "next/cache";

import {
  isStudioCaseStudyId,
  type StudioCaseStudyGalleryItem,
  type StudioCaseStudyGalleryRow,
  type StudioCaseStudyIconKey,
  type StudioCaseStudyProofPoint,
  type StudioCaseStudySection,
  type StudioCaseStudySummary,
  type StudioCaseStudyTestimonial,
  type StudioEditableCaseStudy,
} from "@/components/studio/studio-case-study-content";
import type {
  StudioHomepageContent,
  StudioHomepageHeroContent,
  StudioHomepageNavItem,
  StudioHomepageWorkContent,
} from "@/components/studio/studio-homepage-content";

const dataDirectory = path.join(process.cwd(), "components", "studio", "data");
const caseStudiesFilePath = path.join(dataDirectory, "studio-case-studies.json");
const homepageFilePath = path.join(dataDirectory, "studio-homepage-content.json");

function assertRecord(
  value: unknown,
  label: string,
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
}

function expectString(value: unknown, label: string) {
  if (typeof value !== "string") {
    throw new Error(`${label} must be a string.`);
  }

  return value;
}

function optionalString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function normalizeOptionalString(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

function expectArray(value: unknown, label: string) {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }

  return value;
}

function expectStringArray(value: unknown, label: string) {
  return expectArray(value, label).map((item, index) =>
    expectString(item, `${label}[${index}]`),
  );
}

function normalizeStringArray(value: unknown, label: string) {
  return expectStringArray(value, label)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNavItem(value: unknown, label: string): StudioHomepageNavItem {
  assertRecord(value, label);

  return {
    label: expectString(value.label, `${label}.label`),
    href: expectString(value.href, `${label}.href`),
  };
}

function normalizeNavItem(
  value: unknown,
  label: string,
): StudioHomepageNavItem | null {
  assertRecord(value, label);

  const nextLabel = expectString(value.label, `${label}.label`).trim();
  const nextHref = expectString(value.href, `${label}.href`).trim();

  if (!nextLabel || !nextHref) {
    return null;
  }

  return {
    label: nextLabel,
    href: nextHref,
  };
}

function parseHeroContent(
  value: unknown,
  label: string,
): StudioHomepageHeroContent {
  assertRecord(value, label);

  return {
    headlineIntro: expectString(value.headlineIntro, `${label}.headlineIntro`),
    headlineHighlight: expectString(
      value.headlineHighlight,
      `${label}.headlineHighlight`,
    ),
    headlineLineTwo: expectString(
      value.headlineLineTwo,
      `${label}.headlineLineTwo`,
    ),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    ctaLabel: expectString(value.ctaLabel, `${label}.ctaLabel`),
    ctaHref: expectString(value.ctaHref, `${label}.ctaHref`),
  };
}

function normalizeHeroContent(
  value: unknown,
  label: string,
): StudioHomepageHeroContent {
  const parsed = parseHeroContent(value, label);

  return {
    headlineIntro: parsed.headlineIntro.trim(),
    headlineHighlight: parsed.headlineHighlight.trim(),
    headlineLineTwo: parsed.headlineLineTwo.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    ctaLabel: parsed.ctaLabel.trim(),
    ctaHref: parsed.ctaHref.trim(),
  };
}

function parseWorkContent(
  value: unknown,
  label: string,
): StudioHomepageWorkContent {
  assertRecord(value, label);

  return {
    eyebrow: expectString(value.eyebrow, `${label}.eyebrow`),
    headline: expectString(value.headline, `${label}.headline`),
    supportPrefix: expectString(value.supportPrefix, `${label}.supportPrefix`),
    supportHighlight: expectString(
      value.supportHighlight,
      `${label}.supportHighlight`,
    ),
    supportSuffix: expectString(value.supportSuffix, `${label}.supportSuffix`),
  };
}

function normalizeWorkContent(
  value: unknown,
  label: string,
): StudioHomepageWorkContent {
  const parsed = parseWorkContent(value, label);

  return {
    eyebrow: parsed.eyebrow.trim(),
    headline: parsed.headline.trim(),
    supportPrefix: parsed.supportPrefix.trim(),
    supportHighlight: parsed.supportHighlight.trim(),
    supportSuffix: parsed.supportSuffix.trim(),
  };
}

function parseHomepageContent(value: unknown): StudioHomepageContent {
  assertRecord(value, "homepage content");

  return {
    navigationItems: expectArray(
      value.navigationItems,
      "homepage content.navigationItems",
    ).map((item, index) =>
      parseNavItem(item, `homepage content.navigationItems[${index}]`),
    ),
    hero: parseHeroContent(value.hero, "homepage content.hero"),
    work: parseWorkContent(value.work, "homepage content.work"),
  };
}

export function parseStudioHomepageContentInput(
  value: unknown,
): StudioHomepageContent {
  assertRecord(value, "homepage content payload");

  return {
    navigationItems: expectArray(
      value.navigationItems,
      "homepage content payload.navigationItems",
    )
      .map((item, index) =>
        normalizeNavItem(item, `homepage content payload.navigationItems[${index}]`),
      )
      .filter((item): item is StudioHomepageNavItem => Boolean(item)),
    hero: normalizeHeroContent(value.hero, "homepage content payload.hero"),
    work: normalizeWorkContent(value.work, "homepage content payload.work"),
  };
}

function parseProofPoint(
  value: unknown,
  label: string,
): StudioCaseStudyProofPoint {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
    iconKey: optionalString(value.iconKey) as StudioCaseStudyIconKey | undefined,
  };
}

function normalizeProofPoint(
  value: unknown,
  label: string,
): StudioCaseStudyProofPoint | null {
  const parsed = parseProofPoint(value, label);
  const title = parsed.title.trim();
  const description = parsed.description.trim();

  if (!title && !description) {
    return null;
  }

  return {
    title,
    description,
    iconKey: parsed.iconKey,
  };
}

function parseSection(value: unknown, label: string): StudioCaseStudySection {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    body: expectString(value.body, `${label}.body`),
  };
}

function normalizeSection(
  value: unknown,
  label: string,
): StudioCaseStudySection | null {
  const parsed = parseSection(value, label);
  const title = parsed.title.trim();
  const body = parsed.body.trim();

  if (!title && !body) {
    return null;
  }

  return {
    title,
    body,
  };
}

function parseGalleryItem(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryItem {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    description: expectString(value.description, `${label}.description`),
  };
}

function normalizeGalleryItem(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryItem | null {
  const parsed = parseGalleryItem(value, label);
  const title = parsed.title.trim();
  const description = parsed.description.trim();

  if (!title && !description) {
    return null;
  }

  return {
    title,
    description,
  };
}

function parseGalleryRow(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryRow {
  assertRecord(value, label);

  return {
    title: expectString(value.title, `${label}.title`),
    items: expectArray(value.items, `${label}.items`).map((item, index) =>
      parseGalleryItem(item, `${label}.items[${index}]`),
    ),
  };
}

function normalizeGalleryRow(
  value: unknown,
  label: string,
): StudioCaseStudyGalleryRow | null {
  const parsed = parseGalleryRow(value, label);
  const title = parsed.title.trim();
  const items = parsed.items
    .map((item, index) =>
      normalizeGalleryItem(item, `${label}.items[${index}]`),
    )
    .filter((item): item is StudioCaseStudyGalleryItem => Boolean(item));

  if (!title && items.length === 0) {
    return null;
  }

  return {
    title,
    items,
  };
}

function parseTestimonial(
  value: unknown,
  label: string,
): StudioCaseStudyTestimonial {
  assertRecord(value, label);

  return {
    quote: expectString(value.quote, `${label}.quote`),
    attribution: expectString(value.attribution, `${label}.attribution`),
    ctaLabel: optionalString(value.ctaLabel),
    ctaHref: optionalString(value.ctaHref),
  };
}

function normalizeTestimonial(
  value: unknown,
  label: string,
): StudioCaseStudyTestimonial {
  const parsed = parseTestimonial(value, label);

  return {
    quote: parsed.quote.trim(),
    attribution: parsed.attribution.trim(),
    ctaLabel: normalizeOptionalString(parsed.ctaLabel),
    ctaHref: normalizeOptionalString(parsed.ctaHref),
  };
}

function parseCaseStudySummary(value: unknown, label: string): StudioCaseStudySummary {
  assertRecord(value, label);

  const id = expectString(value.id, `${label}.id`);

  if (!isStudioCaseStudyId(id)) {
    throw new Error(`${label}.id is not a supported case-study id.`);
  }

  return {
    id,
    sector: expectString(value.sector, `${label}.sector`),
    title: expectString(value.title, `${label}.title`),
    summary: expectString(value.summary, `${label}.summary`),
    heroMockHeadline: optionalString(value.heroMockHeadline),
    services: expectStringArray(value.services, `${label}.services`),
    mediaIconKey: expectString(
      value.mediaIconKey,
      `${label}.mediaIconKey`,
    ) as StudioCaseStudyIconKey,
    mockImageSrc: optionalString(value.mockImageSrc),
    mockImageAlt: optionalString(value.mockImageAlt),
    mockVariant: optionalString(value.mockVariant) as
      | StudioCaseStudySummary["mockVariant"]
      | undefined,
    mockLayout: optionalString(value.mockLayout) as
      | StudioCaseStudySummary["mockLayout"]
      | undefined,
    mockViewport: optionalString(value.mockViewport) as
      | StudioCaseStudySummary["mockViewport"]
      | undefined,
    mockImageClassName: optionalString(value.mockImageClassName),
    size: optionalString(value.size) as StudioCaseStudySummary["size"] | undefined,
    modalIntro: optionalString(value.modalIntro),
    modalOutcomes: value.modalOutcomes
      ? expectStringArray(value.modalOutcomes, `${label}.modalOutcomes`)
      : undefined,
    modalSections: value.modalSections
      ? expectArray(value.modalSections, `${label}.modalSections`).map(
          (section, index) =>
            parseSection(section, `${label}.modalSections[${index}]`),
        )
      : undefined,
    modalProofPoints: value.modalProofPoints
      ? expectArray(value.modalProofPoints, `${label}.modalProofPoints`).map(
          (point, index) =>
            parseProofPoint(point, `${label}.modalProofPoints[${index}]`),
        )
      : undefined,
    modalGalleryRows: value.modalGalleryRows
      ? expectArray(value.modalGalleryRows, `${label}.modalGalleryRows`).map(
          (row, index) =>
            parseGalleryRow(row, `${label}.modalGalleryRows[${index}]`),
        )
      : undefined,
    modalTestimonial: value.modalTestimonial
      ? parseTestimonial(value.modalTestimonial, `${label}.modalTestimonial`)
      : undefined,
    seoTitle: optionalString(value.seoTitle),
    seoDescription: optionalString(value.seoDescription),
  };
}

export function parseStudioEditableCaseStudyInput(
  value: unknown,
): Omit<StudioEditableCaseStudy, "id"> {
  assertRecord(value, "case-study payload");

  return {
    sector: expectString(value.sector, "case-study payload.sector").trim(),
    title: expectString(value.title, "case-study payload.title").trim(),
    summary: expectString(value.summary, "case-study payload.summary").trim(),
    heroMockHeadline: normalizeOptionalString(value.heroMockHeadline),
    services: normalizeStringArray(value.services, "case-study payload.services"),
    modalIntro: normalizeOptionalString(value.modalIntro),
    modalOutcomes: normalizeStringArray(
      value.modalOutcomes,
      "case-study payload.modalOutcomes",
    ),
    modalSections: expectArray(
      value.modalSections,
      "case-study payload.modalSections",
    )
      .map((section, index) =>
        normalizeSection(section, `case-study payload.modalSections[${index}]`),
      )
      .filter((section): section is StudioCaseStudySection => Boolean(section)),
    modalProofPoints: expectArray(
      value.modalProofPoints,
      "case-study payload.modalProofPoints",
    )
      .map((point, index) =>
        normalizeProofPoint(point, `case-study payload.modalProofPoints[${index}]`),
      )
      .filter(
        (point): point is StudioCaseStudyProofPoint => Boolean(point),
      ),
    modalGalleryRows: expectArray(
      value.modalGalleryRows,
      "case-study payload.modalGalleryRows",
    )
      .map((row, index) =>
        normalizeGalleryRow(row, `case-study payload.modalGalleryRows[${index}]`),
      )
      .filter((row): row is StudioCaseStudyGalleryRow => Boolean(row)),
    modalTestimonial: normalizeTestimonial(
      value.modalTestimonial,
      "case-study payload.modalTestimonial",
    ),
    seoTitle: normalizeOptionalString(value.seoTitle),
    seoDescription: normalizeOptionalString(value.seoDescription),
  };
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  noStore();

  const rawFile = await fs.readFile(filePath, "utf8");
  return JSON.parse(rawFile) as T;
}

async function writeJsonFile(filePath: string, value: unknown) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function getStudioHomepageContent() {
  const rawContent = await readJsonFile<unknown>(homepageFilePath);
  return parseHomepageContent(rawContent);
}

export async function saveStudioHomepageContent(content: StudioHomepageContent) {
  await writeJsonFile(homepageFilePath, content);
}

export async function getStudioCaseStudies() {
  const rawCaseStudies = await readJsonFile<unknown>(caseStudiesFilePath);
  const caseStudies = expectArray(rawCaseStudies, "studio case studies");

  return caseStudies.map((caseStudy, index) =>
    parseCaseStudySummary(caseStudy, `studio case studies[${index}]`),
  );
}

export async function getStudioCaseStudyById(id: string) {
  const caseStudies = await getStudioCaseStudies();
  return caseStudies.find((caseStudy) => caseStudy.id === id);
}

export async function saveStudioCaseStudy(
  id: string,
  updates: Omit<StudioEditableCaseStudy, "id">,
) {
  const caseStudies = await getStudioCaseStudies();
  const caseStudyIndex = caseStudies.findIndex((caseStudy) => caseStudy.id === id);

  if (caseStudyIndex === -1) {
    throw new Error(`Case study "${id}" was not found.`);
  }

  const currentCaseStudy = caseStudies[caseStudyIndex];
  const nextCaseStudies = [...caseStudies];
  nextCaseStudies[caseStudyIndex] = {
    ...currentCaseStudy,
    ...updates,
  };

  await writeJsonFile(caseStudiesFilePath, nextCaseStudies);
  return nextCaseStudies[caseStudyIndex];
}
