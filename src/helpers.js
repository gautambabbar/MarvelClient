import extractDomain from 'extract-domain';

export function queryHostNameInCurrentTab() {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      const hostname = extractDomain(tabs[0].url);
      resolve(hostname);
    });
  });
}

