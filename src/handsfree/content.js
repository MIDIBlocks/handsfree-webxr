handsfree = new Handsfree({
  assetsPath: chrome.runtime.getURL('/assets/handsfree/assets'),
  weboji: true
})
handsfree.start()