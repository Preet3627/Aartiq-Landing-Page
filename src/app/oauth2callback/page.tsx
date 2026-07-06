"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Image from 'next/image';
import { APP_INFO } from '@/lib/version';

function OAuthCallbackInner() {
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'processing' | 'success' | 'error'>('loading');
    const [error, setError] = useState('');
    const [redirectTarget, setRedirectTarget] = useState<'desktop' | 'mobile' | 'unknown'>('unknown');

    useEffect(() => {
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');
        const state = searchParams.get('state');

        if (errorParam) {
            setError(`Google denied access: ${errorParam}`);
            setStatus('error');
            return;
        }

        if (!code) {
            setError('No authorization code received from Google.');
            setStatus('error');
            return;
        }

        setStatus('processing');

        try {
            const stateData = state ? JSON.parse(decodeURIComponent(state)) : {};
            const { redirectUri = 'aartiq://auth/callback' } = stateData;

            if (redirectUri.includes('aartiq://')) {
                setRedirectTarget('mobile');
            } else if (redirectUri.includes('aartiq-browser://')) {
                setRedirectTarget('desktop');
            }

            const callbackUrl = `/api/auth/callback?code=${encodeURIComponent(code)}&state=${encodeURIComponent(state || '')}`;
            window.location.replace(callbackUrl);
        } catch (err) {
            console.error('[OAuth] Error:', err);
            setError('Failed to complete authentication. Please try again.');
            setStatus('error');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Logo */}
                <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden shadow-2xl shadow-sky-500/30">
                    <Image src="/icon.png" alt={`${APP_INFO.name} Logo`} width={80} height={80} className="w-full h-full object-cover" />
                </div>

                <h1 className="text-2xl font-black uppercase tracking-tight">{APP_INFO.fullName}</h1>

                {status === 'loading' && (
                    <>
                        <div className="flex justify-center">
                            <span className="inline-block w-8 h-8 rounded-full border-2 border-sky-400/40 border-t-sky-400 animate-spin" />
                        </div>
                        <p className="text-white/60 text-sm">Processing authentication...</p>
                    </>
                )}

                {status === 'processing' && (
                    <>
                        <div className="flex justify-center">
                            <span className="inline-block w-8 h-8 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 animate-spin" />
                        </div>
                        <p className="text-white/60 text-sm">
                            {redirectTarget === 'mobile' ? 'Completing sign-in for Mobile App...' : 'Completing sign-in for Browser...'}
                        </p>
                        <p className="text-white/30 text-xs">Exchanging credentials securely...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-green-400 font-semibold">Sign-in successful!</p>
                        <p className="text-white/50 text-sm">
                            {redirectTarget === 'mobile' ? 'Returning to Aartiq Mobile App.' : 'Returning to Aartiq Browser.'}
                        </p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-12 h-12 mx-auto rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-red-400 font-semibold">Authentication Failed</p>
                        <p className="text-white/50 text-sm">{error}</p>
                        <button
                            onClick={() => window.close()}
                            className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/70 hover:bg-white/10 transition-all"
                        >
                            Close Tab
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function OAuthCallback() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <span className="inline-block w-8 h-8 rounded-full border-2 border-sky-400/40 border-t-sky-400 animate-spin" />
            </div>
        }>
            <OAuthCallbackInner />
        </Suspense>
    );
}
