
const users = [];
const invalid = [];
const user = {};
let checkYear = false;


const username = document.querySelector("#username");
const fName = document.querySelector("#your-name");
const lName = document.querySelector("#last-name");
const email = document.querySelector("#your-email");
const focusMsg = document.querySelector("#focus-info");
let helpTxt;
let isInvalid;
let mailValid;

const mailValResult = document.createElement("p");
mailValResult.setAttribute("id", "mailValidationResult");
mailValResult.setAttribute("aria-live", "polite");
document.querySelector("#mainForm").append(mailValResult);


email.addEventListener("blur", () => {
    mailValResult.innerText = "";
    focusMsg.innerText = "";

    iconRight = this.nextElementSibling.nextElementSibling.children[0];
    fieldHelp = this.parentElement.nextElementSibling;

    fieldHelp.innerText = "Email validation has started. Please wait, it can take some time";
    fieldHelp.classList.add("is-validationmsg");
    fieldHelp.classList.remove("is-danger");
    fieldHelp.classList.remove("is-success");


    this.classList.add("is-validationmsg");
    this.classList.remove("is-danger");
    this.classList.remove("is-success");

    email.onfocus = () => {
        email.onkeyup = e => {
            if (e.which == 9) focusMsg.innerText = "Please don't move focus until validation ends";
        }
    };

    setTimeout(() => {
        if (validateMail(email)) mailValResult.innerText = "Mail validated, value accepted";
        else mailValResult.innerText = "Mail validated, value not accepted";

        focusMsg.innerText = "";
    }, 3000);
});


function formValidation() {
    user = {
        nik: "",
        name: "",
        email: "",
    };

    invalid = [];
    errorsAlert = document.querySelectorAll(".errors-alert");

    if (errorsAlert.length) errorsAlert[0].remove();

    const listOfErrors = document.createElement("ol");
    const errorsTitle = document.createElement("p");
    const errorsBlock = document.createElement("div");

    errorsTitle.innerText = "Error! The form could not be submitted due to invalid entries. Please fix the following:";
    errorsTitle.setAttribute("class", "title is-4");
    errorsBlock.setAttribute("class", "errors-alert");
    errorsBlock.setAttribute("tabindex", "-1");

    document.querySelector("#mainForm").parentElement.prepend(errorsBlock);

    validateUsername(username);
    validateName(fName);
    validateLastName(lName);
    validateMail(email);

    if (invalid.length > 0) {
        invalid[0].focus();

        invalid.forEach(el => {
            const link = document.createElement("a");
            link.setAttribute("href", "#" + el.id);
            link.innerHTML = el.placeholder;

            const linkItem = document.createElement("li");
            linkItem.append(link);
            listOfErrors.append(linkItem);
        });

        errorsBlock.append(errorsTitle);
        errorsBlock.append(listOfErrors);
        errorsBlock.focus();
    } else {
        users.push(user);
        alert("Your profile has been created, data has been saved");
    }
}

function isEmpty(field) {
    let fieldValue = field.value;
    let label = field.parentElement.previousElementSibling.textContent;
    isInvalid = false;

    if (fieldValue.length == 0) {
        helpTxt = "Please fill in " + label;
        isInvalid = true;
        mailValid = false;
        successErrorHandler(field, helpTxt, isInvalid);
        return true;
    }
};

function validateUsername(field) {
    var fieldValue = field.value;
    isInvalid = false;

    if (!isEmpty(field)) {
        var found = users.some(function (el) {
            return el.nik === fieldValue;
        });

        if (!found) {
            user.nik = fieldValue;
        }
        else {
            helpTxt = "This username is not available. Please create another one";
            isInvalid = true;
        }

        successErrorHandler(field, helpTxt, isInvalid);
    }
}

function validateName(field) {
    var fieldValue = field.value;
    isInvalid = false;

    if (!isEmpty(field)) {
        user.name = fieldValue;
        successErrorHandler(field);
    }

}

function validateLastName(field) {
    var fieldValue = field.value;
    isInvalid = false;

    if (!isEmpty(field)) {
        var fullName = user.name + " " + fieldValue;

        var found = users.some(function (el) {
            return el.name === fullName;
        });

        var year = document.querySelector("#year");

        if (!found) {
            user.name = fullName;
            successErrorHandler(field);
            year.setAttribute("aria-disabled", true);
            year.removeAttribute("aria-required");
        }
        else {
            alert("User with same name already exists. Please fill in year of birth, exapmple 1999");
            year.removeAttribute("aria-disabled");
            year.setAttribute("aria-required", true);
            year.focus();
            checkYear = true;
        }
    }

}

function validateMail(field) {
    let fieldValue = field.value;
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isInvalid = false;
    mailValid = true;

    if (!isEmpty(field)) {

        if (!reg.test(String(fieldValue).toLowerCase())) {
            helpTxt = "Please enter valid email, ex. hello@hello.com";
            isInvalid = true;
            mailValid = false;
        }
        successErrorHandler(field, helpTxt, isInvalid);
    }
    return mailValid;
}

function successErrorHandler(field, helpTxt, isInvalid) {
    let helpTxt = helpTxt;

    iconRight = field.nextElementSibling.nextElementSibling.children[0],
        fieldHelp = field.parentElement.nextElementSibling;

    if (isInvalid) {
        fieldHelp.classList.add("is-danger");
        fieldHelp.classList.remove("is-success");
        fieldHelp.classList.remove("is-validationmsg");

        field.classList.add("is-danger");
        field.classList.remove("is-success");
        field.classList.remove("is-validationmsg");
        field.setAttribute("aria-invalid", true);

        iconRight.classList.remove("fa-check");
        iconRight.classList.add("fa-exclamation-triangle");

        invalid.push(field);
    }

    else {
        field.classList.remove("is-danger");
        field.classList.remove("is-validationmsg");
        field.classList.add("is-success");
        field.removeAttribute("aria-invalid");

        fieldHelp.classList.add("is-success");
        fieldHelp.classList.remove("is-validationmsg");
        fieldHelp.classList.remove("is-danger");

        iconRight.classList.add("fa-check");
        iconRight.classList.remove("fa-exclamation-triangle");

        helpTxt = "Value accepted";
    }

    fieldHelp.innerText = helpTxt;
}
