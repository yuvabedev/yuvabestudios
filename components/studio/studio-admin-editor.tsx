"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  saveAboutContentAction,
  saveAiNativeEngineeringContentAction,
  saveAiWorkflowsContentAction,
  saveCareersContentAction,
  saveCaseStudyContentAction,
  saveDigitalMarketingContentAction,
  saveHomepageContentAction,
  saveServicesPageContentAction,
  saveUiuxDesignContentAction,
  saveWorkContentAction,
} from "@/app/studio-admin/actions";
import type { BlogPost } from "@/lib/blog";
import type { WorkPageContent } from "@/lib/work-content";
import type { ServicesPageContent } from "@/lib/services-content";
import { BlogAdminTab } from "@/components/studio/studio-blog-admin-tab";
import type {
  CareersBenefitItem,
  CareersPageContent,
  CareersPrincipleItem,
  CareersProcessStepItem,
  CareersTestimonialItem,
} from "@/lib/careers-content";
import type { StudioAboutPageContent } from "@/components/studio/studio-about-content";
import type {
  StudioAiWorkflowsContent,
  StudioAiWorkflowsDisciplineItem,
  StudioAiWorkflowsGuardrailItem,
  StudioAiWorkflowsStageContent,
} from "@/components/studio/studio-ai-workflows-content";
import type {
  StudioCaseStudyGalleryRow,
  StudioCaseStudyProofPoint,
  StudioCaseStudySection,
  StudioEditableCaseStudy,
  StudioCaseStudyId,
} from "@/components/studio/studio-case-study-content";
import type {
  StudioDigitalMarketingCaseStudy,
  StudioDigitalMarketingContent,
  StudioDigitalMarketingServiceItem,
} from "@/components/studio/studio-digital-marketing-content";
import type {
  StudioAiNativeEngineeringCaseStudy,
  StudioAiNativeEngineeringContent,
  StudioAiNativeEngineeringServiceItem,
} from "@/components/studio/studio-ai-native-engineering-content";
import type {
  StudioUiuxDesignCaseStudy,
  StudioUiuxDesignContent,
  StudioUiuxDesignServiceItem,
} from "@/components/studio/studio-uiux-design-content";
import type {
  StudioHomepageContent,
  StudioHomepageServiceItem,
} from "@/components/studio/studio-homepage-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StudioAdminEditorProps = {
  homepageContent: StudioHomepageContent;
  aboutContent: StudioAboutPageContent;
  aiWorkflowsContent: StudioAiWorkflowsContent;
  aiNativeEngineeringContent: StudioAiNativeEngineeringContent;
  digitalMarketingContent: StudioDigitalMarketingContent;
  uiuxDesignContent: StudioUiuxDesignContent;
  caseStudies: StudioEditableCaseStudy[];
  careersContent: CareersPageContent;
  workContent: WorkPageContent;
  servicesPageContent: ServicesPageContent;
  blogPosts: BlogPost[];
  initialCaseStudyId?: string;
  initialTab: "homepage" | "about" | "ai-workflows" | "services" | "services-page" | "case-studies" | "careers" | "work" | "blog";
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

function AboutTitleDescriptionListEditor({
  label,
  items,
  addLabel,
  onChange,
}: {
  label: string;
  items:
    | StudioAboutPageContent["story"]["operatingPrinciples"]
    | StudioAboutPageContent["values"]["values"];
  addLabel: string;
  onChange: (
    items:
      | StudioAboutPageContent["story"]["operatingPrinciples"]
      | StudioAboutPageContent["values"]["values"],
  ) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          {label}
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => onChange([...items, { title: "", description: "" }])}
        >
          {addLabel}
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`${label}-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">{label} {index + 1}</CardTitle>
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
                    replaceAt(items, index, { ...item, title: event.target.value }),
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

function AiWorkflowStagesEditor({
  items,
  onChange,
}: {
  items: StudioAiWorkflowsStageContent[];
  onChange: (items: StudioAiWorkflowsStageContent[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Workflow stages
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange([
              ...items,
              {
                step: "",
                title: "",
                eyebrow: "",
                description: "",
                bullets: [],
                iconKey: "",
                tone: "tintLavender",
              },
            ])
          }
        >
          Add stage
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`ai-workflow-stage-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Stage {index + 1}</CardTitle>
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
            <div className="grid gap-4 lg:grid-cols-3">
              <Field label="Step">
                <input
                  className={formControlClassName}
                  value={item.step}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, step: event.target.value }),
                    )
                  }
                />
              </Field>
              <Field label="Title">
                <input
                  className={formControlClassName}
                  value={item.title}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, title: event.target.value }),
                    )
                  }
                />
              </Field>
              <Field label="Eyebrow">
                <input
                  className={formControlClassName}
                  value={item.eyebrow}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, {
                        ...item,
                        eyebrow: event.target.value,
                      }),
                    )
                  }
                />
              </Field>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Icon key">
                <input
                  className={formControlClassName}
                  value={item.iconKey}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, {
                        ...item,
                        iconKey: event.target.value,
                      }),
                    )
                  }
                />
              </Field>
              <Field label="Tone">
                <input
                  className={formControlClassName}
                  value={item.tone}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, {
                        ...item,
                        tone: event.target.value as StudioAiWorkflowsStageContent["tone"],
                      }),
                    )
                  }
                />
              </Field>
            </div>
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
            <StringListEditor
              label="Bullets"
              items={item.bullets}
              addLabel="Add bullet"
              onChange={(bullets) =>
                onChange(replaceAt(items, index, { ...item, bullets }))
              }
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AiDisciplineItemsEditor({
  items,
  onChange,
}: {
  items: StudioAiWorkflowsDisciplineItem[];
  onChange: (items: StudioAiWorkflowsDisciplineItem[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Discipline cards
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange([
              ...items,
              { title: "", description: "", bullets: [], iconKey: "" },
            ])
          }
        >
          Add discipline
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`ai-discipline-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Discipline {index + 1}</CardTitle>
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
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Title">
                <input
                  className={formControlClassName}
                  value={item.title}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, title: event.target.value }),
                    )
                  }
                />
              </Field>
              <Field label="Icon key">
                <input
                  className={formControlClassName}
                  value={item.iconKey}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, iconKey: event.target.value }),
                    )
                  }
                />
              </Field>
            </div>
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
            <StringListEditor
              label="Bullets"
              items={item.bullets}
              addLabel="Add bullet"
              onChange={(bullets) =>
                onChange(replaceAt(items, index, { ...item, bullets }))
              }
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function AiGuardrailItemsEditor({
  items,
  onChange,
}: {
  items: StudioAiWorkflowsGuardrailItem[];
  onChange: (items: StudioAiWorkflowsGuardrailItem[]) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
          Guardrails
        </p>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() =>
            onChange([...items, { title: "", description: "", iconKey: "" }])
          }
        >
          Add guardrail
        </Button>
      </div>
      {items.map((item, index) => (
        <Card key={`ai-guardrail-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between gap-3">
            <CardTitle className="text-body-lg">Guardrail {index + 1}</CardTitle>
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
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Title">
                <input
                  className={formControlClassName}
                  value={item.title}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, title: event.target.value }),
                    )
                  }
                />
              </Field>
              <Field label="Icon key">
                <input
                  className={formControlClassName}
                  value={item.iconKey}
                  onChange={(event) =>
                    onChange(
                      replaceAt(items, index, { ...item, iconKey: event.target.value }),
                    )
                  }
                />
              </Field>
            </div>
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
  aboutContent,
  aiWorkflowsContent,
  aiNativeEngineeringContent,
  digitalMarketingContent,
  uiuxDesignContent,
  caseStudies,
  careersContent,
  workContent,
  servicesPageContent,
  blogPosts,
  initialCaseStudyId,
  initialTab,
  savedState,
}: StudioAdminEditorProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [servicesSubTab, setServicesSubTab] = useState<"ai-native-engineering" | "uiux-design" | "digital-marketing">("ai-native-engineering");
  const [homepageDraft, setHomepageDraft] = useState(homepageContent);
  const [aboutDraft, setAboutDraft] = useState(aboutContent);
  const [aiWorkflowsDraft, setAiWorkflowsDraft] = useState(aiWorkflowsContent);
  const [aiNativeEngineeringDraft, setAiNativeEngineeringDraft] = useState(aiNativeEngineeringContent);
  const [digitalMarketingDraft, setDigitalMarketingDraft] = useState(digitalMarketingContent);
  const [uiuxDesignDraft, setUiuxDesignDraft] = useState(uiuxDesignContent);
  const [careersDraft, setCareersDraft] = useState(careersContent);
  const [workDraft, setWorkDraft] = useState(workContent);
  const [servicesPageDraft, setServicesPageDraft] = useState(servicesPageContent);
  const [caseStudyDrafts, setCaseStudyDrafts] = useState(caseStudies);
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState(
    initialCaseStudyId ?? caseStudies[0]?.id ?? "",
  );
  const [caseStudiesExpanded, setCaseStudiesExpanded] = useState(false);
  const [visibleTabLimit, setVisibleTabLimit] = useState(5);

  useEffect(() => {
    function updateLimit() {
      const w = window.innerWidth;
      if (w >= 1280) setVisibleTabLimit(10);
      else if (w >= 1024) setVisibleTabLimit(7);
      else if (w >= 768) setVisibleTabLimit(5);
      else setVisibleTabLimit(3);
    }
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    const idx = caseStudyDrafts.findIndex((cs) => cs.id === selectedCaseStudyId);
    if (idx >= visibleTabLimit) setCaseStudiesExpanded(true);
  }, [selectedCaseStudyId, visibleTabLimit, caseStudyDrafts]);

  const visibleCaseStudies = caseStudiesExpanded
    ? caseStudyDrafts
    : caseStudyDrafts.slice(0, visibleTabLimit);
  const hiddenCaseStudyCount = caseStudyDrafts.length - visibleCaseStudies.length;

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
            : savedState === "about"
              ? "About content saved. Refresh the about page to review it."
              : savedState === "ai-workflows"
                ? "AI Workflows content saved. Refresh the AI Workflows page to review it."
                : savedState === "digital-marketing"
                  ? "Digital Marketing content saved. Refresh the digital marketing page to review it."
                  : savedState === "uiux-design"
                    ? "UI/UX Design content saved. Refresh the UI/UX Design page to review it."
                    : savedState === "ai-native-engineering"
                      ? "AI Native Engineering content saved. Refresh the page to review it."
                      : savedState === "careers"
                        ? "Careers content saved. Refresh the careers page to review it."
                        : "Case study saved. Refresh the homepage or the case-study route to review it."}
        </div>
      ) : null}

      <Tabs
        value={activeTab}
        onValueChange={(value) =>
          setActiveTab(value as StudioAdminEditorProps["initialTab"])
        }
        className="space-y-6"
      >
        <TabsList variant="line">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="ai-workflows">AI Workflows</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="services-page">Services page</TabsTrigger>
          <TabsTrigger value="case-studies">Case studies</TabsTrigger>
          <TabsTrigger value="careers">Careers</TabsTrigger>
          <TabsTrigger value="work">Work</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
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

            {/* Mid-page CTA banner (shown between client logos and case studies). */}
            <Card>
              <CardHeader><CardTitle>Mid-page CTA</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <Field label="Eyebrow (optional)">
                  <input className={formControlClassName} value={homepageDraft.afterServicesCta.eyebrow} onChange={(event) => setHomepageDraft({ ...homepageDraft, afterServicesCta: { ...homepageDraft.afterServicesCta, eyebrow: event.target.value } })} />
                </Field>
                <Field label="Heading">
                  <textarea className={textareaClassName} value={homepageDraft.afterServicesCta.title} onChange={(event) => setHomepageDraft({ ...homepageDraft, afterServicesCta: { ...homepageDraft.afterServicesCta, title: event.target.value } })} />
                </Field>
                <Field label="Subheading">
                  <textarea className={textareaClassName} value={homepageDraft.afterServicesCta.description} onChange={(event) => setHomepageDraft({ ...homepageDraft, afterServicesCta: { ...homepageDraft.afterServicesCta, description: event.target.value } })} />
                </Field>
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Button label">
                    <input className={formControlClassName} value={homepageDraft.afterServicesCta.primaryCtaLabel} onChange={(event) => setHomepageDraft({ ...homepageDraft, afterServicesCta: { ...homepageDraft.afterServicesCta, primaryCtaLabel: event.target.value } })} />
                  </Field>
                  <Field label="Button link">
                    <input className={formControlClassName} value={homepageDraft.afterServicesCta.primaryCtaHref} onChange={(event) => setHomepageDraft({ ...homepageDraft, afterServicesCta: { ...homepageDraft.afterServicesCta, primaryCtaHref: event.target.value } })} />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* FAQs (shown at the bottom of the home page). */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>FAQs</CardTitle>
                <Button type="button" variant="secondary" size="sm" onClick={() => setHomepageDraft({ ...homepageDraft, faqs: [...homepageDraft.faqs, { question: "", answer: "" }] })}>
                  Add FAQ
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {homepageDraft.faqs.map((faq, index) => (
                  <Card key={`faq-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
                      <CardTitle className="text-body-lg">FAQ {index + 1}</CardTitle>
                      <Button type="button" variant="secondary" size="sm" onClick={() => setHomepageDraft({ ...homepageDraft, faqs: removeAt(homepageDraft.faqs, index) })}>
                        Remove
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-5">
                      <Field label="Question">
                        <input className={formControlClassName} value={faq.question} onChange={(event) => setHomepageDraft({ ...homepageDraft, faqs: replaceAt(homepageDraft.faqs, index, { ...faq, question: event.target.value }) })} />
                      </Field>
                      <Field label="Answer">
                        <textarea className={textareaClassName} value={faq.answer} onChange={(event) => setHomepageDraft({ ...homepageDraft, faqs: replaceAt(homepageDraft.faqs, index, { ...faq, answer: event.target.value }) })} />
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* The sticky save bar keeps the primary action reachable without forcing long scrolls. */}
            <StickySaveBar
              label="Save homepage content"
              previewHref="/"
            />
          </form>
        </TabsContent>

        <TabsContent value="about">
          <form action={saveAboutContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(aboutDraft)} readOnly />
            <Card>
              <CardHeader>
                <CardTitle>About page content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Hero title">
                    <input className={formControlClassName} value={aboutDraft.hero.title} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, title: event.target.value } })} />
                  </Field>
                  <Field label="Hero highlight">
                    <input className={formControlClassName} value={aboutDraft.hero.highlight} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, highlight: event.target.value } })} />
                  </Field>
                </div>
                <Field label="Hero subheading">
                  <textarea className={textareaClassName} value={aboutDraft.hero.description} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, description: event.target.value } })} />
                </Field>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Primary CTA label">
                    <input className={formControlClassName} value={aboutDraft.hero.primaryCtaLabel} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, primaryCtaLabel: event.target.value } })} />
                  </Field>
                  <Field label="Primary CTA href">
                    <input className={formControlClassName} value={aboutDraft.hero.primaryCtaHref} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, primaryCtaHref: event.target.value } })} />
                  </Field>
                </div>
                <div className="grid gap-6 lg:grid-cols-2">
                  <Field label="Secondary CTA label">
                    <input className={formControlClassName} value={aboutDraft.hero.secondaryCtaLabel} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, secondaryCtaLabel: event.target.value } })} />
                  </Field>
                  <Field label="Secondary CTA href">
                    <input className={formControlClassName} value={aboutDraft.hero.secondaryCtaHref} onChange={(event) => setAboutDraft({ ...aboutDraft, hero: { ...aboutDraft.hero, secondaryCtaHref: event.target.value } })} />
                  </Field>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Stats strip</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    {aboutDraft.stats.items.map((stat, index) => (
                      <div key={`about-stat-${index}`} className="grid gap-4 lg:grid-cols-2">
                        <Field label={`Stat ${index + 1} value`}>
                          <input className={formControlClassName} value={stat.value} onChange={(event) => setAboutDraft({ ...aboutDraft, stats: { ...aboutDraft.stats, items: replaceAt(aboutDraft.stats.items, index, { ...stat, value: event.target.value }) } })} />
                        </Field>
                        <Field label={`Stat ${index + 1} label`}>
                          <input className={formControlClassName} value={stat.label} onChange={(event) => setAboutDraft({ ...aboutDraft, stats: { ...aboutDraft.stats, items: replaceAt(aboutDraft.stats.items, index, { ...stat, label: event.target.value }) } })} />
                        </Field>
                      </div>
                    ))}
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Feature value">
                        <input className={formControlClassName} value={aboutDraft.stats.feature.value} onChange={(event) => setAboutDraft({ ...aboutDraft, stats: { ...aboutDraft.stats, feature: { ...aboutDraft.stats.feature, value: event.target.value } } })} />
                      </Field>
                      <Field label="Feature label">
                        <input className={formControlClassName} value={aboutDraft.stats.feature.label} onChange={(event) => setAboutDraft({ ...aboutDraft, stats: { ...aboutDraft.stats, feature: { ...aboutDraft.stats.feature, label: event.target.value } } })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">What does Yuvabe mean</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aboutDraft.nameMeaning.eyebrow} onChange={(event) => setAboutDraft({ ...aboutDraft, nameMeaning: { ...aboutDraft.nameMeaning, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aboutDraft.nameMeaning.title} onChange={(event) => setAboutDraft({ ...aboutDraft, nameMeaning: { ...aboutDraft.nameMeaning, title: event.target.value } })} />
                      </Field>
                    </div>
                    <StringListEditor
                      label="Paragraphs"
                      items={aboutDraft.nameMeaning.paragraphs}
                      addLabel="Add paragraph"
                      onChange={(paragraphs) => setAboutDraft({ ...aboutDraft, nameMeaning: { ...aboutDraft.nameMeaning, paragraphs } })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Our philosophy</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aboutDraft.philosophy.eyebrow} onChange={(event) => setAboutDraft({ ...aboutDraft, philosophy: { ...aboutDraft.philosophy, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aboutDraft.philosophy.title} onChange={(event) => setAboutDraft({ ...aboutDraft, philosophy: { ...aboutDraft.philosophy, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Intro">
                      <textarea className={textareaClassName} value={aboutDraft.philosophy.intro} onChange={(event) => setAboutDraft({ ...aboutDraft, philosophy: { ...aboutDraft.philosophy, intro: event.target.value } })} />
                    </Field>
                    <AboutTitleDescriptionListEditor
                      label="Principle"
                      items={aboutDraft.philosophy.principles}
                      addLabel="Add principle"
                      onChange={(principles) => setAboutDraft({ ...aboutDraft, philosophy: { ...aboutDraft.philosophy, principles: principles as StudioAboutPageContent["philosophy"]["principles"] } })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">What drives us</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aboutDraft.story.eyebrow} onChange={(event) => setAboutDraft({ ...aboutDraft, story: { ...aboutDraft.story, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aboutDraft.story.title} onChange={(event) => setAboutDraft({ ...aboutDraft, story: { ...aboutDraft.story, title: event.target.value } })} />
                      </Field>
                    </div>
                    <AboutTitleDescriptionListEditor
                      label="Pillar"
                      items={aboutDraft.story.operatingPrinciples}
                      addLabel="Add pillar"
                      onChange={(operatingPrinciples) => setAboutDraft({ ...aboutDraft, story: { ...aboutDraft.story, operatingPrinciples: operatingPrinciples as StudioAboutPageContent["story"]["operatingPrinciples"] } })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Eyebrow">
                      <input className={formControlClassName} value={aboutDraft.testimonials.eyebrow} onChange={(event) => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, eyebrow: event.target.value } })} />
                    </Field>
                    {aboutDraft.testimonials.items.map((item, index) => (
                      <Card key={`about-testimonial-${index}`}>
                        <CardHeader className="flex flex-row items-center justify-between gap-3">
                          <CardTitle className="text-body-lg">Testimonial {index + 1}</CardTitle>
                          <Button type="button" variant="secondary" size="sm" onClick={() => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, items: removeAt(aboutDraft.testimonials.items, index) } })}>
                            Remove
                          </Button>
                        </CardHeader>
                        <CardContent className="space-y-4 pb-6">
                          <Field label="Quote">
                            <textarea className={textareaClassName} value={item.quote} onChange={(event) => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, items: replaceAt(aboutDraft.testimonials.items, index, { ...item, quote: event.target.value }) } })} />
                          </Field>
                          <div className="grid gap-4 lg:grid-cols-2">
                            <Field label="Name">
                              <input className={formControlClassName} value={item.name} onChange={(event) => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, items: replaceAt(aboutDraft.testimonials.items, index, { ...item, name: event.target.value }) } })} />
                            </Field>
                            <Field label="Role">
                              <input className={formControlClassName} value={item.role} onChange={(event) => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, items: replaceAt(aboutDraft.testimonials.items, index, { ...item, role: event.target.value }) } })} />
                            </Field>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button type="button" variant="secondary" size="sm" onClick={() => setAboutDraft({ ...aboutDraft, testimonials: { ...aboutDraft.testimonials, items: [...aboutDraft.testimonials.items, { quote: "", name: "", role: "" }] } })}>
                      Add testimonial
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Final CTA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aboutDraft.cta.eyebrow} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aboutDraft.cta.title} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aboutDraft.cta.description} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, description: event.target.value } })} />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Primary CTA label">
                        <input className={formControlClassName} value={aboutDraft.cta.primaryCtaLabel} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, primaryCtaLabel: event.target.value } })} />
                      </Field>
                      <Field label="Primary CTA href">
                        <input className={formControlClassName} value={aboutDraft.cta.primaryCtaHref} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, primaryCtaHref: event.target.value } })} />
                      </Field>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Secondary CTA label">
                        <input className={formControlClassName} value={aboutDraft.cta.secondaryCtaLabel} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, secondaryCtaLabel: event.target.value } })} />
                      </Field>
                      <Field label="Secondary CTA href">
                        <input className={formControlClassName} value={aboutDraft.cta.secondaryCtaHref} onChange={(event) => setAboutDraft({ ...aboutDraft, cta: { ...aboutDraft.cta, secondaryCtaHref: event.target.value } })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <StickySaveBar
              label="Save about content"
              previewHref="/about"
            />
          </form>
        </TabsContent>

        <TabsContent value="ai-workflows">
          <form action={saveAiWorkflowsContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(aiWorkflowsDraft)} readOnly />
            <Card>
              <CardHeader>
                <CardTitle>AI Workflows content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Hero</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aiWorkflowsDraft.hero.eyebrow} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, hero: { ...aiWorkflowsDraft.hero, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title line one">
                        <input className={formControlClassName} value={aiWorkflowsDraft.hero.titleLineOne} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, hero: { ...aiWorkflowsDraft.hero, titleLineOne: event.target.value } })} />
                      </Field>
                      <Field label="Title line two">
                        <input className={formControlClassName} value={aiWorkflowsDraft.hero.titleLineTwo} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, hero: { ...aiWorkflowsDraft.hero, titleLineTwo: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiWorkflowsDraft.hero.description} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, hero: { ...aiWorkflowsDraft.hero, description: event.target.value } })} />
                    </Field>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Workflow section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aiWorkflowsDraft.workflow.eyebrow} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, workflow: { ...aiWorkflowsDraft.workflow, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aiWorkflowsDraft.workflow.title} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, workflow: { ...aiWorkflowsDraft.workflow, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiWorkflowsDraft.workflow.description} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, workflow: { ...aiWorkflowsDraft.workflow, description: event.target.value } })} />
                    </Field>
                    <AiWorkflowStagesEditor items={aiWorkflowsDraft.workflow.stages} onChange={(stages) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, workflow: { ...aiWorkflowsDraft.workflow, stages } })} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Disciplines section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aiWorkflowsDraft.disciplines.eyebrow} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, disciplines: { ...aiWorkflowsDraft.disciplines, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aiWorkflowsDraft.disciplines.title} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, disciplines: { ...aiWorkflowsDraft.disciplines, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiWorkflowsDraft.disciplines.description} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, disciplines: { ...aiWorkflowsDraft.disciplines, description: event.target.value } })} />
                    </Field>
                    <AiDisciplineItemsEditor items={aiWorkflowsDraft.disciplines.items} onChange={(items) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, disciplines: { ...aiWorkflowsDraft.disciplines, items } })} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Guardrails section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aiWorkflowsDraft.guardrails.eyebrow} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, guardrails: { ...aiWorkflowsDraft.guardrails, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aiWorkflowsDraft.guardrails.title} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, guardrails: { ...aiWorkflowsDraft.guardrails, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiWorkflowsDraft.guardrails.description} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, guardrails: { ...aiWorkflowsDraft.guardrails, description: event.target.value } })} />
                    </Field>
                    <AiGuardrailItemsEditor items={aiWorkflowsDraft.guardrails.items} onChange={(items) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, guardrails: { ...aiWorkflowsDraft.guardrails, items } })} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Final CTA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Eyebrow">
                        <input className={formControlClassName} value={aiWorkflowsDraft.cta.eyebrow} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, cta: { ...aiWorkflowsDraft.cta, eyebrow: event.target.value } })} />
                      </Field>
                      <Field label="Title">
                        <input className={formControlClassName} value={aiWorkflowsDraft.cta.title} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, cta: { ...aiWorkflowsDraft.cta, title: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiWorkflowsDraft.cta.description} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, cta: { ...aiWorkflowsDraft.cta, description: event.target.value } })} />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Primary CTA label">
                        <input className={formControlClassName} value={aiWorkflowsDraft.cta.primaryCtaLabel} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, cta: { ...aiWorkflowsDraft.cta, primaryCtaLabel: event.target.value } })} />
                      </Field>
                      <Field label="Primary CTA href">
                        <input className={formControlClassName} value={aiWorkflowsDraft.cta.primaryCtaHref} onChange={(event) => setAiWorkflowsDraft({ ...aiWorkflowsDraft, cta: { ...aiWorkflowsDraft.cta, primaryCtaHref: event.target.value } })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
            <StickySaveBar label="Save AI Workflows content" previewHref="/ai-workflows" />
          </form>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader className="space-y-4">
              <CardTitle>Services content</CardTitle>
              <Tabs
                value={servicesSubTab}
                onValueChange={(v) =>
                  setServicesSubTab(v as "ai-native-engineering" | "uiux-design" | "digital-marketing")
                }
              >
                <div className="space-y-2">
                  <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                    Selected service
                  </p>
                  <TabsList variant="line">
                    <TabsTrigger value="ai-native-engineering">AI Native Engineering</TabsTrigger>
                    <TabsTrigger value="uiux-design">UI/UX Design</TabsTrigger>
                    <TabsTrigger value="digital-marketing">Digital Marketing</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              {servicesSubTab === "ai-native-engineering" && (
          <form action={saveAiNativeEngineeringContentAction} className="space-y-6">
            <input
              type="hidden"
              name="payload"
              value={JSON.stringify(aiNativeEngineeringDraft)}
              readOnly
            />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Hero</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Title">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.hero.title} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, hero: { ...aiNativeEngineeringDraft.hero, title: event.target.value } })} />
                      </Field>
                      <Field label="Subtitle">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.hero.subtitle} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, hero: { ...aiNativeEngineeringDraft.hero, subtitle: event.target.value } })} />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiNativeEngineeringDraft.hero.description} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, hero: { ...aiNativeEngineeringDraft.hero, description: event.target.value } })} />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="CTA label">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.hero.ctaLabel ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, hero: { ...aiNativeEngineeringDraft.hero, ctaLabel: event.target.value } })} />
                      </Field>
                      <Field label="CTA href">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.hero.ctaHref ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, hero: { ...aiNativeEngineeringDraft.hero, ctaHref: event.target.value } })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Best fit section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Label">
                      <input className={formControlClassName} value={aiNativeEngineeringDraft.bestFit?.label ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, bestFit: { label: event.target.value, description: aiNativeEngineeringDraft.bestFit?.description ?? "" } })} />
                    </Field>
                    <Field label="Description">
                      <textarea className={textareaClassName} value={aiNativeEngineeringDraft.bestFit?.description ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, bestFit: { label: aiNativeEngineeringDraft.bestFit?.label ?? "", description: event.target.value } })} />
                    </Field>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Approach section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Label">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.approach?.label ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { label: event.target.value, headline: aiNativeEngineeringDraft.approach?.headline ?? "", principles: aiNativeEngineeringDraft.approach?.principles ?? [] } })} />
                      </Field>
                      <Field label="Headline">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.approach?.headline ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { label: aiNativeEngineeringDraft.approach?.label ?? "", headline: event.target.value, principles: aiNativeEngineeringDraft.approach?.principles ?? [] } })} />
                      </Field>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Principles</p>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { label: aiNativeEngineeringDraft.approach?.label ?? "", headline: aiNativeEngineeringDraft.approach?.headline ?? "", principles: [...(aiNativeEngineeringDraft.approach?.principles ?? []), { title: "", description: "" }] } })}>Add principle</Button>
                      </div>
                      {(aiNativeEngineeringDraft.approach?.principles ?? []).map((principle, index) => (
                        <Card key={`ane-principle-${index}`}>
                          <CardHeader className="flex flex-row items-center justify-between gap-3">
                            <CardTitle className="text-body-lg">Principle {index + 1}</CardTitle>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { ...aiNativeEngineeringDraft.approach!, principles: removeAt(aiNativeEngineeringDraft.approach!.principles, index) } })}>Remove</Button>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-6">
                            <Field label="Title">
                              <input className={formControlClassName} value={principle.title} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { ...aiNativeEngineeringDraft.approach!, principles: replaceAt(aiNativeEngineeringDraft.approach!.principles, index, { ...principle, title: event.target.value }) } })} />
                            </Field>
                            <Field label="Description">
                              <textarea className={textareaClassName} value={principle.description} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, approach: { ...aiNativeEngineeringDraft.approach!, principles: replaceAt(aiNativeEngineeringDraft.approach!.principles, index, { ...principle, description: event.target.value }) } })} />
                            </Field>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Services section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Section title">
                      <input className={formControlClassName} value={aiNativeEngineeringDraft.servicesTitle} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, servicesTitle: event.target.value })} />
                    </Field>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Service items</p>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, services: [...aiNativeEngineeringDraft.services, { title: "", description: "", iconKey: "cpu" }] })}>Add service</Button>
                      </div>
                      {aiNativeEngineeringDraft.services.map((service: StudioAiNativeEngineeringServiceItem, index: number) => (
                        <Card key={`ane-service-${index}`}>
                          <CardHeader className="flex flex-row items-center justify-between gap-3">
                            <CardTitle className="text-body-lg">Service {index + 1}</CardTitle>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, services: removeAt(aiNativeEngineeringDraft.services, index) })}>Remove</Button>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-6">
                            <Field label="Title">
                              <input className={formControlClassName} value={service.title} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, services: replaceAt(aiNativeEngineeringDraft.services, index, { ...service, title: event.target.value }) })} />
                            </Field>
                            <Field label="Description">
                              <textarea className={textareaClassName} value={service.description} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, services: replaceAt(aiNativeEngineeringDraft.services, index, { ...service, description: event.target.value }) })} />
                            </Field>
                            <Field label="Icon key">
                              <select className={formControlClassName} value={service.iconKey} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, services: replaceAt(aiNativeEngineeringDraft.services, index, { ...service, iconKey: event.target.value as StudioAiNativeEngineeringServiceItem["iconKey"] }) })}>
                                <option value="cpu">cpu</option>
                                <option value="database">database</option>
                                <option value="bot">bot</option>
                                <option value="cloud">cloud</option>
                              </select>
                            </Field>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Case studies section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Section title">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.caseStudiesTitle} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudiesTitle: event.target.value })} />
                      </Field>
                    </div>
                    <Field label="Section description">
                      <textarea className={textareaClassName} value={aiNativeEngineeringDraft.caseStudiesDescription} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudiesDescription: event.target.value })} />
                    </Field>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">Case study cards</p>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: [...aiNativeEngineeringDraft.caseStudies, { slug: "", title: "", description: "", category: "", ctaLabel: "View Case Study" }] })}>Add case study</Button>
                      </div>
                      {aiNativeEngineeringDraft.caseStudies.map((cs: StudioAiNativeEngineeringCaseStudy, index: number) => (
                        <Card key={`ane-cs-${index}`}>
                          <CardHeader className="flex flex-row items-center justify-between gap-3">
                            <CardTitle className="text-body-lg">{cs.title || `Case Study ${index + 1}`}</CardTitle>
                            <Button type="button" variant="secondary" size="sm" onClick={() => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: removeAt(aiNativeEngineeringDraft.caseStudies, index) })}>Remove</Button>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-6">
                            <div className="grid gap-4 lg:grid-cols-2">
                              <Field label="Slug">
                                <input className={formControlClassName} value={cs.slug} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, slug: event.target.value }) })} />
                              </Field>
                              <Field label="Title">
                                <input className={formControlClassName} value={cs.title} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, title: event.target.value }) })} />
                              </Field>
                            </div>
                            <Field label="Description">
                              <textarea className={textareaClassName} value={cs.description} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, description: event.target.value }) })} />
                            </Field>
                            <div className="grid gap-4 lg:grid-cols-2">
                              <Field label="Category">
                                <input className={formControlClassName} value={cs.category} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, category: event.target.value }) })} />
                              </Field>
                              <Field label="CTA label">
                                <input className={formControlClassName} value={cs.ctaLabel} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, ctaLabel: event.target.value }) })} />
                              </Field>
                            </div>
                            <Field label="Thumbnail src">
                              <input className={formControlClassName} value={cs.thumbnailSrc ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, caseStudies: replaceAt(aiNativeEngineeringDraft.caseStudies, index, { ...cs, thumbnailSrc: event.target.value }) })} />
                            </Field>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Page testimonial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Label">
                      <input className={formControlClassName} value={aiNativeEngineeringDraft.pageTestimonial?.label ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, pageTestimonial: { label: event.target.value, quote: aiNativeEngineeringDraft.pageTestimonial?.quote ?? "", name: aiNativeEngineeringDraft.pageTestimonial?.name ?? "", attribution: aiNativeEngineeringDraft.pageTestimonial?.attribution ?? "" } })} />
                    </Field>
                    <Field label="Quote">
                      <textarea className={textareaClassName} value={aiNativeEngineeringDraft.pageTestimonial?.quote ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, pageTestimonial: { label: aiNativeEngineeringDraft.pageTestimonial?.label ?? "", quote: event.target.value, name: aiNativeEngineeringDraft.pageTestimonial?.name ?? "", attribution: aiNativeEngineeringDraft.pageTestimonial?.attribution ?? "" } })} />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Name">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.pageTestimonial?.name ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, pageTestimonial: { label: aiNativeEngineeringDraft.pageTestimonial?.label ?? "", quote: aiNativeEngineeringDraft.pageTestimonial?.quote ?? "", name: event.target.value, attribution: aiNativeEngineeringDraft.pageTestimonial?.attribution ?? "" } })} />
                      </Field>
                      <Field label="Attribution">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.pageTestimonial?.attribution ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, pageTestimonial: { label: aiNativeEngineeringDraft.pageTestimonial?.label ?? "", quote: aiNativeEngineeringDraft.pageTestimonial?.quote ?? "", name: aiNativeEngineeringDraft.pageTestimonial?.name ?? "", attribution: event.target.value } })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Secondary CTA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Label">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.secondaryCtaLabel ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, secondaryCtaLabel: event.target.value })} />
                      </Field>
                      <Field label="Href">
                        <input className={formControlClassName} value={aiNativeEngineeringDraft.secondaryCtaHref ?? ""} onChange={(event) => setAiNativeEngineeringDraft({ ...aiNativeEngineeringDraft, secondaryCtaHref: event.target.value })} />
                      </Field>
                    </div>
                  </CardContent>
                </Card>
            <StickySaveBar label="Save AI Native Engineering" previewHref="/ai-native-engineering" />
          </form>
              )}
              {servicesSubTab === "digital-marketing" && (
          <form action={saveDigitalMarketingContentAction} className="space-y-6">
            <input
              type="hidden"
              name="payload"
              value={JSON.stringify(digitalMarketingDraft)}
              readOnly
            />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Hero</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Title">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.hero.title}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              hero: { ...digitalMarketingDraft.hero, title: event.target.value },
                            })
                          }
                        />
                      </Field>
                      <Field label="Subtitle">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.hero.subtitle}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              hero: { ...digitalMarketingDraft.hero, subtitle: event.target.value },
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="Description">
                      <textarea
                        className={textareaClassName}
                        value={digitalMarketingDraft.hero.description}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            hero: {
                              ...digitalMarketingDraft.hero,
                              description: event.target.value,
                            },
                          })
                        }
                      />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="CTA label">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.hero.ctaLabel ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              hero: {
                                ...digitalMarketingDraft.hero,
                                ctaLabel: event.target.value,
                              },
                            })
                          }
                        />
                      </Field>
                      <Field label="CTA href">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.hero.ctaHref ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              hero: {
                                ...digitalMarketingDraft.hero,
                                ctaHref: event.target.value,
                              },
                            })
                          }
                        />
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Best fit section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Label">
                      <input
                        className={formControlClassName}
                        value={digitalMarketingDraft.bestFit?.label ?? ""}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            bestFit: {
                              label: event.target.value,
                              description: digitalMarketingDraft.bestFit?.description ?? "",
                            },
                          })
                        }
                      />
                    </Field>
                    <Field label="Description">
                      <textarea
                        className={textareaClassName}
                        value={digitalMarketingDraft.bestFit?.description ?? ""}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            bestFit: {
                              label: digitalMarketingDraft.bestFit?.label ?? "",
                              description: event.target.value,
                            },
                          })
                        }
                      />
                    </Field>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Approach section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Label">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.approach?.label ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              approach: {
                                label: event.target.value,
                                headline: digitalMarketingDraft.approach?.headline ?? "",
                                principles: digitalMarketingDraft.approach?.principles ?? [],
                              },
                            })
                          }
                        />
                      </Field>
                      <Field label="Headline">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.approach?.headline ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              approach: {
                                label: digitalMarketingDraft.approach?.label ?? "",
                                headline: event.target.value,
                                principles: digitalMarketingDraft.approach?.principles ?? [],
                              },
                            })
                          }
                        />
                      </Field>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                          Principles
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              approach: {
                                label: digitalMarketingDraft.approach?.label ?? "",
                                headline: digitalMarketingDraft.approach?.headline ?? "",
                                principles: [
                                  ...(digitalMarketingDraft.approach?.principles ?? []),
                                  { title: "", description: "" },
                                ],
                              },
                            })
                          }
                        >
                          Add principle
                        </Button>
                      </div>
                      {(digitalMarketingDraft.approach?.principles ?? []).map((principle, index) => (
                        <Card key={`dm-principle-${index}`}>
                          <CardHeader className="flex flex-row items-center justify-between gap-3">
                            <CardTitle className="text-body-lg">Principle {index + 1}</CardTitle>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setDigitalMarketingDraft({
                                  ...digitalMarketingDraft,
                                  approach: {
                                    ...digitalMarketingDraft.approach!,
                                    principles: removeAt(digitalMarketingDraft.approach!.principles, index),
                                  },
                                })
                              }
                            >
                              Remove
                            </Button>
                          </CardHeader>
                          <CardContent className="space-y-4 pb-6">
                            <Field label="Title">
                              <input
                                className={formControlClassName}
                                value={principle.title}
                                onChange={(event) =>
                                  setDigitalMarketingDraft({
                                    ...digitalMarketingDraft,
                                    approach: {
                                      ...digitalMarketingDraft.approach!,
                                      principles: replaceAt(digitalMarketingDraft.approach!.principles, index, {
                                        ...principle,
                                        title: event.target.value,
                                      }),
                                    },
                                  })
                                }
                              />
                            </Field>
                            <Field label="Description">
                              <textarea
                                className={textareaClassName}
                                value={principle.description}
                                onChange={(event) =>
                                  setDigitalMarketingDraft({
                                    ...digitalMarketingDraft,
                                    approach: {
                                      ...digitalMarketingDraft.approach!,
                                      principles: replaceAt(digitalMarketingDraft.approach!.principles, index, {
                                        ...principle,
                                        description: event.target.value,
                                      }),
                                    },
                                  })
                                }
                              />
                            </Field>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Services section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Section title">
                      <input
                        className={formControlClassName}
                        value={digitalMarketingDraft.servicesTitle}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            servicesTitle: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                          Service items
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              services: [
                                ...digitalMarketingDraft.services,
                                { title: "", description: "", iconKey: "megaphone" },
                              ],
                            })
                          }
                        >
                          Add service
                        </Button>
                      </div>
                      {digitalMarketingDraft.services.map(
                        (service: StudioDigitalMarketingServiceItem, index: number) => (
                          <Card key={`dm-service-${index}`}>
                            <CardHeader className="flex flex-row items-center justify-between gap-3">
                              <CardTitle className="text-body-lg">
                                Service {index + 1}
                              </CardTitle>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                  setDigitalMarketingDraft({
                                    ...digitalMarketingDraft,
                                    services: removeAt(digitalMarketingDraft.services, index),
                                  })
                                }
                              >
                                Remove
                              </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pb-6">
                              <Field label="Title">
                                <input
                                  className={formControlClassName}
                                  value={service.title}
                                  onChange={(event) =>
                                    setDigitalMarketingDraft({
                                      ...digitalMarketingDraft,
                                      services: replaceAt(digitalMarketingDraft.services, index, {
                                        ...service,
                                        title: event.target.value,
                                      }),
                                    })
                                  }
                                />
                              </Field>
                              <Field label="Description">
                                <textarea
                                  className={textareaClassName}
                                  value={service.description}
                                  onChange={(event) =>
                                    setDigitalMarketingDraft({
                                      ...digitalMarketingDraft,
                                      services: replaceAt(digitalMarketingDraft.services, index, {
                                        ...service,
                                        description: event.target.value,
                                      }),
                                    })
                                  }
                                />
                              </Field>
                              <Field label="Icon key">
                                <select
                                  className={formControlClassName}
                                  value={service.iconKey}
                                  onChange={(event) =>
                                    setDigitalMarketingDraft({
                                      ...digitalMarketingDraft,
                                      services: replaceAt(digitalMarketingDraft.services, index, {
                                        ...service,
                                        iconKey: event.target
                                          .value as StudioDigitalMarketingServiceItem["iconKey"],
                                      }),
                                    })
                                  }
                                >
                                  <option value="megaphone">megaphone</option>
                                  <option value="layout">layout</option>
                                  <option value="penTool">penTool</option>
                                  <option value="lineChart">lineChart</option>
                                </select>
                              </Field>
                            </CardContent>
                          </Card>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Case studies section</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Section title">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.caseStudiesTitle}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              caseStudiesTitle: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                    <Field label="Section description">
                      <textarea
                        className={textareaClassName}
                        value={digitalMarketingDraft.caseStudiesDescription}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            caseStudiesDescription: event.target.value,
                          })
                        }
                      />
                    </Field>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                          Case study cards
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              caseStudies: [
                                ...digitalMarketingDraft.caseStudies,
                                {
                                  slug: "",
                                  title: "",
                                  description: "",
                                  category: "",
                                  ctaLabel: "View Case Study",
                                },
                              ],
                            })
                          }
                        >
                          Add case study
                        </Button>
                      </div>
                      {digitalMarketingDraft.caseStudies.map(
                        (cs: StudioDigitalMarketingCaseStudy, index: number) => (
                          <Card key={`dm-cs-${index}`}>
                            <CardHeader className="flex flex-row items-center justify-between gap-3">
                              <CardTitle className="text-body-lg">
                                {cs.title || `Case Study ${index + 1}`}
                              </CardTitle>
                              <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={() =>
                                  setDigitalMarketingDraft({
                                    ...digitalMarketingDraft,
                                    caseStudies: removeAt(
                                      digitalMarketingDraft.caseStudies,
                                      index,
                                    ),
                                  })
                                }
                              >
                                Remove
                              </Button>
                            </CardHeader>
                            <CardContent className="space-y-4 pb-6">
                              <div className="grid gap-4 lg:grid-cols-2">
                                <Field label="Slug">
                                  <input
                                    className={formControlClassName}
                                    value={cs.slug}
                                    onChange={(event) =>
                                      setDigitalMarketingDraft({
                                        ...digitalMarketingDraft,
                                        caseStudies: replaceAt(
                                          digitalMarketingDraft.caseStudies,
                                          index,
                                          { ...cs, slug: event.target.value },
                                        ),
                                      })
                                    }
                                  />
                                </Field>
                                <Field label="Title">
                                  <input
                                    className={formControlClassName}
                                    value={cs.title}
                                    onChange={(event) =>
                                      setDigitalMarketingDraft({
                                        ...digitalMarketingDraft,
                                        caseStudies: replaceAt(
                                          digitalMarketingDraft.caseStudies,
                                          index,
                                          { ...cs, title: event.target.value },
                                        ),
                                      })
                                    }
                                  />
                                </Field>
                              </div>
                              <Field label="Description">
                                <textarea
                                  className={textareaClassName}
                                  value={cs.description}
                                  onChange={(event) =>
                                    setDigitalMarketingDraft({
                                      ...digitalMarketingDraft,
                                      caseStudies: replaceAt(
                                        digitalMarketingDraft.caseStudies,
                                        index,
                                        { ...cs, description: event.target.value },
                                      ),
                                    })
                                  }
                                />
                              </Field>
                              <div className="grid gap-4 lg:grid-cols-2">
                                <Field label="Category">
                                  <input
                                    className={formControlClassName}
                                    value={cs.category}
                                    onChange={(event) =>
                                      setDigitalMarketingDraft({
                                        ...digitalMarketingDraft,
                                        caseStudies: replaceAt(
                                          digitalMarketingDraft.caseStudies,
                                          index,
                                          { ...cs, category: event.target.value },
                                        ),
                                      })
                                    }
                                  />
                                </Field>
                                <Field label="CTA label">
                                  <input
                                    className={formControlClassName}
                                    value={cs.ctaLabel}
                                    onChange={(event) =>
                                      setDigitalMarketingDraft({
                                        ...digitalMarketingDraft,
                                        caseStudies: replaceAt(
                                          digitalMarketingDraft.caseStudies,
                                          index,
                                          { ...cs, ctaLabel: event.target.value },
                                        ),
                                      })
                                    }
                                  />
                                </Field>
                              </div>
                              <Field label="Thumbnail src">
                                <input
                                  className={formControlClassName}
                                  value={cs.thumbnailSrc ?? ""}
                                  onChange={(event) =>
                                    setDigitalMarketingDraft({
                                      ...digitalMarketingDraft,
                                      caseStudies: replaceAt(
                                        digitalMarketingDraft.caseStudies,
                                        index,
                                        { ...cs, thumbnailSrc: event.target.value },
                                      ),
                                    })
                                  }
                                />
                              </Field>
                            </CardContent>
                          </Card>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Page testimonial</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <Field label="Label">
                      <input
                        className={formControlClassName}
                        value={digitalMarketingDraft.pageTestimonial?.label ?? ""}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            pageTestimonial: {
                              label: event.target.value,
                              quote: digitalMarketingDraft.pageTestimonial?.quote ?? "",
                              name: digitalMarketingDraft.pageTestimonial?.name ?? "",
                              attribution: digitalMarketingDraft.pageTestimonial?.attribution ?? "",
                            },
                          })
                        }
                      />
                    </Field>
                    <Field label="Quote">
                      <textarea
                        className={textareaClassName}
                        value={digitalMarketingDraft.pageTestimonial?.quote ?? ""}
                        onChange={(event) =>
                          setDigitalMarketingDraft({
                            ...digitalMarketingDraft,
                            pageTestimonial: {
                              label: digitalMarketingDraft.pageTestimonial?.label ?? "",
                              quote: event.target.value,
                              name: digitalMarketingDraft.pageTestimonial?.name ?? "",
                              attribution: digitalMarketingDraft.pageTestimonial?.attribution ?? "",
                            },
                          })
                        }
                      />
                    </Field>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Name">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.pageTestimonial?.name ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              pageTestimonial: {
                                label: digitalMarketingDraft.pageTestimonial?.label ?? "",
                                quote: digitalMarketingDraft.pageTestimonial?.quote ?? "",
                                name: event.target.value,
                                attribution: digitalMarketingDraft.pageTestimonial?.attribution ?? "",
                              },
                            })
                          }
                        />
                      </Field>
                      <Field label="Attribution">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.pageTestimonial?.attribution ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              pageTestimonial: {
                                label: digitalMarketingDraft.pageTestimonial?.label ?? "",
                                quote: digitalMarketingDraft.pageTestimonial?.quote ?? "",
                                name: digitalMarketingDraft.pageTestimonial?.name ?? "",
                                attribution: event.target.value,
                              },
                            })
                          }
                        />
                      </Field>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-body-lg">Secondary CTA</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-6">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <Field label="Label">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.secondaryCtaLabel ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              secondaryCtaLabel: event.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="Href">
                        <input
                          className={formControlClassName}
                          value={digitalMarketingDraft.secondaryCtaHref ?? ""}
                          onChange={(event) =>
                            setDigitalMarketingDraft({
                              ...digitalMarketingDraft,
                              secondaryCtaHref: event.target.value,
                            })
                          }
                        />
                      </Field>
                    </div>
                  </CardContent>
                </Card>
            <StickySaveBar label="Save Digital Marketing" previewHref="/digital-marketing" />
          </form>
              )}
              {servicesSubTab === "uiux-design" && (
              <form action={saveUiuxDesignContentAction} className="space-y-6">
                <input
                  type="hidden"
                  name="payload"
                  value={JSON.stringify(uiuxDesignDraft)}
                  readOnly
                />
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Hero</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Title">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.hero.title}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  hero: { ...uiuxDesignDraft.hero, title: event.target.value },
                                })
                              }
                            />
                          </Field>
                          <Field label="Subtitle">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.hero.subtitle}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  hero: { ...uiuxDesignDraft.hero, subtitle: event.target.value },
                                })
                              }
                            />
                          </Field>
                        </div>
                        <Field label="Description">
                          <textarea
                            className={textareaClassName}
                            value={uiuxDesignDraft.hero.description}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                hero: { ...uiuxDesignDraft.hero, description: event.target.value },
                              })
                            }
                          />
                        </Field>
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="CTA label">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.hero.ctaLabel ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  hero: { ...uiuxDesignDraft.hero, ctaLabel: event.target.value },
                                })
                              }
                            />
                          </Field>
                          <Field label="CTA href">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.hero.ctaHref ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  hero: { ...uiuxDesignDraft.hero, ctaHref: event.target.value },
                                })
                              }
                            />
                          </Field>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Best fit section</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <Field label="Label">
                          <input
                            className={formControlClassName}
                            value={uiuxDesignDraft.bestFit?.label ?? ""}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                bestFit: {
                                  label: event.target.value,
                                  description: uiuxDesignDraft.bestFit?.description ?? "",
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Description">
                          <textarea
                            className={textareaClassName}
                            value={uiuxDesignDraft.bestFit?.description ?? ""}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                bestFit: {
                                  label: uiuxDesignDraft.bestFit?.label ?? "",
                                  description: event.target.value,
                                },
                              })
                            }
                          />
                        </Field>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Approach section</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Label">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.approach?.label ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  approach: {
                                    label: event.target.value,
                                    headline: uiuxDesignDraft.approach?.headline ?? "",
                                    principles: uiuxDesignDraft.approach?.principles ?? [],
                                  },
                                })
                              }
                            />
                          </Field>
                          <Field label="Headline">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.approach?.headline ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  approach: {
                                    label: uiuxDesignDraft.approach?.label ?? "",
                                    headline: event.target.value,
                                    principles: uiuxDesignDraft.approach?.principles ?? [],
                                  },
                                })
                              }
                            />
                          </Field>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                              Principles
                            </p>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  approach: {
                                    label: uiuxDesignDraft.approach?.label ?? "",
                                    headline: uiuxDesignDraft.approach?.headline ?? "",
                                    principles: [
                                      ...(uiuxDesignDraft.approach?.principles ?? []),
                                      { title: "", description: "" },
                                    ],
                                  },
                                })
                              }
                            >
                              Add principle
                            </Button>
                          </div>
                          {(uiuxDesignDraft.approach?.principles ?? []).map((principle, index) => (
                            <Card key={`uiux-principle-${index}`}>
                              <CardHeader className="flex flex-row items-center justify-between gap-3">
                                <CardTitle className="text-body-lg">Principle {index + 1}</CardTitle>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="sm"
                                  onClick={() =>
                                    setUiuxDesignDraft({
                                      ...uiuxDesignDraft,
                                      approach: {
                                        ...uiuxDesignDraft.approach!,
                                        principles: removeAt(uiuxDesignDraft.approach!.principles, index),
                                      },
                                    })
                                  }
                                >
                                  Remove
                                </Button>
                              </CardHeader>
                              <CardContent className="space-y-4 pb-6">
                                <Field label="Title">
                                  <input
                                    className={formControlClassName}
                                    value={principle.title}
                                    onChange={(event) =>
                                      setUiuxDesignDraft({
                                        ...uiuxDesignDraft,
                                        approach: {
                                          ...uiuxDesignDraft.approach!,
                                          principles: replaceAt(uiuxDesignDraft.approach!.principles, index, {
                                            ...principle,
                                            title: event.target.value,
                                          }),
                                        },
                                      })
                                    }
                                  />
                                </Field>
                                <Field label="Description">
                                  <textarea
                                    className={textareaClassName}
                                    value={principle.description}
                                    onChange={(event) =>
                                      setUiuxDesignDraft({
                                        ...uiuxDesignDraft,
                                        approach: {
                                          ...uiuxDesignDraft.approach!,
                                          principles: replaceAt(uiuxDesignDraft.approach!.principles, index, {
                                            ...principle,
                                            description: event.target.value,
                                          }),
                                        },
                                      })
                                    }
                                  />
                                </Field>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Services section</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <Field label="Section title">
                          <input
                            className={formControlClassName}
                            value={uiuxDesignDraft.servicesTitle}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                servicesTitle: event.target.value,
                              })
                            }
                          />
                        </Field>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                              Service items
                            </p>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  services: [
                                    ...uiuxDesignDraft.services,
                                    { title: "", description: "", iconKey: "palette" },
                                  ],
                                })
                              }
                            >
                              Add service
                            </Button>
                          </div>
                          {uiuxDesignDraft.services.map(
                            (service: StudioUiuxDesignServiceItem, index: number) => (
                              <Card key={`uiux-service-${index}`}>
                                <CardHeader className="flex flex-row items-center justify-between gap-3">
                                  <CardTitle className="text-body-lg">
                                    Service {index + 1}
                                  </CardTitle>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() =>
                                      setUiuxDesignDraft({
                                        ...uiuxDesignDraft,
                                        services: removeAt(uiuxDesignDraft.services, index),
                                      })
                                    }
                                  >
                                    Remove
                                  </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 pb-6">
                                  <Field label="Title">
                                    <input
                                      className={formControlClassName}
                                      value={service.title}
                                      onChange={(event) =>
                                        setUiuxDesignDraft({
                                          ...uiuxDesignDraft,
                                          services: replaceAt(uiuxDesignDraft.services, index, {
                                            ...service,
                                            title: event.target.value,
                                          }),
                                        })
                                      }
                                    />
                                  </Field>
                                  <Field label="Description">
                                    <textarea
                                      className={textareaClassName}
                                      value={service.description}
                                      onChange={(event) =>
                                        setUiuxDesignDraft({
                                          ...uiuxDesignDraft,
                                          services: replaceAt(uiuxDesignDraft.services, index, {
                                            ...service,
                                            description: event.target.value,
                                          }),
                                        })
                                      }
                                    />
                                  </Field>
                                  <Field label="Icon key">
                                    <select
                                      className={formControlClassName}
                                      value={service.iconKey}
                                      onChange={(event) =>
                                        setUiuxDesignDraft({
                                          ...uiuxDesignDraft,
                                          services: replaceAt(uiuxDesignDraft.services, index, {
                                            ...service,
                                            iconKey: event.target.value as StudioUiuxDesignServiceItem["iconKey"],
                                          }),
                                        })
                                      }
                                    >
                                      <option value="palette">palette</option>
                                      <option value="layout">layout</option>
                                      <option value="smartphone">smartphone</option>
                                      <option value="layoutDashboard">layoutDashboard</option>
                                    </select>
                                  </Field>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Case studies section</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Section title">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.caseStudiesTitle}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  caseStudiesTitle: event.target.value,
                                })
                              }
                            />
                          </Field>
                        </div>
                        <Field label="Section description">
                          <textarea
                            className={textareaClassName}
                            value={uiuxDesignDraft.caseStudiesDescription}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                caseStudiesDescription: event.target.value,
                              })
                            }
                          />
                        </Field>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                              Case study cards
                            </p>
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  caseStudies: [
                                    ...uiuxDesignDraft.caseStudies,
                                    { slug: "", title: "", description: "", category: "", ctaLabel: "View Case Study" },
                                  ],
                                })
                              }
                            >
                              Add case study
                            </Button>
                          </div>
                          {uiuxDesignDraft.caseStudies.map(
                            (cs: StudioUiuxDesignCaseStudy, index: number) => (
                              <Card key={`uiux-cs-${index}`}>
                                <CardHeader className="flex flex-row items-center justify-between gap-3">
                                  <CardTitle className="text-body-lg">
                                    {cs.title || `Case Study ${index + 1}`}
                                  </CardTitle>
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    onClick={() =>
                                      setUiuxDesignDraft({
                                        ...uiuxDesignDraft,
                                        caseStudies: removeAt(uiuxDesignDraft.caseStudies, index),
                                      })
                                    }
                                  >
                                    Remove
                                  </Button>
                                </CardHeader>
                                <CardContent className="space-y-4 pb-6">
                                  <div className="grid gap-4 lg:grid-cols-2">
                                    <Field label="Slug">
                                      <input
                                        className={formControlClassName}
                                        value={cs.slug}
                                        onChange={(event) =>
                                          setUiuxDesignDraft({
                                            ...uiuxDesignDraft,
                                            caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                              ...cs,
                                              slug: event.target.value,
                                            }),
                                          })
                                        }
                                      />
                                    </Field>
                                    <Field label="Title">
                                      <input
                                        className={formControlClassName}
                                        value={cs.title}
                                        onChange={(event) =>
                                          setUiuxDesignDraft({
                                            ...uiuxDesignDraft,
                                            caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                              ...cs,
                                              title: event.target.value,
                                            }),
                                          })
                                        }
                                      />
                                    </Field>
                                  </div>
                                  <Field label="Description">
                                    <textarea
                                      className={textareaClassName}
                                      value={cs.description}
                                      onChange={(event) =>
                                        setUiuxDesignDraft({
                                          ...uiuxDesignDraft,
                                          caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                            ...cs,
                                            description: event.target.value,
                                          }),
                                        })
                                      }
                                    />
                                  </Field>
                                  <div className="grid gap-4 lg:grid-cols-2">
                                    <Field label="Category">
                                      <input
                                        className={formControlClassName}
                                        value={cs.category}
                                        onChange={(event) =>
                                          setUiuxDesignDraft({
                                            ...uiuxDesignDraft,
                                            caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                              ...cs,
                                              category: event.target.value,
                                            }),
                                          })
                                        }
                                      />
                                    </Field>
                                    <Field label="CTA label">
                                      <input
                                        className={formControlClassName}
                                        value={cs.ctaLabel}
                                        onChange={(event) =>
                                          setUiuxDesignDraft({
                                            ...uiuxDesignDraft,
                                            caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                              ...cs,
                                              ctaLabel: event.target.value,
                                            }),
                                          })
                                        }
                                      />
                                    </Field>
                                  </div>
                                  <Field label="Thumbnail src">
                                    <input
                                      className={formControlClassName}
                                      value={cs.thumbnailSrc ?? ""}
                                      onChange={(event) =>
                                        setUiuxDesignDraft({
                                          ...uiuxDesignDraft,
                                          caseStudies: replaceAt(uiuxDesignDraft.caseStudies, index, {
                                            ...cs,
                                            thumbnailSrc: event.target.value,
                                          }),
                                        })
                                      }
                                    />
                                  </Field>
                                </CardContent>
                              </Card>
                            ),
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Page testimonial</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <Field label="Label">
                          <input
                            className={formControlClassName}
                            value={uiuxDesignDraft.pageTestimonial?.label ?? ""}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                pageTestimonial: {
                                  label: event.target.value,
                                  quote: uiuxDesignDraft.pageTestimonial?.quote ?? "",
                                  name: uiuxDesignDraft.pageTestimonial?.name ?? "",
                                  attribution: uiuxDesignDraft.pageTestimonial?.attribution ?? "",
                                },
                              })
                            }
                          />
                        </Field>
                        <Field label="Quote">
                          <textarea
                            className={textareaClassName}
                            value={uiuxDesignDraft.pageTestimonial?.quote ?? ""}
                            onChange={(event) =>
                              setUiuxDesignDraft({
                                ...uiuxDesignDraft,
                                pageTestimonial: {
                                  label: uiuxDesignDraft.pageTestimonial?.label ?? "",
                                  quote: event.target.value,
                                  name: uiuxDesignDraft.pageTestimonial?.name ?? "",
                                  attribution: uiuxDesignDraft.pageTestimonial?.attribution ?? "",
                                },
                              })
                            }
                          />
                        </Field>
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Name">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.pageTestimonial?.name ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  pageTestimonial: {
                                    label: uiuxDesignDraft.pageTestimonial?.label ?? "",
                                    quote: uiuxDesignDraft.pageTestimonial?.quote ?? "",
                                    name: event.target.value,
                                    attribution: uiuxDesignDraft.pageTestimonial?.attribution ?? "",
                                  },
                                })
                              }
                            />
                          </Field>
                          <Field label="Attribution">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.pageTestimonial?.attribution ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  pageTestimonial: {
                                    label: uiuxDesignDraft.pageTestimonial?.label ?? "",
                                    quote: uiuxDesignDraft.pageTestimonial?.quote ?? "",
                                    name: uiuxDesignDraft.pageTestimonial?.name ?? "",
                                    attribution: event.target.value,
                                  },
                                })
                              }
                            />
                          </Field>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-body-lg">Secondary CTA</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Label">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.secondaryCtaLabel ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  secondaryCtaLabel: event.target.value,
                                })
                              }
                            />
                          </Field>
                          <Field label="Href">
                            <input
                              className={formControlClassName}
                              value={uiuxDesignDraft.secondaryCtaHref ?? ""}
                              onChange={(event) =>
                                setUiuxDesignDraft({
                                  ...uiuxDesignDraft,
                                  secondaryCtaHref: event.target.value,
                                })
                              }
                            />
                          </Field>
                        </div>
                      </CardContent>
                    </Card>
                <StickySaveBar label="Save UI/UX Design" previewHref="/uiux-design" />
              </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="case-studies">
          {selectedCaseStudy ? (
            <form action={saveCaseStudyContentAction} className="space-y-6">
              <input type="hidden" name="caseStudyId" value={selectedCaseStudy.id} readOnly />
              <input type="hidden" name="payload" value={JSON.stringify(selectedCaseStudy)} readOnly />
              <Card>
                <CardHeader className="space-y-4">
                  <CardTitle>Case-study content</CardTitle>
                  <Tabs value={selectedCaseStudy.id} onValueChange={setSelectedCaseStudyId}>
                    <div className="space-y-2">
                      <p className="text-label-sm uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">
                        Selected case study
                      </p>
                      <TabsList variant="line">
                        {visibleCaseStudies.map((caseStudy) => (
                          <TabsTrigger key={caseStudy.id} value={caseStudy.id}>
                            {caseStudy.title}
                          </TabsTrigger>
                        ))}
                        {!caseStudiesExpanded && hiddenCaseStudyCount > 0 && (
                          <button
                            type="button"
                            onClick={() => setCaseStudiesExpanded(true)}
                            className="ml-1 shrink-0 rounded-[var(--ds-radius-sm)] px-2.5 py-1 text-label-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          >
                            +{hiddenCaseStudyCount} more
                          </button>
                        )}
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

        {/* ── Careers ─────────────────────────────────────────────────────── */}
        <TabsContent value="careers">
          <form action={saveCareersContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(careersDraft)} readOnly />

            {/* Hero */}
            <Card>
              <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Heading line 1">
                    <input
                      className={formControlClassName}
                      value={careersDraft.hero.headingLine1}
                      onChange={(e) => setCareersDraft({ ...careersDraft, hero: { ...careersDraft.hero, headingLine1: e.target.value } })}
                    />
                  </Field>
                  <Field label="Heading highlight">
                    <input
                      className={formControlClassName}
                      value={careersDraft.hero.headingHighlight}
                      onChange={(e) => setCareersDraft({ ...careersDraft, hero: { ...careersDraft.hero, headingHighlight: e.target.value } })}
                    />
                  </Field>
                </div>
                <Field label="Subheading">
                  <textarea
                    aria-label="Subheading"
                    className={textareaClassName}
                    value={careersDraft.hero.subheading}
                    onChange={(e) => setCareersDraft({ ...careersDraft, hero: { ...careersDraft.hero, subheading: e.target.value } })}
                  />
                </Field>
              </CardContent>
            </Card>

            {/* Principles */}
            <Card>
              <CardHeader><CardTitle>Principles (4 fixed)</CardTitle></CardHeader>
              <CardContent className="space-y-5 pb-6">
                {careersDraft.principles.map((p: CareersPrincipleItem, i: number) => (
                  <Card key={i}>
                    <CardHeader><CardTitle className="text-body-lg">Principle {i + 1}</CardTitle></CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Eyebrow">
                        <input
                          className={formControlClassName}
                          value={p.eyebrow}
                          onChange={(e) => setCareersDraft({ ...careersDraft, principles: replaceAt(careersDraft.principles, i, { ...p, eyebrow: e.target.value }) })}
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          className={formControlClassName}
                          value={p.title}
                          onChange={(e) => setCareersDraft({ ...careersDraft, principles: replaceAt(careersDraft.principles, i, { ...p, title: e.target.value }) })}
                        />
                      </Field>
                      <Field label="Body">
                        <textarea
                          className={textareaClassName}
                          value={p.body}
                          onChange={(e) => setCareersDraft({ ...careersDraft, principles: replaceAt(careersDraft.principles, i, { ...p, body: e.target.value }) })}
                        />
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>Benefits</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCareersDraft({ ...careersDraft, benefits: [...careersDraft.benefits, { title: "", body: "" }] })}
                >
                  Add benefit
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {careersDraft.benefits.map((b: CareersBenefitItem, i: number) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
                      <CardTitle className="text-body-lg">Benefit {i + 1}</CardTitle>
                      <Button type="button" variant="secondary" size="sm" onClick={() => setCareersDraft({ ...careersDraft, benefits: removeAt(careersDraft.benefits, i) })}>Remove</Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Title">
                        <input
                          className={formControlClassName}
                          value={b.title}
                          onChange={(e) => setCareersDraft({ ...careersDraft, benefits: replaceAt(careersDraft.benefits, i, { ...b, title: e.target.value }) })}
                        />
                      </Field>
                      <Field label="Body">
                        <textarea
                          className={textareaClassName}
                          value={b.body}
                          onChange={(e) => setCareersDraft({ ...careersDraft, benefits: replaceAt(careersDraft.benefits, i, { ...b, body: e.target.value }) })}
                        />
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>Testimonials</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setCareersDraft({ ...careersDraft, testimonials: [...careersDraft.testimonials, { quote: "", name: "", role: "" }] })}
                >
                  Add testimonial
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {careersDraft.testimonials.map((t: CareersTestimonialItem, i: number) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
                      <CardTitle className="text-body-lg">Testimonial {i + 1}</CardTitle>
                      <Button type="button" variant="secondary" size="sm" onClick={() => setCareersDraft({ ...careersDraft, testimonials: removeAt(careersDraft.testimonials, i) })}>Remove</Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Quote">
                        <textarea
                          className={textareaClassName}
                          value={t.quote}
                          onChange={(e) => setCareersDraft({ ...careersDraft, testimonials: replaceAt(careersDraft.testimonials, i, { ...t, quote: e.target.value }) })}
                        />
                      </Field>
                      <div className="grid gap-4 lg:grid-cols-2">
                        <Field label="Name">
                          <input
                            aria-label="Name"
                            className={formControlClassName}
                            value={t.name}
                            onChange={(e) => setCareersDraft({ ...careersDraft, testimonials: replaceAt(careersDraft.testimonials, i, { ...t, name: e.target.value }) })}
                          />
                        </Field>
                        <Field label="Role">
                          <input
                            aria-label="Role"
                            className={formControlClassName}
                            value={t.role}
                            onChange={(e) => setCareersDraft({ ...careersDraft, testimonials: replaceAt(careersDraft.testimonials, i, { ...t, role: e.target.value }) })}
                          />
                        </Field>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Process steps */}
            <Card>
              <CardHeader><CardTitle>Hiring process (5 fixed steps)</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                {careersDraft.process.map((s: CareersProcessStepItem, i: number) => (
                  <Card key={i}>
                    <CardHeader><CardTitle className="text-body-lg">Step {i + 1}</CardTitle></CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Title">
                        <input
                          className={formControlClassName}
                          value={s.title}
                          onChange={(e) => setCareersDraft({ ...careersDraft, process: replaceAt(careersDraft.process, i, { ...s, title: e.target.value }) })}
                        />
                      </Field>
                      <Field label="Body">
                        <textarea
                          className={textareaClassName}
                          value={s.body}
                          onChange={(e) => setCareersDraft({ ...careersDraft, process: replaceAt(careersDraft.process, i, { ...s, body: e.target.value }) })}
                        />
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader><CardTitle>CTA section</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <Field label="Kicker">
                  <input
                    aria-label="Kicker"
                    className={formControlClassName}
                    value={careersDraft.cta.kicker}
                    onChange={(e) => setCareersDraft({ ...careersDraft, cta: { ...careersDraft.cta, kicker: e.target.value } })}
                  />
                </Field>
                <div className="grid gap-4 lg:grid-cols-3">
                  <Field label="Heading prefix">
                    <input
                      aria-label="Heading prefix"
                      className={formControlClassName}
                      value={careersDraft.cta.headingPrefix}
                      onChange={(e) => setCareersDraft({ ...careersDraft, cta: { ...careersDraft.cta, headingPrefix: e.target.value } })}
                    />
                  </Field>
                  <Field label="Heading highlight (purple)">
                    <input
                      aria-label="Heading highlight"
                      className={formControlClassName}
                      value={careersDraft.cta.headingHighlight}
                      onChange={(e) => setCareersDraft({ ...careersDraft, cta: { ...careersDraft.cta, headingHighlight: e.target.value } })}
                    />
                  </Field>
                  <Field label="Heading suffix">
                    <input
                      aria-label="Heading suffix"
                      className={formControlClassName}
                      value={careersDraft.cta.headingSuffix}
                      onChange={(e) => setCareersDraft({ ...careersDraft, cta: { ...careersDraft.cta, headingSuffix: e.target.value } })}
                    />
                  </Field>
                </div>
                <Field label="Body">
                  <textarea
                    aria-label="Body"
                    className={textareaClassName}
                    value={careersDraft.cta.body}
                    onChange={(e) => setCareersDraft({ ...careersDraft, cta: { ...careersDraft.cta, body: e.target.value } })}
                  />
                </Field>
              </CardContent>
            </Card>

            <StickySaveBar label="Save careers content" previewHref="/careers" />
          </form>
        </TabsContent>

        {/* ── Work ─────────────────────────────────────────────────────────── */}
        <TabsContent value="work">
          <form action={saveWorkContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(workDraft)} readOnly />

            {/* Hero */}
            <Card>
              <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  <Field label="Heading prefix">
                    <input
                      className={formControlClassName}
                      value={workDraft.hero.headingPrefix}
                      onChange={(e) => setWorkDraft({ ...workDraft, hero: { ...workDraft.hero, headingPrefix: e.target.value } })}
                    />
                  </Field>
                  <Field label="Heading highlight">
                    <input
                      className={formControlClassName}
                      value={workDraft.hero.headingHighlight}
                      onChange={(e) => setWorkDraft({ ...workDraft, hero: { ...workDraft.hero, headingHighlight: e.target.value } })}
                    />
                  </Field>
                  <Field label="Heading suffix">
                    <input
                      className={formControlClassName}
                      value={workDraft.hero.headingSuffix}
                      onChange={(e) => setWorkDraft({ ...workDraft, hero: { ...workDraft.hero, headingSuffix: e.target.value } })}
                    />
                  </Field>
                </div>
                <Field label="Subheading">
                  <textarea
                    className={textareaClassName}
                    value={workDraft.hero.subheading}
                    onChange={(e) => setWorkDraft({ ...workDraft, hero: { ...workDraft.hero, subheading: e.target.value } })}
                  />
                </Field>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader><CardTitle>CTA</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Eyebrow">
                    <input className={formControlClassName} value={workDraft.cta.eyebrow} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, eyebrow: e.target.value } })} />
                  </Field>
                  <Field label="Heading prefix">
                    <input className={formControlClassName} value={workDraft.cta.headingPrefix} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, headingPrefix: e.target.value } })} />
                  </Field>
                  <Field label="Heading highlight">
                    <input className={formControlClassName} value={workDraft.cta.headingHighlight} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, headingHighlight: e.target.value } })} />
                  </Field>
                  <Field label="Heading suffix">
                    <input className={formControlClassName} value={workDraft.cta.headingSuffix} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, headingSuffix: e.target.value } })} />
                  </Field>
                  <Field label="Primary button label">
                    <input className={formControlClassName} value={workDraft.cta.primaryCtaLabel} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, primaryCtaLabel: e.target.value } })} />
                  </Field>
                  <Field label="Primary button link">
                    <input className={formControlClassName} value={workDraft.cta.primaryCtaHref} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, primaryCtaHref: e.target.value } })} />
                  </Field>
                  <Field label="Contact email">
                    <input className={formControlClassName} value={workDraft.cta.contactEmail} onChange={(e) => setWorkDraft({ ...workDraft, cta: { ...workDraft.cta, contactEmail: e.target.value } })} />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* Case study list — order, category, cover */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>Case studies (order · category · cover)</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setWorkDraft({ ...workDraft, items: [...workDraft.items, { id: "", category: "AI & Product" }] })}
                >
                  Add case study
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                {workDraft.items.map((item, index) => (
                  <Card key={`work-item-${index}`}>
                    <CardContent className="space-y-3 pb-5 pt-6">
                      <div className="grid gap-3 lg:grid-cols-2">
                        <Field label="Case study ID">
                          <input
                            className={formControlClassName}
                            value={item.id}
                            onChange={(e) => setWorkDraft({ ...workDraft, items: replaceAt(workDraft.items, index, { ...item, id: e.target.value }) })}
                          />
                        </Field>
                        <Field label="Category (filter label)">
                          <input
                            className={formControlClassName}
                            value={item.category}
                            onChange={(e) => setWorkDraft({ ...workDraft, items: replaceAt(workDraft.items, index, { ...item, category: e.target.value }) })}
                          />
                        </Field>
                      </div>
                      <Field label="Cover image path (optional)">
                        <input
                          className={formControlClassName}
                          value={item.coverSrc ?? ""}
                          placeholder="/assets/…"
                          onChange={(e) => setWorkDraft({ ...workDraft, items: replaceAt(workDraft.items, index, { ...item, coverSrc: e.target.value ? e.target.value : undefined }) })}
                        />
                      </Field>
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => setWorkDraft({ ...workDraft, items: removeAt(workDraft.items, index) })}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <StickySaveBar label="Save work content" previewHref="/work" />
          </form>
        </TabsContent>

        {/* ── Services overview page ───────────────────────────────────────── */}
        <TabsContent value="services-page">
          <form action={saveServicesPageContentAction} className="space-y-6">
            <input type="hidden" name="payload" value={JSON.stringify(servicesPageDraft)} readOnly />

            {/* Hero */}
            <Card>
              <CardHeader><CardTitle>Hero</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <Field label="Title (wrap words in *asterisks* to highlight them)">
                  <input className={formControlClassName} value={servicesPageDraft.hero.title} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, hero: { ...servicesPageDraft.hero, title: e.target.value } })} />
                </Field>
                <Field label="Description">
                  <textarea className={textareaClassName} value={servicesPageDraft.hero.description} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, hero: { ...servicesPageDraft.hero, description: e.target.value } })} />
                </Field>
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="CTA label (leave blank to hide)">
                    <input className={formControlClassName} value={servicesPageDraft.hero.ctaLabel} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, hero: { ...servicesPageDraft.hero, ctaLabel: e.target.value } })} />
                  </Field>
                  <Field label="CTA link">
                    <input className={formControlClassName} value={servicesPageDraft.hero.ctaHref} placeholder="/work" onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, hero: { ...servicesPageDraft.hero, ctaHref: e.target.value } })} />
                  </Field>
                </div>
              </CardContent>
            </Card>

            {/* Services overview list */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>Services (What we do)</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setServicesPageDraft({ ...servicesPageDraft, overview: { ...servicesPageDraft.overview, items: [...servicesPageDraft.overview.items, { slug: "", title: "", shortLabel: "", description: "", capabilities: [], image: "", imageAlt: "", href: "" }] } })}
                >
                  Add service
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Kicker">
                    <input className={formControlClassName} value={servicesPageDraft.overview.kicker} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, overview: { ...servicesPageDraft.overview, kicker: e.target.value } })} />
                  </Field>
                  <Field label="Heading">
                    <input className={formControlClassName} value={servicesPageDraft.overview.heading} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, overview: { ...servicesPageDraft.overview, heading: e.target.value } })} />
                  </Field>
                </div>

                {servicesPageDraft.overview.items.map((item, index) => {
                  const updateItem = (next: ServicesPageContent["overview"]["items"][number]) =>
                    setServicesPageDraft({ ...servicesPageDraft, overview: { ...servicesPageDraft.overview, items: replaceAt(servicesPageDraft.overview.items, index, next) } });
                  return (
                    <Card key={`service-item-${index}`}>
                      <CardHeader className="flex flex-row items-center justify-between gap-3">
                        <CardTitle className="text-body-lg">Service {index + 1}</CardTitle>
                        <Button type="button" variant="secondary" size="sm" onClick={() => setServicesPageDraft({ ...servicesPageDraft, overview: { ...servicesPageDraft.overview, items: removeAt(servicesPageDraft.overview.items, index) } })}>
                          Remove
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-6">
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Title">
                            <input className={formControlClassName} value={item.title} onChange={(e) => updateItem({ ...item, title: e.target.value })} />
                          </Field>
                          <Field label="Short label">
                            <input className={formControlClassName} value={item.shortLabel} onChange={(e) => updateItem({ ...item, shortLabel: e.target.value })} />
                          </Field>
                        </div>
                        <Field label="Description">
                          <textarea className={textareaClassName} value={item.description} onChange={(e) => updateItem({ ...item, description: e.target.value })} />
                        </Field>
                        <StringListEditor
                          label="Capabilities"
                          items={item.capabilities}
                          addLabel="Add capability"
                          onChange={(capabilities) => updateItem({ ...item, capabilities })}
                        />
                        <div className="grid gap-4 lg:grid-cols-2">
                          <Field label="Image path">
                            <input className={formControlClassName} value={item.image} placeholder="/assets/…" onChange={(e) => updateItem({ ...item, image: e.target.value })} />
                          </Field>
                          <Field label="Image alt text">
                            <input className={formControlClassName} value={item.imageAlt} onChange={(e) => updateItem({ ...item, imageAlt: e.target.value })} />
                          </Field>
                        </div>
                        <Field label="Explore link (optional — leave blank to hide button)">
                          <input className={formControlClassName} value={item.href} placeholder="/digital-marketing" onChange={(e) => updateItem({ ...item, href: e.target.value })} />
                        </Field>
                      </CardContent>
                    </Card>
                  );
                })}
              </CardContent>
            </Card>

            {/* How we work */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-3">
                <CardTitle>How we work</CardTitle>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, steps: [...servicesPageDraft.process.steps, { title: "", description: "" }] } })}
                >
                  Add step
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Kicker">
                    <input className={formControlClassName} value={servicesPageDraft.process.kicker} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, kicker: e.target.value } })} />
                  </Field>
                  <Field label="Heading">
                    <input className={formControlClassName} value={servicesPageDraft.process.heading} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, heading: e.target.value } })} />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea className={textareaClassName} value={servicesPageDraft.process.description} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, description: e.target.value } })} />
                </Field>
                {servicesPageDraft.process.steps.map((step, index) => (
                  <Card key={`process-step-${index}`}>
                    <CardHeader className="flex flex-row items-center justify-between gap-3">
                      <CardTitle className="text-body-lg">Step {index + 1}</CardTitle>
                      <Button type="button" variant="secondary" size="sm" onClick={() => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, steps: removeAt(servicesPageDraft.process.steps, index) } })}>
                        Remove
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4 pb-6">
                      <Field label="Title">
                        <input className={formControlClassName} value={step.title} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, steps: replaceAt(servicesPageDraft.process.steps, index, { ...step, title: e.target.value }) } })} />
                      </Field>
                      <Field label="Description">
                        <textarea className={textareaClassName} value={step.description} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, process: { ...servicesPageDraft.process, steps: replaceAt(servicesPageDraft.process.steps, index, { ...step, description: e.target.value }) } })} />
                      </Field>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader><CardTitle>CTA</CardTitle></CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="grid gap-4 lg:grid-cols-2">
                  <Field label="Eyebrow">
                    <input className={formControlClassName} value={servicesPageDraft.cta.eyebrow} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, eyebrow: e.target.value } })} />
                  </Field>
                  <Field label="Heading prefix">
                    <input className={formControlClassName} value={servicesPageDraft.cta.headingPrefix} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, headingPrefix: e.target.value } })} />
                  </Field>
                  <Field label="Heading highlight">
                    <input className={formControlClassName} value={servicesPageDraft.cta.headingHighlight} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, headingHighlight: e.target.value } })} />
                  </Field>
                  <Field label="Heading suffix">
                    <input className={formControlClassName} value={servicesPageDraft.cta.headingSuffix} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, headingSuffix: e.target.value } })} />
                  </Field>
                  <Field label="Primary button label">
                    <input className={formControlClassName} value={servicesPageDraft.cta.primaryCtaLabel} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, primaryCtaLabel: e.target.value } })} />
                  </Field>
                  <Field label="Contact email">
                    <input className={formControlClassName} value={servicesPageDraft.cta.contactEmail} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, contactEmail: e.target.value } })} />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea className={textareaClassName} value={servicesPageDraft.cta.description} onChange={(e) => setServicesPageDraft({ ...servicesPageDraft, cta: { ...servicesPageDraft.cta, description: e.target.value } })} />
                </Field>
              </CardContent>
            </Card>

            <StickySaveBar label="Save services content" previewHref="/services" />
          </form>
        </TabsContent>

        {/* ── Blog ─────────────────────────────────────────────────────────── */}
        <TabsContent value="blog">
          <BlogAdminTab initialPosts={blogPosts} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
