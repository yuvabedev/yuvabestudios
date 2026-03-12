type ColorSwatchProps = {
  name: string;
  value: string;
  textColor?: string;
};

// Each swatch shows the token name, rendered value, and contrast treatment in one place.
export function ColorSwatch({ name, value, textColor = "var(--color-text-primary)" }: ColorSwatchProps) {
  return (
    <article className="overflow-hidden rounded-[var(--ds-radius-lg)] border bg-background shadow-sm">
      <div className="h-24 border-b" style={{ backgroundColor: value }} />
      <div className="space-y-[var(--space-050)] p-[var(--space-200)]" style={{ color: textColor }}>
        <p className="text-label-md text-foreground">{name}</p>
        <p className="text-body-sm text-muted-foreground">{value}</p>
      </div>
    </article>
  );
}
