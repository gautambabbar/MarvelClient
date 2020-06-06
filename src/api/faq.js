import * as firebase from 'firebase/app';
import { FAQ_COLLECTION_NAME } from '../constants';

const db = firebase.firestore();

export function fetchFAQ(domain) {
  return db.collection(FAQ_COLLECTION_NAME).doc(domain).get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    }
    else {
      return {data: []};
    }
  });
}

export function fetchAllFAQs() {
  return db.collection(FAQ_COLLECTION_NAME).get().then((snapshot) => {
    return snapshot.docs.map((doc) => ({
      name: doc.id,
      faq: doc.data()
    }))
  });
}