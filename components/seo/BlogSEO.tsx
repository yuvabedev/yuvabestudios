// Stub for the legacy blog SEO components. Real SEO is handled by the route's
// `generateMetadata`, so these render nothing. They exist so the migrated
// article files (which import BlogSEO and the next-seo JSON-LD helpers) compile.

type AnyProps = { children?: React.ReactNode } & Record<string, unknown>;

function Noop(props: AnyProps) {
  void props;
  return null;
}

export default Noop;
export const NextSeo = Noop;
export const ArticleJsonLd = Noop;
export const BreadcrumbJsonLd = Noop;
export const FAQPageJsonLd = Noop;
