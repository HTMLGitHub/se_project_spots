export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function toggleInputError(
  formElement,
  inputElement,
  errorMessage,
  config,
  action
) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList[action](config.inputErrorClass);
  errorElement.classList[action](config.errorClass);
  errorElement.textContent = errorMessage;
}

function checkInputValidity(formElement, inputElement, config) {
  const action = inputElement.validity.valid ? "remove" : "add";
  const errorMessage = action === "add" ? inputElement.validationMessage : "";

  toggleInputError(formElement, inputElement, errorMessage, config, action);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid || inputElement.value.trim() === "";
  });
}

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function disableButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
  return buttonElement;
}

function setEventListners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListners(formElement, config);
  });
}

enableValidation(settings);
