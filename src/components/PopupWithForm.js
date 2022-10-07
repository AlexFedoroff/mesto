import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;    
    this._popupForm = this._popupEl.querySelector('.popup__form');    
  }
    
  _getInputValues() {    
    const fieldValues = {};
    const inputs = this._popupForm.querySelectorAll('.popup__field');    

    inputs.forEach((input) => {
      fieldValues[input.name] = input.value;
    });
    return fieldValues;
  }

  _submit(event) {
    event.preventDefault();        
    this._submitCallBack(this._getInputValues(), this.close.bind(this));
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submit.bind(this));      
    super.setEventListeners();
  }

  close() {
    this._popupForm.removeEventListener('submit', this._submit.bind(this));
    this._popupForm.reset();    
    super.close();
  }
}