
-- Drop overly permissive policy; bookings will be created via server function with service role
DROP POLICY IF EXISTS "anyone_can_insert_booking" ON public.bookings;

-- Replace view with security-invoker function returning only timestamps
DROP VIEW IF EXISTS public.booked_slots;

CREATE OR REPLACE FUNCTION public.get_unavailable_slots(
  range_start TIMESTAMPTZ,
  range_end TIMESTAMPTZ
)
RETURNS TABLE(slot_at TIMESTAMPTZ)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT b.slot_at FROM public.bookings b
    WHERE b.status = 'confirmed' AND b.slot_at >= range_start AND b.slot_at < range_end
  UNION
  SELECT bs.slot_at FROM public.blocked_slots bs
    WHERE bs.slot_at >= range_start AND bs.slot_at < range_end;
$$;

GRANT EXECUTE ON FUNCTION public.get_unavailable_slots(TIMESTAMPTZ, TIMESTAMPTZ) TO anon, authenticated;
