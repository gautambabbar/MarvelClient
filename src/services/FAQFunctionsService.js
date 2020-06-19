import firebase from 'firebase/app';
import { faqFunctionName } from '../firebase-config';

// firebase.functions().useFunctionsEmulator("http://localhost:5001");

export default class FAQFunctionsService {
  static fetchFAQ(url) {
    const faqFor = firebase.functions().httpsCallable(faqFunctionName);
    return faqFor({url: url}).then((result) => {
      return result.data;
    });
  }
}