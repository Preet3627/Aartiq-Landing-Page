import { NextResponse } from 'next/server';
import { getVersionFromPackage } from '@/lib/version-server';

export async function GET() {
  const fallback = getVersionFromPackage();

  try {
    const res = await fetch('https://api.github.com/repos/Preet3627/Aartiq/releases/latest', {
      next: { revalidate: 300 },
    });
    if (res.ok) {
      const data = await res.json();
      const ghVersion = (data.tag_name || '').replace(/^v/i, '');
      if (ghVersion) {
        return NextResponse.json({
          version: ghVersion,
          codename: fallback.codename,
          releaseDate: data.published_at?.split('T')[0] || fallback.releaseDate,
          channel: data.prerelease ? 'beta' : 'stable',
        }, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
          }
        });
      }
    }
  } catch {}

  return NextResponse.json(fallback, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }
  });
}
