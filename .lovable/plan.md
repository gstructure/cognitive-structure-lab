## G-Structure — Website premium

Construiré el website completo para G-Structure como una firma boutique de coaching cognitivo-conductual aplicado a la ejecución. Estética sobria, corporativa, geométrica y tecnológica — nada de wellness ni autoayuda.

### Sistema de diseño

**Paleta** (extendida sutilmente sobre la base de marca):
- `--background`: #f8f8f4 (blanco cálido)
- `--foreground` / `--brand`: #05325a (azul de marca)
- `--brand-deep`: #03223d (azul profundo, secciones de contraste)
- `--muted-foreground`: #697783 (gris)
- `--border`: gris claro derivado
- `--surface`: #ffffff (tarjetas)
- Acento sutil: línea fina azul, sin colores chillones

**Tipografía**:
- Headings: Montserrat (consistente con el logo)
- Body: Inter (mejor legibilidad web)
- Tracking amplio en eyebrows, jerarquía clara

**Lenguaje visual**:
- Mucho aire, grids estrictos, bordes finos 1px
- Eyebrows en mayúscula con tracking
- Numeración 01/02/03 en tarjetas de método
- Isotipo como marca de agua sutil en algunas secciones
- Sin imágenes stock; usaré composiciones geométricas sutiles

### Arquitectura de rutas (TanStack Router)

```
src/routes/
  __root.tsx          → Header + Footer compartidos
  index.tsx           → Inicio (home)
  enterprise.tsx      → Enterprise
  reestructura.tsx    → REESTRUCTURA 1:1
  g-struct.tsx        → G-Struct (paleta blanco/azul)
  sobre-guillermo.tsx → Sobre Guillermo
  contacto.tsx        → Contacto
  aliados-etw-2026.tsx → Aliados ETW 2026
  unete-al-equipo.tsx  → Únete al equipo
```

Cada ruta con `head()` propio: title, description, og:title, og:description únicos.

### Header

Logo izquierda + nav: Inicio · Enterprise · REESTRUCTURA 1:1 · G-Struct · Sobre Guillermo · Contacto + CTA "Agendar conversación". Mobile: drawer.

### Footer

Logo, tagline, contacto (guillermo@g-structure.co, +593 98 687 5121, www.g-structure.co), links rápidos, badge "Coaching cognitivo-conductual aplicado a la ejecución".

### Componentes reutilizables

- `SectionHeader` (eyebrow + h2 + subtítulo)
- `Card` (tarjeta limpia con borde fino)
- `MethodCard` (01/02/03 numeración)
- `CTAButton` (variants: primary, ghost)
- `Eyebrow`
- `BrandMark` (isotipo decorativo)

### Páginas — qué incluirá cada una

**Inicio**: Hero, badge ETW Host 2026, bloque de 2 anuncios estratégicos (Aliados / Equipo), Problema con 5 tarjetas, Mente como sistema operativo + cita destacada, Método I-R-O (3 tarjetas), Soluciones (4 tarjetas), Para quién es (2 columnas), Puente a G-Struct, Fundador + credenciales, CTA final.

**Enterprise**: Hero, Problema con tarjetas, Workshop de Diagnóstico (incluye lista), REESTRUCTURA Enterprise, Continuidad, CTA. Completaré las secciones que quedaron truncadas en el brief con copy fiel al tono y estructura ya establecidos.

**REESTRUCTURA 1:1**: Hero, problema individual, descripción del proceso, fases, para quién, qué incluye, CTA.

**G-Struct**: Paleta blanco/azul (#05325a + #ffffff). Hero con app en desarrollo, qué es, cómo se conecta con el método I-R-O, funcionalidades previstas (registro de patrones, ejercicios CBT estructurados, monitoreo, continuidad), estado actual, lista de espera/CTA.

**Sobre Guillermo**: Bio extendida, credenciales, formación, experiencia (docencia, MV Logos Hope, ÉPICO), enfoque metodológico, CTA conversar.

**Contacto**: Formulario (nombre, email, organización, contexto, mensaje), datos directos (email, WhatsApp), enlace a agendar, microcopy de qué esperar.

**Aliados ETW 2026**: Contexto del workshop, qué buscamos en aliados (experiencia / sede / contenido / marca), beneficios para aliados, formulario o CTA.

**Únete al equipo**: Áreas abiertas (producto, tecnología, ventas, marketing, negocios internacionales), qué buscamos, qué se ofrece (portafolio real, aprendizaje aplicado, posible continuidad), formulario.

### SEO

Cada ruta con metadata propia, H1 único, descripción <160 chars, semantic HTML, alt en imágenes, viewport responsive ya configurado.

### Logo

Esperaré a que subas el logo. Mientras tanto usaré un wordmark provisional "G-STRUCTURE" en Montserrat tracking amplio + un cuadrado geométrico como isotipo placeholder. Cuando subas el archivo lo reemplazo en header, footer y como marca de agua.

### Detalles técnicos

- styles.css: extender tokens en oklch (background, foreground, brand-deep, muted, border, surface), Montserrat + Inter por Google Fonts en `__root.tsx` head links.
- Variants de Button: `default`, `ghost`, `outline` ya disponibles; añadiré `hero` si hace falta.
- Sin librerías extra — solo lo ya instalado (shadcn, lucide, tailwind v4).
- Respetando la regla: nada de `text-white` / `bg-black` en componentes; todo vía tokens.

### Notas

- El brief se cortó en mitad de Enterprise. Completaré las páginas faltantes con copy fiel al tono, mensajes clave y estructura ya establecidos en el resto del documento. Si prefieres revisar copy específico antes de que lo escriba, dímelo.
- No implementaré toggle dark/light (no es prioridad).
- El formulario de contacto será solo frontend de momento (mailto / WhatsApp link). Si quieres envío real con Lovable Cloud, dímelo y lo activamos.
