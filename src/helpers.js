export function queryHostNameInCurrentTab() {
  return new Promise((resolve, reject) => {
    // resolve('https://www.amazon.com');
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0].url);
    });
  });
}

export function highlightInHTML(html, searchTxt) {
  if(!searchTxt || searchTxt.length<=1) return html;
  let DOMNode = document.createElement('div');
  DOMNode.innerHTML = html;
  let queue = [];
  queue.push(DOMNode);

  while (queue.length > 0) {
    const item = queue[0];
    queue = queue.slice(1);
    let i = 0;
    let childNodesLen = item.childNodes.length;
    while (i < childNodesLen) {
      const node = item.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        const reg = new RegExp(searchTxt, 'gi');
        const span = document.createElement('span');
        span.innerHTML = node.nodeValue.replace(reg, `<mark>${searchTxt}</mark>`);
        node.parentNode.replaceChild(span, node);
      }
      else {
        queue.push(node);
      }
      i += 1;
    }
  }
  return DOMNode.innerHTML;
}

export function searchHTML(html, searchTxt) {
  if(!searchTxt || searchTxt.length<=1) return true;
  const div = document.createElement('div');
  div.innerHTML = html;

  return div.innerText.toLowerCase().includes(searchTxt.toLowerCase());
}
