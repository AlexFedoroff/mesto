export default class UserInfo {
  constructor({ nameSelector, descrSelector}) {
    this._nameEl = document.querySelector(nameSelector);
    this._descrEl = document.querySelector(descrSelector);        
    this._profileAvatar = document.querySelector('.profile__avatar');    
  }  
  
  setUserInfo(data) {    
    this._nameEl.textContent = data.name;
    this._descrEl.textContent = data.about;    
    this.userId = data._id;
    if (data.avatar) {
      this._profileAvatar.src = data.avatar;
    }
  }

  getUserInfo() {
    const retValue = { name: this._nameEl.textContent, about: this._descrEl.textContent };
    return retValue;
  }
  
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
    
  }
}