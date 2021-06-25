let button = document.getElementById("logout")
let avatar = document.getElementById("avatar")
let avatar = document.getElementById("avatar")

button.addEventListener("click", (e) => {
   chrome.runtime.sendMessage({ msg: 'login' }, (response) => {
      if (response === 'success') window.locaction.replace('./popup.html')
   })
})

chrome.storage.sync.get(
   ["color", "message", "svg", "svgHover", "svgClick", "profile"],
   ({ color, message, svg, svgHover, svgClick, profile }) => {
      avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
      console.log(data)
   }
 );
