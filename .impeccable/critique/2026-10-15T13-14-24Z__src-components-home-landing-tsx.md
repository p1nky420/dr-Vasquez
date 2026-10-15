---
target: página principal clásica
total_score: 23
max_score: 32
na_heuristics: 7
p0_count: 0
p1_count: 3
target_identity: "file:/tmp/claude-0/-home-user-dr-Vasquez/98612641-102b-58f5-9de0-5b2b344aee7e/scratchpad/classic/src/components/home-landing.tsx"
target_fingerprint: "sha256:6700af6bdbbf1aba24c8775e49573bfb328e3541c2613dac837efe8e59fc7870"
target_path: /tmp/claude-0/-home-user-dr-Vasquez/98612641-102b-58f5-9de0-5b2b344aee7e/scratchpad/classic/src/components/home-landing.tsx
timestamp: 2026-10-15T13-14-24Z
slug: src-components-home-landing-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

Heuristics: 1=3 2=2 3=3 4=2 5=2 6=3 7=n/a 8=2 9=3 10=3 -> 23/32 (72%, Good)

Specificity: ~70% category-interchangeable. Authored: hero portrait/H1, "¿En qué punto está su caso hoy?" index, Fiscalía placeholder, process rule. Template: ~13 eyebrows, decorative numbering (principles 01-04, I-V), dividers between all sections, 3 identical practice cards, fake stats row (20+/Profesor/Autor/Formación), FV watermarks, invented seals. No Ecuador economic-crime specifics.

Detector: CLI 0 findings; browser overlay 50 (desktop) / 46 (mobile): undersized text 15 (CTAs 10.4px, form labels 9.9px, 8.3px small), low contrast 14 (main-form placeholders 2.4:1, "Jurista · Docente…" 1.4:1), kicker-above-heading 7, line-length 113ch. Page 13,149px desktop / 19,806px mobile; 23 tap targets <44px; 9 contact destinations, 2 forms.

Priority issues:
[P1] Page is about the lawyer, not the client's problem; too long (23.5 mobile screens), no contact points for ~10,000px. Fix: merge legado/trayectoria/método, cut pensamiento jurídico to a link, remove duplicate quote + fake stats, add client situations with 48h guidance + CTA. /impeccable distill
[P1] Mobile hero CTA lands above list, form ~1000px lower. Fix: anchor on form, form first on mobile. /impeccable adapt
[P1] Contradictory/false trust claims: "Sin costo" vs FAQ "valor definido"; "Cifrado de extremo a extremo"; invented "Garantía Constitucional" seal. Fix: one cost policy, honest HTTPS wording, remove seal, add verifiable signals. /impeccable clarify
[P2] Two forms, eight CTA labels, three button styles. Fix: two verbs, one form (+optional details), one gold primary button. /impeccable polish
[P2] Form friction + tiny text: consent below submit at 13px, placeholders 2.4:1, labels 9.9px, tracked input text. /impeccable harden, /impeccable typeset

Personas: Jordan (jargon, "Admisión selectiva" reads as rejection, key advice buried at 90%), Riley (false encryption claim, invented seal, Corte Nacional without role, no bar number), Casey (CTA misses form, two WhatsApp buttons, floating bar covers text, 13px consent).

Minor: background hairline crosses manifesto text; "PUBLICACIONES" title card without titles; 7 golds; down-arrow on navigating cards; custom cursor/smooth scroll weight.
