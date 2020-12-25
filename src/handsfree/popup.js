document.querySelector('#handsfree-start').addEventListener('click', function () {
  chrome.runtime.sendMessage({message: 'handsfree-inject'}, function(response) {
    this.close()
  })
})