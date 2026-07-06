import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface OAuthTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ service: string }> }
) {
  const { service } = await params;
  const cookieStore = await cookies();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error) {
    return NextResponse.redirect(
      new URL(`/mcp-settings?error=${encodeURIComponent(error)}`, request.url)
    );
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/mcp-settings?error=No+authorization+code', request.url)
    );
  }

  try {
    const clientId = cookieStore.get(`mcp_${service}_client_id`)?.value;
    const clientSecret = cookieStore.get(`mcp_${service}_client_secret`)?.value;
    const redirectUri = `${request.nextUrl.origin}/api/mcp-oauth/${service}`;

    let tokenUrl: string;
    let tokenData: Record<string, string> = {};

    switch (service) {
      case 'gmail':
        tokenUrl = 'https://oauth2.googleapis.com/token';
        tokenData = {
          code,
          client_id: clientId || '',
          client_secret: clientSecret || '',
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        };
        break;
      case 'slack':
        tokenUrl = 'https://slack.com/api/oauth.v2.access';
        tokenData = {
          client_id: clientId || '',
          client_secret: clientSecret || '',
          code,
          redirect_uri: redirectUri,
        };
        break;
      default:
        return NextResponse.redirect(
          new URL(`/mcp-settings?error=Service+not+supported`, request.url)
        );
    }

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(tokenData),
    });

    const tokens: OAuthTokenResponse = await response.json();

    const nextResponse = NextResponse.redirect(
      new URL('/mcp-settings?success=Connected', request.url)
    );

    if (tokens.access_token) {
      nextResponse.cookies.set(`mcp_${service}_token`, tokens.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
      if (tokens.refresh_token) {
        nextResponse.cookies.set(`mcp_${service}_refresh_token`, tokens.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        });
      }
      return nextResponse;
    } else {
      return NextResponse.redirect(
        new URL(`/mcp-settings?error=Token+exchange+failed`, request.url)
      );
    }
  } catch (err) {
    return NextResponse.redirect(
      new URL(`/mcp-settings?error=${encodeURIComponent(String(err))}`, request.url)
    );
  }
}