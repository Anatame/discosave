// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let button = document.getElementById("authorize")


let msArray = ["aa", "bb", "cc", "dd", "ee", "fff"]

let div = document.createElement("div");
let list = document.querySelector(".list")

button.addEventListener("click", (e) => {
  const Http = new XMLHttpRequest();
  const url = 'http://127.0.0.1:5000/items';
  Http.open("POST", url);
  Http.send(`{"name": "bruh"}`);

  Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
  }
})



// chrome.storage.sync.get(["color", "message", "messageArray"], ({
//   color,
//   message,
//   messageArray
// }) => {

// })