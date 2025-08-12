
// app/lib/auth-demo.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export async function signUpEmail(email: string, password: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // create a user doc
  await setDoc(doc(db, "users", cred.user.uid), {
    email,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export async function signInEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

