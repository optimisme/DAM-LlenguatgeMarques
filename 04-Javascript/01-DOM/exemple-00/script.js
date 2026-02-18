
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
}

function animPause() {
  const ref = document.getElementById("animatedBox")

  if (!ref.classList.contains("animacioCSS")) {
    ref.classList.add("animacioCSS")
    return // ja està en marxa, no fem toggle
  }

  // Canviar l'estat posar/treure per pausar/animar
  ref.classList.toggle("animacioPausada")
}

function animOff() {
  const ref = document.getElementById("animatedBox")
  ref.classList.remove("animacioCSS")
}