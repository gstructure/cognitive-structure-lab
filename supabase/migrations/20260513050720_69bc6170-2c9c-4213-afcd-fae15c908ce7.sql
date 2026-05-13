
-- Diagnostic users
CREATE TABLE public.diagnostic_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  city TEXT,
  company TEXT,
  role TEXT,
  department TEXT,
  responsibility_level TEXT,
  main_reason TEXT,
  company_size TEXT,
  sector TEXT,
  years_experience TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  privacy_accepted_at TIMESTAMPTZ,
  anonymous_research_accepted BOOLEAN NOT NULL DEFAULT false,
  anonymous_research_accepted_at TIMESTAMPTZ,
  user_agent TEXT,
  ip_hash TEXT
);
CREATE INDEX idx_diag_users_created ON public.diagnostic_users (created_at DESC);
CREATE INDEX idx_diag_users_email ON public.diagnostic_users (email);

-- Responses
CREATE TABLE public.diagnostic_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.diagnostic_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  likert JSONB NOT NULL,
  triggers JSONB NOT NULL,
  emotions JSONB NOT NULL,
  behaviors JSONB NOT NULL,
  impact JSONB NOT NULL
);
CREATE INDEX idx_diag_responses_user ON public.diagnostic_responses (user_id);

-- Results
CREATE TABLE public.diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.diagnostic_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  p_raw INT NOT NULL,
  pe_raw INT NOT NULL,
  as_raw INT NOT NULL,
  pi_raw INT NOT NULL,
  p_percent NUMERIC NOT NULL,
  pe_percent NUMERIC NOT NULL,
  as_percent NUMERIC NOT NULL,
  pi_percent NUMERIC NOT NULL,
  dominant_pattern TEXT NOT NULL,
  secondary_pattern TEXT NOT NULL,
  pattern_difference NUMERIC NOT NULL,
  mixed_profile_type TEXT NOT NULL,
  mixed_profile_name TEXT,
  pp_score NUMERIC NOT NULL,
  ip_raw INT NOT NULL,
  ip_percent NUMERIC NOT NULL,
  iae_score NUMERIC NOT NULL,
  icr_score NUMERIC NOT NULL,
  ife_gs_score NUMERIC NOT NULL,
  friction_level TEXT NOT NULL,
  dominant_trigger TEXT,
  dominant_emotion TEXT,
  dominant_response_behavior TEXT,
  top_productivity_impact_1 TEXT,
  top_productivity_impact_2 TEXT,
  top_productivity_impact_3 TEXT,
  recommended_program TEXT NOT NULL,
  recommended_duration TEXT NOT NULL,
  recommended_pathway TEXT,
  bridge_action TEXT,
  report_text TEXT,
  admin_notes TEXT
);
CREATE INDEX idx_diag_results_user ON public.diagnostic_results (user_id);
CREATE INDEX idx_diag_results_created ON public.diagnostic_results (created_at DESC);

-- Followup
CREATE TABLE public.admin_followup_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.diagnostic_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  recommended_program TEXT,
  recommended_duration TEXT,
  week_1_focus TEXT,
  week_2_focus TEXT,
  week_3_focus TEXT,
  week_4_focus TEXT,
  week_5_focus TEXT,
  week_6_focus TEXT,
  week_7_focus TEXT,
  week_8_focus TEXT,
  sales_priority TEXT DEFAULT 'normal',
  follow_up_status TEXT NOT NULL DEFAULT 'nuevo',
  admin_notes TEXT
);
CREATE INDEX idx_diag_followup_user ON public.admin_followup_recommendations (user_id);

-- Enable RLS
ALTER TABLE public.diagnostic_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnostic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_followup_recommendations ENABLE ROW LEVEL SECURITY;

-- Admin-only policies (no public insert; server uses service role which bypasses RLS)
CREATE POLICY "Admins manage diag users" ON public.diagnostic_users
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage diag responses" ON public.diagnostic_responses
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage diag results" ON public.diagnostic_results
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage diag followup" ON public.admin_followup_recommendations
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- updated_at trigger for followup
CREATE OR REPLACE FUNCTION public.diag_set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE TRIGGER trg_diag_followup_updated
BEFORE UPDATE ON public.admin_followup_recommendations
FOR EACH ROW EXECUTE FUNCTION public.diag_set_updated_at();
