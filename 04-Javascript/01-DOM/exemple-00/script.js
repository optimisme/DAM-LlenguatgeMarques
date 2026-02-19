
// Exemple: modificar un text de la pàgina (1)
function posaHola() {
    var ref = document.querySelector("#hola")
    ref.textContent = "Hola"
}

function posaRes() {
    const ref = document.querySelector("#hola")
    ref.textContent = "???"
}

//  Exemple: modificar un text de la pàgina (2)
function canviaNom() {
    const ref =  document.querySelector("#adeu")
    var text = ref.textContent

    if (text.indexOf("Maria") >= 0) {
        // Si hi ha el text "Maria" es canvia per "Pepet"
        text = text.replaceAll("Maria", "Pepet")
    } else {
        // Si no hi ha el text "Maria" es canvia canvia "Pepet" per "Maria"
        text = text.replaceAll("Pepet", "Maria")
    }
    
    ref.textContent = text
}

// Exemple: escriure a la consola (i paràmetres)
function escriuConsola(valor) {
    console.log(`Sha rebut: "${valor}"`)
}

// Exemple: canviar l'estil d'un element (1)
function textColor(value) {
    const ref =  document.querySelector("#txtCol")
    ref.style.color = value;
}

// Exemple: canviar l'estil d'un element (2)
function backColor(value) {
    const ref =  document.querySelector("#bckCol")
    ref.style.backgroundColor = value;
}

// Exemple: modificar les classes d'un element
function propertiesConfig(className) {
    const ref =  document.querySelector("#clsConfig")

    if (ref.classList.contains(className)) {
        ref.classList.remove(className)
    } else {
        ref.classList.add(className)
    }
    console.log(className)
}

// Exemple: activar/desactivar una animació CSS
function animOn() {
  const ref = document.getElementById("animatedBox")
  ref.classList.add("animacioCSS")

  const refBtn = document.getElementById("btnPause")
  refBtn.classList.remove("hidden")
}

function animOff() {
  const ref = document.getElementById("animatedBox")
  ref.classList.remove("animacioCSS")
  ref.classList.remove("animacioPausada")

  const refBtn = document.getElementById("btnPause")
  refBtn.classList.add("hidden")
}

function animPause() {
  const ref = document.getElementById("animatedBox")

  if (!ref.classList.contains("animacioCSS")) {
    ref.classList.add("animacioCSS")
    return // s'inicia l'animació, no canviem l'estat de pausa
  }

  // Canviar l'estat posar/treure per pausar/animar
  ref.classList.toggle("animacioPausada")

  const refBtn = document.getElementById("btnPause")
  if (ref.classList.contains("animacioPausada")) {
    refBtn.innerText = "Reanudar"
  } else {
    refBtn.innerText = "Pausar"
  }
}

// Exemple: Modificar el valor d'una variable CSS
function canviaVarCSS(nouColor) {
  document.documentElement
    .style
    .setProperty('--color-principal', nouColor)
}

// Manipular l'estructura del DOM
var divCounter = 0
function addDiv() {
    
    // Crear un nou 'div'
    var newDiv = document.createElement("div")
    newDiv.setAttribute("id", "nouDiv" + divCounter)
    newDiv.setAttribute("class", "fonsMagenta")
    newDiv.textContent = "Magenta! " + divCounter


    // Afegir el nou 'div' a 'emptyBox'
    const ref = document.getElementById("emptyBox")
    ref.appendChild(newDiv)
    divCounter = divCounter + 1

    const refBtn = document.getElementById("btnRemove")
    refBtn.classList.remove("hidden")
}

function removeDiv() {
    const ref = document.getElementById("emptyBox")

    if (ref.lastElementChild) {
        ref.removeChild(ref.lastElementChild)
        divCounter--
    }

    const refBtn = document.getElementById("btnRemove")
    if (divCounter <= 0) {
        refBtn.classList.add("hidden")
    }
}
