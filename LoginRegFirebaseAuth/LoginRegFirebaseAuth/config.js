// firebase configuration setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlPjYmi8e1rCQH_VhFSIoM1TiZexyBoRk",
    authDomain: "logregauth-610cf.firebaseapp.com",
    projectId: "logregauth-610cf",
    storageBucket: "logregauth-610cf.appspot.com",
    messagingSenderId: "817837397128",
    appId: "1:817837397128:web:23165837218922cca8fb3d"
  };


if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };