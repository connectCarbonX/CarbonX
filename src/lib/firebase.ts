import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDmQx6eEwr1ZxKlqv1zeiF-07QMTsEKhHE',
  authDomain: 'abxrnt-xndlya.firebaseapp.com',
  projectId: 'abxrnt-xndlya',
  storageBucket: 'abxrnt-xndlya.firebasestorage.app',
  messagingSenderId: '228993018486',
  appId: '1:228993018486:web:3b2c8dbb50bd23ee06cd57',
  measurementId: 'G-T0Z5Z44XH1',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
