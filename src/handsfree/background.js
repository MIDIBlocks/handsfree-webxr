/**
 * Load dependencies into the current active tab
 */
chrome.runtime.onMessage.addListener(function (message) {
  switch (message.action) {
    case 'handsfree-inject':
      chrome.tabs.insertCSS({file: '/assets/handsfree/assets/handsfree.css'})
      chrome.tabs.executeScript({file: '/assets/handsfree/handsfree.js'})
      chrome.tabs.executeScript({file: '/assets/handsfree/assets/jeeliz/jeelizFaceTransfer.js'})
      chrome.tabs.executeScript({file: '/assets/gsap.min.js'})
      chrome.tabs.executeScript({file: '/src/handsfree/content.js'})
    break

    case 'handsfree-reload':
      chrome.tabs.executeScript({code: 'window.location.reload()'})
    break
  }
})
