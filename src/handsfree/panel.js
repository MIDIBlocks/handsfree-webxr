/**
 * Cache elements and settings
 */
const $handsfree = {
  $rotMult: document.querySelector('#handfree-head-rotation-multiplier'),
  $transMult: document.querySelector('#handfree-head-translation-multiplier'),
  isFeedVisible: false
}

/**
 * Setup Handsfree.js
 * @see https://handsfree.js.org/ref/prop/config
 */
handsfree = new Handsfree({
  assetsPath: chrome.runtime.getURL('/assets/handsfree/assets'),
  showDebug: true,
  weboji: true
})

/**
 * Communicate with backend
 */
handsfree.use('threeUpdater', {
  // Custom prop to store tween values between frames
  tween: {
    head: {
      pitch: 0,
      yaw: 0,
      roll: 0,
      x: 0,
      y: 0,
      z: 0
    }
  },
  
  /**
   * This gets called on every active frame
   * - Let's tween the values here
   */
  onFrame ({weboji}) {
    // Other valid assetNodes are: DEVICE.CONTROLLER, DEVICE.RIGHT_CONTROLLER, DEVICE.LEFT_CONTROLLER
    // @see /src/app/panel.js
    const node = assetNodes[DEVICE.HEADSET]
    if (!weboji?.isDetected || !node) return

    // Tween rotation
    TweenMax.to(this.tween.head, 1, {
      pitch: -weboji.rotation[0],
      yaw: -weboji.rotation[1],
      roll: weboji.rotation[2],
      x: weboji.translation[0],
      y: weboji.translation[1],
      z: weboji.translation[2]
    })

    assetNodes[DEVICE.HEADSET].rotation.x = this.tween.head.pitch * $handsfree.$rotMult.value
    assetNodes[DEVICE.HEADSET].rotation.y = this.tween.head.yaw * $handsfree.$rotMult.value
    assetNodes[DEVICE.HEADSET].rotation.z = this.tween.head.roll * $handsfree.$rotMult.value

    assetNodes[DEVICE.HEADSET].position.x = this.tween.head.x * 2 * $handsfree.$transMult.value
    assetNodes[DEVICE.HEADSET].position.y = this.tween.head.y * 2 * $handsfree.$transMult.value
    assetNodes[DEVICE.HEADSET].position.z = this.tween.head.z * -3 * $handsfree.$transMult.value

    // Update everything. The Polyfill will handle the rest
    updateHeadsetPropertyComponent()
    notifyPoseChange(assetNodes[DEVICE.HEADSET])
    render()
  }
})

/**
 * Toggle Handsfree
 */
document.querySelector('#handsfree-start').addEventListener('click', function () {
  console.log('HANDSFREE')
  handsfree.start()
})
document.querySelector('#handsfree-stop').addEventListener('click', function () {
  handsfree.stop()
})
// document.querySelector('#handsfree-start').addEventListener('click', function () {
//   document.querySelector('#handsfree-start').style.display = 'none'
//   document.querySelectorAll('.handsfree-show-when-started').forEach($el => {
//     $el.style.display = 'inline-block'
//   })
  
//   chrome.runtime.sendMessage({action: 'handsfree-inject'})
// })

// /**
//  * Toggle video feed
//  */
// document.querySelector('#toggleHandsfreeWebcam').addEventListener('click', function () {
//   $handsfree.isFeedVisible = !$handsfree.isFeedVisible

//   chrome.runtime.sendMessage({
//     action: 'handsfree-toggle-feed',
//     state: $handsfree.isFeedVisible
//   })
// })

// /**
//  * Stop the camera (will reload page)
//  */
// document.querySelector('#handsfree-stop').addEventListener('click', function () {
//   chrome.runtime.sendMessage({action: 'handsfree-reload'})
//   window.location.reload()
// })
