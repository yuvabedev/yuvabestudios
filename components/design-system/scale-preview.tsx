type ScalePreviewProps = {
  label: string;
  value: string;
  preview?: "space" | "radius" | "shadow";
};

// This helper renders different token scales with a shared card structure.
export function ScalePreview({ label, value, preview = "space" }: ScalePreviewProps) {
  const previewNode =
    preview === "space" ? (
      <div className="flex h-12 items-center">
        <div className="h-3 rounded-full bg-brand" style={{ width: value }} />
      </div>
    ) : preview === "radius" ? (
      <div className="h-14 w-full border bg-muted" style={{ borderRadius: value }} />
    ) : (
      <div className="h-14 rounded-[var(--ds-radius-lg)] border bg-background" style={{ boxShadow: value }} />
    );

  return (
    <article className="rounded-[var(--ds-radius-lg)] border bg-background p-[var(--space-200)] shadow-sm">
      <div className="mb-[var(--space-150)] flex items-center justify-between gap-[var(--space-100)]">
        <p className="text-label-md text-foreground">{label}</p>
        <code className="text-caption text-muted-foreground">{value}</code>
      </div>
      {previewNode}
    </article>
  );
}
