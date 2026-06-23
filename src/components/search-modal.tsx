"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import {
  BriefcaseBusiness,
  FileText,
  Globe,
  HelpCircle,
  Menu,
  Scale,
  Search,
  X,
  type LucideIcon,
} from "lucide-react";
import Fuse from "fuse.js";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
  type ReactNode,
} from "react";
import { faqs, serviceCategories } from "@/lib/home-content";
import {
  featuredPosts,
  navItems,
  pageDescriptions,
  practiceAreas,
} from "@/lib/site";

// ─── Types ───────────────────────────────────────────────────────────────────

interface SearchItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  icon?: LucideIcon;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface SearchCtx {
  open: boolean;
  setOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

const SearchContext = createContext<SearchCtx>({
  open: false,
  setOpen: () => undefined,
});

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SearchContext.Provider value={{ open, setOpen }}>
      {children}
    </SearchContext.Provider>
  );
}

// ─── Index builder ───────────────────────────────────────────────────────────

const routes: { href: string; title: string; desc: string }[] = [
  { href: "/", title: "Inicio", desc: pageDescriptions.home },
  { href: "/firma", title: "La Firma", desc: pageDescriptions.firma },
  { href: "/areas-de-practica", title: "Áreas de Práctica", desc: pageDescriptions.areas },
  { href: "/derecho-penal-economico", title: "Derecho Penal Económico", desc: pageDescriptions.penal },
  { href: "/academia", title: "Academia", desc: pageDescriptions.academia },
  { href: "/eventos", title: "Eventos", desc: pageDescriptions.eventos },
  { href: "/blog", title: "Blog", desc: pageDescriptions.blog },
  { href: "/contacto", title: "Contacto", desc: pageDescriptions.contacto },
];

const categoryOrder = [
  "Páginas",
  "Práctica",
  "Servicios",
  "Publicaciones",
  "Preguntas frecuentes",
  "Navegación",
];

const categoryIcons: Record<string, LucideIcon> = {
  Páginas: Globe,
  Práctica: Scale,
  Servicios: BriefcaseBusiness,
  Publicaciones: FileText,
  "Preguntas frecuentes": HelpCircle,
  Navegación: Menu,
};

function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const r of routes) {
    items.push({
      id: `route-${r.href}`,
      title: r.title,
      description: r.desc,
      url: r.href,
      category: "Páginas",
    });
  }

  for (const pa of practiceAreas) {
    items.push({
      id: `practice-${pa.title}`,
      title: pa.title,
      description: pa.description,
      url: pa.href,
      category: "Práctica",
      icon: pa.icon,
    });
  }

  for (const sc of serviceCategories) {
    items.push({
      id: `service-${sc.id}`,
      title: sc.title,
      description: sc.description,
      url: "/areas-de-practica",
      category: "Servicios",
      icon: sc.icon,
    });
  }

  for (let i = 0; i < featuredPosts.length; i++) {
    const fp = featuredPosts[i];
    items.push({
      id: `post-${i}`,
      title: fp.title,
      description: `${fp.category} — ${fp.summary}`,
      url: "/blog",
      category: "Publicaciones",
      icon: fp.icon,
    });
  }

  for (let i = 0; i < faqs.length; i++) {
    const faq = faqs[i];
    items.push({
      id: `faq-${i}`,
      title: faq.question,
      description: faq.answer,
      url: "/#consulta",
      category: "Preguntas frecuentes",
    });
  }

  for (const nav of navItems) {
    items.push({
      id: `nav-${nav.href}`,
      title: nav.label,
      description: "",
      url: nav.href,
      category: "Navegación",
    });
  }

  return items;
}

// ─── SearchModal ─────────────────────────────────────────────────────────────

export function SearchModal() {
  const { open, setOpen } = useSearch();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["title", "description"],
        threshold: 0.35,
        includeScore: true,
      }),
    [searchIndex],
  );

  const rawResults = query.trim()
    ? fuse.search(query.trim()).map((r) => r.item)
    : searchIndex;

  const grouped = useMemo(() => {
    const map = new Map<string, SearchItem[]>();
    for (const item of rawResults) {
      const arr = map.get(item.category);
      if (arr) arr.push(item);
      else map.set(item.category, [item]);
    }
    return categoryOrder
      .filter((cat) => map.has(cat))
      .map((cat) => ({ category: cat, items: map.get(cat)!, icon: categoryIcons[cat] }));
  }, [rawResults]);

  const flatResults = useMemo(
    () => grouped.flatMap((g) => g.items),
    [grouped],
  );

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll active result into view
  useEffect(() => {
    if (activeIndex < 0) return;
    const el = resultsRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i < flatResults.length - 1 ? i + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i > 0 ? i - 1 : flatResults.length - 1));
      } else if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        const item = flatResults[activeIndex];
        if (item) {
          setOpen(false);
          window.location.href = item.url;
        }
      }
    },
    [flatResults, activeIndex, setOpen],
  );

  const close = useCallback(() => setOpen(false), [setOpen]);

  // Global Cmd+K listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[#0a0908]/95 backdrop-blur-xl sm:items-center"
          onClick={close}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-label="Buscador"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto mt-0 flex w-full max-w-2xl flex-col bg-[#0f0d0b] sm:mt-[10vh] sm:mb-16 sm:rounded-xl sm:border sm:border-white/10 sm:shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <Search size={18} className="shrink-0 text-[#ecc058]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                placeholder="Buscar servicios, artículos, páginas..."
                className="min-w-0 flex-1 bg-transparent text-base text-[#f3eee4] outline-none placeholder:text-[#8f877c]/60"
                aria-label="Buscar contenido"
              />
              <kbd className="hidden shrink-0 items-center gap-1 rounded border border-white/10 px-2 py-1 font-sans text-[0.6rem] uppercase tracking-wider text-[#8f877c] sm:flex">
                <span className="text-[0.55rem]">⌘</span>K
              </kbd>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar buscador"
                className="grid size-8 place-items-center rounded-md text-[#8f877c] transition-colors hover:bg-white/5 hover:text-[#f3eee4]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Results */}
            <div
              ref={resultsRef}
              className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain"
            >
              {query.trim() && flatResults.length === 0 ? (
                <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
                  <Search size={28} className="text-[#8f877c]/40" />
                  <p className="text-sm text-[#8f877c]">
                    No se encontraron resultados para{" "}
                    <span className="text-[#f3eee4]">&ldquo;{query.trim()}&rdquo;</span>
                  </p>
                  <p className="text-xs text-[#8f877c]/50">
                    Intenta con otros términos
                  </p>
                </div>
              ) : !query.trim() ? (
                <div className="flex flex-col items-center gap-2 px-6 py-14 text-center">
                  <Search size={28} className="text-[#8f877c]/30" />
                  <p className="text-sm text-[#8f877c]">
                    Comienza a escribir para buscar contenido...
                  </p>
                  <p className="text-xs text-[#8f877c]/40">
                    Explora servicios, prácticas, artículos y más
                  </p>
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.category}>
                    <div className="sticky top-0 flex items-center gap-2 border-b border-white/5 bg-[#0f0d0b]/90 px-5 py-2.5 backdrop-blur-sm">
                      {group.icon ? (
                        <group.icon size={13} className="text-[#ecc058]" />
                      ) : null}
                      <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-[#ecc058]">
                        {group.category}
                      </span>
                      <span className="ml-auto text-[0.55rem] text-[#8f877c]/50">
                        {group.items.length}
                      </span>
                    </div>
                    {group.items.map((item) => {
                      const flatIdx = flatResults.indexOf(item);
                      const isActive = flatIdx === activeIndex;
                      return (
                        <Link
                          key={item.id}
                          href={item.url}
                          onClick={() => setOpen(false)}
                          data-index={flatIdx}
                          className={`flex items-start gap-3.5 border-b border-white/[0.03] px-5 py-3.5 text-left transition-colors ${
                            isActive
                              ? "bg-[#ecc058]/8 border-[#ecc058]/20"
                              : "hover:bg-white/[0.03]"
                          }`}
                        >
                          {item.icon ? (
                            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-[#ecc058]">
                              <item.icon size={14} />
                            </span>
                          ) : (
                            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-white/10 bg-white/[0.04] text-[#8f877c]">
                              <FileText size={14} />
                            </span>
                          )}
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium text-[#f3eee4]">
                              {item.title}
                            </span>
                            {item.description ? (
                              <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-[#8f877c]">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            {flatResults.length > 0 ? (
              <div className="hidden border-t border-white/5 px-5 py-2.5 text-[0.55rem] uppercase tracking-wider text-[#8f877c]/50 sm:flex items-center gap-4">
                <span>↑↓ Navegar</span>
                <span>↵ Seleccionar</span>
                <span className="ml-auto">Esc Cerrar</span>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── SearchButton ────────────────────────────────────────────────────────────

export function SearchButton() {
  const { setOpen } = useSearch();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Buscar"
      className="grid size-12 place-items-center border border-white/15 text-[#ecc058] transition-colors hover:border-[#ecc058]/40 hover:text-[#f3eee4] touch-manipulation"
    >
      <Search size={19} />
    </button>
  );
}
