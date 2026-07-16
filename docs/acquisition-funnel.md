# KAIRON acquisition funnel

Last updated: 2026-07-15

## Product position

G-Structure is the company. KAIRON is the main product. Kai is the AI execution coach inside KAIRON.

The public funnel should make one primary action obvious:

> Try KAIRON.

The website can still collect emails as a secondary fallback, but the primary CTA should send users to the active MVP.

## Primary app URL

Use the centralized helper in `src/lib/launchConfig.ts` instead of hardcoding app links:

```ts
kaironAppUrl(locale, content, phase)
```

Base app path:

```text
https://getkairon.app/start
```

Required campaign parameters:

```text
source=gstructure
campaign=aug11_launch
cohort=aug11_early_access
language=es|en
utm_source=gstructure
utm_medium=website
utm_campaign=aug11_launch
utm_content=<cta_location>
phase=<early_access|launch_week|live>
```

## Launch phases

The website derives the funnel phase from date:

- `early_access`: before 2026-08-04
- `launch_week`: 2026-08-04 through 2026-08-10
- `live`: 2026-08-11 onward

Temporary override for testing:

```text
VITE_KAIRON_LAUNCH_PHASE_OVERRIDE=early_access|launch_week|live
```

## Pricing copy

Initial KAIRON Pro pricing:

- LATAM / Ecuador first launch users: `$9.99/mo`
- United States / global users: `$18.99/mo`
- Trial: 7 days

Do not publish VIP pricing yet.

## Analytics events

The website uses the existing `gtag` integration. Do not add another analytics provider unless there is a separate product decision.

Acquisition events available in `src/lib/analytics.ts`:

- `homepage_viewed`
- `hero_cta_clicked`
- `section_cta_clicked`
- `pricing_viewed`
- `testimonial_expanded`
- `early_access_email_submitted`
- `outbound_app_opened`

Recommended GA4 conversions:

- `outbound_app_opened`
- `hero_cta_clicked`
- `pricing_viewed`
- app-side signup completion event, once emitted by the KAIRON app

## Canonical product routes

Canonical routes:

- Spanish: `/kairon`
- English: `/en/kairon`

Legacy redirects should remain:

- `/g-frame` -> `/kairon`
- `/en/g-frame` -> `/en/kairon`
- `/g-struct` -> `/kairon`
- `/en/g-struct` -> `/en/kairon`

## App-side follow-up

The KAIRON app already accepts the CTA path. To close the full funnel later, the app should:

- Preserve the campaign and UTM parameters from `/start` into signup metadata.
- Fire a signup completion event with source, campaign, cohort, language, and phase.
- Gate the PWA install prompt after the Scanner or first meaningful product moment, not immediately on landing.
- Add `scope`, screenshots, and shortcuts to the PWA manifest when the app team is ready.

## Copy guardrails

- Say KAIRON is active as an MVP.
- Say the commercial launch is August 11, 2026.
- Do not make the user choose between waitlist and product access at the top of the funnel.
- Use "Try KAIRON" / "Probar KAIRON" as the primary CTA.
- Avoid defensive positioning in hero copy. Explain what KAIRON does affirmatively: structured cognitive coaching guided by Kai that separates situation, emotion, and interpretation, then turns the reading into action.
