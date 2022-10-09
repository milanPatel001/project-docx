import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirebaseAdapter } from "@next-auth/firebase-adapter";
import { db } from "../../../firebaseconfig";
import {
  collection,
  query,
  getDocs,
  where,
  limit,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from "firebase/firestore";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FirebaseAdapter({
    db,
    collection,
    query,
    getDocs,
    where,
    limit,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    runTransaction,
  }),
});
