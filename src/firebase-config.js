const config = {
  authDomain: "xxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxx.firebaseio.com",
  projectId: "xxxxxx",
  storageBucket: "xxxxxxx.appspot.com",
  messagingSenderId: "xxxxxxx",
  appId: "",
  measurementId: ""
}

export const functionsRegion = 'us-central1';
export const faqFunctionName = 'faqFor';
export const faqFunctionsUrl = `https://${functionsRegion}-${config.projectId}.cloudfunctions.net`;
export default config;