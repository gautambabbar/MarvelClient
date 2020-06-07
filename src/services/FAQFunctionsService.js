import firebase from 'firebase';
import { FETCH_FAQ_FUNCTION_NAME } from '../constants';

// firebase.functions().useFunctionsEmulator("http://localhost:5001");

export default class FAQFunctionsService {
  static fetchFAQ(url) {
    const faqFor = firebase.functions().httpsCallable(FETCH_FAQ_FUNCTION_NAME);
    return faqFor({url: url}).then((result) => {
      return result.data;
    });
  }
}