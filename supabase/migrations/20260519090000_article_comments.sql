CREATE TABLE IF NOT EXISTS public.article_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_slug TEXT NOT NULL,
  author_name TEXT NOT NULL CHECK (char_length(author_name) BETWEEN 2 AND 120),
  author_email TEXT NOT NULL CHECK (char_length(author_email) <= 255),
  body TEXT NOT NULL CHECK (char_length(body) BETWEEN 12 AND 1200),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  user_agent TEXT,
  ip_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS article_comments_article_status_created_idx
  ON public.article_comments (article_slug, status, created_at);

ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved article comments are public" ON public.article_comments;
CREATE POLICY "Approved article comments are public"
  ON public.article_comments
  FOR SELECT
  USING (status = 'approved');
