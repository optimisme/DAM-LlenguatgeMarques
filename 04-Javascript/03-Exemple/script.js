"use strict";

const refFitxa = document.getElementById("refFitxa");
const refReset = document.getElementById("refReset");
const refInfo = document.getElementById("refInfo");

const numPosicions = 5;
const midaCasella = 75;

let posicioActual = 0;

function init () {
    refFitxa.addEventListener("click", mouADreta);
    refReset.addEventListener("click", reset);
    actualitzaFitxa();
}

function actualitzaFitxa() {
  const posicioPixels = posicioActual * midaCasella;

  refFitxa.style.transform = `translateX(${posicioPixels}px)`;
  refInfo.textContent = `Posició: ${posicioActual} / 4 (${posicioPixels}px)`;
}

function mouADreta() {
  if (posicioActual < numPosicions - 1) {
    posicioActual++;
    actualitzaFitxa();
  }
}

function reset() {
  posicioActual = 0;
  actualitzaFitxa();
}

