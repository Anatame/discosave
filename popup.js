// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");


let msArray = ["aa", "bb", "cc", "dd", "ee", "fff"]

let div = document.createElement("div");
let list = document.querySelector(".list")


chrome.storage.sync.get(["color", "message", "messageArray"], ({
  color,
  message,
  messageArray
}) => {
  if (messageArray) {
    messageArray.push(message)


    messageArray.forEach((item) => {
      let li = document.createElement("div")
      li.classList.add('listItems')
      li.innerText = item
      list.appendChild(li)
      console.log(li)
    })


  } else {
    chrome.storage.sync.set({
      "messageArray": [message]
    })
    let li = document.createElement("li")
    li.innerText = message
    list.appendChild(li)
  }
})


//fetchMessages
// chrome.storage.sync.get(["color", "message"], ({ color, message }) => {
//   changeColor.style.backgroundColor = color;
//   let div = document.createElement("div");
//   div.innerHTML = message;
//   document.body.appendChild(div);
// });

// When the button is clicked, inject setPageBackgroundColor into current page
// changeColor.addEventListener("click", async () => {
//   chrome.runtime.sendMessage({ msg: "startFunc" });
// });

// The body of this function will be executed as a content script inside the
// current page