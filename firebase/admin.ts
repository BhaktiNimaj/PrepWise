import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
    if (!getApps().length) {
        const serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS || '{}');

        initializeApp({
            credential: cert(serviceAccount),
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    };
};

export const { auth, db } = initFirebaseAdmin();
