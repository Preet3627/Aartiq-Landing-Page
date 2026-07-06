import { NextRequest, NextResponse } from 'next/server';

import {
  getGoogleCallbackUrl,
  getGoogleClientId,
  getGoogleClientSecret,
  getSafeRedirectUri,
  parseState,
} from '../_lib/googleAuth';

function buildErrorRedirect(request: NextRequest, error: string) {
  return NextResponse.redirect(
    new URL(`/auth?error=${encodeURIComponent(error)}`, request.url),
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = parseState(searchParams.get('state'));
  const error = searchParams.get('error');

  if (error) {
    return buildErrorRedirect(request, error);
  }

  if (!code) {
    return buildErrorRedirect(request, 'no_code');
  }

  const redirectUri = getSafeRedirectUri(
    typeof state.redirectUri === 'string' ? state.redirectUri : null,
  );

  if (!redirectUri) {
    return buildErrorRedirect(request, 'invalid_redirect_uri');
  }

  try {
    const firebaseConfig =
      typeof state.firebaseConfig === 'string' ? state.firebaseConfig : '';

    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: getGoogleClientId(),
        client_secret: getGoogleClientSecret(),
        redirect_uri: getGoogleCallbackUrl(request.nextUrl.origin),
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to exchange code for tokens');
    }

    const tokens = await tokenResponse.json();

    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      },
    );

    if (!userInfoResponse.ok) {
      throw new Error('Failed to get user info');
    }

    const userInfo = await userInfoResponse.json();
    const params = new URLSearchParams();

    params.set('auth_status', 'success');
    params.set('uid', userInfo.id || '');
    params.set('user_id', userInfo.id || '');
    params.set('email', userInfo.email || '');
    params.set('name', userInfo.name || '');
    params.set('photo', userInfo.picture || '');
    params.set('token', tokens.access_token || '');
    params.set('access_token', tokens.access_token || '');
    params.set('token_type', tokens.token_type || '');
    params.set('scope', tokens.scope || '');
    params.set('expires_in', String(tokens.expires_in || ''));

    if (tokens.id_token) {
      params.set('id_token', tokens.id_token);
    }

    if (tokens.refresh_token) {
      params.set('refresh_token', tokens.refresh_token);
    }

    if (firebaseConfig) {
      params.set('firebase_config', firebaseConfig);
    }

    const separator = redirectUri.includes('?') ? '&' : '?';
    return NextResponse.redirect(
      new URL(`${redirectUri}${separator}${params.toString()}`),
    );
  } catch (error) {
    console.error('[OAuth] Token exchange error:', error);
    return buildErrorRedirect(request, 'token_exchange_failed');
  }
}
