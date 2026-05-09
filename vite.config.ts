// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import path from "node:path";
import { loadEnv } from "vite";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: ({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
      define: {
        "process.env.SUPABASE_URL": JSON.stringify(env.SUPABASE_URL ?? ""),
        "process.env.SUPABASE_SERVICE_ROLE_KEY": JSON.stringify(
          env.SUPABASE_SERVICE_ROLE_KEY ?? "",
        ),
        "process.env.LOVABLE_API_KEY": JSON.stringify(env.LOVABLE_API_KEY ?? ""),
        "process.env.LOVABLE_SEND_URL": JSON.stringify(env.LOVABLE_SEND_URL ?? ""),
        "process.env.BOOKING_ADMIN_EMAIL": JSON.stringify(
          env.BOOKING_ADMIN_EMAIL ?? "",
        ),
      },
      resolve: {
        alias: {
          "entities/lib/decode.js": path.resolve(
            process.cwd(),
            "node_modules/entities/lib/decode.js",
          ),
          "entities/lib/encode.js": path.resolve(
            process.cwd(),
            "node_modules/entities/lib/encode.js",
          ),
          entities: path.resolve(process.cwd(), "node_modules/entities"),
        },
      },
    };
  },
});
