 import {initializeApp} from "firebase/app";
 import {getFirestore} from 'firebase/firestore';
 import {getStorage} from 'firebase/storage';
 import {getAuth} from 'firebase/auth';
//  import {getDatabae} from 'firebase/database'
//  const firebaseConfig = {
//   apiKey: "AIzaSyDmr4x786pxfb56552FblAbQ3BNpprvU04",
//   authDomain: "react-blogs-app-4f17a.firebaseapp.com",
//   projectId: "react-blogs-app-4f17a",
//   storageBucket: "react-blogs-app-4f17a.appspot.com",
//   messagingSenderId: "987654524909",
//   appId: "1:987654524909:web:246e13f648ed874a38a1e4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyDmr4x786pxfb56552FblAbQ3BNpprvU04",
  authDomain: "react-blogs-app-4f17a.firebaseapp.com",
  projectId: "react-blogs-app-4f17a",
  storageBucket: "react-blogs-app-4f17a.appspot.com",
  messagingSenderId: "987654524909",
  appId: "1:987654524909:web:246e13f648ed874a38a1e4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export{auth, db ,storage}