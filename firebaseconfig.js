import { getFirestore } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  projectId: "docs-xrx",
  apiKey: "AIzaSyDytWAN7mmb5Ou_6Hu5_uV3GmufadoDE-Y",
  authDomain: "docs-xrx.firebaseapp.com",
  storageBucket: "docs-xrx.appspot.com",
  messagingSenderId: "294155399298",
  appId: "1:294155399298:web:06a3f5d139717795c2449b",
};

/*
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};
*/
/*
const app = !firebase.apps.length
  ? initializeApp(firebaseConfig)
  : firebase.app();
*/

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
