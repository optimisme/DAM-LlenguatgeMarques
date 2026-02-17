function posaHola() {
    var ref = document.querySelector("#hola")
    ref.innerText = "Hola"
}

function posaRes() {
    var ref = document.querySelector("#hola")
    ref.innerText = "???"
}

function escriuConsola(valor) {
    console.log(`Sha rebut: "${valor}"`)
}

function canviaNom() {
    var ref =  document.querySelector("#adeu")
    var text = ref.innerText

    if (text.indexOf("Maria") >= 0) {
        // Si hi ha el text "Maria" es canvia per "Pepet"
        text = text.replaceAll("Maria", "Pepet")
    } else {
        // Si no hi ha el text "Maria" es canvia canvia "Pepet" per "Maria"
        text = text.replaceAll("Pepet", "Maria")
    }
    
    ref.innerText = text
}