import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  createdAt: any;
}

export async function submitContactForm(name: string, email: string, message: string) {
  try {
    const submissionsRef = collection(db, 'submissions');
    await addDoc(submissionsRef, {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
