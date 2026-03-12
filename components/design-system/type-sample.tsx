type TypeSampleProps = {
  label: string;
  utilityClass: string;
  preview: string;
  meta: string;
};

// This row ties the spec label to the utility class engineers will actually consume.
export function TypeSample({ label, utilityClass, preview, meta }: TypeSampleProps) {
  return (
    <article className="rounded-[var(--ds-radius-lg)] border bg-background p-[var(--space-200)] shadow-sm">
      <div className="mb-[var(--space-150)] flex flex-wrap items-center justify-between gap-[var(--space-100)]">
        <p className="text-label-md text-foreground">{label}</p>
        <code className="rounded-full bg-muted px-[var(--space-150)] py-[var(--space-050)] text-label-sm text-muted-foreground">
          {utilityClass}
        </code>
      </div>
      <p className={utilityClass}>{preview}</p>
      <p className="mt-[var(--space-150)] text-caption text-muted-foreground">{meta}</p>
    </article>
  );
}
