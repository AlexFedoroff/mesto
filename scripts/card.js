import openPopup from "./index.js";
//import closeOnEscape from "./index.js";

export class Card {
    constructor (data, templateSelector) {
      this._templateSelector = templateSelector;
      this._cardName = data.name;
      this._cardLink = data.link;
      
      this._popupPhoto = document.querySelector('.popup_photo');
      this._popupImg = document.querySelector('.popup__img');
      this._photoDescr = document.querySelector('.popup__photo-description');
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);
      return cardElement;
    }
  
    _removeCard(evt) {
      evt.target.closest('.element').remove();
    }
  
    _doLike(evt) {
      evt.target.classList.toggle('element__heart_enabled');
    }
  
    _viewImg() {  
      this._popupImg.src = this._cardLink;
      this._popupImg.alt = `${this._cardName}, фото`;      
      this._photoDescr.textContent = this._cardName;
      openPopup(this._popupPhoto);
      
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__trash').addEventListener('click', this._removeCard);
      this._element.querySelector('.element__heart').addEventListener('click', this._doLike);
      this._element.querySelector('.element__image').addEventListener('click', () => {
        this._viewImg();
      });
    }
  
  generateCard() {
    this._element =this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__caption').textContent = this._cardName
    this._element.querySelector('.element__image').src = this._cardLink;
    this._element.querySelector('.element__image').alt = `${this._cardName}, фото`;
    return this._element;
    }
  } 
  