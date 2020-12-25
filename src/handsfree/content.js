/**
 * Setup Handsfree.js
 */
handsfree = new Handsfree({
  assetsPath: chrome.runtime.getURL('/assets/handsfree/assets'),
  weboji: true
})
handsfree.start()

/**
 * Communicate with backend
 */
handsfree.use('messager', {
  onFrame (data) {
    chrome.runtime.sendMessage({
      message: 'handsfree-data',
      data
    })
  }
})