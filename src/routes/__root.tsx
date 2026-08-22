import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import fontsCss from "../styles/fonts.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { LocaleProvider } from "@/lib/i18n";
import { WhatsAppFAB } from "@/components/site/WhatsAppFAB";
import { ScrollTopButton } from "@/components/site/ScrollTopButton";

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
      { title: "G-Structure | KAIRON, AI cognitive coaching for execution" },
      {
        name: "description",
        content:
          "G-Structure es una tech startup construyendo KAIRON, coaching cognitivo con IA guiado por Kai para procesar fricción mental y convertirla en acción concreta.",
      },
      { name: "author", content: "G-Structure" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "G-Structure | KAIRON, AI cognitive coaching for execution" },
      { name: "twitter:title", content: "G-Structure | KAIRON, AI cognitive coaching for execution" },
      { property: "og:description", content: "KAIRON helps professionals process the thoughts, emotions, and interpretations that block execution, guided by Kai in real time." },
      { name: "twitter:description", content: "KAIRON helps professionals process the thoughts, emotions, and interpretations that block execution, guided by Kai in real time." },
      { property: "og:image", content: "https://g-structure.co/og-default.jpg" },
      { name: "twitter:image", content: "https://g-structure.co/og-default.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: fontsCss },
      { rel: "stylesheet", href: appCss },
      { rel: "preload", href: "/fonts/inter-variable-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/montserrat-variable-latin.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
    scripts: [
      {
        children:
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'AW-18154152582', {'allow_enhanced_conversions': true});",
      },
      { src: "https://www.googletagmanager.com/gtag/js?id=AW-18154152582", async: true },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";

  return (
    <html lang={lang}>
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
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isStandalone =
    pathname === "/vip-pass" || pathname === "/en/vip-pass" || pathname === "/kairon-for-teams";
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        {isStandalone ? (
          <Outlet />
        ) : (
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pb-20 lg:pb-0">
              <Outlet />
            </main>
            <Footer />
            <WhatsAppFAB />
            <ScrollTopButton />
          </div>
        )}
      </LocaleProvider>
    </QueryClientProvider>
  );
}
