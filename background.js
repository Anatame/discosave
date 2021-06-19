let color = '#3aa757';



chrome.storage.sync.set({
  svg: chrome.runtime.getURL("/images/savewhite.svg")
});


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    color
  });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});




chrome.webNavigation.onCompleted.addListener(function (tab) {
  if (tab.frameId == 0) {
    console.log("activated")
    activateScript1();
    // setInterval(() => activateScript1, 2000)
    // startListening()
  }
});


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.msg == "startFunc") {
      // startListening()
    } else if (request.msg == "be") {
      activateScript()
    }
  }
);


// function startListening() {
//   chrome.webRequest.onBeforeRequest.addListener(
//     function (details) {

//       if (details.url.includes('https://discord.com/api/v9/channels/')) {
//         console.log('called')
//         activateScript();
//       }
//     }, {
//       urls: ["<all_urls>"]
//     }
//   );

// }


async function activateScript1() {

  console.log("activate Script 1 called")
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  chrome.scripting.executeScript({
    target: {
      tabId: tab.id,
    },
    function: injectMain1,
  });
}

function injectMain1() {

  window.setInterval(() => {
    chrome.runtime.sendMessage({
      msg: "be"
    })
    console.log("Injected script 1")
  }, 2000)
}

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

  // function activate(){
  let svg = chrome.runtime.getURL("/images/savewhite.svg")
  let mainElement = document.querySelectorAll(".cozyMessage-3V1Y8y");
  if (mainElement) {
    console.log("defined")

    mainElement.forEach((item) => {
      let btnNum = 0;
      item.addEventListener("mouseover", (event) => {
        // console.log(item.childNodes[2].childNodes[0].childNodes[0])
        if (btnNum == 0) {
          try {
            var buttonGroupDiv
            var messageContainer
            // buttonContainer-DHceWr
            if (item.childNodes.length == 3 && item.childNodes[2].classList.contains("buttonContainer-DHceWr")) {
              buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
              messageContainer = item.childNodes[0];
            } else if (item.childNodes.length == 4 && item.childNodes[3].classList.contains("buttonContainer-DHceWr")) {
              buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
              messageContainer = item.childNodes[1];
            }

            if (buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[0].classList.contains("btn")) {


              chrome.storage.sync.get(["color", "message", "svg"], ({
                color,
                message,
                svg
              }) => {

                let div = document.createElement("div");
                div.innerText = "Save";
                div.classList.add('btn')
                div.style.backgroundImage = "url(" + svg +")"
                buttonGroupDiv.style.backgroundColor = "#121212";
                buttonGroupDiv.prepend(div);
                btnNum = 1;
                div.addEventListener("click", (event) => {
                  console.log("clicked");



                  console.log(messageContainer.childNodes.length != 3);

                  if (messageContainer.childNodes.length == 2) {
                    console.log("contained");
                    console.log(messageContainer.childNodes[1].innerHTML);

                    chrome.storage.sync.set({
                      message: messageContainer.childNodes[1].innerHTML
                    });
                  } else if (messageContainer.childNodes.length == 3) {
                    console.log("alone");
                    console.log(messageContainer.childNodes[2].innerHTML);

                    chrome.storage.sync.set({
                      message: messageContainer.childNodes[2].innerHTML
                    });
                  } else if (messageContainer.childNodes.length == 4) {
                    console.log("containsReply");
                    console.log(messageContainer.childNodes[3].innerHTML + " ahh");

                    chrome.storage.sync.set({
                      message: messageContainer.childNodes[3].innerHTML
                    });
                  }


                });
              })


            }


          } catch (err) {
            // if any error, Code throws the error
            // console.log("not found")
          }
        }
      });
    });
  }
  console.log("Interval")


}