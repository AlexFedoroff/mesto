export default class Card {
    constructor (
      data,
      templateSelector,
      handleCardClick,
      handleDelBtnClick,
      handleLikeBtnClick
    )
    {
      this._templateSelector = templateSelector;
      this._cardName = data.name;
      this._cardLink = data.link;
      this._id = data._id;
      this._userId = data._userId;      
      this._ownerId = data.owner._id;
      this._likes = data.likes;
      this._handleCardClick = handleCardClick;
      this._handleDelBtnClick = handleDelBtnClick;
      this._handleLikeBtnClick = handleLikeBtnClick;
      this.removeCard = this.removeCard.bind(this);      
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
      return cardElement;
    }
  
    getLikesState() {
      return this._likesElement.classList.contains("element__heart_enabled");
    }

    setLikesCounter(value){
      this._likesCounter.textContent = value;
    }
    
    _setEventListeners() {
      //console.log(this._ownerId);
      //console.log(this._userId);
      this._trashBtn = this._element.querySelector(".element__trash");      
      if (this._ownerId != this._userId){
        this._trashBtn.remove();
        this._trashBtn = null;
      }
      if (this._trashBtn) {
        this._trashBtn.addEventListener("click", () => {
          this._handleDelBtnClick(this._id);
        });
      }
            
      this._likesElement = this._element.querySelector(".element__heart");
      this._likesCounter = this._element.querySelector(".element__heart-counter");
      this._likesCounter.textContent = this._likes.length;
      
      this._likes.forEach((like) => {
        if (like._id === this._userId) {
          this._likesElement.classList.add("element__heart_enabled");
        }
      });
      
      this._likesElement.addEventListener("click", () => {
        this._likesElement.classList.toggle("element__heart_enabled");
        this._handleLikeBtnClick(this._id);
      });
      this._cardImage.addEventListener("click", () => this._handleCardClick(this._cardName, this._cardLink));
    }
    
    removeCard() {
      this._element.remove();
      this._element = null;
    }

    generateCard() {
      this._element = this._getTemplate();
      this._cardImage = this._element.querySelector(".element__image");
      this._elementDebug = this._element.querySelector(".element__debug");
      this._setEventListeners();
      this._cardImage.src = this._cardLink;
      this._cardImage.alt = `${this._cardName}, фото`;
      this._element.querySelector(".element__caption").textContent = this._cardName;
      return this._element;
    }
  }