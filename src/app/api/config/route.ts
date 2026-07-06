
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    // Basic security token as requested
    const authHeader = request.headers.get('X-Aartiq-App-Token');
    const isValid = authHeader === (process.env.AARTIQ_APP_TOKEN || process.env.COMET_APP_TOKEN || 'aartiq-secure-v1');

    return NextResponse.json({
        googleClientId: process.env.GOOGLE_CLIENT_ID || '601898745585-8g9t0k72gq4q1a4s1o4d1t6t7e5v4c4g.apps.googleusercontent.com',
        // Only provide the secret if the app token is valid
        googleClientSecret: isValid ? (process.env.GOOGLE_CLIENT_SECRET || '') : 'Unauthorized',
        googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || 'https://aartiq.vercel.app/oauth2callback',
        firebaseConfig: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
            measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        }
    }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, X-Aartiq-App-Token, X-Comet-App-Token',
        }
    });
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}
