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

      updateHeadsetPropertyComponent()
      notifyPoseChange(assetNodes[DEVICE.HEADSET])
      render()
    break
  }
})