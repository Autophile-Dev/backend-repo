import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccountKey: any = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    "universe_domain": "googleapis.com"
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});
admin.firestore().listCollections()
    .then(() => {
        console.log('Firestore database connected');
    })
    .catch((error) => {
        console.error('Error connecting to Firestore:', error);
        process.exit(1); // Exit process if Firestore connection fails
    });

export const fireStore = admin.firestore();