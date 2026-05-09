
-- Bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  package_slug TEXT NOT NULL,
  package_name TEXT NOT NULL,
  package_kind TEXT NOT NULL,
  price_usd INTEGER,
  slot_at TIMESTAMPTZ NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX bookings_slot_at_idx ON public.bookings (slot_at);

-- Blocked slots (admin-managed)
CREATE TABLE public.blocked_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slot_at TIMESTAMPTZ NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX blocked_slots_slot_at_idx ON public.blocked_slots (slot_at);

-- Public availability view (no PII)
CREATE OR REPLACE VIEW public.booked_slots AS
  SELECT slot_at FROM public.bookings WHERE status = 'confirmed'
  UNION
  SELECT slot_at FROM public.blocked_slots;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

-- Anyone (anonymous visitors) may insert a booking
CREATE POLICY "anyone_can_insert_booking"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- No SELECT for anon; service role bypasses RLS so admin reads work
-- Block_slots: no public read/write either (service role used by admin)
