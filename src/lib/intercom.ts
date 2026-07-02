type IntercomCommand =
  | "boot"
  | "show"
  | "hide"
  | "shutdown"
  | "update"
  | "reattach_activator";

type IntercomSettings = {
  app_id: string;
  hide_default_launcher?: boolean;
  language_override?: "en" | "es";
  custom_launcher_selector?: string;
  custom_attributes?: Record<string, string | boolean>;
};

type IntercomFunction = {
  (command: IntercomCommand, settings?: IntercomSettings): void;
  q?: unknown[];
  c?: (args: IArguments) => void;
};

declare global {
  interface Window {
    Intercom?: IntercomFunction;
    intercomSettings?: IntercomSettings;
  }
}

const INTERCOM_APP_ID = "bpqtriep";
let booted = false;
let loadingPromise: Promise<void> | null = null;

export function hasIntercomAppId() {
  return Boolean(INTERCOM_APP_ID);
}

function loadIntercomScript(appId: string) {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Intercom && booted) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-gstructure-intercom]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("intercom_script_failed")), { once: true });
      return;
    }

    if (typeof window.Intercom !== "function") {
      const queue = function intercomQueue() {
        queue.c?.(arguments);
      } as IntercomFunction;
      queue.q = [];
      queue.c = (args) => queue.q?.push(args);
      window.Intercom = queue;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://widget.intercom.io/widget/${encodeURIComponent(appId)}`;
    script.dataset.gstructureIntercom = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("intercom_script_failed"));
    document.head.appendChild(script);
  });

  return loadingPromise;
}

export async function showIntercomMessenger(locale: "en" | "es") {
  if (!INTERCOM_APP_ID || typeof window === "undefined") return false;

  window.intercomSettings = {
    app_id: INTERCOM_APP_ID,
    hide_default_launcher: true,
    language_override: locale,
    custom_launcher_selector: "#kai-intercom-fab",
    custom_attributes: {
      source: "g_structure_website",
      interface_language: locale,
      product_context: "KAIRON",
      public_mvp_access: true,
    },
  };

  await loadIntercomScript(INTERCOM_APP_ID);

  window.Intercom?.("boot", window.intercomSettings);
  booted = true;
  window.Intercom?.("show");
  return true;
}
