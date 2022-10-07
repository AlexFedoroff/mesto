export default class UserInfo {
  constructor({ nameSelector, descrSelector}) {
    this._nameEl = document.querySelector(nameSelector);
    this._descrEl = document.querySelector(descrSelector);        
  }  
  
  setUserInfo(data) {        
    this._nameEl.textContent = data.name;
    this._descrEl.textContent = data.descr;        
  }

  getUserInfo() {
    const retValue = { name: this._nameEl.textContent, descr: this._descrEl.textContent };
    return retValue;
  }    
}