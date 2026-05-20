const PAYPAL_API_BASE = {
  sandbox: "https://api-m.sandbox.paypal.com",
  live: "https://api-m.paypal.com",
} as const;

export type PayPalEnvironment = keyof typeof PAYPAL_API_BASE;

export function getPayPalEnvironment(): PayPalEnvironment {
  return process.env.PAYPAL_ENVIRONMENT === "live" ? "live" : "sandbox";
}

export function getPayPalClientId() {
  return process.env.PAYPAL_CLIENT_ID ?? "";
}

function getPayPalClientSecret() {
  return process.env.PAYPAL_CLIENT_SECRET ?? "";
}

export function isPayPalConfigured() {
  return Boolean(getPayPalClientId() && getPayPalClientSecret());
}

export function getPayPalApiBase() {
  return PAYPAL_API_BASE[getPayPalEnvironment()];
}

export async function getPayPalAccessToken() {
  const clientId = getPayPalClientId();
  const clientSecret = getPayPalClientSecret();
  if (!clientId || !clientSecret) {
    throw new Error("paypal_not_configured");
  }

  const credentials = btoa(`${clientId}:${clientSecret}`);
  const response = await fetch(`${getPayPalApiBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error("paypal_auth_failed");
  }

  const data = await response.json() as { access_token?: string };
  if (!data.access_token) throw new Error("paypal_auth_failed");
  return data.access_token;
}

export async function callPayPal<T>(path: string, init: RequestInit = {}): Promise<T> {
  const accessToken = await getPayPalAccessToken();
  const response = await fetch(`${getPayPalApiBase()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init.headers ?? {}),
    },
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    console.error("[paypal] request failed", { path, status: response.status, data });
    throw new Error("paypal_request_failed");
  }
  return data as T;
}
