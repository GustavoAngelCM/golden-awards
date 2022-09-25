import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBH7mEwZbGwZu8DLn_96IxyaTTZyzufIE8",
  authDomain: "golden-night-awards.firebaseapp.com",
  projectId: "golden-night-awards",
  storageBucket: "golden-night-awards.appspot.com",
  messagingSenderId: "334213557953",
  appId: "1:334213557953:web:2e4ba49773b937bb5e2e40",
  measurementId: "G-WQV2SD75GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {
  app,
  firestore
}