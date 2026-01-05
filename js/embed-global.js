;(function () {
  if (document.querySelector("#preny-chat-host")) return

  const script = document.querySelector("script[data-preny-bot-id]")
  const botId = script.getAttribute("data-preny-bot-id")
  const width = script.getAttribute("data-width")
  const widthMobile = script.getAttribute("data-width-mobile")
  const heightMobile = script.getAttribute("data-height-mobile")
  const lang = script.getAttribute("data-language")
  const height = script.getAttribute("data-height")
  const title = script.getAttribute("data-title") || ""
  const src = script.getAttribute("src")
  const containerStyle = script.getAttribute("data-container-style")
  const buttonImage = script.getAttribute("data-image")
  const buttonStyle = script.getAttribute("data-button-style") || undefined
  const urlsrc = new URL(src)
  const botHost = urlsrc.origin
  const host = document.createElement("div")
  host.id = "preny-chat-host"
  host.style.position = "relative"
  host.style.zIndex = "99999999"
  shadowDom = host.attachShadow({ mode: "open" })
  document.body.appendChild(host)
  const botchat = document.createElement("div")
  const cssLink = document.createElement("link")
  cssLink.rel = "stylesheet"
  cssLink.type = "text/css"
  cssLink.href = botHost + "/bot-embed.css" + "?v=" + Date.now()
  cssLink.media = "all"
  botchat.innerHTML = `
            <div
              id="preny-chat-container"
              class="preny-chat-container"
              hidden
            >
              <iframe
              id="preny-chat-iframe"
                src="${botHost}/embed/${botId}?lang=${lang}"
                width="100%"
                height="100%"
                data-title="${title}"
              ></iframe>
              <div
                id="preny-close"
                class="preny-close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </div>
            </div>
    `
  const hostOpenButton = document.getElementById(
    script.getAttribute("data-trigger-id")
  )
  if (!hostOpenButton) {
    const defaultImg = `${botHost}/gif/preny_2.gif`
    const img = buttonImage || defaultImg
    botchat.innerHTML =
      `
        <div
            id="preny-open"
            class="preny-open${buttonImage ? " circle" : ""}"
            style="${buttonStyle}"
        >
            <img id='preny-gif' src="${img}" alt="icon" />
        </div>` + botchat.innerHTML
  }
  shadowDom.appendChild(cssLink)
  cssLink.onload = () => {
    shadowDom.appendChild(botchat)
    const triggerClose = shadowDom.getElementById("preny-close")
    const triggerOpen = hostOpenButton || shadowDom.getElementById("preny-open")
    const container = shadowDom.getElementById("preny-chat-container")
    const prenyGif = shadowDom.getElementById("preny-gif")

    if (widthMobile) {
      container.style.setProperty("--chat-width-mobile", widthMobile)
    }
    if (heightMobile) {
      container.style.setProperty("--chat-height-mobile", height)
    }

    if (width) {
      container.style.width = width
    }
    if (height) {
      container.style.height = height
    }

    if (containerStyle) {
      container.style = containerStyle
    }

    triggerClose.addEventListener("click", () => {
      container.classList.remove("show")
      container.hidden = true
      prenyGif.style.display = "block"
    })

    triggerOpen.addEventListener("click", () => {
      container.classList.add("show")
      container.hidden = false
      prenyGif.style.display = "none"
    })
  }
})()
