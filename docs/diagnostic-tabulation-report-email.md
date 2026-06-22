# Diagnóstico de Fricción Ejecutiva — Tabulación, Reporte y Email

This document describes the **end-to-end process** that runs after a user completes the
*Diagnóstico de Fricción Ejecutiva (IGPE V1.1)*: how raw answers are tabulated, how the
narrative report is built, what is persisted to the database, and exactly how the report
email is crafted and delivered.

It is the authoritative reference for the scoring formulas and report-generation logic.

---

## 0. Source files map

| Concern | File |
|---|---|
| Item catalog (questions, scales, labels) | `src/lib/diagnostic/items.ts` |
| Scoring engine (formulas) | `src/lib/diagnostic/scoring.ts` |
| Interpretations, recommendation, report text | `src/lib/diagnostic/interpretations.ts` |
| Submission endpoint (orchestration + DB writes) | `src/routes/api/public/diagnostico-submit.ts` |
| Email dispatcher (queue + suppression + unsubscribe) | `src/lib/diagnostic-emails.server.ts` |
| Email template (visual report) | `src/lib/email-templates/diagnostic-report.tsx` |

---

## 1. Inputs collected from the user

The submission payload (validated with Zod in `diagnostico-submit.ts`) has five answer
blocks plus profile data:

| Block | Shape | Constraints |
|---|---|---|
| `user` | Profile object | name, email, company, role, responsibility level, main reason, consent flags, etc. |
| `likert` | `{ [itemId]: 1–5 }` | **Must contain exactly 40 items** |
| `triggers` | `[{ id, intensity: 1–5 }]` | up to 3 |
| `emotions` | `[{ id, intensity: 0–10 }]` | up to 10 |
| `behaviors` | `[{ id, frequency: 1–5 }]` | up to 3 |
| `impact` | `{ [areaId]: 1–5 }` | **Must contain exactly 10 items** |

If `likert` ≠ 40 keys or `impact` ≠ 10 keys, the request is rejected with `incomplete`.

### The 4 dimensions (the heart of the model)

The 40 Likert items are split 10-per-dimension:

| Key | Dimension | IDs |
|---|---|---|
| `P`  | Procrastinación de Ejecución | P1–P10 |
| `PE` | Perfeccionismo de Ejecución | PE1–PE10 |
| `AS` | Autosabotaje de Ejecución | AS1–AS10 |
| `PI` | Patrón del Impostor en Ejecución | PI1–PI10 |

Likert scale: `1 Casi nunca → 5 Casi siempre`.

Other catalogs: 12 triggers (`T1–T12`), 10 emotions (`E1–E10`), 12 behaviors
(`CR1–CR12`), 10 impact areas (`IP1–IP10`).

---

## 2. Tabulation / scoring engine (`computeResults`)

All math is done in `scoring.ts`. The client may compute a preview, but the **server is the
source of truth** — it recomputes everything on submit.

### 2.1 Per-dimension raw and percentage

For each dimension, sum its 10 Likert answers (range 10–50), then convert to a percentage of
the max (50):

```
rawByDim[D]  = Σ answers for the 10 items of D       // 10..50
pctByDim[D]  = (rawByDim[D] / 50) * 100              // 20..100 %
```

### 2.2 Dominant / secondary pattern

Sort the four dimensions by percentage, descending.

```
dominant          = highest-% dimension
secondary         = second-highest dimension
patternDifference = pctByDim[dominant] - pctByDim[secondary]
```

### 2.3 Mixed-profile classification

Based on the gap between dominant and secondary:

| `patternDifference` | `mixedProfileType` |
|---|---|
| ≤ 10 | **Perfil mixto fuerte** |
| ≤ 20 | **Patrón dominante con componente secundario** |
| > 20 | **Patrón dominante claro** |

When the type is *not* "Patrón dominante claro", a named mixed profile is looked up by the
`dominant+secondary` pair (e.g. `PE+PI → "Sobrecontrol por validación"`). Pair lookup is
order-insensitive (`getMixedProfile` tries both `D+S` and `S+D`).

### 2.4 Composite scores

```
PP  (Puntaje de Patrón)        = (pctByDim[dominant] + pctByDim[secondary]) / 2

ipRaw                          = Σ impact answers (10 items, each 1–5)   // 10..50
ipPercent                      = (ipRaw / 50) * 100                       // %

IAE (Índice de Activación      = avg(intensity of top-3 emotions) * 10    // 0..100
     Emocional)                  (emotion intensities are 0–10)

ICR (Índice de Conducta de     = avg(frequency of selected behaviors) * 20 // 20..100
     Respuesta)                  (frequency 1–5; 0 if none selected)
```

### 2.5 IFE-GS — the headline index

The **Índice de Fricción Ejecutiva G-Structure** is the weighted blend that drives the
recommendation:

```
IFE-GS = PP * 0.45 + ipPercent * 0.35 + IAE * 0.20
```

> Note: `ICR` is computed and stored for analysis but is **not** part of the IFE-GS formula.

### 2.6 Friction level (banding of IFE-GS)

| IFE-GS | `frictionLevel` |
|---|---|
| ≤ 20 | Fricción mínima |
| ≤ 40 | Fricción leve |
| ≤ 60 | Fricción moderada |
| ≤ 80 | Fricción alta |
| > 80 | Fricción crítica |

### 2.7 Dominant signals & top impact areas

```
dominantTrigger  = trigger with highest intensity
dominantEmotion  = emotion with highest intensity (top of the top-3)
dominantBehavior = behavior with highest frequency
topImpactAreas   = impact areas sorted by value desc, take top 3, drop zeros
```

---

## 3. Interpretation & recommendation (`interpretations.ts`)

### 3.1 Narrative report text (`buildReportText`)

Produces a plain-text, multi-paragraph reading assembled from:

1. **Summary line** — dominant % , secondary %, IFE-GS, friction level.
2. **Dominant reading** — fixed paragraph per dimension from `DOMINANT_INTERPRETATIONS`
   (each has `reading`, `productivityImpact`, `intervention`).
3. **Mixed profile** — added only when type ≠ "Patrón dominante claro" (name + reading).
4. **Signals line** — dominant trigger, emotion, response behavior.
5. **Impact line** — the top affected productive areas.

This text is stored in `diagnostic_results.report_text`.

### 3.2 Program recommendation (`recommendProgram`) — by IFE-GS

| IFE-GS | Program | Duration | Tone of message |
|---|---|---|---|
| ≤ 40 | REESTRUCTURA 1:1 | 4 semanas | manageable, brief focused intervention |
| ≤ 60 | REESTRUCTURA 1:1 | 6 semanas | moderate friction |
| ≤ 80 | REESTRUCTURA 1:1 | 8 semanas | high friction, sustained follow-up |
| > 80 | REESTRUCTURA 1:1 | 8 semanas intensivo | critical friction, deep structured process |

### 3.3 Enterprise CTA (`shouldShowEnterprise`)

Returns `true` if `main_reason === "Llevar este diagnóstico a mi empresa"` **or** the
responsibility level is one of: Fundador/CEO/Dirección general, Alta dirección, Gerencia
media. Controls the secondary "enterprise" CTA in the email.

### 3.4 Weekly pathway (`getWeeklyPathway`)

Selects an 4/6/8-week curriculum (`PATHWAY_4/6/8`) based on the recommended duration, plus a
pattern-specific `focus` line keyed by the dominant dimension. Used only to populate the
internal admin follow-up record (not the user email).

---

## 4. Persistence (on submit)

The endpoint uses the **service-role** Supabase client (server-only) and writes, in order:

1. **`diagnostic_users`** — profile + consent timestamps + user-agent. Returns `id`.
2. **`diagnostic_responses`** — raw `likert/triggers/emotions/behaviors/impact` JSON.
3. **`diagnostic_results`** — all computed values: raw & % per dimension, dominant/secondary
   labels, `pattern_difference`, mixed profile, PP, IP raw/%, IAE, ICR, IFE-GS, friction
   level, dominant trigger/emotion/behavior labels, top-3 impact labels, recommended
   program/duration/pathway, bridge action, and `report_text`.
4. **`admin_followup_recommendations`** — internal sales/coaching record: program, duration,
   weeks 1–8 focus, `admin_notes` (pattern focus), `follow_up_status = "nuevo"`, and
   `sales_priority`:
   - IFE-GS ≥ 61 → `alta`
   - IFE-GS ≥ 41 → `media`
   - else → `normal`

All DB writes complete **before** the email is enqueued so the Worker does not terminate
early. A failure on the user insert returns `db_error`; an email failure is logged but does
**not** fail the request.

The endpoint responds with `{ ok, id, results, recommendation, mixed, reportText, showEnterprise }`
so the frontend can render the on-screen result immediately.

---

## 5. The report email

### 5.1 What data is sent to the template

`diagnostico-submit.ts` calls `sendDiagnosticReportEmail` with:

- `recipientEmail` = user email
- `idempotencyKey` = `diagreport-<userId>` (prevents duplicate sends on retry)
- `templateData`: name, company, role, dominant/secondary pattern labels, mixed profile,
  IFE-GS, friction level, dominant trigger/emotion/behavior, **top impact area (only the
  first)**, recommended program & duration, and `showEnterprise`.

### 5.2 Dispatcher logic (`diagnostic-emails.server.ts`)

The dispatcher is deliberately defensive and queue-based:

1. Build service-role client; bail with `server_misconfigured` if env missing.
2. Resolve the `diagnostic-report` template from the registry.
3. **Suppression check** — if the recipient is in `suppressed_emails`, silently return
   `{ ok: true }` (no send).
4. **Unsubscribe token** — `getOrCreateUnsubToken`: reuse an active token, return `null`
   (skip send) if the address previously unsubscribed (`used_at` set), otherwise mint a new
   32-byte hex token and upsert it.
5. **Render** the React Email component to both `html` and `text`; resolve the `subject`.
6. Insert a `pending` row into `email_send_log` (keyed by a fresh `message_id`).
7. **Enqueue** via `supabase.rpc("enqueue_email", …)` onto the `transactional_emails` queue
   with: message id, `to`, `from = "G-Structure <noreply@g-structure.co>"`,
   `sender_domain = notify.g-structure.co`, subject/html/text, `purpose = transactional`,
   `label = diagnostic-report`, idempotency key, unsubscribe token, queued timestamp.
8. On enqueue error: log it and insert a `failed` row in `email_send_log`.

Actual delivery is handled asynchronously by the shared email queue processor
(`/lovable/email/queue/process` via pg_cron) — the dispatcher only **enqueues**.

### 5.3 The visual report (`diagnostic-report.tsx`)

A branded React Email layout (brand colors `#05325a` / `#f8f8f4`) containing:

- Header (G-Structure · Diagnóstico de Fricción Ejecutiva) and a personal greeting.
- A **summary card** with one row each for: dominant pattern, secondary pattern, mixed
  profile (if any), `IFE-GS (frictionLevel)`, dominant trigger, dominant emotion, principal
  behavior, most-affected productive area, and the recommendation
  (`program — duration`). Rows render only when their value exists.
- A primary WhatsApp CTA to book REESTRUCTURA 1:1, and — when `showEnterprise` is true — a
  secondary enterprise CTA.
- A clinical-disclaimer note (functional self-perception reading, not a clinical diagnosis)
  and the footer. The unsubscribe footer is appended automatically by the email system —
  never add it in the template.

> The email carries the **headline summary**; the full narrative `report_text` lives in the
> database and powers the on-screen result and admin follow-up.

---

## 6. End-to-end sequence

```text
User submits 40 Likert + triggers + emotions + behaviors + 10 impact + profile
        │
        ▼
POST /api/public/diagnostico-submit
        │  Zod validate → require 40 likert & 10 impact
        ▼
computeResults()  ── raw/%, dominant/secondary, PP, IP%, IAE, ICR, IFE-GS, level, signals
        │
        ├─ recommendProgram(IFE-GS)         → program + duration + message
        ├─ getMixedProfileForResults()      → named mixed profile (if applicable)
        ├─ buildReportText()                → narrative report
        ├─ shouldShowEnterprise()           → enterprise CTA flag
        └─ getWeeklyPathway()               → weekly curriculum (admin)
        │
        ▼
DB writes: diagnostic_users → diagnostic_responses → diagnostic_results
           → admin_followup_recommendations (sales_priority by IFE-GS)
        │
        ▼
sendDiagnosticReportEmail()
        suppression check → unsubscribe token → render html/text
        → email_send_log (pending) → enqueue_email (transactional_emails)
        │
        ▼
Queue processor delivers the branded summary email to the user
        │
        ▼
Response { ok, id, results, recommendation, mixed, reportText, showEnterprise }
```

---

## 7. Quick reference — formulas

```
pctByDim[D] = rawByDim[D] / 50 * 100
PP          = (pct[dominant] + pct[secondary]) / 2
ipPercent   = ipRaw / 50 * 100
IAE         = avg(top-3 emotion intensities) * 10
ICR         = avg(selected behavior frequencies) * 20      (stored, not in IFE-GS)
IFE-GS      = PP*0.45 + ipPercent*0.35 + IAE*0.20
sales_priority = IFE-GS>=61 ? alta : IFE-GS>=41 ? media : normal
```
