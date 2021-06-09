import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";

// Prod
// var firebaseConfig = {
//   apiKey: "AIzaSyCwIOPvXIu0AZMVotwLt9aPgYp1RQebDLk",
//   authDomain: "adj-event-discovery.firebaseapp.com",
//   databaseURL: "https://adj-event-discovery.firebaseio.com",
//   projectId: "adj-event-discovery",
//   storageBucket: "adj-event-discovery.appspot.com",
//   messagingSenderId: "916880451503",
//   appId: "1:916880451503:web:2d8ebfdf07425e442c715a",
//   measurementId: "G-DFTG9KMR2Y"
// };
let firebaseConfig = {};

// Development
if (process.env.NODE_ENV === "development") {
	firebaseConfig = {
		apiKey: "AIzaSyAV1HjNqZ9X9eSMSmUwXPWC7U4Lvhju4xM",
		authDomain: "beaconsgg-dev.firebaseapp.com",
		projectId: "beaconsgg-dev",
		storageBucket: "beaconsgg-dev.appspot.com",
		messagingSenderId: "3447405413",
		appId: "1:3447405413:web:21042f6c23e6523cad7f8c",
		measurementId: "G-0981YMLQPK"
	};
} else {
	firebaseConfig = {
		apiKey: "AIzaSyCwIOPvXIu0AZMVotwLt9aPgYp1RQebDLk",
		authDomain: "adj-event-discovery.firebaseapp.com",
		databaseURL: "https://adj-event-discovery.firebaseio.com",
		projectId: "adj-event-discovery",
		storageBucket: "adj-event-discovery.appspot.com",
		messagingSenderId: "916880451503",
		appId: "1:916880451503:web:2d8ebfdf07425e442c715a",
		measurementId: "G-DFTG9KMR2Y"
	};  
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
