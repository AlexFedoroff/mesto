export const validatorData = {  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
};

export const popupSelectors = {
  popupEdit: '.popup_edit',
  popupAdd: '.popup_add',
  popupPhoto: '.popup_photo',
  popupAvatar: '.popup_edit-avatar',
  popupDeleteCard: '.popup_delete-card'
}

export const popupFieldName = document.querySelector('.popup__field_name');
export const popupFieldDescr = document.querySelector('.popup__field_description');
export const openAddBtn = document.querySelector('.profile__add-button');
export const openEditBtn = document.querySelector('.profile__edit-button');
export const avatarEditBtn = document.querySelector('.profile__avatar-btn');  
export const loader = document.querySelector('.loader');

export const apiSettings = {
  address: "https://mesto.nomoreparties.co/v1/cohort-52",
  token: "a71aaade-5a34-4f5b-911f-3a05934cc310"
};

export const initialElements = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
