/**
 * Cache elements and settings
 */
const $handsfree = {
  $rotMult: document.querySelector('#handfree-head-rotation-multiplier'),
  $transMult: document.querySelector('#handfree-head-translation-multiplier'),
  isFeedVisible: false
}

/**
 * Listeners
 */
port.onMessage.addListener(message => {
  /**
   * Handle data
   */
  switch (message.action) {
    case 'handsfree-data':
      // Other valid assetNodes are: DEVICE.CONTROLLER, DEVICE.RIGHT_CONTROLLER, DEVICE.LEFT_CONTROLLER
      // @see /src/app/panel.js
      const node = assetNodes[DEVICE.HEADSET]
      if (!node || !message?.data?.weboji?.rotation) return

      assetNodes[DEVICE.HEADSET].rotation.x = message.data.weboji.rotation[0] * $handsfree.$rotMult.value
      assetNodes[DEVICE.HEADSET].rotation.y = message.data.weboji.rotation[1] * $handsfree.$rotMult.value
      assetNodes[DEVICE.HEADSET].rotation.z = message.data.weboji.rotation[2] * $handsfree.$rotMult.value

      assetNodes[DEVICE.HEADSET].position.x = message.data.weboji.translation[0] * 2 * $handsfree.$transMult.value
      assetNodes[DEVICE.HEADSET].position.y = message.data.weboji.translation[1] * 2 * $handsfree.$transMult.value
      assetNodes[DEVICE.HEADSET].position.z = message.data.weboji.translation[2] * -3 * $handsfree.$transMult.value

      // Update everything. The Polyfill will handle the rest
      updateHeadsetPropertyComponent()
      notifyPoseChange(assetNodes[DEVICE.HEADSET])
      render()
    break
  }
})

/**
 * Inject Handsfree.js into DOM
 */
document.querySelector('#startHandsfree').addEventListener('click', function () {
  document.querySelector('#startHandsfree').style.display = 'none'
  document.querySelectorAll('.handsfree-show-when-started').forEach($el => {
    $el.style.display = 'inline-block'
  })
  
  chrome.runtime.sendMessage({action: 'handsfree-inject'})
})

/**
 * Toggle video feed
 */
document.querySelector('#toggleHandsfreeWebcam').addEventListener('click', function () {
  $handsfree.isFeedVisible = !$handsfree.isFeedVisible

  chrome.runtime.sendMessage({
    action: 'handsfree-toggle-feed',
    state: $handsfree.isFeedVisible
  })
})

/**
 * Stop the camera (will reload page)
 */
document.querySelector('#stopHandsfree').addEventListener('click', function () {
  chrome.runtime.sendMessage({action: 'handsfree-reload'})
  window.location.reload()
})
