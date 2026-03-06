import { SignatureData } from "@/types/signature";
import { classicTemplate, classicPreview } from "./classic";
import { modernTemplate, modernPreview } from "./modern";
import { minimalTemplate, minimalPreview } from "./minimal";

export const templates = {
  classic: {
    name: "Classic",
    description: "Vertikales Layout mit Trennlinie",
    getHtml: classicTemplate,
    getPreview: classicPreview,
  },
  modern: {
    name: "Modern",
    description: "Logo links, Info rechts mit Akzentleiste",
    getHtml: modernTemplate,
    getPreview: modernPreview,
  },
  minimal: {
    name: "Minimal",
    description: "Kompakt und schlicht",
    getHtml: minimalTemplate,
    getPreview: minimalPreview,
  },
} as const;

export type TemplateKey = keyof typeof templates;

export function getSignatureHtml(
  data: SignatureData,
  logoSrc: string
): string {
  return templates[data.template].getHtml(data, logoSrc);
}

export function getSignaturePreview(
  data: SignatureData,
  logoSrc: string
): React.ReactNode {
  return templates[data.template].getPreview(data, logoSrc);
}
