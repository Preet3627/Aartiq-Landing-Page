export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export async function loadOutfitFonts() {
    return [
        { name: 'Outfit', data: await readFile(join(process.cwd(), 'src/app/fonts/outfit-400.ttf')), style: 'normal' as const, weight: 400 as const },
        { name: 'Outfit', data: await readFile(join(process.cwd(), 'src/app/fonts/outfit-600.ttf')), style: 'normal' as const, weight: 600 as const },
        { name: 'Outfit', data: await readFile(join(process.cwd(), 'src/app/fonts/outfit-700.ttf')), style: 'normal' as const, weight: 700 as const },
        { name: 'Outfit', data: await readFile(join(process.cwd(), 'src/app/fonts/outfit-800.ttf')), style: 'normal' as const, weight: 800 as const },
        { name: 'Outfit', data: await readFile(join(process.cwd(), 'src/app/fonts/outfit-900.ttf')), style: 'normal' as const, weight: 900 as const },
    ];
}

export async function loadAartiqLogo() {
    const data = await readFile(join(process.cwd(), 'public/logo-transparent.png'));
    return `data:image/png;base64,${data.toString('base64')}`;
}

export function AartiqOgImage({ logo }: { logo: string }) {
    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'Outfit',
                background: 'linear-gradient(135deg, #05070f 0%, #03040b 50%, #081019 100%)',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: -180,
                    left: -160,
                    width: 560,
                    height: 560,
                    borderRadius: 9999,
                    background:
                        'radial-gradient(circle, rgba(56,189,248,0.30) 0%, rgba(56,189,248,0) 70%)',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    bottom: -220,
                    right: -160,
                    width: 640,
                    height: 640,
                    borderRadius: 9999,
                    background:
                        'radial-gradient(circle, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0) 70%)',
                }}
            />
            <div
                style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    padding: '0 60px',
                }}
            >
                <img
                    src={logo}
                    alt="Aartiq logo"
                    width={150}
                    height={150}
                    style={{ objectFit: 'contain', marginBottom: 10 }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px 20px',
                        borderRadius: 9999,
                        border: '1px solid rgba(56,189,248,0.35)',
                        background: 'rgba(56,189,248,0.08)',
                        color: '#7dd3fc',
                        fontSize: 16,
                        fontWeight: 700,
                        letterSpacing: 6,
                        textTransform: 'uppercase',
                    }}
                >
                    Open Source AI Browser
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 108,
                        fontWeight: 800,
                        letterSpacing: -2,
                        color: '#ffffff',
                        lineHeight: 1.1,
                        marginTop: 14,
                    }}
                >
                    Aartiq
                </div>
                <div
                    style={{
                        display: 'flex',
                        fontSize: 32,
                        fontWeight: 600,
                        color: 'rgba(255,255,255,0.85)',
                        marginTop: 6,
                    }}
                >
                    For The Questions That Matter
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: 210,
                        height: 4,
                        borderRadius: 9999,
                        background: 'linear-gradient(90deg, #38bdf8, #22d3ee)',
                        marginTop: 20,
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        fontSize: 20,
                        fontWeight: 400,
                        color: 'rgba(255,255,255,0.55)',
                        marginTop: 18,
                    }}
                >
                    Local LLM &middot; Permission-Gated OS Automation &middot; E2EE Cross-Device Sync
                </div>
            </div>
        </div>
    );
}
