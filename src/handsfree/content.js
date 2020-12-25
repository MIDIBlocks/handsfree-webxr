/**
 * Setup Handsfree.js
 */
if (typeof port === 'undefined') {
  port = chrome.runtime.connect(null, {name: 'panel'})
}

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
    port.postMessage({
      action: 'handsfree-data',
      data
    })
  }
})