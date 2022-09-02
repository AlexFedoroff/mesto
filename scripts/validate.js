function enableValidation (cfg) {
  const formList = Array.from(document.querySelectorAll(cfg.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement,cfg);
  });
};

function setEventListeners (formElement,cfg) {
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
  toggleButtonState(inputList, buttonElement,cfg);
    
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, cfg);
      toggleButtonState(inputList, buttonElement, cfg);
    });
  });
};

function checkInputValidity (formElement, inputElement, cfg) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, cfg);
  }
  else
  {
    hideInputError(formElement, inputElement, cfg);
  }
};

function showInputError (formElement, inputElement, errorMessage, cfg) {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.add(cfg.inputErrorClass);
  errorElement.textContent = errorMessage;
};
  
function hideInputError (formElement, inputElement, cfg) {
  const errorElement = formElement.querySelector(`.popup__error_${inputElement.id}`);
  inputElement.classList.remove(cfg.inputErrorClass);  
  errorElement.textContent = '';  
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
 }

function toggleButtonState (inputList, buttonElement, cfg) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(cfg.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(cfg.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
});