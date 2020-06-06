// import extractDomain from 'extract-domain';
// const Domain = require('url-domain-name');

export function queryHostNameInCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      // const hostname = extractDomain(tabs[0].url);
      let hostname = new URL(tabs[0].url).hostname;
      if(hostname.startsWith('www.')) {
        hostname = hostname.slice(4);
      }
      resolve(hostname);
    });
  });
}

