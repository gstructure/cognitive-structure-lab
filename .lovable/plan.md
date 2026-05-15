## Overhaul de narrativa y arquitectura — g-structure.co

Cambio de posicionamiento: G-Struct pasa a ser producto principal (B2C SaaS), G-Structure Enterprise mantiene el B2B, y se añade una página de Inversores. Sin tocar identidad visual, paleta, tipografía, disclaimer legal, ETW 2026, brief PDF, FAQ existente, ni URLs actuales.

---

### 1. Navegación (`src/lib/routeMap.ts` + `src/components/site/Header.tsx`)

Nueva nav ES (orden exacto):
`G-Struct · Enterprise · Método · Inversores · Nosotros · Contacto`

- "Método" enlaza a `/#metodo` (sección home).
- "Nosotros" enlaza a `/sobre-guillermo`.
- "G-Struct" recibe tratamiento visual destacado (borde sutil / accent), manteniendo el design system.
- Mobile: mismo orden, hamburguesa.
- ES/EN switcher y barra ETW 2026: sin cambios.

EN: añadir `/en/investors` análogo y reordenar nav EN equivalente (mínima paridad — placeholder OK si no hay copy EN).

---

### 2. Home (`src/routes/index.tsx`)

Reordenar secciones y reescribir copy con los textos exactos del prompt:

1. **Hero** — eyebrow `G-STRUCTURE`, nuevo headline/body, dos CTAs (`Únete a G-Struct` → `/g-struct`, `Soluciones para equipos` → `/enterprise`). Conservar widget I-R-O.
2. **El Problema** — copy nuevo + 5 cards de fricción (reusar diseño existente).
3. **El Método I-R-O** — copy nuevo, conservar `MethodTabs`, añadir footnote CBT.
4. **G-Struct (producto)** — nueva sección full-width: headline, 3 features, 3 tiers de pricing (Free / Plus destacado / VIP), badge "Prototipo activo · Lanzamiento Q3 2026", CTA grande a `/g-struct`, conservar `g-struct-home-preview`.
5. **Enterprise** — nuevo label, headline y 4 service cards con CTAs.
6. **ETW 2026** — sin cambios, reubicar.
7. **Fundador** — sin cambios, reubicar.
8. **Momentum (Aliados + Equipo)** — sin cambios, reubicar.
9. **Brief descargable** — sin cambios, reubicar.
10. **FAQ** — añadir nueva pregunta "¿Estoy hablando con una startup o con una firma de coaching?" con la respuesta provista.
11. **Cierre** — nuevo headline/body + 2 CTAs.

Actualizar SEO meta del home (title, description, og:title, og:description) con los textos del prompt.

---

### 3. Reescritura de `/g-struct` (`src/routes/g-struct.tsx`)

Reemplazar contenido por el nuevo briefing completo:
- Hero (label "PROTOTIPO ACTIVO · LANZAMIENTO Q3 2026", nuevo headline "El coach CBT en tu bolsillo. 24/7.").
- Sección "Motor de Reestructuración" con timeline de 5 pasos.
- "Funcionalidades clave" — 4 bloques.
- "Planes" — 3 columnas Free / Plus / VIP (id `#planes`).
- "Lista de espera" — sección full-width con form de email (id `#lista-de-espera`). Form guarda en tabla nueva `gstruct_waitlist` vía server function.
- Nota metodológica.

SEO: nuevo title y meta description del prompt.

---

### 4. Nueva página `/inversores` (`src/routes/inversores.tsx`)

Página minimal y seria con:
- Hero "Pre-seed 2026".
- "La oportunidad" — 3 stat cards ($67.94B, 75%, 33.37%) con citas.
- "El producto" — copy + 3 diferenciadores.
- "Tracción y hoja de ruta" — timeline 4 milestones.
- "La ronda" — 3 stat cards ($75K / $750K pre-money / 10%).
- "El equipo" — Guillermo + Jericko.
- CTA final con dos botones (mailto deck + `/contacto`) y disclaimer legal.

SEO: title/meta del prompt.

---

### 5. Backend: lista de espera G-Struct

- Migración Supabase: tabla `gstruct_waitlist` (id, email unique, source, locale, created_at) con RLS (insert público con rate-limit por email; select solo admin via `has_role`).
- Server route público `src/routes/api/public/gstruct-waitlist.ts` con validación Zod (email, honeypot opcional) que inserta vía `supabaseAdmin`.
- Form en `/g-struct` consume el endpoint, dispara `trackConversion("gstruct_waitlist_signup")` y muestra toast.

---

### 6. Footer (`src/components/site/Footer.tsx`)

Reestructurar columnas:
- **Producto:** G-Struct, Lista de espera (`/g-struct#lista-de-espera`), Planes (`/g-struct#planes`).
- **Enterprise:** Workshop, REESTRUCTURA Enterprise, REESTRUCTURA 1:1, Continuidad.
- **Ecosistema:** Inversores, Aliados ETW 2026, Únete al equipo, Descargar brief.
- **Contacto:** intacto.
- Línea legal: intacta.

---

### 7. Verificación

- `tsc` pass tras cada bloque grande.
- Sitemap.xml: añadir `/inversores`.
- robots.txt: sin cambios (página pública).
- Comprobar que canonicals y `og:url` apuntan a `https://g-structure.co/...`.

---

### Archivos a tocar

Modificar:
- `src/routes/index.tsx`
- `src/routes/g-struct.tsx`
- `src/components/site/Header.tsx`
- `src/components/site/Footer.tsx`
- `src/lib/routeMap.ts`
- `src/components/site/FAQ.tsx` (añadir pregunta)
- `public/sitemap.xml`

Crear:
- `src/routes/inversores.tsx`
- `src/routes/api/public/gstruct-waitlist.ts`
- `supabase/migrations/<timestamp>_gstruct_waitlist.sql`

No tocar: identidad visual, tokens, ETW bar, brief PDF, disclaimer, FAQ existente (solo se añade una pregunta), URLs actuales.