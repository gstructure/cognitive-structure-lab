# Reposicionamiento G-Structure → Tech Startup con G-Struct como producto principal

## Objetivo
Que cualquier visitante entienda en 5 segundos: **G-Structure es la startup, G-Struct es el producto, y los servicios (1:1, Enterprise, Workshop) son canales de validación.** Sin perder los flujos de conversión actuales (quiz, waitlist, formularios).

## Alcance prioritario
1. **Home** (`src/routes/index.tsx`) — narrativa madre
2. **G-Struct** (`src/routes/g-struct.tsx`) — página de producto
3. **Inversores** (`src/routes/inversores.tsx`) — refuerzo de tesis "core asset = G-Struct"
4. **Navegación + Footer** (`Header.tsx`, `Footer.tsx`) — jerarquía nueva
5. Páginas internas secundarias (Enterprise, 1:1, Sobre Guillermo, Aliados ETW, Únete al equipo, Contacto) — ajustes de copy y CTAs para alinear con la tesis

## Cambios concretos

### Navegación (Header)
Reordenar a: **G-Struct · Enterprise · REESTRUCTURA 1:1 · Inversores · Aliados ETW 2026 · Sobre Guillermo · Contacto**. G-Struct primero y visualmente destacado como "producto". Si hay overflow, agrupar "REESTRUCTURA 1:1 · Aliados · Sobre Guillermo" bajo un dropdown "Compañía / Ecosistema".

### Home — nueva arquitectura (orden estricto)
1. **Hero** — Eyebrow "TECH STARTUP · ETAPA TEMPRANA". H1: *"G-Structure está construyendo G-Struct."* Subhead: plataforma cognitivo-conductual… CTAs: `Explorar G-Struct` (primario) + `Conocer la visión de la startup` (→ /inversores). Visual: mockup de app + badge "Compañía → Producto".
2. **El problema: la crisis de ejecución** — bloque corto + 6 chips (procrastinación, perfeccionismo, sobreanálisis, evitación, autosabotaje, saturación).
3. **El producto: G-Struct** — card-grid de módulos (Diagnóstico, Quick Reframe, Laboratorio, Activador Matutino, Night Insight, Radar Cognitivo). Microcopy disclaimer: "No somos terapia. No diagnóstico clínico."
4. **Quiz / Diagnóstico** — `FrictionQuiz` reposicionado como "fase Identificar" del método I-R-O. Nuevo título "Empieza identificando tu patrón de ejecución" + subtítulo + CTA post-quiz hacia waitlist de G-Struct.
5. **Lista de espera de G-Struct** — `WaitlistForm` con copy puente "Tu patrón es el punto de partida…".
6. **Método I-R-O** — diagrama de 3 pasos como "sistema operativo".
7. **Canales de validación** — 4 tarjetas: 1:1 / Enterprise / Workshop / G-Struct App, presentadas como capas de una misma estrategia.
8. **Startup en etapa temprana** — bloque con rutas: usuarios / empresas / inversores / aliados / talento.
9. **CTAs finales** — Explorar G-Struct · Unirme a waitlist · Contactar.

Conservar: `FrictionQuiz`, `WaitlistForm`, todos los formularios y enlaces a waitlist/contacto existentes.

### Página G-Struct
- Hero refuerza: "Producto principal de G-Structure".
- Mantener waitlist y disclaimers existentes; ajustar headings y eyebrows para reforzar "producto de la startup".
- Añadir bloque "Cómo encaja en el ecosistema G-Structure" con link a Home / Inversores.

### Página Inversores
- Hero/tesis: enfatizar **G-Struct como core investable asset**; servicios = canales de validación, data y revenue temprano.
- Ajustar copy de stat cards y timeline solo donde refuerce esa tesis. No tocar mockup de teléfono, comparación de precios ni timeline visual ya construidos.

### Páginas secundarias (ajustes mínimos de copy/eyebrow)
- **Enterprise**: eyebrow "CANAL DE VALIDACIÓN B2B · G-STRUCTURE"; bloque "Cómo alimenta a G-Struct".
- **REESTRUCTURA 1:1**: eyebrow "CANAL DE VALIDACIÓN INDIVIDUAL"; bloque "Lo que aprendemos aquí construye G-Struct".
- **Sobre Guillermo**: añadir línea "Fundador de la startup que construye G-Struct" en hero.
- **Aliados ETW 2026**: bloque conectando workshop con activación/validación de G-Struct.
- **Únete al equipo**: eyebrow "STARTUP EN ETAPA TEMPRANA"; reframe "construyes producto, no apoyas una marca".
- **Contacto**: reorganizar opciones por intención (G-Struct / 1:1 / Enterprise / Inversión / Aliado / Equipo / Guillermo).

### Microcopy estratégico (insertar donde aplique)
- "No somos una app de terapia."
- "No hacemos diagnóstico clínico."
- "G-Struct es coaching, psicoeducación y optimización de ejecución."
- "G-Structure usa servicios y workshops como canales de validación."

### Visual
- Paleta y tipografía actuales (#05325a primary, #f8f8f4 bg, Montserrat) ya alineadas — no cambiar tokens.
- Más cards/diagramas, menos bloques largos. Diagrama de pirámide del ecosistema en sección "Canales de validación".
- Badge visual "Compañía → Producto" cerca del logo en hero para anclar la relación G-Structure / G-Struct.

## Lo que NO se toca
- Lógica de quiz, waitlist (Supabase realtime), formularios, analytics, tracking.
- Tokens de diseño en `styles.css`.
- Mockup de teléfono, price comparison, timeline visual de Inversores.
- Disclaimer legal, footer estructural, SEO/meta tags existentes (sólo se actualizan títulos/descripciones de Home y G-Struct para reflejar nuevo posicionamiento).

## Entregable
PR único con cambios incrementales por archivo, verificando build y que el flujo Quiz → Waitlist sigue intacto. QA visual rápido de Home en mobile + desktop al final.
