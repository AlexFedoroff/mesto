export class FormValidator {
  constructor(settings, formSelector) {    
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = document.querySelector(formSelector);
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
   }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);  
    errorElement.textContent = '';  
  };
  
  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__error_${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
    
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else
    {
      this._hideInputError(inputElement);
    }
  };

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };

  _setEventListeners () {    
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
      
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };
  
  enableValidation() {    
    this._setEventListeners();
  }
}