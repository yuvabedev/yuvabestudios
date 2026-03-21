"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  saveCaseStudyContentAction,
  saveHomepageContentAction,
} from "@/app/studio-admin/actions";
import type {
  StudioCaseStudyGalleryRow,
  StudioCaseStudyProofPoint,
  StudioCaseStudySection,
  StudioEditableCaseStudy,
  StudioCaseStudyId,
} from "@/components/studio/studio-case-study-content";
import type {
  StudioHomepageContent,
  StudioHomepageServiceItem,
} from "@/components/studio/studio-homepage-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StudioAdminEditorProps = {
  homepageContent: StudioHomepageContent;
  caseStudies: StudioEditableCaseStudy[];
  initialCaseStudyId?: string;
  initialTab: "homepage" | "case-studies";
  savedState?: string;
};

const formControlClassName =
  "flex h-11 w-full min-w-0 rounded-[var(--ds-radius-md)] border border-[var(--color-border-default)] bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50";

const textareaClassName = `${formControlClassName} min-h-28 h-auto`;
const stickySaveBarClassName =
  "sticky bottom-4 z-20 flex items-center justify-end rounded-[var(--ds-radius-xl)] border border-[var(--color-border-default)] bg-background/95 px-4 py-3 shadow-lg backdrop-blur";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
        {label}
      </span>
      {children}
    </label>
  );
}

function replaceAt<T>(items: T[], index: number, nextItem: T) {
  return items.map((item, itemIndex) => (itemIndex === index ? nextItem : item));
}

function removeAt<T>(items: T[], index: number) {
  return items.filter((_, itemIndex) => itemIndex !== index);
}

function StickySaveBar({
  label,
  previewHref,
}: {
  label: string;
  previewHref: string;
}) {
  return (
    <div className={stickySaveBarClassName}>
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <Link
          href={previewHref}
          target="_blank"
          rel="noreferrer"
          className="text-body-sm text-primary underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          {previewHref}
        </Link>
        <StickySaveButton label={label} />
      </div>
    </div>
  );
}

function StickySaveButton({
  label,
}: {
  label: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" loading={pending} loadingText={`${label}`}>
      {label}
    </Button>
  );
}

function getCaseStudyPreviewHref(caseStudyId: StudioCaseStudyId) {
  return `/case-studies/${caseStudyId}`;
}

function StringListEditor({
  label,
  items,
  onChange,
  addLabel,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
            {label}
          </p>
          <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, ""])}>
            {addLabel}
          </Button>
        </div>
      {items.map((item, index) => (
        <div key={`${label}-${index}`} className="flex gap-3">
          <input
            value={item}
            className={formControlClassName}
            onChange={(event) =>
              onChange(replaceAt(items, index, event.target.value))
            }
          />
          <Button type="button" variant="secondary" size="sm" onClick={() => onChange(removeAt(items, index))}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function ServiceItemsEditor({
  items,
  onChange,
}: {
  items: StudioHomepageServiceItem[];
  onChange: (items: StudioHomepageServiceItem[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Service cards
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange([
              ...items,
              { title: "", shortLabel: "", description: "" },
            ])
          }
        >
          Add service
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`service-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Service {index + 1}</CardTitle>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => onChange(removeAt(items, index))}
            >
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <Field label="Title">
              <input
                className={formControlClassName}
                value={item.title}
                onChange={(event) =>
                  onChange(
                    replaceAt(items, index, {
                      ...item,
                      title: event.target.value,
                    }),
                  )
                }
              />
            </Field>
            <Field label="Short label">
              <input
                className={formControlClassName}
                value={item.shortLabel}
                onChange={(event) =>
                  onChange(
                    replaceAt(items, index, {
                      ...item,
                      shortLabel: event.target.value,
                    }),
                  )
                }
              />
            </Field>
            <Field label="Description">
              <textarea
                className={textareaClassName}
                value={item.description}
                onChange={(event) =>
                  onChange(
                    replaceAt(items, index, {
                      ...item,
                      description: event.target.value,
                    }),
                  )
                }
              />
            </Field>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SectionsEditor({
  items,
  onChange,
}: {
  items: StudioCaseStudySection[];
  onChange: (items: StudioCaseStudySection[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Sections
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, { title: "", body: "" }])}>
          Add section
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`section-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Section {index + 1}</CardTitle>
            <Button type="button" variant="secondary" size="sm" onClick={() => onChange(removeAt(items, index))}>
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <Field label="Title">
              <input
                value={item.title}
                className={formControlClassName}
                onChange={(event) =>
                  onChange(replaceAt(items, index, { ...item, title: event.target.value }))
                }
              />
            </Field>
            <Field label="Body">
              <textarea
                value={item.body}
                className={textareaClassName}
                onChange={(event) =>
                  onChange(replaceAt(items, index, { ...item, body: event.target.value }))
                }
              />
            </Field>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ProofPointsEditor({
  items,
  onChange,
}: {
  items: StudioCaseStudyProofPoint[];
  onChange: (items: StudioCaseStudyProofPoint[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Proof points
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, { title: "", description: "" }])}>
          Add proof point
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`proof-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Proof point {index + 1}</CardTitle>
            <Button type="button" variant="secondary" size="sm" onClick={() => onChange(removeAt(items, index))}>
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <Field label="Title">
              <input
                value={item.title}
                className={formControlClassName}
                onChange={(event) =>
                  onChange(replaceAt(items, index, { ...item, title: event.target.value }))
                }
              />
            </Field>
            <Field label="Description">
              <textarea
                value={item.description}
                className={textareaClassName}
                onChange={(event) =>
                  onChange(replaceAt(items, index, { ...item, description: event.target.value }))
                }
              />
            </Field>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function GalleryRowsEditor({
  items,
  onChange,
}: {
  items: StudioCaseStudyGalleryRow[];
  onChange: (items: StudioCaseStudyGalleryRow[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Gallery rows
        </p>
        <Button type="button" variant="secondary" size="sm" onClick={() => onChange([...items, { title: "", items: [] }])}>
          Add row
        </Button>
      </div>
      {items.map((row, rowIndex) => (
        <Card key={`gallery-row-${rowIndex}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Gallery row {rowIndex + 1}</CardTitle>
            <Button type="button" variant="secondary" size="sm" onClick={() => onChange(removeAt(items, rowIndex))}>
              Remove
            </Button>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <Field label="Row title">
              <input
                value={row.title}
                className={formControlClassName}
                onChange={(event) =>
                  onChange(replaceAt(items, rowIndex, { ...row, title: event.target.value }))
                }
              />
            </Field>
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                  Row items
                </p>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    onChange(
                      replaceAt(items, rowIndex, {
                        ...row,
                        items: [...row.items, { title: "", description: "" }],
                      }),
                    )
                  }
                >
                  Add item
                </Button>
              </div>
              {row.items.map((item, itemIndex) => (
                <Card key={`gallery-item-${rowIndex}-${itemIndex}`}>
                  <CardHeader className="flex flex-row items-center justify-between gap-3">
                    <CardTitle className="text-body-lg">Item {itemIndex + 1}</CardTitle>
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() =>
                        onChange(
                          replaceAt(items, rowIndex, {
                            ...row,
                            items: removeAt(row.items, itemIndex),
                          }),
                        )
                      }
                    >
                      Remove
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Title">
                      <input
                        value={item.title}
                        className={formControlClassName}
                        onChange={(event) =>
                          onChange(
                            replaceAt(items, rowIndex, {
                              ...row,
                              items: replaceAt(row.items, itemIndex, {
                                ...item,
                                title: event.target.value,
                              }),
                            }),
                          )
                        }
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        value={item.description}
                        className={textareaClassName}
                        onChange={(event) =>
                          onChange(
                            replaceAt(items, rowIndex, {
                              ...row,
                              items: replaceAt(row.items, itemIndex, {
                                ...item,
                                description: event.target.value,
                              }),
                            }),
                          )
                        }
                      />
                    </Field>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function StudioAdminEditor({
  homepageContent,
  caseStudies,
  initialCaseStudyId,
  initialTab,
  savedState,
}: StudioAdminEditorProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [homepageDraft, setHomepageDraft] = useState(homepageContent);
  const [caseStudyDrafts, setCaseStudyDrafts] = useState(caseStudies);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState(
    initialCaseStudyId ?? caseStudies[0]?.id ?? "",
  );

  const selectedCaseStudy = useMemo(
    () =>
      caseStudyDrafts.find((caseStudy) => caseStudy.id === selectedCaseStudyId) ??
      caseStudyDrafts[0],
    [caseStudyDrafts, selectedCaseStudyId],
  );

  function updateSelectedCaseStudy(
    updater: (caseStudy: StudioEditableCaseStudy) => StudioEditableCaseStudy,
  ) {
    setCaseStudyDrafts((currentCaseStudies) =>
      currentCaseStudies.map((caseStudy) =>
        caseStudy.id === selectedCaseStudyId ? updater(caseStudy) : caseStudy,
      ),
    );
  }

  return (
    <div className="space-y-6">
      {savedState ? (
        <div className="rounded-[var(--ds-radius-lg)] border border-[color:color-mix(in_srgb,var(--purple-500)_16%,white)] bg-[color:color-mix(in_srgb,var(--purple-500)_6%,white)] px-4 py-3 text-body-sm text-foreground">
          {savedState === "homepage"
            ? "Homepage content saved. Refresh the homepage to review it."
            : "Case study saved. Refresh the homepage or the case-study route to review it."}
        </div>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as "homepage" | "case-studies")
        }
        className="space-y-6"
      >
        <TabsList variant="line">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="case-studies">Case studies</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage">
          <form action={saveHomepageContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(homepageDraft)} readOnly />
            <Card>
              <CardHeader>
                <CardTitle>Homepage content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Hero intro">
                    <input className={formControlClassName} value={homepageDraft.hero.headlineIntro} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, headlineIntro: event.target.value } })} />
                  </Field>
                  <Field label="Hero highlight">
                    <input className={formControlClassName} value={homepageDraft.hero.headlineHighlight} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, headlineHighlight: event.target.value } })} />
                  </Field>
                </div>
                <Field label="Hero line two">
                  <input className={formControlClassName} value={homepageDraft.hero.headlineLineTwo} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, headlineLineTwo: event.target.value } })} />
                </Field>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Hero support prefix">
                    <textarea className={textareaClassName} value={homepageDraft.hero.supportPrefix} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, supportPrefix: event.target.value } })} />
                  </Field>
                  <Field label="Hero support highlight">
                    <textarea className={textareaClassName} value={homepageDraft.hero.supportHighlight} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, supportHighlight: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Hero CTA label">
                    <input className={formControlClassName} value={homepageDraft.hero.ctaLabel} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, ctaLabel: event.target.value } })} />
                  </Field>
                  <Field label="Hero CTA href">
                    <input className={formControlClassName} value={homepageDraft.hero.ctaHref} onChange={(event) => setHomepageDraft({ ...homepageDraft, hero: { ...homepageDraft.hero, ctaHref: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Work eyebrow">
                    <input className={formControlClassName} value={homepageDraft.work.eyebrow} onChange={(event) => setHomepageDraft({ ...homepageDraft, work: { ...homepageDraft.work, eyebrow: event.target.value } })} />
                  </Field>
                  <Field label="Work headline">
                    <input className={formControlClassName} value={homepageDraft.work.headline} onChange={(event) => setHomepageDraft({ ...homepageDraft, work: { ...homepageDraft.work, headline: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  <Field label="Work support prefix">
                    <textarea className={textareaClassName} value={homepageDraft.work.supportPrefix} onChange={(event) => setHomepageDraft({ ...homepageDraft, work: { ...homepageDraft.work, supportPrefix: event.target.value } })} />
                  </Field>
                  <Field label="Work support highlight">
                    <textarea className={textareaClassName} value={homepageDraft.work.supportHighlight} onChange={(event) => setHomepageDraft({ ...homepageDraft, work: { ...homepageDraft.work, supportHighlight: event.target.value } })} />
                  </Field>
                  <Field label="Work support suffix">
                    <textarea className={textareaClassName} value={homepageDraft.work.supportSuffix} onChange={(event) => setHomepageDraft({ ...homepageDraft, work: { ...homepageDraft.work, supportSuffix: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Services eyebrow">
                    <input className={formControlClassName} value={homepageDraft.services.eyebrow} onChange={(event) => setHomepageDraft({ ...homepageDraft, services: { ...homepageDraft.services, eyebrow: event.target.value } })} />
                  </Field>
                  <Field label="Services headline">
                    <input className={formControlClassName} value={homepageDraft.services.headline} onChange={(event) => setHomepageDraft({ ...homepageDraft, services: { ...homepageDraft.services, headline: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                  <Field label="Services support prefix">
                    <textarea className={textareaClassName} value={homepageDraft.services.supportPrefix} onChange={(event) => setHomepageDraft({ ...homepageDraft, services: { ...homepageDraft.services, supportPrefix: event.target.value } })} />
                  </Field>
                  <Field label="Services support highlight">
                    <textarea className={textareaClassName} value={homepageDraft.services.supportHighlight} onChange={(event) => setHomepageDraft({ ...homepageDraft, services: { ...homepageDraft.services, supportHighlight: event.target.value } })} />
                  </Field>
                  <Field label="Services support suffix">
                    <textarea className={textareaClassName} value={homepageDraft.services.supportSuffix} onChange={(event) => setHomepageDraft({ ...homepageDraft, services: { ...homepageDraft.services, supportSuffix: event.target.value } })} />
                  </Field>
                </div>
                <ServiceItemsEditor
                  items={homepageDraft.services.items}
                  onChange={(items) =>
                    setHomepageDraft({
                      ...homepageDraft,
                      services: { ...homepageDraft.services, items },
                    })
                  }
                />
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                      Navigation items
                    </p>
                    <Button type="button" variant="secondary" size="sm" onClick={() => setHomepageDraft({ ...homepageDraft, navigationItems: [...homepageDraft.navigationItems, { label: "", href: "" }] })}>
                      Add nav item
                    </Button>
                  </div>
                  {homepageDraft.navigationItems.map((item, index) => (
                    <Card key={`nav-item-${index}`}>
                      <CardHeader className="flex flex-row items-center justify-between gap-3">
                        <CardTitle className="text-body-lg">Nav item {index + 1}</CardTitle>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setHomepageDraft({ ...homepageDraft, navigationItems: removeAt(homepageDraft.navigationItems, index) })}>
                          Remove
                        </Button>
                      </CardHeader>
                      <CardContent className="grid gap-4 pb-6 lg:grid-cols-2">
                        <Field label="Label">
                          <input className={formControlClassName} value={item.label} onChange={(event) => setHomepageDraft({ ...homepageDraft, navigationItems: replaceAt(homepageDraft.navigationItems, index, { ...item, label: event.target.value }) })} />
                        </Field>
                        <Field label="Href">
                          <input className={formControlClassName} value={item.href} onChange={(event) => setHomepageDraft({ ...homepageDraft, navigationItems: replaceAt(homepageDraft.navigationItems, index, { ...item, href: event.target.value }) })} />
                        </Field>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* The sticky save bar keeps the primary action reachable without forcing long scrolls. */}
            <StickySaveBar
              label="Save homepage content"
              previewHref="/"
            />
          </form>
        </TabsContent>

        <TabsContent value="case-studies">
          {selectedCaseStudy ? (
            <form action={saveCaseStudyContentAction} className="space-y-6">
              <input type="hidden" name="caseStudyId" value={selectedCaseStudy.id} readOnly />
              <input type="hidden" name="payload" value={JSON.stringify(selectedCaseStudy)} readOnly />
              <Card>
                <CardHeader className="space-y-4">
                  <CardTitle>Case-study content</CardTitle>
                  {/* The case-study switcher uses the shared shadcn tabs primitive so selection stays aligned with the system. */}
                  <Tabs value={selectedCaseStudy.id} onValueChange={setSelectedCaseStudyId}>
                    <div className="space-y-2">
                      <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                        Selected case study
                      </p>
                      <TabsList variant="line">
                        {caseStudyDrafts.map((caseStudy) => (
                          <TabsTrigger key={caseStudy.id} value={caseStudy.id}>
                            {caseStudy.title}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </Tabs>
                </CardHeader>
                <CardContent className="space-y-6 pb-6">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="Title">
                      <input className={formControlClassName} value={selectedCaseStudy.title} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, title: event.target.value }))} />
                    </Field>
                    <Field label="Sector">
                      <input className={formControlClassName} value={selectedCaseStudy.sector} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, sector: event.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Homepage summary">
                    <textarea className={textareaClassName} value={selectedCaseStudy.summary} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, summary: event.target.value }))} />
                  </Field>
                  <Field label="Hero mock headline">
                    <input className={formControlClassName} value={selectedCaseStudy.heroMockHeadline ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, heroMockHeadline: event.target.value }))} />
                  </Field>
                  <StringListEditor label="Services" items={selectedCaseStudy.services} addLabel="Add service" onChange={(services) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, services }))} />
                  <Field label="Modal intro">
                    <textarea className={textareaClassName} value={selectedCaseStudy.modalIntro ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalIntro: event.target.value }))} />
                  </Field>
                  <StringListEditor label="Outcomes" items={selectedCaseStudy.modalOutcomes ?? []} addLabel="Add outcome" onChange={(modalOutcomes) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalOutcomes }))} />
                  <SectionsEditor items={selectedCaseStudy.modalSections ?? []} onChange={(modalSections) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalSections }))} />
                  <ProofPointsEditor items={selectedCaseStudy.modalProofPoints ?? []} onChange={(modalProofPoints) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalProofPoints }))} />
                  <GalleryRowsEditor items={selectedCaseStudy.modalGalleryRows ?? []} onChange={(modalGalleryRows) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalGalleryRows }))} />
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-body-lg">Testimonial</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Quote">
                        <textarea className={textareaClassName} value={selectedCaseStudy.modalTestimonial?.quote ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalTestimonial: { ...caseStudy.modalTestimonial, quote: event.target.value, attribution: caseStudy.modalTestimonial?.attribution ?? "" } }))} />
                      </Field>
                      <Field label="Attribution">
                        <input className={formControlClassName} value={selectedCaseStudy.modalTestimonial?.attribution ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, modalTestimonial: { ...caseStudy.modalTestimonial, quote: caseStudy.modalTestimonial?.quote ?? "", attribution: event.target.value } }))} />
                      </Field>
                    </CardContent>
                  </Card>
                  <div className="grid gap-6 lg:grid-cols-2">
                    <Field label="SEO title">
                      <input className={formControlClassName} value={selectedCaseStudy.seoTitle ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, seoTitle: event.target.value }))} />
                    </Field>
                    <Field label="SEO description">
                      <textarea className={textareaClassName} value={selectedCaseStudy.seoDescription ?? ""} onChange={(event) => updateSelectedCaseStudy((caseStudy) => ({ ...caseStudy, seoDescription: event.target.value }))} />
                    </Field>
                  </div>
                </CardContent>
              </Card>
              {/* The sticky save bar mirrors the homepage editor so the action remains visible on long case-study forms. */}
              <StickySaveBar
                label={`Save ${selectedCaseStudy.title}`}
                previewHref={getCaseStudyPreviewHref(selectedCaseStudy.id)}
              />
            </form>
          ) : null}
        </TabsContent>
      </Tabs>
    </div>
  );
}
