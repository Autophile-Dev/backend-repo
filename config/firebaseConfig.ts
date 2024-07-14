import admin from 'firebase-admin';
const serviceAccountKey = require('./serviceAccountKey.json');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
    databaseURL: "https://console.firebase.google.com/u/0/project/ebuddy-test-5fbba/firestore/databases/-default-/data/~2F"
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