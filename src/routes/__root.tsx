import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LocaleProvider } from "@/lib/i18n";
import { WhatsAppFAB } from "@/components/site/WhatsAppFAB";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl font-display font-semibold tracking-tight">Página no encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display font-semibold">Esta página no se cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocurrió un problema. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center bg-foreground px-5 py-3 text-[13px] font-medium text-background"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-foreground/30 px-5 py-3 text-[13px] font-medium text-foreground"
          >
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "G-Structure | Coaching Cognitivo-Conductual para Ejecución" },
      {
        name: "description",
        content:
          "Coaching cognitivo-conductual para líderes, profesionales y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución.",
      },
      { name: "author", content: "G-Structure" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "G-Structure | Coaching Cognitivo-Conductual para Ejecución" },
      { name: "twitter:title", content: "G-Structure | Coaching Cognitivo-Conductual para Ejecución" },
      { name: "description", content: "Coaching cognitivo-conductual para líderes y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución." },
      { property: "og:description", content: "Coaching cognitivo-conductual para líderes y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución." },
      { name: "twitter:description", content: "Coaching cognitivo-conductual para líderes y equipos que buscan superar procrastinación, perfeccionismo y bloqueos de ejecución." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Je5n00n0siaOKAzfx3HmB52X2ke2/social-images/social-1778275109597-G-Structure_Banner.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/Je5n00n0siaOKAzfx3HmB52X2ke2/social-images/social-1778275109597-G-Structure_Banner.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
