let button = document.getElementById("logout")
let avatar = document.getElementById("avatar")
let username = document.getElementById("userName")
let discriminator = document.createElement('span')
let userID = document.getElementById("userID")

let authorizeBotContainer = document.querySelector('.authorize-bot-container')
let channelContainer = document.querySelector('.channelContainer')
let authBotBtn = document.getElementById('authorizeBotBtn')

let channelContainerBtn = document.querySelector(".channelContainerBtn")
let list = document.querySelector(".list")

button.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.locaction.replace('./popup.html')
   })
})

chrome.storage.sync.get(
   ["color", "message", "svg", "svgHover", "svgClick", "profile"],
   ({ color, message, svg, svgHover, svgClick, profile }) => {
      avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
      username.innerText = profile.username
      discriminator.innerText = `#${profile.discriminator}`;
      discriminator.classList.add('tag')
      username.appendChild(discriminator)
      userID.innerText  = profile.id
   }
 );

authBotBtn.addEventListener("click", (e) => {
   console.log("click")
   authorizeBotContainer.style.display = "none"
   channelContainer.style.display = "block"
})

channelContainerBtn.addEventListener("click", (e) => {
   list.style.display = "block"
})