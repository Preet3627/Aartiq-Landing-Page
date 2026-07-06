import { NextRequest, NextResponse } from 'next/server';

import {
  getGoogleCallbackUrl,
  getGoogleClientId,
  getSafeRedirectUri,
  parseRequestedScopes,
} from '../_lib/googleAuth';

function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const redirectUri = getSafeRedirectUri(searchParams.get('redirect_uri'));

  if (!redirectUri) {
    return NextResponse.json(
      { error: 'invalid_redirect_uri' },
      { status: 400 },
    );
  }

  const stateToken = searchParams.get('state') || generateState();
  const firebaseConfig = searchParams.get('firebase_config') || '';
  const scopes = parseRequestedScopes(searchParams.get('scopes'));

  const oauthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  oauthUrl.searchParams.set('client_id', getGoogleClientId());
  oauthUrl.searchParams.set(
    'redirect_uri',
    getGoogleCallbackUrl(request.nextUrl.origin),
  );
  oauthUrl.searchParams.set('response_type', 'code');
  oauthUrl.searchParams.set('scope', scopes.join(' '));
  oauthUrl.searchParams.set('access_type', 'offline');
  oauthUrl.searchParams.set('include_granted_scopes', 'true');
  oauthUrl.searchParams.set('prompt', 'consent select_account');
  oauthUrl.searchParams.set(
    'state',
    JSON.stringify({
      redirectUri,
      state: stateToken,
      firebaseConfig,
      scopes,
    }),
  );

  return NextResponse.redirect(oauthUrl);
}
