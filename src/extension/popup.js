const $start = document.querySelector('#start-webcam')
const $stop = document.querySelector('#stop-webcam')

/**
 * Start the webcam
 * - If the user hasn't approved permissions yet, then visit the options page first
 */
$start.addEventListener('click', () => {
  chrome.storage.local.get(['hasCapturedStream'], (data) => {
    if (data.hasCapturedStream) {
      chrome.runtime.sendMessage({ action: 'handsfreeStart' })
      setHandsfreeState(true)
    } else {
      chrome.tabs.create({ url: '/src/extension/options.html' })
    }
    window.close()
  })
})

/**
 * Stop the webcam
 */
$stop.addEventListener('click', () => {
  setHandsfreeState(false)
  chrome.runtime.sendMessage({ action: 'handsfreeStop' })
  window.close()
})

/**
 * Sets the button class
 */
function setHandsfreeState(isStarted) {
  if (isStarted) {
    $start.classList.add('hidden')
    $stop.classList.remove('hidden')
  } else {
    $start.classList.remove('hidden')
    $stop.classList.add('hidden')
  }
}
chrome.storage.local.get(['isHandsfreeStarted'], function(data) {
  setHandsfreeState(data.isHandsfreeStarted)
})