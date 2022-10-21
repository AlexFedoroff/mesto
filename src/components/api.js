export default class Api {
    constructor({ address, headers }) {
      this._address = address;
      this._headers = headers;
    }
    
    _checkRes(res) {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
      }
    
    //Информация о пользователе
    getUserInfo() {
      return fetch(`${this._address}/users/me`, {
        method: "GET",
        headers: this._headers,
      })
        .then((res) => {
          return this._checkRes(res);
        });
    }

    //Список фото с ресурса
    getCards() {
      return fetch(`${this._address}/cards`, {
        method: "GET",
        headers: this._headers,
      })
      .then((res) => {
        return this._checkRes(res);
      });
    }
    
    //Изменение информации о пользователей
    editUserInfo(data) {
      return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about,
        }),
      })
      .then((res) => {
        return this._checkRes(res);
      });
    }
    
    //Добавление фото
    addCard(cardInfo) {
      return fetch(`${this._address}/cards`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardInfo.name,
          link: cardInfo.link,
        }),
      })
      .then((res) => {
        return this._checkRes(res);
      });
    }
    
    //Удаление фото
    deleteCard(cardId) {
      return fetch(`${this._address}/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => {
        return this._checkRes(res);
      });
    }

    //Поставить лайк
    doLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      })
      .then((res) => {
        return this._checkRes(res);
      });
    }

    //Снять лайк
    undoLike(cardId) {
      return fetch(`${this._address}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      })
      .then((res) => {
        return this._checkRes(res);
      });
  }
  
  //Изменение аватара
  editAvatar(data) {    
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarLink,
      }),
    })
    .then((res) => {
      return this._checkRes(res);
    });
  }
}