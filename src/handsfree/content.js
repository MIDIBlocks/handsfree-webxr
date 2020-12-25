// Get the DevTOols panel port
if (typeof port === 'undefined') {
  port = chrome.runtime.connect(null, {name: 'panel'})
}

/**
 * Setup Handsfree.js
 * @see https://handsfree.js.org/ref/prop/config
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
  // Custom prop to store tween values between frames
  tween: {
    head: {
      rotation: {x: 0, y: 0, z: 0}
    }
  },
  
  /**
   * This gets called on every active frame
   * - Let's tween the values here
   */
  onFrame ({weboji}) {
    if (!weboji) return

    // Tween rotation
    TweenMax.to(this.tween.head.rotation, 1, {
      x: weboji.rotation[0],
      y: weboji.rotation[1],
      z: weboji.rotation[2]
    })
    weboji.rotation[0] = -this.tween.head.rotation.x
    weboji.rotation[1] = -this.tween.head.rotation.y
    weboji.rotation[2] = this.tween.head.rotation.z
    
    port.postMessage({
      action: 'handsfree-data',
      data: {weboji}
    })
  }
})