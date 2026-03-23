import type { Metadata } from "next";
import type { TocItem } from "@/lib/toc";
import EditorIntroductionPage, {
  metadata as editorIntroductionMetadata,
  publishedAt as editorIntroductionPublishedAt,
  showToc as editorIntroductionShowToc,
  summary as editorIntroductionSummary,
  toc as editorIntroductionToc,
  tocVariant as editorIntroductionTocVariant,
  title as editorIntroductionTitle,
} from "../../content/editor/index";

export type ComponentPageEntry = {
  slug: string[];
  title: string;
  metadata?: Metadata;
  publishedAt?: string;
  summary?: string;
  showToc?: boolean;
  toc?: TocItem[];
  tocVariant?: "rail" | "inline";
  className?: string;
  Component: React.ComponentType;
};

const componentPages: ComponentPageEntry[] = [
  {
    slug: ["editor"],
    title: editorIntroductionTitle,
    metadata: editorIntroductionMetadata,
    publishedAt: editorIntroductionPublishedAt,
    summary: editorIntroductionSummary,
    showToc: editorIntroductionShowToc,
    toc: editorIntroductionToc,
    tocVariant: editorIntroductionTocVariant,
    className: "editor-page",
    Component: EditorIntroductionPage,
  },
];

export function getComponentPage(slug: string[]): ComponentPageEntry | null {
  const key = slug.join("/");
  return componentPages.find((entry) => entry.slug.join("/") === key) ?? null;
}

export function getAllComponentPageSlugs(): string[][] {
  return componentPages.map((entry) => entry.slug);
}

export function getAllComponentPages(): ComponentPageEntry[] {
  return componentPages;
}
