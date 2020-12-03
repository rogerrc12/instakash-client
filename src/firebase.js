import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAa8v4-V0z31ypqjZnluusNxpeDjYbg0k8",
  authDomain: "instakash-test.firebaseapp.com",
  databaseURL: "https://instakash-test.firebaseio.com",
  projectId: "instakash-test",
  storageBucket: "instakash-test.appspot.com",
  messagingSenderId: "735879372614",
  appId: "1:735879372614:web:d21b2d56deecb593114f47",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
