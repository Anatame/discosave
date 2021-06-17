let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.storage.sync.onChanged.addListener(function(changes) {
  let message = changes['message'];
  if(message.newValue != null) {
      // YOUR CODE HERE
    console.log(message.newValue)
  }
});




chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "startFunc") startListening();
  }
);


function startListening(){
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
  
      if (details.url.includes('https://discord.com/api/v9/channels/')) {
        console.log('called')
        activateScript();
      }
    },
    {urls: ["<all_urls>"]}
  );
  
}




async function activateScript() {

    let [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
  
    chrome.scripting.executeScript({
      target: {
        tabId: tab.id,
      },
      function: setPageBackgroundColor,
    });

 
}

function setPageBackgroundColor() {
  //  chrome.storage.sync.get("color", ({ color }) => {
  //    document.body.style.backgroundColor = color;
  //  });
  let mainElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
  mainElement.forEach((item) => {
    let btnNum = 0;
    item.addEventListener("mouseover", (event) => {
      // console.log(item.childNodes[2].childNodes[0].childNodes[0])
      if (btnNum == 0) {
        try {
          var buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
          var button = document.createElement("BUTTON");
          button.innerHTML = "Button";
          buttonGroupDiv.style.backgroundColor = "red";
          buttonGroupDiv.appendChild(button);
          btnNum = 1;
          button.addEventListener("click", (event) => {
            console.log("clicked");

            var messageContainer = item.childNodes[0];

            console.log(messageContainer.childNodes.length != 3);

            if (messageContainer.childNodes.length != 3) {
              console.log("contained");
              console.log(messageContainer.childNodes[1].innerHTML);

              chrome.storage.sync.set({ message: messageContainer.childNodes[1].innerHTML });
            } else {
              console.log("alone");
              console.log(messageContainer.childNodes[2].innerHTML);

              chrome.storage.sync.set({ message: messageContainer.childNodes[2].innerHTML });
            }
          });
        } catch (err) {
          // if any error, Code throws the error
        }
      }
    });
  });
}
