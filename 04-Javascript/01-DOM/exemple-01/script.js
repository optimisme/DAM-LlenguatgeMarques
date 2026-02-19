
// Init: connect handlers when DOM is ready
function init() {
  console.log("DOM carregat (DOMContentLoaded)")

  // Text color buttons
  document.getElementById("btnBlue").addEventListener("click", () => textColor("blue"))
  document.getElementById("btnRed").addEventListener("click", () => textColor("red"))
  document.getElementById("btnOrange").addEventListener("click", () => textColor("orange"))
  document.getElementById("btnBlack").addEventListener("click", () => textColor("black"))

  // Class toggles
  document.getElementById("btnColor").addEventListener("click", () => propertiesConfig("color"))
  document.getElementById("btnUnderline").addEventListener("click", () => propertiesConfig("underline"))
  document.getElementById("btnMarker").addEventListener("click", () => propertiesConfig("marker"))

  // Key events
  const keyInput = document.getElementById("keyInput")
  const keyInfo = document.getElementById("keyInfo")
  keyInput.addEventListener("keydown", (ev) => {
    keyInfo.textContent = "Tecla: " + ev.key
  })

  // Animation buttons
  document.getElementById("btnAnimOn").addEventListener("click", animOn)
  document.getElementById("btnAnimPause").addEventListener("click", animPause)
  document.getElementById("btnAnimOff").addEventListener("click", animOff)
}

document.addEventListener("DOMContentLoaded", init)

// Inline (HTML) examples
function posaHola() {
  const ref = document.querySelector("#hola")
  ref.textContent = "Hola!"
}

function posaRes() {
  const ref = document.querySelector("#hola")
  ref.textContent = "???"
}

function escriuConsola(msg) {
  console.log("Consola:", msg)
}

function actualitzaNomInline(value) {
  const ref = document.querySelector("#nomPreview")
  ref.textContent = "Nom: " + (value.trim() === "" ? "(buit)" : value)
}

function hoverInline(isOver) {
  const ref = document.querySelector("#hoverBox")
  ref.textContent = isOver ? "Estàs a sobre 👀" : "Passa el ratolí per sobre"
  ref.style.boxShadow = isOver ? "0 6px 14px rgba(0,0,0,0.12)" : "none"
  ref.style.transform = isOver ? "translateY(-2px)" : "none"
}

// JS (addEventListener) examples
function textColor(value) {
  const ref = document.querySelector("#txtCol")
  ref.style.color = value
}

function propertiesConfig(type) {
  const ref = document.querySelector("#clsConfig")
  if (type === "color") ref.classList.toggle("clr")
  if (type === "underline") ref.classList.toggle("ul")
  if (type === "marker") ref.classList.toggle("mark")
}

function animOn() {
  const ref = document.querySelector("#animatedBox")
  ref.classList.add("animOn")
  ref.classList.remove("animPaused")
}

function animPause() {
  const ref = document.querySelector("#animatedBox")
  if (ref.classList.contains("animOn")) ref.classList.toggle("animPaused")
}

function animOff() {
  const ref = document.querySelector("#animatedBox")
  ref.classList.remove("animOn")
  ref.classList.remove("animPaused")
}
