"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    AuthError,
} from 'firebase/auth';
import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { app as defaultApp, firebaseConfig } from '../../lib/firebase';
import Image from 'next/image';
import { APP_INFO } from '../../lib/version';

export default function AuthCallback() {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'authenticating' | 'success' | 'error'>('loading');
    const [error, setError] = useState<string>('');
    const [errorCode, setErrorCode] = useState<string>('');
    const [redirectUri, setRedirectUri] = useState<string>('');
    const [redirectTarget, setRedirectTarget] = useState<'desktop' | 'mobile' | 'web'>('web');
    const [userData, setUserData] = useState<any>(null);
    const [autoCloseCountdown, setAutoCloseCountdown] = useState<number>(3);
    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    const [loadingStep, setLoadingStep] = useState<string>('Initializing...');

    const getAuthApp = useCallback((configToUse: any): { app: FirebaseApp; config: any } => {
        if (!configToUse || !configToUse.apiKey || configToUse.apiKey === 'undefined' || configToUse.apiKey === '') {
            console.log('[Auth] Using default Firebase config');
            return { app: defaultApp, config: firebaseConfig };
        }
        
        if (configToUse.apiKey === firebaseConfig.apiKey) {
            console.log('[Auth] Using default Firebase config (matches)');
            return { app: defaultApp, config: firebaseConfig };
        }

        const appName = `aartiq-auth-${Date.now()}`;
        try {
            const existingApp = getApps().find(a => a.name === appName);
            if (existingApp) {
                return { app: existingApp, config: configToUse };
            }
            const newApp = initializeApp(configToUse, appName);
            console.log('[Auth] Initialized custom Firebase app');
            return { app: newApp, config: configToUse };
        } catch (e) {
            console.error('[Auth] Failed to initialize custom Firebase app, using default:', e);
            return { app: defaultApp, config: firebaseConfig };
        }
    }, []);

    const completeAuthSuccess = useCallback(async (
        user: any,
        configToUse: any,
        target: 'desktop' | 'mobile' | 'web',
        redirectUriParam: string
    ) => {
        const idToken = await user.getIdToken();
        const authData = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            idToken,
            firebaseConfig: configToUse
        };

        setUserData(authData);
        setStatus('success');

        const authParams = new URLSearchParams({
            auth_status: 'success',
            uid: user.uid,
            email: user.email || '',
            name: user.displayName || '',
            photo: user.photoURL || '',
            id_token: idToken,
            firebase_config: btoa(JSON.stringify(configToUse))
        });
        const callbackUrl = `${redirectUriParam}${redirectUriParam.includes('?') ? '&' : '?'}${authParams.toString()}`;

        if (target === 'mobile') {
            const mobileParams = new URLSearchParams({
                user_id: user.uid,
                email: user.email || '',
                name: user.displayName || '',
                photo: user.photoURL || '',
                token: idToken,
                id_token: idToken,
            });
            const mobileDeepLink = `aartiq://auth/callback?${mobileParams.toString()}`;
            console.log('[Auth] Redirecting to mobile:', mobileDeepLink);
            window.location.href = mobileDeepLink;
            return;
        }

        if (target === 'desktop') {
            console.log('[Auth] Redirecting to desktop:', callbackUrl);
            console.log(JSON.stringify({
                type: 'aartiq-auth-success',
                data: authData
            }));
            window.location.href = callbackUrl;
            return;
        }

        if (window.opener && !window.opener.closed) {
            try {
                window.opener.postMessage({
                    type: 'aartiq-auth-success',
                    data: authData
                }, '*');
            } catch (e) {
                console.warn('[Auth] postMessage failed:', e);
            }
        }

        window.location.href = callbackUrl;
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            setLoadingStep('Preparing authentication...');
            
            await new Promise(resolve => setTimeout(resolve, 500));

            const urlParams = new URLSearchParams(window.location.search);
    const clientId = urlParams.get('client_id');
    const redirectUriParam = urlParams.get('redirect_uri');
    const configParam = urlParams.get('firebase_config');

    if (clientId && redirectUriParam) {
        setRedirectUri(redirectUriParam);

        // Detect target platform
        let target: 'desktop' | 'mobile' | 'web' = 'web';
        if (redirectUriParam.includes('aartiq://')) {
          target = 'mobile';
        } else if (redirectUriParam.includes('aartiq-browser://')) {
          target = 'desktop';
        } else if (clientId === 'nexus-ai-native' || redirectUriParam.startsWith('http://127.0.0.1') || redirectUriParam.startsWith('http://localhost')) {
          target = 'desktop';
        }
                setRedirectTarget(target);

                let finalConfig = firebaseConfig;
                
                if (configParam) {
                    try {
                        const parsedConfig = JSON.parse(atob(configParam));
                        if (parsedConfig && parsedConfig.apiKey && 
                            parsedConfig.apiKey !== '' && 
                            parsedConfig.apiKey !== 'undefined' &&
                            parsedConfig.apiKey.length > 10) {
                            finalConfig = parsedConfig;
                            console.log('[Auth] Using custom Firebase config');
                        }
                    } catch (e) {
                        console.error('[Auth] Failed to parse custom config:', e);
                    }
                }

                setIsFirebaseReady(true);
                setLoadingStep('Ready to authenticate...');
                
                await new Promise(resolve => setTimeout(resolve, 300));

                handleGoogleSignIn(redirectUriParam, finalConfig, target);
            } else {
                setError('Invalid authentication request. Missing required parameters.');
                setErrorCode('INVALID_REQUEST');
                setStatus('error');
                setTimeout(() => router.push('/'), 3000);
            }
        };

        initAuth();
    }, [router]);

    useEffect(() => {
        if (status !== 'success') return;
        
        const timer = setInterval(() => {
            setAutoCloseCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    if (redirectTarget === 'web') {
                        window.close();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [status, redirectTarget]);

    const handleGoogleSignIn = async (
        redirectUriParam: string,
        configToUse: any,
        target: 'desktop' | 'mobile' | 'web'
    ) => {
        setStatus('authenticating');
        setLoadingStep('Opening sign-in dialog...');
        
        try {
            await new Promise(resolve => setTimeout(resolve, 200));

            const { app: authApp } = getAuthApp(configToUse);
            const auth = getAuth(authApp);
            const provider = new GoogleAuthProvider();
            
            provider.addScope('profile');
            provider.addScope('email');
            provider.setCustomParameters({
                prompt: 'select_account',
                access_type: 'offline'
            });

            const result = await signInWithPopup(auth, provider);
            setLoadingStep('Verifying credentials...');
            await new Promise(resolve => setTimeout(resolve, 200));
            await completeAuthSuccess(result.user, configToUse, target, redirectUriParam);

        } catch (error: any) {
            const authError = error as AuthError;
            console.error('[Auth] Sign-in error:', authError);
            
            let errorMessage = 'Authentication failed. Please try again.';
            let errorCodeStr = authError.code || 'UNKNOWN';
            
            if (authError.code === 'auth/invalid-api-key') {
                errorMessage = 'Configuration error. Please check Firebase settings.';
            } else if (authError.code === 'auth/popup-closed-by-user') {
                errorMessage = 'Sign-in was cancelled.';
            } else if (authError.code === 'auth/network-request-failed') {
                errorMessage = 'Network error. Please check your connection.';
            } else if (authError.code === 'auth/cancelled-popup-request') {
                errorMessage = 'Only one sign-in dialog can be open at a time.';
            }
            
            setError(errorMessage);
            setErrorCode(errorCodeStr);
            setStatus('error');
        }
    };

    const retrySignIn = () => {
        setError('');
        setErrorCode('');
        setStatus('loading');
        if (redirectUri) {
            const urlParams = new URLSearchParams(window.location.search);
            const configParam = urlParams.get('firebase_config');
            
            let finalConfig = firebaseConfig;
            if (configParam) {
                try {
                    finalConfig = JSON.parse(atob(configParam));
                } catch (e) {}
            }
            
            handleGoogleSignIn(redirectUri, finalConfig, redirectTarget);
        }
    };

    const getRedirectTargetLabel = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const clientId = urlParams.get('client_id');
        const isNexusAI = clientId === 'nexus-ai-native';
        switch (redirectTarget) {
            case 'mobile': return isNexusAI ? 'Nexus AI' : 'Aartiq Mobile App';
            case 'desktop': return isNexusAI ? 'Nexus AI' : 'Aartiq Browser';
            default: return isNexusAI ? 'Nexus AI' : 'Aartiq';
        }
    };

    return (
        <div className="h-screen flex flex-col bg-[#020205] text-white items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="max-w-md w-full space-y-8 text-center relative z-10">
                {status === 'loading' && !isFirebaseReady ? (
                    <div className="space-y-8">
                        <div className="relative mx-auto w-24 h-24">
                            <Image src="/icon.png" alt={`${APP_INFO.name} Logo`} width={96} height={96} className="w-24 h-24 rounded-2xl" />
                        </div>
                        <div className="space-y-4">
                            <div className="h-8 w-64 mx-auto bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer rounded-lg" />
                            <div className="h-4 w-48 mx-auto bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer rounded" style={{ animationDelay: '0.2s' }} />
                        </div>
                    </div>
                ) : status === 'authenticating' ? (
                    <div className="space-y-8">
                        <div className="relative mx-auto w-24 h-24">
                            <Image src="/icon.png" alt={`${APP_INFO.name} Logo`} width={96} height={96} className="w-24 h-24 rounded-2xl animate-pulse" />
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-black uppercase tracking-tight">{APP_INFO.name}</h1>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                                <p className="text-white/50 text-sm">{loadingStep}</p>
                            </div>
                            <p className="text-white/30 text-xs">Redirecting to {getRedirectTargetLabel()}</p>
                        </div>
                        <div className="flex justify-center gap-1">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="w-2 h-2 rounded-full bg-cyan-400/50"
                                    style={{
                                        animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ) : status === 'success' ? (
                    <div className="space-y-8">
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 animate-pulse opacity-50 blur-sm" />
                            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                                <svg className="w-12 h-12 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-black uppercase tracking-tight text-green-400">Welcome!</h1>
                            <p className="text-white/50 text-sm">
                                {userData?.name || userData?.email}
                            </p>
                            <p className="text-white/30 text-xs">
                                {redirectTarget !== 'web' && `Returning to ${getRedirectTargetLabel()}. Auto-closing in ${autoCloseCountdown}s...`}
                                {redirectTarget === 'web' && autoCloseCountdown > 0 && `Closing in ${autoCloseCountdown}s...`}
                            </p>
                        </div>
                        {userData?.photo && (
                            <img 
                                src={userData.photo} 
                                alt="Profile" 
                                className="w-16 h-16 rounded-full mx-auto border-2 border-green-500/50"
                            />
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="relative mx-auto w-24 h-24">
                            <div className="absolute inset-0 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h1 className="text-2xl font-black uppercase tracking-tight text-red-400">Oops!</h1>
                            <p className="text-white/60 text-sm">{error}</p>
                            {errorCode && (
                                <p className="text-white/30 text-xs font-mono">{errorCode}</p>
                            )}
                        </div>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <button
                                onClick={retrySignIn}
                                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-black text-xs font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-cyan-500/30"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={() => router.push('/')}
                                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                            >
                                Return Home
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%, 80%, 100% {
                        transform: scale(0);
                    }
                    40% {
                        transform: scale(1);
                    }
                }
                @keyframes shimmer {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(100%);
                    }
                }
                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.5;
                    }
                    50% {
                        opacity: 0.8;
                    }
                }
            `}</style>
        </div>
    );
}
