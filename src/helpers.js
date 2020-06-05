import extractDomain from 'extract-domain';

export function queryHostNameInCurrentTab() {
  // return Promise.resolve('amazon');
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const hostname = extractDomain(tabs[0].url);
      console.log('hostname', hostname);
      resolve(hostname);
    });
  });
}

