let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.storage.sync.onChanged.addListener(function (changes) {
  let message = changes['message'];
  if (message.newValue != null) {
    // YOUR CODE HERE
    console.log(message.newValue)
  }
});



chrome.webNavigation.onCompleted.addListener(function (tab) {
  if (tab.frameId == 0) {
    console.log("activated")
    startListening()
    // activateScript();
  }
});




chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "startFunc") startListening();
  }
);


function startListening() {
  chrome.webRequest.onBeforeRequest.addListener(
    function (details) {


      if (details.url.includes(' https://discord.com/api/v9/science')) {
        console.log('ready')
        // activateScript();
      }
      if (details.url.includes('https://discord.com/api/v9/channels/')) {
        console.log('called')
        activateScript();
      }
    },
    { urls: ["<all_urls>"] }
  );

}

//scrollerInner-2YIMLh


async function activateScript() {

  console.log("activateScript called")
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    function: injectMain,
  });


}

function injectMain() {
  //  chrome.storage.sync.get("color", ({ color }) => {
  //    document.body.style.backgroundColor = color;
  //  });

  // let scrollElement = document.querySelectorAll(".scrollerInner-2YIMLh");
  // console.log(scrollElement.children)

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        console.log(mutation.addedNodes)
        add();
      }
    })
  })

  //const bears = document.querySelector('.content-yTz4x3')
  const bears = document.querySelector('.content-yTz4x3')
  //

  observer.observe(bears, {
    childList: true,
  })

  add()

  function add() {
    let mainElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
    if (mainElement) {
      console.log("defined")

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
              console.log("not found")
            }
          }
        });
      });
    }
  }



}
