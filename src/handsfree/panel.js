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

      assetNodes[DEVICE.HEADSET].rotation.x = message.data.weboji.rotation[0]
      assetNodes[DEVICE.HEADSET].rotation.y = message.data.weboji.rotation[1]
      assetNodes[DEVICE.HEADSET].rotation.z = message.data.weboji.rotation[2]

      assetNodes[DEVICE.HEADSET].position.x = message.data.weboji.translation[0] * 2
      assetNodes[DEVICE.HEADSET].position.y = message.data.weboji.translation[1] * 2
      assetNodes[DEVICE.HEADSET].position.z = message.data.weboji.translation[2] * -3

      // Update everything. The Polyfill will handle the rest
      updateHeadsetPropertyComponent()
      notifyPoseChange(assetNodes[DEVICE.HEADSET])
      render()
    break
  }
})

/**
 * Initialize Handsfree.js
 */
document.querySelector('#startHandsfree').addEventListener('click', function () {
  document.querySelector('#startHandsfree').style.display = 'none'
  document.querySelector('#stopHandsfree').style.display = 'inline-block'
  chrome.runtime.sendMessage({action: 'handsfree-inject'}, function(response) {})
})

document.querySelector('#stopHandsfree').addEventListener('click', function () {
  chrome.runtime.sendMessage({action: 'handsfree-reload'}, function(response) {})
  window.location.reload()
})