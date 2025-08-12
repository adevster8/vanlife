// lib/firebase.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { getApps, initializeApp } from "firebase/app";
import {
    Auth,
    getAuth,
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Prefer app.json -> expo.extra, fall back to EXPO_PUBLIC_* envs
const extra = (Constants.expoConfig?.extra || {}) as Record<string, string>;

const firebaseConfig = {
  apiKey:        extra.EXPO_PUBLIC_FIREBASE_API_KEY        ?? process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:    extra.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN    ?? process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:     extra.EXPO_PUBLIC_FIREBASE_PROJECT_ID     ?? process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: extra.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:         extra.EXPO_PUBLIC_FIREBASE_APP_ID         ?? process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// (Optional) helpful warnings in dev
Object.entries(firebaseConfig).forEach(([k, v]) => {
  if (!v) console.warn(`[firebase] Missing config: ${k}`);
});

export const app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);

// IMPORTANT: initializeAuth must run BEFORE getAuth for RN. Use try/catch so web still works.
let authInstance: Auth;
try {
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch {
  // Probably running on web or already initialized
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);
