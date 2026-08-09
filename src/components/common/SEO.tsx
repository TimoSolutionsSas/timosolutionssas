import { Helmet } from "react-helmet-async";
import { SITE } from "@/config/site";
import type { SEOProps } from "@/interfaces/seo";

export function SEO({
  title,
  description,
  path = "",
  image,
  noindex = false,
  type = "website",
}: SEOProps) {
  const fullTitle = `${title} | ${SITE.name}`;
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? `${SITE.url}/images/logo.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />

      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
