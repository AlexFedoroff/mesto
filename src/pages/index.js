import './index.css';
const popupFieldName = document.querySelector('.popup__field_name');
const popupFieldDescr = document.querySelector('.popup__field_description');
const openAddBtn = document.querySelector('.profile__add-button');
const openEditBtn = document.querySelector('.profile__edit-button');
const validatorData = {  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
};

import { initialElements } from "../components/cards.js";
import FormValidator from "../components/validate.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

//returns a new card from the template
function createCard(cardData) {
  const card = new Card(cardData,"#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//Initial cards rendering
const cardsLst = new Section (
  {
    items: initialElements,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardsLst.addItem(cardElement);
    },
   },
   ".elements");
   cardsLst.renderItems();

const popupImage = new PopupWithImage('.popup_photo');
popupImage.setEventListeners();

//creating validators for 2 forms
const validEditForm = new FormValidator(validatorData,'.popup_edit');
validEditForm.enableValidation();

const validAddForm = new FormValidator(validatorData,'.popup_add');
validAddForm.enableValidation();

//user information
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descrSelector: '.profile__info-description'    
});

//popup for editig user info
const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  userInfo.setUserInfo(data);    
});
popupEdit.setEventListeners();

openEditBtn.addEventListener('click', (event) => {    
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldDescr.value = userData.descr;
  popupEdit.open();
});

//popup for adding new images
const popupAdd = new PopupWithForm('.popup_add', (data) => {
  const cardElement = createCard(data);  
  cardsLst.addItem(cardElement);  
});

popupAdd.setEventListeners();
openAddBtn.addEventListener('click', () => {
  popupAdd.open();
});

function handleCardClick(name,link) {
  popupImage.open({name,link});
}
