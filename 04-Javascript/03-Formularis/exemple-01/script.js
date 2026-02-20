
/* ---------- UTILITATS DOM ---------- */

function setErrorMessage(refInputElement, refErrorElement, message) {
  refErrorElement.textContent = message

  refInputElement.classList.remove('is-valid', 'is-invalid')

  if (message) {
    refInputElement.classList.add('is-invalid')
  } else {
    refInputElement.classList.add('is-valid')
  }
}

function clearErrorMessage(refInputElement, refErrorElement) {
  setErrorMessage(refInputElement, refErrorElement, '')
}

function getSelectedRadioValue(groupName) {
  const refSelectedRadio = document.querySelector(`input[name="${groupName}"]:checked`)
  return refSelectedRadio ? refSelectedRadio.value : ''
}

/* ---------- INICIAR EVENTS ---------- */

function init() {
  const refNameInput = document.querySelector('#inpNom')
  const refEmailInput = document.querySelector('#inpEmail')
  const refAgeInput = document.querySelector('#inpEdat')
  const refCourseSelect = document.querySelector('#selCurs')
  const refPrivacyCheckbox = document.querySelector('#chkPriv')
  const refForm = document.querySelector('#frm')
  const refResetButton = document.querySelector('#btnReset')
  const refLevelRadios = document.querySelectorAll('input[name="nivell"]')
  const refOutput = document.querySelector('#out')

  refNameInput.addEventListener('input', validateName)
  refEmailInput.addEventListener('input', validateEmail)
  refAgeInput.addEventListener('input', validateAge)
  refCourseSelect.addEventListener('change', validateCourse)
  refPrivacyCheckbox.addEventListener('change', validatePrivacyPolicy)

  refLevelRadios.forEach(refRadio => {
    refRadio.addEventListener('change', validateLevel)
  })

  refForm.addEventListener('submit', function (event) {
    event.preventDefault()

    if (!validateForm()) {
      refOutput.textContent = 'Resultat: hi ha errors. Revisa el formulari.'
      return
    }

    const formData = getFormData()

    refOutput.textContent =
      'INSCRIPCIÓ CORRECTA:\n' +
      JSON.stringify(formData, null, 2)
  })

  refResetButton.addEventListener('click', resetForm)
}

/* ---------- VALIDACIÓ GLOBAL ---------- */

function validateForm() {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isAgeValid = validateAge()
  const isCourseValid = validateCourse()
  const isLevelValid = validateLevel()
  const isPrivacyValid = validatePrivacyPolicy()

  return (
    isNameValid &&
    isEmailValid &&
    isAgeValid &&
    isCourseValid &&
    isLevelValid &&
    isPrivacyValid
  )
}

function getFormData() {
  const refNameInput = document.querySelector('#inpNom')
  const refEmailInput = document.querySelector('#inpEmail')
  const refAgeInput = document.querySelector('#inpEdat')
  const refCourseSelect = document.querySelector('#selCurs')
  const refPrivacyCheckbox = document.querySelector('#chkPriv')

  const name = refNameInput.value.trim()
  const email = refEmailInput.value.trim()
  const age = refAgeInput.valueAsNumber
  const course = refCourseSelect.value
  const level = getSelectedRadioValue('nivell')
  const privacyAccepted = refPrivacyCheckbox.checked

  return {
    name,
    email,
    age: Number.isFinite(age) ? age : null,
    course,
    level,
    privacyAccepted
  }
}

function resetForm() {
  const refForm = document.querySelector('#frm')
  const refOutput = document.querySelector('#out')

  refForm.reset()
  refOutput.textContent = 'Resultat: (encara res)'

  const refInputs = [
    document.querySelector('#inpNom'),
    document.querySelector('#inpEmail'),
    document.querySelector('#inpEdat'),
    document.querySelector('#selCurs')
  ]

  refInputs.forEach(refInput => {
    refInput.classList.remove('is-valid', 'is-invalid')
  })

  const refErrorElements = [
    document.querySelector('#errNom'),
    document.querySelector('#errEmail'),
    document.querySelector('#errEdat'),
    document.querySelector('#errCurs'),
    document.querySelector('#errNivell'),
    document.querySelector('#errPriv')
  ]

  refErrorElements.forEach(refError => {
    refError.textContent = ''
  })
}

/* ---------- VALIDACIONS INDIVIDUALS ---------- */

function validateName() {
  const refNameInput = document.querySelector('#inpNom')
  const refNameError = document.querySelector('#errNom')

  const nameValue = refNameInput.value.trim()

  if (nameValue.length < 3) {
    setErrorMessage(refNameInput, refNameError, 'El nom ha de tenir mínim 3 caràcters.')
    return false
  }

  clearErrorMessage(refNameInput, refNameError)
  return true
}

function validateEmail() {
  const refEmailInput = document.querySelector('#inpEmail')
  const refEmailError = document.querySelector('#errEmail')

  const emailValue = refEmailInput.value.trim()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = emailPattern.test(emailValue)

  if (!isValidEmail) {
    setErrorMessage(refEmailInput, refEmailError, 'Format d’email incorrecte.')
    return false
  }

  clearErrorMessage(refEmailInput, refEmailError)
  return true
}

function validateAge() {
  const refAgeInput = document.querySelector('#inpEdat')
  const refAgeError = document.querySelector('#errEdat')

  const ageValue = refAgeInput.valueAsNumber

  if (!Number.isFinite(ageValue)) {
    setErrorMessage(refAgeInput, refAgeError, 'Has d’introduir una edat.')
    return false
  }

  if (ageValue < 12 || ageValue > 99) {
    setErrorMessage(refAgeInput, refAgeError, 'L’edat ha d’estar entre 12 i 99.')
    return false
  }

  clearErrorMessage(refAgeInput, refAgeError)
  return true
}

function validateCourse() {
  const refCourseSelect = document.querySelector('#selCurs')
  const refCourseError = document.querySelector('#errCurs')

  const selectedCourse = refCourseSelect.value

  if (!selectedCourse) {
    setErrorMessage(refCourseSelect, refCourseError, 'Has de seleccionar un curs.')
    return false
  }

  clearErrorMessage(refCourseSelect, refCourseError)
  return true
}

function validateLevel() {
  const refLevelError = document.querySelector('#errNivell')
  const selectedLevel = getSelectedRadioValue('nivell')

  if (!selectedLevel) {
    refLevelError.textContent = 'Has de seleccionar un nivell.'
    return false
  }

  refLevelError.textContent = ''
  return true
}

function validatePrivacyPolicy() {
  const refPrivacyCheckbox = document.querySelector('#chkPriv')
  const refPrivacyError = document.querySelector('#errPriv')

  if (!refPrivacyCheckbox.checked) {
    refPrivacyError.textContent = 'Has d’acceptar la política de privacitat.'
    return false
  }

  refPrivacyError.textContent = ''
  return true
}

