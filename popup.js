// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");




//fetchMessages
chrome.storage.sync.get(["color", "message"], ({ color, message }) => {
  changeColor.style.backgroundColor = color;
  let div = document.createElement("div");
  div.innerHTML = message;
  document.body.appendChild(div);
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  chrome.runtime.sendMessage({ msg: "startFunc" });
});

// The body of this function will be executed as a content script inside the
// current page
