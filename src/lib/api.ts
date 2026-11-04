const API_BASE = "http://localhost:5000";
const TOKEN_ENDPOINT = "/api/auth/token";
const EXPIRY_BUFFER_MS = 30_000;
const FALLBACK_TTL_MS = 10 * 60_000;

let cachedToken: string | null = null;
let tokenExpiresAt = 0;
let inflight: Promise<string | null> | null = null;

// Read `exp` from the JWT payload so we refresh before it expires.
function readExpiry(token: string): number {
  try {
    const segment = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = segment.padEnd(Math.ceil(segment.length / 4) * 4, "=");
    const payload = JSON.parse(atob(padded)) as { exp?: number };
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

async function requestToken(): Promise<string | null> {
  try {
    const res = await fetch(TOKEN_ENDPOINT);
    if (!res.ok) return null;

    const data = (await res.json()) as { token?: string };
    if (!data.token) return null;

    cachedToken = data.token;
    tokenExpiresAt = readExpiry(data.token) || Date.now() + FALLBACK_TTL_MS;
    return cachedToken;
  } catch {
    return null;
  }
}

/**
 * Returns the better-auth JWT for the signed-in user,
 * or null when logged out. Cached until shortly before expiry.
 */
export function getToken(): Promise<string | null> {
  if (cachedToken && Date.now() < tokenExpiresAt - EXPIRY_BUFFER_MS) {
    return Promise.resolve(cachedToken);
  }

  if (!inflight) {
    inflight = requestToken().finally(() => {
      inflight = null;
    });
  }

  return inflight;
}

function clearToken() {
  cachedToken = null;
  tokenExpiresAt = 0;
}

/**
 * fetch() for the Express backend with a `Bearer` JWT attached.
 * If the backend rejects the token (401), the token is refreshed once
 * and the request retried.
 */
export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const send = async (token: string | null) => {
    const headers = new Headers(init.headers);
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return fetch(`${API_BASE}${path}`, { ...init, headers });
  };

  let token = await getToken();
  let res = await send(token);

  if (res.status === 401 && token) {
    clearToken();
    token = await getToken();
    res = await send(token);
  }

  return res;
}
