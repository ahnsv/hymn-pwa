import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
    apiKey: "AIzaSyCfdSlsCO3lwWPcNljzlnq_0VUYhmPPUtQ",
    authDomain: "hymn-pwa.firebaseapp.com",
    databaseURL: "https://hymn-pwa.firebaseio.com",
    projectId: "hymn-pwa",
    storageBucket: "hymn-pwa.appspot.com",
    messagingSenderId: "498313413838"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const db = firebase.database();
