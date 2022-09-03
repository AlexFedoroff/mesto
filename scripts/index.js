const popupFieldName = document.querySelector('.popup__field_name');
const popupFieldDescr = document.querySelector('.popup__field_description');
const popupFieldTitle = document.querySelector('.popup__field_title');
const popupFieldLink = document.querySelector('.popup__field_link');

const nameEl = document.querySelector('.profile__info-name');
const descrEl = document.querySelector('.profile__info-description');

const popupEdit = document.querySelector('.popup_edit');
const popupAdd = document.querySelector('.popup_add');
const popupPhoto = document.querySelector('.popup_photo');
const popupImg = document.querySelector('.popup__img');
const photoDescr = document.querySelector('.popup__photo-description');

const elemTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements'); 

const openAddBtn = document.querySelector('.profile__add-button');
const openEditBtn = document.querySelector('.profile__edit-button');

//const closeButtons = document.querySelectorAll('.popup__close-icon');
const popups = document.querySelectorAll('.popup');

function createCard(cardData) {
  const clonedElement = elemTemplate.content.cloneNode(true);
  const elementCaption = clonedElement.querySelector('.element__caption');
  const elemImg = clonedElement.querySelector('.element__image');
  const trashBtn = clonedElement.querySelector('.element__trash');
  const likeBtn = clonedElement.querySelector('.element__heart');

  elemImg.src = cardData.link;
  elemImg.alt = `${cardData.name}, фото`;
  elementCaption.textContent = cardData.name;
    
  elemImg.addEventListener('click', () => viewImg(cardData));

  trashBtn.addEventListener('click',removeCard);
  likeBtn.addEventListener('click',doLike);
  return clonedElement;
}

function addCard(card) {
  elements.prepend(card);
}

function removeCard(evt) {
  evt.target.closest('.element').remove();
}

function doLike(evt) {
  evt.target.classList.toggle('element__heart_enabled');
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
}

function openAddForm() {
  openPopup(popupAdd);
}

//show photo in modal
function viewImg(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = `${cardData.name}, фото`;
  photoDescr.textContent = cardData.name;
  openPopup(popupPhoto);
}

function submitAdd(evt) {  
  const cardData = { name: popupFieldTitle.value, link: popupFieldLink.value };
  const inputList = Array.from(popupAdd.querySelectorAll('.popup__field'));
  const buttonElement = popupAdd.querySelector('.popup__save-btn');  
  evt.preventDefault();

  addCard(createCard(cardData));
  evt.target.reset();
  closePopup(popupAdd);
  toggleButtonState(inputList, buttonElement, { inactiveButtonClass: 'popup__save-btn_disabled' });
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
  const card = createCard(item); 
  addCard(card);
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
popupAdd.addEventListener('submit',submitAdd)
popupEdit.addEventListener('submit',submitEdit)
