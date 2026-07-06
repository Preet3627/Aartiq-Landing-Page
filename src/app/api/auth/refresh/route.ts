import { NextRequest, NextResponse } from 'next/server';

import {
  getGoogleClientId,
  getGoogleClientSecret,
  validateAppToken,
} from '../_lib/googleAuth';

export async function POST(request: NextRequest) {
  if (!validateAppToken(request)) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  let body: { refresh_token?: string } = {};

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const refreshToken = body.refresh_token?.trim();
  if (!refreshToken) {
    return NextResponse.json(
      { error: 'missing_refresh_token' },
      { status: 400 },
    );
  }

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: getGoogleClientId(),
      client_secret: getGoogleClientSecret(),
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  });

  const payload = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(payload, { status: tokenResponse.status });
  }

  return NextResponse.json(payload);
}
