document.querySelector('#handsfree-start').addEventListener('click', function () {
  chrome.runtime.sendMessage({directive: 'inject-handsfree'}, function(response) {
    this.close()
  })
})