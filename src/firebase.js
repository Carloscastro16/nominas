import firebase from 'firebase/app';
import 'firebase/auth';




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrCMtsrTuCbnLWj-NaHtxTO1KG_2X1VY0",
  authDomain: "nominas-vue-ut.firebaseapp.com",
  projectId: "nominas-vue-ut",
  storageBucket: "nominas-vue-ut.appspot.com",
  messagingSenderId: "58400371978",
  appId: "1:58400371978:web:8c0478505ed10cd8c8b6f3"
};

firebase.initializeApp(firebaseConfig);
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const emailAuthProvider = firebase.auth.EmailAuthProvider.PROVIDER_ID;

export { firebase, googleAuthProvider, emailAuthProvider };