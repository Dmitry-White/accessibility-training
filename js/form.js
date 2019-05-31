
const USERS = [];
const INPUTS = [...document.querySelectorAll(".register-form input")];

const failBlock = document.querySelector(".fail-block");
const successBlock = document.querySelector(".success-block");
const errorMessages = document.querySelector(".error-messages");
const yearInput = document.getElementById("birth-year");
const emailInput = document.getElementById("email");
const emailHelp = document.getElementById("email-help");
const registerButton = document.querySelector(".register-button");

let inputsEnabled, lastSavedEmail;
const emailDiv = emailInput.parentNode.parentNode;


// ------------------------ Utility functions -------------------------------
const refreshInputs = () => (
  inputsEnabled = [
    ...document.querySelectorAll(".register-form input[aria-required]:not([disabled])")
  ]
);

const clearInputs = () => {
  INPUTS.forEach(input => input.value = '');
  yearInput.setAttribute("disabled", true);
  emailDiv.classList.remove("valid-field");
  refreshInputs();
}

const hideMessages = () => {
  successBlock.classList.remove("active-block");
  failBlock.classList.remove("active-block");
}
// --------------------------------------------------------------------------

// ----------------------- Processing functions -----------------------------
const processInvalid = (input, id) => {
  input.setAttribute("aria-describedby", id);
  input.setAttribute("aria-invalid", true);
  input.parentNode.parentNode.classList.add("invalid-field");
}

const processValid = input => {
  input.removeAttribute("aria-describedby");
  input.removeAttribute("aria-invalid");
  input.parentNode.parentNode.classList.remove("invalid-field");
}

const processError = (input, message) => {
  const inputName = input.getAttribute("name");
  const inputHelpId = inputName + "-help";
  const error = `<li><a href="#${inputName}">${message}</a></li>`;

  processInvalid(input, inputHelpId);
  return { error };
}
// --------------------------------------------------------------------------

// ------------------------ Validation functions-----------------------------
const validateField = input => {
  const inputName = input.getAttribute("name");

  if (!input.value) {
    const inputHelpMessage = input.placeholder;
    return processError(input, inputHelpMessage);
  }

  if (input.name === "user-name" && _.find(USERS, { "user-name": input.value })) {
    const inputHelpMessage = "This username is in use yet, please choose another username";
    return processError(input, inputHelpMessage);
  }
  
  if (input.name === "birth-year" && (!/^[0-9]*$/.test(input.value) || input.value.length !== 4)) {
    const inputHelpMessage = "The birth year should be 4-digits number";
    return processError(input, inputHelpMessage);
  }

  if (input.name === "phone-number" && !/^[0-9]*$/.test(input.value)) {
    const inputHelpMessage = "The phone number should contain numbers only";
    return processError(input, inputHelpMessage);
  }

  if (input.name === "email" && emailDiv.classList.contains("invalid-field")) {
    const inputHelpMessage = emailHelp.innerHTML;
    return processError(input, inputHelpMessage);
  }

  processValid(input);

  return {
    user: { [inputName]: input.value }
  }
}

const validateEmail = e => {
  emailInput.setAttribute("aria-labelledby", "email-help");
  
  if (emailInput.value !== lastSavedEmail) {
    const inputHelpMessage = "The email is validating, please wait";
    emailHelp.innerHTML = inputHelpMessage;
    emailDiv.classList.add("invalid-field");

    setTimeout(() => {
      if (!emailInput.value) emailHelp.innerHTML = "The email is empty";
      else if (!/[^@]+@[^\.]+\..+/g.test(emailInput.value)) emailHelp.innerHTML = "The email has invalid format";
      else if (_.find(USERS, {"email": emailInput.value})) emailHelp.innerHTML = "The email is already used";
      else {
        emailHelp.innerHTML = "The email is valid";
        emailDiv.classList.remove("invalid-field");
        emailDiv.classList.add("valid-field");
      }
    }, 1000);
  }

  lastSavedEmail = emailInput.value;
}
// --------------------------------------------------------------------------

// ------------------------- Flow functions ---------------------------------
const submitForm = e => {
  e.preventDefault();

  let userData = {};
  let errors = '';
  hideMessages();

  inputsEnabled.forEach(input => {
    const res = validateField(input);
    if (res.error) errors += res.error;
    else userData = _.assign(userData, res.user);
  });

  if (errors) {
    failBlock.classList.add("active-block");
    errorMessages.innerHTML = errors;
    failBlock.focus();
  } else {
    isExistingUser = _.find(USERS, { "first-name": userData["first-name"], "last-name": userData["last-name"] });

    if (isExistingUser && yearInput.disabled) {
      yearInput.removeAttribute("disabled");
      processInvalid(yearInput);
      yearInput.focus();
      refreshInputs();
    } else {
      successBlock.classList.add("active-block");
      successBlock.focus();
      USERS.push(userData);
      clearInputs();
      lastSavedEmail = undefined;
    }
  }
}
// --------------------------------------------------------------------------

refreshInputs();
registerButton.addEventListener("click", submitForm);
emailInput.addEventListener("blur", validateEmail);