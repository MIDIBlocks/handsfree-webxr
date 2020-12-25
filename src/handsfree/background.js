chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.message) {
    case 'handsfree-inject':
      chrome.tabs.insertCSS({file: "/assets/handsfree/assets/handsfree.css"})
      chrome.tabs.executeScript({file: "/assets/handsfree/handsfree.js"})
      chrome.tabs.executeScript({file: "/assets/handsfree/assets/jeeliz/jeelizFaceTransfer.js"})
      chrome.tabs.executeScript({file: "/src/handsfree/content.js"})
    break
  }
})
