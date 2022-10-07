export default class FormValidator {
  constructor(settings, formSelector) {    
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formElement = document.querySelector(formSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
    this._buttonElement = this._formElement.querySelector(settings.submitButtonSelector);    
  }
  
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
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

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners () {        
    this._toggleButtonState();      
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };
  
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  enableValidation() {    
    this._setEventListeners();
  }
}