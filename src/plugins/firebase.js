import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-h3qEVosveBL_ubxgau-DEZ6JX07Zr3Q",
  authDomain: "in-between-e6001.firebaseapp.com",
  projectId: "in-between-e6001",
  storageBucket: "in-between-e6001.appspot.com",
  messagingSenderId: "1052716341982",
  appId: "1:1052716341982:web:7ac8d4f99c81ca271a804f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();

export default {
  install(Vue) {
    Vue.prototype.$db = db;
  },
};
