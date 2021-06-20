let color = '#3aa757';



chrome.storage.sync.set({
  svg: chrome.runtime.getURL("/images/savewhite.svg"),
  svgHover: chrome.runtime.getURL("/images/savewhitehover.svg")
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
  let img;
  let imgHover;
  chrome.storage.sync.get(["color", "message", "svg", "svgHover"], ({
    color,
    message,
    svg,
    svgHover
  }) => {
    img = svg
    imgHover = svgHover
    console.log(svg)
  })

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

            if (buttonGroupDiv.childNodes.length <= 3 && !buttonGroupDiv.childNodes[buttonGroupDiv.childNodes.length - 1].classList.contains("btn")) {


              let div = document.createElement("div");
              // div.style.width = "100%";
              div.classList.add('button-1ZiXG9')
              let button = document.createElement("button");
              button.classList.add('btn')
              button.style.backgroundImage = `url(${img})`
              button.style.backgroundRepeat = "no-repeat"
              button.style.backgroundSize = 'contain'
              button.style.width = "24px"
              button.style.height = "24px"
              button.style.backgroundColor = "transparent"
              // button.style.margin = "4px"
              buttonGroupDiv.style.backgroundColor = "#121212";
              div.appendChild(button)
              buttonGroupDiv.prepend(div);
              btnNum = 1;

              ["click", "mouseover", "mouseout"].forEach(function (e) {
                button.addEventListener(e, (event) => {
                  if (event.type == "click") {
                    console.log("click")

                    if (messageContainer.childNodes.length == 2) {
                      console.log("contained");
                      console.log(messageContainer.childNodes[1].innerText);
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[1].innerText
                      });
                    } else if (messageContainer.childNodes.length == 3) {
                      console.log("alone");
                      console.log(messageContainer.childNodes[2].innerText);
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[2].innerText
                      });
                    } else if (messageContainer.childNodes.length == 4) {
                      console.log("containsReply");
                      console.log(messageContainer.childNodes[3].innerText + " ahh");
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[3].innerText
                      });
                    }

                  } else if (event.type == "mouseover") {
                    console.log("mouseover" + event.type);
                    div.style.backgroundColor = "#4f545c29"
                    button.style.backgroundImage = `url(${imgHover})`
                  } else if (event.type == "mouseout") {
                    console.log("mouseover" + event.type);
                    div.style.backgroundColor = "transparent"
                    button.style.backgroundImage = `url(${img})`
                  }
                  console.log(messageContainer.childNodes.length != 3);

                });
              });


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