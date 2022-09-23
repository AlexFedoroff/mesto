const popupFieldName = document.querySelector('.popup__field_name');
const popupFieldDescr = document.querySelector('.popup__field_description');
const popupFieldTitle = document.querySelector('.popup__field_title');
const popupFieldLink = document.querySelector('.popup__field_link');
const nameEl = document.querySelector('.profile__info-name');
const descrEl = document.querySelector('.profile__info-description');
const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const elements = document.querySelector('.elements');
const openAddBtn = document.querySelector('.profile__add-button');
const openEditBtn = document.querySelector('.profile__edit-button');
const popups = document.querySelectorAll('.popup');

const popupPhoto = document.querySelector('.popup_photo');
const popupImg = document.querySelector('.popup__img');
const photoDescr = document.querySelector('.popup__photo-description');

import { FormValidator } from "./validate.js";
import { initialElements } from "./cards.js";
import { Card } from "./card.js";

function handleCardClick(name,link) {
  popupImg.src = link;
  popupImg.alt = `${this.name}, фото`;      
  photoDescr.textContent = name;
  openPopup(popupPhoto);
}

function createCard(cardData) {
  const card = new Card(cardData,"#element-template",handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function addCard(card) {
  elements.prepend(card);
}

function openPopup(popup) {
  document.addEventListener('keydown', closeOnEscape);
  popup.classList.add('popup_opened');
}

function openEditForm() {
  if (popupFieldName.value === '') {
    popupFieldName.value = nameEl.textContent;
  }

  if (popupFieldDescr.value ==='') {
    popupFieldDescr.value = descrEl.textContent;
  }  
  openPopup(popupEdit);
  validEditForm.resetValidation();
}

function openAddForm() {
  validAddForm.resetValidation();
  openPopup(popupAdd);
}

function submitAdd(evt) {
  const cardData = { name: popupFieldTitle.value, link: popupFieldLink.value };   
  evt.preventDefault();
  
  addCard(createCard(cardData));  
  evt.target.reset();
  closePopup(popupAdd);  
}

function submitEdit(evt) {
  evt.preventDefault();
  nameEl.textContent = popupFieldName.value;
  descrEl.textContent = popupFieldDescr.value;
  closePopup(popupEdit);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscape);
}

function closeOnEscape(evt) {  
  let popup;
  if (evt.key === 'Escape') {
    popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

//get initial cards from array
initialElements.forEach((item) => {  
  addCard(createCard(item));
});

//closing popup by clicking on overlay
popups.forEach((popup) => {
  popup.addEventListener('click',function (e) {
    if (e.target.classList.contains('popup') || e.target.classList.contains('popup__close-icon')) {
      closePopup(popup);
    }
  })
});

openEditBtn.addEventListener('click',openEditForm);
openAddBtn.addEventListener('click', openAddForm);
popupAdd.addEventListener('submit',submitAdd);
popupEdit.addEventListener('submit',submitEdit);

const validEditForm = new FormValidator({  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
},'.popup_edit');
validEditForm.enableValidation();

const validAddForm = new FormValidator({  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
},'.popup_add');
validAddForm.enableValidation();