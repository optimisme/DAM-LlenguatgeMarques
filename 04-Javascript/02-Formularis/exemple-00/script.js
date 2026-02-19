// script.js
function setText(sel, text) {
  document.querySelector(sel).textContent = text
}

function getValue(sel) {
  return document.querySelector(sel).value
}

function onNomInput() {
  setText('#outNom', getValue('#inpNom') || '-')
}

function onCiutatChange() {
  setText('#outCiutat', getValue('#inpCiutat') || '-')
}

function onCursChange() {
  setText('#outCurs', getValue('#selCurs') || '-')
}

function onCondChange() {
  const ref = document.querySelector('#chkCond')
  setText('#outCond', ref.checked ? 'Sí' : 'No')
}

function getRadioValue(name) {
  const ref = document.querySelector(`input[name="${name}"]:checked`)
  return ref ? ref.value : ''
}

function onModeChange() {
  const v = getRadioValue('mode')
  setText('#outMode', v || '-')
}

function onComentInput() {
  setText('#outComent', getValue('#txtComent') || '-')
}

function onSetNomInput() {
  setText('#outSetNom', getValue('#inpSetNom') || '-')
}

function posaPere() {
  document.querySelector('#inpSetNom').value = 'Pere'
  onSetNomInput()
}

function netejaNom() {
  document.querySelector('#inpSetNom').value = ''
  onSetNomInput()
}

function getFormState() {
  const chk = document.querySelector('#chkCond').checked
  const nota = document.querySelector('#inpNota').valueAsNumber
  const mode = getRadioValue('mode')
  return {
    nom: getValue('#inpNom'),
    ciutat: getValue('#inpCiutat'),
    curs: getValue('#selCurs'),
    condicions: chk,
    mode: mode,
    comentaris: getValue('#txtComent'),
    nota: Number.isNaN(nota) ? null : nota
  }
}

function onSubmit(e) {
  e.preventDefault()
  const mail = getValue('#inpMail')
  const data = getFormState()
  data.mail = mail
  setText('#outFrm', 'ENVIAT:\n' + JSON.stringify(data, null, 2))
}

function resetJS() {
  document.querySelector('#inpNom').value = ''
  document.querySelector('#inpCiutat').value = ''
  document.querySelector('#selCurs').value = ''
  document.querySelector('#chkCond').checked = false
  document.querySelectorAll('input[name="mode"]').forEach(r => (r.checked = false))
  document.querySelector('#txtComent').value = ''
  document.querySelector('#inpMail').value = ''
  document.querySelector('#inpSetNom').value = ''
  setText('#outFrm', 'ENVIAT: (encara res)')
  initOutputs()
}

function onFocus() {
  setText('#outFocus', 'Focus')
}

function onBlur() {
  setText('#outFocus', 'Sense focus')
}

function initOutputs() {
  onNomInput()
  onCiutatChange()
  onCursChange()
  onCondChange()
  onModeChange()
  onComentInput()
  onNotaInput()
  onSetNomInput()
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#inpNom').addEventListener('input', onNomInput)
  document.querySelector('#inpCiutat').addEventListener('change', onCiutatChange)
  document.querySelector('#selCurs').addEventListener('change', onCursChange)
  document.querySelector('#chkCond').addEventListener('change', onCondChange)

  document.querySelectorAll('input[name="mode"]').forEach(r => {
    r.addEventListener('change', onModeChange)
  })

  document.querySelector('#txtComent').addEventListener('input', onComentInput)

  document.querySelector('#inpSetNom').addEventListener('input', onSetNomInput)
  document.querySelector('#btnPosaNom').addEventListener('click', posaPere)
  document.querySelector('#btnNetejaNom').addEventListener('click', netejaNom)

  document.querySelector('#btnReset').addEventListener('click', resetJS)

  const f = document.querySelector('#inpFocus')
  f.addEventListener('focus', onFocus)
  f.addEventListener('blur', onBlur)

  initOutputs()
})
