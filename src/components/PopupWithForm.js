import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._popupForm = this._popupEl.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__field');
  }
    
  _getInputValues() {    
    const fieldValues = {};    
    this._inputs.forEach((input) => {
      fieldValues[input.name] = input.value;
    });
    return fieldValues;
  }

  setEventListeners() {    
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();    
      this._submitCallBack(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {    
    this._popupForm.reset();
    super.close();
  }
}