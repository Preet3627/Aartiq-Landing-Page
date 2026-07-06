"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GoogleAuthRedirectInner() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const redirectUri = searchParams.get('redirect_uri') || 'aartiq://auth/callback';
        const state = searchParams.get('state') || '';

        window.location.href = `/api/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodeURIComponent(state)}`;
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-[#020205] flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full border-2 border-sky-400/40 border-t-sky-400 animate-spin" />
                <p className="text-white/60 text-sm">Redirecting to Google sign-in...</p>
            </div>
        </div>
    );
}

export default function GoogleAuthRedirect() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#020205] flex items-center justify-center">
                <span className="inline-block w-8 h-8 rounded-full border-2 border-sky-400/40 border-t-sky-400 animate-spin" />
            </div>
        }>
            <GoogleAuthRedirectInner />
        </Suspense>
    );
}
