document.querySelector('#handsfree-start').addEventListener('click', function () {
  chrome.runtime.sendMessage({action: 'handsfree-inject'}, function(response) {
    this.close()
  })
})