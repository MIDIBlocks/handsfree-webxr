/**
 * Load dependencies into the current active tab
 */
chrome.runtime.onMessage.addListener(function (message) {
  switch (message.action) {
    /**
     * Inject dependencies
     */
    case 'handsfree-inject':
      chrome.tabs.insertCSS({file: '/assets/handsfree/assets/handsfree.css'})
      chrome.tabs.executeScript({file: '/assets/handsfree/handsfree.js'})
      chrome.tabs.executeScript({file: '/assets/handsfree/assets/jeeliz/jeelizFaceTransfer.js'})
      chrome.tabs.executeScript({file: '/assets/gsap.min.js'})
      chrome.tabs.executeScript({file: '/src/handsfree/content.js'})
    break

    /**
     * Stop Handsfree
     */
    case 'handsfree-reload':
      chrome.tabs.executeScript({code: ';window.location.reload();'})
    break

    /**
     * Show/Hide the feed
     */
    case 'handsfree-toggle-feed':
      console.log(`document.querySelector('.handsfree-feedback').style.display = "${message.state ? 'none' : 'block'}"`)
      if (message.state) {
        chrome.tabs.executeScript({code: `;document.body.classList.add('handsfree-show-video')`})
      } else {
        chrome.tabs.executeScript({code: `;document.body.classList.remove('handsfree-show-video')`})
      }
    break
  }
})
