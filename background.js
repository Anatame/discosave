let color = '#3aa757';



chrome.storage.sync.set({
  svg: chrome.runtime.getURL("/images/savewhite.svg"),
  svgHover: chrome.runtime.getURL("/images/savewhitehover.svg"),
  svgClick: chrome.runtime.getURL("/images/savewhiteClick.svg"),
});



chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.set({
    color
  });
  console.log('Default background color set to %cgreen', `color: ${color}`);

});

chrome.action.setBadgeText({text: 'ON'});
chrome.action.setBadgeBackgroundColor({color: '#4688F1'});



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

    if (request.messageContent) {
      
      const XHR = new XMLHttpRequest();
      XHR.onreadystatechange = handleStateChange;
      const url = 'http://127.0.0.1:5000/items';
      XHR.open("POST", url);
      Http.send(`{"name": "${request.messageContent}"}`);
    
      Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
      }
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
  let img, imgHover, imgClick;
  chrome.storage.sync.get(["color", "message", "svg", "svgHover", "svgClick"], ({
    color,
    message,
    svg,
    svgHover,
    svgClick
  }) => {
    img = svg
    imgHover = svgHover
    imgClick = svgClick
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
            let buttonGroupDiv
            let messageContainer
            let wrapper;
            // buttonContainer-DHceWr
            if (item.childNodes.length == 3 && item.childNodes[2].classList.contains("buttonContainer-DHceWr")) {
              buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
              wrapper = item.childNodes[2].childNodes[0]
              messageContainer = item.childNodes[0];
            } else if (item.childNodes.length == 4 && item.childNodes[3].classList.contains("buttonContainer-DHceWr")) {
              buttonGroupDiv = item.childNodes[3].childNodes[0].childNodes[0];
              wrapper = item.childNodes[3].childNodes[0]
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
              button.style.width = "22px"
              button.style.height = "22px"
              button.style.backgroundColor = "transparent"
              // button.style.margin = "4px"
              // buttonGroupDiv.style.backgroundColor = "#121212";
              div.appendChild(button)
              buttonGroupDiv.prepend(div);
              btnNum = 1;

              ["click", "mouseenter", "mouseout", "mousedown", "mouseup"].forEach(function (e) {
                button.addEventListener(e, (event) => {
                  let toolTip = document.createElement("div")
                       
                  toolTip.innerText = "Save"
                  toolTip.style.padding = "10px"
                  toolTip.style.marginTop = "-72px"
                  toolTip.style.left = "-5px"
                  toolTip.style.borderRadius = "6px 6px 0px 6px"
                  toolTip.style.zIndex = "9999"
                  toolTip.style.position = "absolute"
                  toolTip.style.backgroundColor = "#18191d"
                  toolTip.style.color = "#DCDDDE"
                  toolTip.style.fontSize = "14px"
                  toolTip.style.fontWeight = "500"
                  toolTip.style.opacity = "0"

                  if (event.type == "click") {
                    console.log("click")

                    if (messageContainer.childNodes.length == 2) {
                      console.log("contained");
                      console.log(messageContainer.childNodes[1].innerText);
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[1].innerText
                      });


                      chrome.runtime.sendMessage({ messageContent: messageContainer.childNodes[1].innerText })
                      
                    } else if (messageContainer.childNodes.length == 3) {
                      console.log("alone");
                      console.log(messageContainer.childNodes[2].innerText);
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[2].innerText
                      });

                    

                      chrome.runtime.sendMessage({ messageContent: messageContainer.childNodes[2].innerText })
                    } else if (messageContainer.childNodes.length == 4) {
                      console.log("containsReply");
                      console.log(messageContainer.childNodes[3].innerText + " ahh");
  
                      chrome.storage.sync.set({
                        message: messageContainer.childNodes[3].innerText
                      });

                      
                      
                      chrome.runtime.sendMessage({ messageContent: messageContainer.childNodes[3].innerText })
                    }

                  } else if (event.type == "mouseenter") {
                    div.style.backgroundColor = "#4f545c29"
                    button.style.backgroundImage = `url(${imgHover})`

                    if (wrapper.childNodes.length == 1) {
                      wrapper.append(toolTip)
                      wrapper.childNodes[1].style.opacity = "1"
                    } else {
                      wrapper.childNodes[1].style.opacity = "1"
                    }
                     

                  } else if (event.type == "mouseout") {
                    wrapper.childNodes[1].style.opacity = "0d"
                    div.style.backgroundColor = "transparent"
                    wrapper.childNodes[1].style.opacity = "0"
                    console.log("ZEROOOOOOOOO")
                    button.style.backgroundImage = `url(${img})`
                  } else if (event.type == "mousedown") {
                   
                    button.style.backgroundImage = `url(${imgClick})`
                  } else if (event.type == "mouseup") {
                  
                    button.style.backgroundImage = `url(${imgHover})`
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