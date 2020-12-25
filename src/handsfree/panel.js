port.onMessage.addListener(message => {
  switch (message.action) {
    case 'handsfree-data':
      const node = assetNodes[DEVICE.HEADSET]
      if (!node) return

      assetNodes[DEVICE.HEADSET].rotation.x = message.data.weboji.rotation[0]
      assetNodes[DEVICE.HEADSET].rotation.y = message.data.weboji.rotation[1]
      assetNodes[DEVICE.HEADSET].rotation.z = message.data.weboji.rotation[2]
      updateHeadsetPropertyComponent()
      notifyPoseChange(assetNodes[DEVICE.HEADSET])
      render()
    break
  }
})