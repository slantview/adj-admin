import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCwIOPvXIu0AZMVotwLt9aPgYp1RQebDLk",
  authDomain: "adj-event-discovery.firebaseapp.com",
  databaseURL: "https://adj-event-discovery.firebaseio.com",
  projectId: "adj-event-discovery",
  storageBucket: "adj-event-discovery.appspot.com",
  messagingSenderId: "916880451503",
  appId: "1:916880451503:web:2d8ebfdf07425e442c715a",
  measurementId: "G-DFTG9KMR2Y"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
