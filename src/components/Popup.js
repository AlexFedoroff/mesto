export default class Popup {
    constructor (popupSelector) {      
      this._popupEl = document.querySelector(popupSelector);
      this._closeBtn = this._popupEl.querySelector('.popup__close-icon');
      this._handleEscClose = this._handleEscClose.bind(this);
    }    

    open () {      
      this._popupEl.classList.add('popup_opened');      
      document.addEventListener('keydown', this._handleEscClose);
    }
    
    close () {        
      this._popupEl.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);    
    }

    _handleEscClose (event) {                
      if (event.key === 'Escape') {                      
        this.close();
      }
    }

    setEventListeners() {      
      this._popupEl.addEventListener('click', (event) => {        
        if (event.target.classList.contains('popup') || event.target.classList.contains('popup__close-icon')) {          
          this.close();
        }
      });
    }
}