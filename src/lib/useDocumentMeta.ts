import { useEffect } from "react";

// Lightweight per-page <title>/<meta description> sync for the client-side
// router. This is a pure SPA (no SSR), so crawlers only ever see the static
// defaults baked into index.html — this hook just keeps the tab title and
// description correct for real visitors as they navigate.
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const meta = description
      ? document.querySelector<HTMLMetaElement>('meta[name="description"]')
      : null;
    const previousDescription = meta?.getAttribute("content") ?? null;
    if (meta && description) meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      }
    };
  }, [title, description]);
}
