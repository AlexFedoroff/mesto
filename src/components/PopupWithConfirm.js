import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitBtn = this._popupEl.querySelector(".popup__save-btn");
  }

  setSubmitHadler(submitHandler) {
    this._handleSubmit = submitHandler;
  }

  setSubmitBtnText(text){
    this._submitBtn.textContent = text;
  }

  setEventListeners() {
    super.setEventListeners();    
    this._submitBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.setSubmitBtnText("Удаление...");
      this._handleSubmit();
    });
  }
}