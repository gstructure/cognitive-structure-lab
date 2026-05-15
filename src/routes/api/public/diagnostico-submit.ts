import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { computeResults, dimensionLabel, triggerLabel, emotionLabel, behaviorLabel, impactLabel } from "@/lib/diagnostic/scoring";
import { recommendProgram, getMixedProfileForResults, buildReportText, getWeeklyPathway, shouldShowEnterprise } from "@/lib/diagnostic/interpretations";
import { sendDiagnosticReportEmail } from "@/lib/diagnostic-emails.server";

const Schema = z.object({
  user: z.object({
    full_name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(200),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    country: z.string().trim().max(80),
    city: z.string().trim().max(80),
    company: z.string().trim().max(160),
    role: z.string().trim().max(120),
    department: z.string().trim().max(120),
    responsibility_level: z.string().trim().max(80),
    main_reason: z.string().trim().max(120),
    company_size: z.string().trim().max(40).optional().or(z.literal("")),
    sector: z.string().trim().max(80).optional().or(z.literal("")),
    years_experience: z.string().trim().max(40).optional().or(z.literal("")),
    privacy_accepted: z.literal(true),
    anonymous_research_accepted: z.boolean(),
  }),
  likert: z.record(z.string(), z.number().int().min(1).max(5)),
  triggers: z.array(z.object({ id: z.string(), intensity: z.number().int().min(1).max(5) })).max(3),
  emotions: z.array(z.object({ id: z.string(), intensity: z.number().int().min(0).max(10) })).max(10),
  behaviors: z.array(z.object({ id: z.string(), frequency: z.number().int().min(1).max(5) })).max(3),
  impact: z.record(z.string(), z.number().int().min(1).max(5)),
});

export const Route = createFileRoute("/api/public/diagnostico-submit")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ error: "invalid_json" }, { status: 400 }); }
        const parsed = Schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "validation_failed", issues: parsed.error.issues.map((i) => i.message) }, { status: 400 });
        }
        const d = parsed.data;
        // Need all 40 likert + 10 impact
        if (Object.keys(d.likert).length !== 40 || Object.keys(d.impact).length !== 10) {
          return Response.json({ error: "incomplete" }, { status: 400 });
        }

        const url = process.env.SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
        if (!url || !key) return Response.json({ error: "server_misconfigured" }, { status: 500 });
        const supabase = createClient(url, key, { auth: { persistSession: false } });

        const r = computeResults({
          likert: d.likert, triggers: d.triggers, emotions: d.emotions,
          behaviors: d.behaviors, impact: d.impact,
        });
        const rec = recommendProgram(r.ifeGs);
        const mixed = getMixedProfileForResults(r);
        const reportText = buildReportText(r);
        const showEnterprise = shouldShowEnterprise(d.user.responsibility_level, d.user.main_reason);

        const nowIso = new Date().toISOString();
        const ua = request.headers.get("user-agent") || null;

        const { data: userRow, error: uErr } = await supabase.from("diagnostic_users").insert({
          full_name: d.user.full_name,
          email: d.user.email,
          phone: d.user.phone || null,
          country: d.user.country,
          city: d.user.city,
          company: d.user.company,
          role: d.user.role,
          department: d.user.department,
          responsibility_level: d.user.responsibility_level,
          main_reason: d.user.main_reason,
          company_size: d.user.company_size || null,
          sector: d.user.sector || null,
          years_experience: d.user.years_experience || null,
          privacy_accepted: d.user.privacy_accepted,
          privacy_accepted_at: nowIso,
          anonymous_research_accepted: d.user.anonymous_research_accepted,
          anonymous_research_accepted_at: d.user.anonymous_research_accepted ? nowIso : null,
          user_agent: ua,
        }).select("id").single();
        if (uErr || !userRow) {
          console.error("diag user insert", uErr);
          return Response.json({ error: "db_error" }, { status: 500 });
        }

        await supabase.from("diagnostic_responses").insert({
          user_id: userRow.id,
          likert: d.likert, triggers: d.triggers, emotions: d.emotions,
          behaviors: d.behaviors, impact: d.impact,
        });

        await supabase.from("diagnostic_results").insert({
          user_id: userRow.id,
          p_raw: r.rawByDim.P, pe_raw: r.rawByDim.PE, as_raw: r.rawByDim.AS, pi_raw: r.rawByDim.PI,
          p_percent: r.pctByDim.P, pe_percent: r.pctByDim.PE, as_percent: r.pctByDim.AS, pi_percent: r.pctByDim.PI,
          dominant_pattern: dimensionLabel(r.dominant),
          secondary_pattern: dimensionLabel(r.secondary),
          pattern_difference: r.patternDifference,
          mixed_profile_type: r.mixedProfileType,
          mixed_profile_name: mixed?.name || null,
          pp_score: r.pp,
          ip_raw: r.ipRaw, ip_percent: r.ipPercent,
          iae_score: r.iae, icr_score: r.icr,
          ife_gs_score: r.ifeGs, friction_level: r.frictionLevel,
          dominant_trigger: triggerLabel(r.dominantTrigger),
          dominant_emotion: emotionLabel(r.dominantEmotion),
          dominant_response_behavior: behaviorLabel(r.dominantBehavior),
          top_productivity_impact_1: r.topImpactAreas[0] ? impactLabel(r.topImpactAreas[0]) : null,
          top_productivity_impact_2: r.topImpactAreas[1] ? impactLabel(r.topImpactAreas[1]) : null,
          top_productivity_impact_3: r.topImpactAreas[2] ? impactLabel(r.topImpactAreas[2]) : null,
          recommended_program: rec.program,
          recommended_duration: rec.duration,
          recommended_pathway: mixed?.pathway || null,
          bridge_action: rec.message,
          report_text: reportText,
        });

        const path = getWeeklyPathway(rec.duration, r.dominant);
        await supabase.from("admin_followup_recommendations").insert({
          user_id: userRow.id,
          recommended_program: rec.program,
          recommended_duration: rec.duration,
          week_1_focus: path.weeks[0] || null,
          week_2_focus: path.weeks[1] || null,
          week_3_focus: path.weeks[2] || null,
          week_4_focus: path.weeks[3] || null,
          week_5_focus: path.weeks[4] || null,
          week_6_focus: path.weeks[5] || null,
          week_7_focus: path.weeks[6] || null,
          week_8_focus: path.weeks[7] || null,
          sales_priority: r.ifeGs >= 61 ? "alta" : r.ifeGs >= 41 ? "media" : "normal",
          follow_up_status: "nuevo",
          admin_notes: path.focus,
        });

        // Await so the Worker doesn't terminate before the email is enqueued.
        try {
          await sendDiagnosticReportEmail({
            recipientEmail: d.user.email,
            idempotencyKey: `diagreport-${userRow.id}`,
            templateData: {
              name: d.user.full_name,
              company: d.user.company,
              role: d.user.role,
              dominantPattern: dimensionLabel(r.dominant),
              secondaryPattern: dimensionLabel(r.secondary),
              mixedProfile: mixed?.name,
              ifeGs: r.ifeGs,
              frictionLevel: r.frictionLevel,
              dominantTrigger: triggerLabel(r.dominantTrigger),
              dominantEmotion: emotionLabel(r.dominantEmotion),
              dominantBehavior: behaviorLabel(r.dominantBehavior),
              topImpactArea: r.topImpactAreas[0] ? impactLabel(r.topImpactAreas[0]) : null,
              recommendedProgram: rec.program,
              recommendedDuration: rec.duration,
              showEnterprise,
            },
          });
        } catch (e) {
          console.error("[diag] email failed", e);
        }

        return Response.json({ ok: true, id: userRow.id, results: r, recommendation: rec, mixed, reportText, showEnterprise });
      },
    },
  },
});
