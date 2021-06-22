let button = document.getElementById("logout")

button.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.locaction.replace('./popup.html')
   })
})
