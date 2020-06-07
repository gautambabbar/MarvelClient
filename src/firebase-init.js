import firebase from 'firebase';
// import 'firebase/analytics';
// import 'firebase/firestore';
import 'firebase/functions';
import { PROJECT_ID } from './constants';


firebase.initializeApp({
  apiKey: "AIzaSyD0pSr_yOvPeCvIolYWqyvwNNyi7P8O6zc",
  // authDomain: "extension-api-e8253.firebaseapp.com",
  // databaseURL: "https://extension-api-e8253.firebaseio.com",
  projectId: PROJECT_ID,
  messagingSenderId: "578395959214",
  appId: "1:578395959214:web:ebe2883b6f9b5de2d6223f",
  measurementId: "G-XKY2KWWX3L"
});

// firebase.analytics();
