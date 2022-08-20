const popup = document.querySelector('.popup_edit');
const popup_photo = document.querySelector('.popup_photo');
const popupImg = document.querySelector('.popup__img');
const popupTitle = popup.querySelector('.popup__title');
const photoDescr = document.querySelector('.popup__photo-description');

const elemTemplate = document.querySelector('#element-template');
const elements = document.querySelector('.elements'); //cards section
const nameFld = document.querySelector('.popup__field_kind_name'); 
const descrFld = document.querySelector('.popup__field_kind_description'); 

const popupField1 = popup.querySelector('.popup__field_kind_name');
const popupField2 = popup.querySelector('.popup__field_kind_description');

const saveBtn = document.querySelector('.popup__save-btn');
const addBtn = document.querySelector('.profile__add-button'); 
const closeIcon = document.querySelector('.popup__close-icon'); 
const closeIconPhoto = document.querySelector('.popup__close-icon_photo');

let lastOpenedForm = "";


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

class profileInfo {
  constructor() {
    const editBtn = document.querySelector('.profile__edit-button');
    editBtn.addEventListener('click',openForm);
  }
  //profile elements
  #nameEl = document.querySelector('.profile__info-name'); 
  #descrEl = document.querySelector('.profile__info-description');
  
  setInfo(title, description) {
    this.#nameEl.textContent = title;
    this.#descrEl.textContent = description;
  }  
  getInfo() {    
    return {name: this.#nameEl.textContent,
            description: this.#descrEl.textContent
           };
  }
}

function viewImg() {
  const imgParent = this.parentElement;
  popupImg.src = this.src;
  photoDescr.textContent = imgParent.querySelector('.element__caption').textContent; //a description of the clicked card
  toggleImgView();
}

//add a new card
function addElement(item) {
  const clonedElement = elemTemplate.content.cloneNode(true);
  const elementCaption = clonedElement.querySelector('.element__caption');
  const elemImg = clonedElement.querySelector('.element__image');
  const trash = clonedElement.querySelector('.element__trash');
  const like = clonedElement.querySelector('.element__heart');

  elemImg.src = item.link;
  
  elemImg.addEventListener('click',viewImg);
  elementCaption.textContent = item.name;
  
  //add trash listener
  trash.addEventListener('click',removeElement);

  //add like listener
  like.addEventListener('click',doLike);

  elements.prepend(clonedElement);
}

function removeElement() {
  this.parentElement.remove();
}

//one function for two forms
function openForm() {
  const formValues = [
    { 
      name:"edit",
      fld1PlaceHldr:"Имя",
      fld2PlaceHldr: "Описание",
      fld1Value: profile.getInfo().name,
      fld2Value: profile.getInfo().description,
      title: "Редактировать профиль",
      btnCaption: "Сохранить"
    },
    { 
      name:"add", 
      fld1PlaceHldr:"Название",
      fld2PlaceHldr: "Ссылка на картинку",
      fld1Value: "",
      fld2Value: "",
      title: "Новое место",
      btnCaption: "Создать"
    }
  ];
  
  const formValue = formValues.find(el => el.name === this.name);
  popupField1.placeholder = formValue.fld1PlaceHldr;
  popupField2.placeholder = formValue.fld2PlaceHldr;
  popupTitle.textContent = formValue.title;
  saveBtn.textContent = formValue.btnCaption;
  nameFld.value = formValue.fld1Value;
  descrFld.value = formValue.fld2Value;
  lastOpenedForm = formValue.name;

  popup.addEventListener('submit', SubmitForm);
  togglePopupVisibility();  
}

function SubmitForm (evt) {
  evt.preventDefault();
  if (lastOpenedForm == 'add') {
    const itemToAdd = {name: nameFld.value, link: descrFld.value};
    addElement(itemToAdd);
  } else
  {
    profile.setInfo(nameFld.value,descrFld.value);
  }
  togglePopupVisibility();
}

function doLike() {
  this.classList.toggle('element__heart_enabled');
}

function togglePopupVisibility(){
  popup.classList.toggle("popup_opened");
}

function toggleImgView()
{        
  popup_photo.classList.toggle("popup_opened");
}

//get initial cards from array
initialElements.forEach((item) => {
  addElement(item);
});

//this object is for working with the profile
const profile = new profileInfo();

//some event listeners
closeIcon.addEventListener('click',togglePopupVisibility);
closeIconPhoto.addEventListener('click',toggleImgView);
addBtn.addEventListener('click', openForm);