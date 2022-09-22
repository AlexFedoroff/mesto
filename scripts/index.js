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
/*
export const popupPhoto = document.querySelector('.popup_photo');
export const popupImg = document.querySelector('.popup__img');
export const photoDescr = document.querySelector('.popup__photo-description');
*/
import { FormValidator } from "./validate.js";
import { Card } from "./card.js";
import { initialElements } from "./cards.js";


function addCard(card) {
  elements.prepend(card);
}

export default function openPopup(popup) {
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
  validEditForm.enableValidation();
  openPopup(popupEdit);
}

function openAddForm() {
  validAddForm.enableValidation();
  openPopup(popupAdd);
}

function submitAdd(evt) {
  const cardData = { name: popupFieldTitle.value, link: popupFieldLink.value };   
  evt.preventDefault();

  const card = new Card(cardData, "#element-template");
  addCard(card.generateCard())
  
  evt.target.reset();
  closePopup(popupAdd);
  validAddForm.enableValidation();  
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
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(popup);
  }
}

//get initial cards from array
initialElements.forEach((item) => {
  const card = new Card(item, "#element-template");
  addCard(card.generateCard());
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

const validAddForm = new FormValidator({  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
},'.popup_add');