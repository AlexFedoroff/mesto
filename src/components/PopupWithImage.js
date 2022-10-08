import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupEl.querySelector('.popup__img');    
    this._photoDescr = this._popupEl.querySelector('.popup__photo-description');
  }
    
  open(item) {
    this._image.src = item.link;
    this._photoDescr.textContent = item.name;
    this._image.alt = `${item.name}, фото`;
    super.open();
  }
}