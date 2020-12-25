chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.directive) {
    case 'inject-handsfree':
      chrome.tabs.executeScript({file: "/assets/handsfree/handsfree.js"})
      chrome.tabs.executeScript({file: "/assets/handsfree/assets/jeeliz/jeelizFaceTransfer.js"})
      chrome.tabs.executeScript({file: "/src/handsfree/content.js"})
    break
  }
})
