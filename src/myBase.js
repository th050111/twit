import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALMu1dAuTCSFx8WDQDhQerH60xPNuDW18",
  authDomain: "twit-d4b57.firebaseapp.com",
  projectId: "twit-d4b57",
  storageBucket: "twit-d4b57.appspot.com",
  messagingSenderId: "847880314318",
  appId: "1:847880314318:web:b0e6873795406b55321f9f"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const authService = firebase.auth();
export const dbService = firebase.firestore();