# Diagnóstico de Fricción Ejecutiva G-Structure (IGPE V1.1)

Construcción de una herramienta diagnóstica privada completa con landing, test, cálculo, reporte, email automático, base de datos y panel admin.

## Alcance funcional

1. **Página privada** `/diagnostico-friccion-ejecutiva` (no en menú, footer ni sitemap; `noindex`).
2. **Formulario inicial** de datos (obligatorios + opcionales) + 2 checkboxes de consentimiento + link a política de privacidad.
3. **Test IGPE V1.1** mobile-first, tarjeta-por-pregunta, barra de progreso, botones Atrás/Siguiente, autosave en `localStorage`:
   - Sección A: 40 ítems Likert (P, PE, AS, PI — 10 c/u)
   - Sección B: hasta 3 triggers + intensidad 1–5
   - Sección C: emociones 0–10 (top 3 cuentan)
   - Sección D: hasta 3 conductas + frecuencia 1–5
   - Sección E: 10 ítems impacto productivo 1–5
4. **Cálculo** completo en cliente y verificación en servidor (fórmulas P_raw, %, PP, IP, IAE, ICR, IFE_GS, nivel, perfil mixto, dominante/secundario).
5. **Reporte inmediato premium** con 7 secciones (resumen, barras, lectura funcional, impacto, pronóstico, ruta, CTAs WhatsApp + email). Texto generado desde catálogo de interpretaciones por patrón dominante y por perfil mixto (P+PE, P+PI, P+AS, PE+PI, PE+AS, AS+PI).
6. **Email automático** al usuario vía sistema de app emails de Lovable Cloud (template React Email con branding G-Structure, asunto, resumen, CTAs WhatsApp).
7. **Base de datos** Supabase: `diagnostic_users`, `diagnostic_responses`, `diagnostic_results`, `admin_followup_recommendations` con RLS estricta (solo admin lee; insert público vía server route con service role).
8. **Panel admin** bajo `/admin/diagnosticos` (protegido por rol `admin` existente):
   - Dashboard: total, IFE-GS promedio, distribución por patrón, por cargo/empresa, leads enterprise, alta/crítica fricción
   - Lista filtrable (patrón, nivel, empresa, recomendación, fecha)
   - Vista detalle con respuestas, resultados, reporte, ruta sugerida 4/6/8 semanas personalizada por patrón dominante, estado de seguimiento editable, copiar resumen WhatsApp, export CSV
9. **Política de privacidad**: extender la página existente `politicas-legales.tsx` con sección específica del diagnóstico (datos recogidos, uso, no clínico, anonimización, eliminación, contacto).

## Detalles técnicos

### Backend

- **Migración Supabase**: 4 tablas + RLS (`admin` lee/edita todo, ninguna inserción anon directa) + trigger `updated_at` donde aplique.
- **Server route público** `/api/public/diagnostico/submit`:
  - Valida payload con Zod
  - Verifica consentimientos
  - Recalcula scoring server-side (fuente de verdad)
  - Inserta `diagnostic_users` + `diagnostic_responses` + `diagnostic_results` + fila inicial `admin_followup_recommendations` con plan semanal según patrón/duración
  - Encola email via `enqueue_email` (template `diagnostic-report`)
  - Devuelve `{ id, results }` para mostrar reporte
- **Server functions admin** (`requireSupabaseAuth` + verificación rol admin):
  - `listDiagnostics(filters)`, `getDiagnostic(id)`, `updateFollowup(id, status, notes)`, `exportCsv()`
- **Template email** `diagnostic-report.tsx` registrado en `registry.ts`. Requiere `setup_email_infra` ya activo (lo está).

### Frontend

- Rutas nuevas:
  - `src/routes/diagnostico-friccion-ejecutiva.tsx` (landing + flujo wizard)
  - `src/routes/_admin/admin.diagnosticos.tsx` (lista)
  - `src/routes/_admin/admin.diagnosticos.$id.tsx` (detalle)
- Componentes en `src/components/diagnostic/`: `Landing`, `IntakeForm`, `ConsentStep`, `LikertCard`, `TriggersStep`, `EmotionsStep`, `BehaviorsStep`, `ImpactStep`, `ReviewStep`, `LoadingCalc`, `ReportView`, `ScoreBar`.
- Catálogo de contenido en `src/lib/diagnostic/`: `items.ts` (40 Likert + listas), `scoring.ts` (fórmulas — usado en cliente y servidor), `interpretations.ts` (lecturas dominantes + 6 perfiles mixtos), `recommendations.ts` (programa + ruta semanal), `whatsapp.ts` (links).
- `noindex` meta tag en la landing y exclusión de `sitemap.xml` y nav.

### Branding

- Tokens G-Structure ya existentes en `src/styles.css` (azul `#05325a`, gris `#697783`, fondo `#f8f8f4`). Nada hardcodeado en componentes.
- Disclaimer no-clínico visible en: landing, antes de test, reporte, email.

## Lo que voy a pedir aprobar primero

Migración Supabase con las 4 tablas y RLS. Tras aprobación procedo con código en una sola tanda.

## Fuera de alcance (para confirmar luego)

- Versión en inglés del diagnóstico
- PDF descargable del reporte (puedo añadirlo después si lo necesitas; por ahora reporte en pantalla + email HTML)
- Login separado para usuarios del diagnóstico (no es necesario; el admin usa el login existente)
