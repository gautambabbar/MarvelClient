// import './styles.scss';



chrome.tabs.query({active: true, currentWindow: true}, tabs => {
  const mainSection = document.getElementsByTagName('main')[0];
  console.dir(tabs);
  let url = tabs[0].url;

  var database = firebase.database();
  
  mainSection.innerText = url;
  // use `url` here inside the callback because it's asynchronous!
});