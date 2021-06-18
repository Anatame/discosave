let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});


chrome.runtime.onMessage.addListener(
   function(request, sender, sendResponse){
     if (request.msg == "startFunc") activateScript();
   }
 );
 
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
   let mainElement = document.querySelectorAll(".cozyMessage-3V1Y8y");

         
   mainElement.forEach((item) => {

      let btnNum = 0;

      item.addEventListener("mouseover", (event) => {
         // console.log(item.childNodes[2].childNodes[0].childNodes[0])
         if (btnNum == 0) {
    
            var buttonGroupDiv = item.childNodes[2].childNodes[0].childNodes[0];
            // var button = document.createElement("BUTTON");

            console.log(buttonGroupDiv.childNodes)
           
         }
      });
   })
}