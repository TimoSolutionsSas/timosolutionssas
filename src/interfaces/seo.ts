export interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  type?: "website" | "product" | "article";
}
