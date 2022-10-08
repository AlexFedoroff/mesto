export default class Card {
    constructor (data, templateSelector, handleCardClick) {
      this._templateSelector = templateSelector;
      this._cardName = data.name;
      this._cardLink = data.link;      
      this._handleCardClick = handleCardClick;
      this._removeCard = this._removeCard.bind(this);
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      return cardElement;
    }
  
    _removeCard() {      
      this._element.remove();      
      this._element = null;      
    }
  
    _doLike(evt) {
      evt.target.classList.toggle('element__heart_enabled');
    }     
  
    _setEventListeners() {
      this._element.querySelector('.element__trash').addEventListener('click', this._removeCard);
      this._element.querySelector('.element__heart').addEventListener('click', this._doLike);
      this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardName, this._cardLink));
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector('.element__image');
      this._setEventListeners();    
      this._cardImage.src = this._cardLink;
      this._cardImage.alt = `${this._cardName}, фото`;
      this._element.querySelector('.element__caption').textContent = this._cardName      
      return this._element;      
    }
  }