let handsfree

document.addEventListener('DOMContentLoaded', function () {
  handsfree = window.handsfree = new Handsfree({
    assetsPath: chrome.extension.getURL('assets/handsfree/assets'),
    weboji: true
  })
})