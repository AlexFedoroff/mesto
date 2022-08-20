let popup; 

const popupFieldName = document.querySelector('.popup__field_name');
const popupFieldDescr = document.querySelector('.popup__field_description');
const popupFieldTitle = document.querySelector('.popup__field_title');
const popupFieldLink = document.querySelector('.popup__field_link');

const nameEl = document.querySelector('.profile__info-name');
const descrEl = document.querySelector('.profile__info-description');

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popup_photo = document.querySelector('.popup_photo');
const popupImg = document.querySelector('.popup__img');
const photoDescr = document.querySelector('.popup__photo-description');

const elemTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements'); //cards section

const saveBtn = document.querySelector('.popup__save-btn_edit'); //submit button for edit profile form
const addBtn = document.querySelector('.popup__save-btn_add'); //submit button for add card form

const openAddBtn = document.querySelector('.profile__add-button');
const openEditBtn = document.querySelector('.profile__edit-button');

const closeIconAdd = document.querySelector('.popup__close-icon_add');
const closeIconEdit = document.querySelector('.popup__close-icon_edit');
const closeIconPhoto = document.querySelector('.popup__close-icon_photo');

const initialElements = [
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

function createCard(cardData) {
  const clonedElement = elemTemplate.content.cloneNode(true);
  const elementCaption = clonedElement.querySelector('.element__caption');
  const elemImg = clonedElement.querySelector('.element__image');
  const trashBtn = clonedElement.querySelector('.element__trash');
  const likeBtn = clonedElement.querySelector('.element__heart');

  elemImg.src = cardData.link;
  elemImg.alt = `${cardData.name}, фото`;
  elementCaption.textContent = cardData.name;
  elemImg.addEventListener('click',viewImg);
  trashBtn.addEventListener('click',removeCard);
  likeBtn.addEventListener('click',doLike);
  return clonedElement;
}

function addCard(card) {
  elements.prepend(card);
}

function removeCard() {
  this.parentElement.remove();
}

function doLike() {
  this.classList.toggle('element__heart_enabled');
}

function openPopup(formClass) {
  popup = document.querySelector(formClass);
  popup.classList.add('popup_opened');
}

function openEditForm() {
  popupFieldName.value = nameEl.textContent;
  popupFieldDescr.value = descrEl.textContent;
  openPopup('.popup_edit');
}

function openAddForm() {
  popupFieldLink.value = '';
  popupFieldTitle.value = '';
  openPopup('.popup_add');
}

//show photo in modal
function viewImg() {
  const imgParent = this.parentElement;
  popupImg.src = this.src;
  photoDescr.textContent = imgParent.querySelector('.element__caption').textContent; //a description of the clicked card
  openPopup('.popup_photo');
}

function submitAdd(evt) {  
  evt.preventDefault();    
  const cardData = { name: popupFieldTitle.value, link: popupFieldLink.value };
  addCard(createCard(cardData));  
  closePopup();
}

function submitEdit(evt) {  
  evt.preventDefault();
  nameEl.textContent = popupFieldName.value;
  descrEl.textContent = popupFieldDescr.value;
  closePopup();
}

function closePopup() {
  popup.classList.remove('popup_opened');  
}

//get initial cards from array
initialElements.forEach((item) => {
  const card = createCard(item); 
  addCard(card);
});

//some event listeners
closeIconAdd.addEventListener('click',closePopup);
closeIconEdit.addEventListener('click',closePopup);
closeIconPhoto.addEventListener('click',closePopup);
openEditBtn.addEventListener('click',openEditForm);
openAddBtn.addEventListener('click', openAddForm);
saveBtn.addEventListener('click', submitEdit);
addBtn.addEventListener('click', submitAdd);