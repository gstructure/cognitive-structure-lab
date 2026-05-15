CREATE TABLE public.gstruct_waitlist (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  source text,
  locale text,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT gstruct_waitlist_email_key UNIQUE (email)
);

ALTER TABLE public.gstruct_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage waitlist"
ON public.gstruct_waitlist
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service role manages waitlist"
ON public.gstruct_waitlist
FOR ALL
TO public
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

CREATE INDEX gstruct_waitlist_created_at_idx ON public.gstruct_waitlist (created_at DESC);