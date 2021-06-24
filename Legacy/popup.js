// Initialize button with user's preferred color
let button = document.getElementById("authorize")


let msArray = ["aa", "bb", "cc", "dd", "ee", "fff"]

let div = document.createElement("div");
let list = document.querySelector(".list")

button.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.location.replace('./popup-sign-out.html')
   })
})




// chrome.storage.sync.get(["color", "message", "messageArray"], ({
//   color,
//   message,
//   messageArray
// }) => {

// })