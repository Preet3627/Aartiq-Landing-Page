import { NextRequest } from 'next/server';

const DEFAULT_AARTIQ_APP_TOKEN = 'aartiq-secure-v1';
const DEFAULT_REDIRECT_URI = 'aartiq-browser://auth/callback';

const DEFAULT_SCOPES = ['openid', 'email', 'profile'];
const ALLOWED_LITERAL_SCOPES = new Set(DEFAULT_SCOPES);
const GOOGLE_SCOPE_PREFIX = 'https://www.googleapis.com/auth/';

export function getAartiqAppToken() {
  return process.env.AARTIQ_APP_TOKEN || process.env.AARTIQ_APP_TOKEN || DEFAULT_AARTIQ_APP_TOKEN;
}

export function getGoogleClientId() {
  return (
    process.env.GOOGLE_CLIENT_ID ||
    '601898745585-8g9t0k72gq4q1a4s1o4d1t6t7e5v4c4g.apps.googleusercontent.com'
  );
}

export function getGoogleClientSecret() {
  return process.env.GOOGLE_CLIENT_SECRET || '';
}

export function getGoogleCallbackUrl(origin: string) {
  return process.env.GOOGLE_REDIRECT_URI || new URL('/oauth2callback', origin).toString();
}

export function validateAppToken(request: NextRequest) {
  return request.headers.get('X-Aartiq-App-Token') === getAartiqAppToken();
}

export function parseRequestedScopes(rawScopes: string | null) {
  const scopes = (rawScopes || '')
    .split(/[,\s]+/)
    .map((scope) => scope.trim())
    .filter(Boolean)
    .filter(
      (scope) =>
        ALLOWED_LITERAL_SCOPES.has(scope) || scope.startsWith(GOOGLE_SCOPE_PREFIX),
    );

  return Array.from(new Set(scopes.length > 0 ? scopes : DEFAULT_SCOPES));
}

export function parseState(state: string | null) {
  if (!state) {
    return {};
  }

  try {
    return JSON.parse(state);
  } catch {
    try {
      return JSON.parse(decodeURIComponent(state));
    } catch {
      return {};
    }
  }
}

export function isAllowedRedirectUri(redirectUri: string) {
  if (!redirectUri) {
    return false;
  }

  if (
    redirectUri.startsWith('aartiq-browser://') ||
    redirectUri.startsWith('aartiq://')
  ) {
    return true;
  }

  try {
    const url = new URL(redirectUri);
    const isLoopback =
      url.protocol === 'http:' &&
      (url.hostname === '127.0.0.1' || url.hostname === 'localhost');
    const isSameOrigin =
      url.protocol === 'https:' &&
      url.hostname === 'aartiq.vercel.app';

    return isLoopback || isSameOrigin;
  } catch {
    return false;
  }
}

export function getSafeRedirectUri(redirectUri: string | null) {
  const candidate = redirectUri || DEFAULT_REDIRECT_URI;
  return isAllowedRedirectUri(candidate) ? candidate : null;
}
