import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

let adminInitialized = false;

function getAdmin() {
  if (!adminInitialized && admin.apps.length === 0) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (serviceAccountKey) {
      try {
        const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, 'base64').toString('utf-8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: `https://cometai-f0bf7.firebaseio.com`
        });
        adminInitialized = true;
      } catch (e) {
        console.error('Failed to initialize Firebase Admin:', e);
      }
    }
  }
  return admin;
}

export async function POST(req: NextRequest) {
  try {
    const { licenseKey } = await req.json();

    if (!licenseKey) {
      return NextResponse.json({ error: 'License key is required' }, { status: 400 });
    }

    const adminApp = getAdmin();
    if (!adminInitialized) {
      return NextResponse.json({ error: 'Server not configured for license verification' }, { status: 500 });
    }

    const db = adminApp.database();
    const snapshot = await db.ref(`licenseKeys/${licenseKey}`).once('value');
    const uid = snapshot.val();

    if (!uid) {
      return NextResponse.json({ error: 'Invalid license key' }, { status: 404 });
    }

    const customToken = await adminApp.auth().createCustomToken(uid);

    return NextResponse.json({ customToken });
  } catch (error) {
    console.error('Error verifying license key:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}