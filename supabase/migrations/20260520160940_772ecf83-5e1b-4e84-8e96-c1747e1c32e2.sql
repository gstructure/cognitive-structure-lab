CREATE TABLE IF NOT EXISTS public.support_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  support_tier TEXT NOT NULL CHECK (support_tier IN ('early', 'builder', 'founding', 'strategic')),
  amount_usd NUMERIC(10, 2) NOT NULL CHECK (amount_usd >= 25),
  supporter_name TEXT CHECK (supporter_name IS NULL OR char_length(supporter_name) <= 120),
  supporter_email TEXT NOT NULL CHECK (char_length(supporter_email) <= 255),
  wants_public_recognition BOOLEAN NOT NULL DEFAULT false,
  supporter_message TEXT CHECK (supporter_message IS NULL OR char_length(supporter_message) <= 800),
  payment_status TEXT NOT NULL DEFAULT 'captured' CHECK (payment_status IN ('captured', 'refunded', 'disputed')),
  paypal_order_id TEXT NOT NULL UNIQUE,
  paypal_capture_id TEXT UNIQUE,
  paypal_payer_email TEXT,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS support_payments_created_at_idx
  ON public.support_payments (created_at DESC);

CREATE INDEX IF NOT EXISTS support_payments_tier_created_idx
  ON public.support_payments (support_tier, created_at DESC);

ALTER TABLE public.support_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins manage support payments" ON public.support_payments;
CREATE POLICY "Admins manage support payments"
ON public.support_payments
FOR ALL
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'admin'::app_role))
WITH CHECK (public.has_role((SELECT auth.uid()), 'admin'::app_role));