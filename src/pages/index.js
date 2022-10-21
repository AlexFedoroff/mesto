import './index.css';
const popupFieldName = document.querySelector('.popup__field_name');
const popupFieldDescr = document.querySelector('.popup__field_description');
const openAddBtn = document.querySelector('.profile__add-button');
const openEditBtn = document.querySelector('.profile__edit-button');
const avatarEditBtn = document.querySelector('.profile__avatar-btn');

const validatorData = {  
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__field_invalid',
  errorClass: 'popup__error_avtive'
};
import FormValidator from "../components/validate.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/api.js";

const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-52",
  headers: {
    authorization: "a71aaade-5a34-4f5b-911f-3a05934cc310",
    "Content-Type": "application/json",
  },
});

const popupDelCard = new PopupWithConfirm(".popup_delete-card");
popupDelCard.setEventListeners();

//returns a new card from the template
function createCard(cardData) {
  const card = new Card(cardData, "#element-template",
    () => {
      popupImage.open(cardData);
    },
    (cardId) => {
      popupDelCard.open();
      popupDelCard.setSubmitHadler(() => {
        api
          .deleteCard(cardId)
          .then((res) => {
            card.removeCard();
            popupDelCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
          .finally(() => {        
            popupDelCard.setSubmitBtnText("Да");
          });
    });
    },
    (cardId) => {
      if (card.getLikesState()) {
        api
          .doLike(cardId)
          .then((res) => {
            card.setLikesCounter(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {
        api
          .undoLike(cardId)
          .then((res) => {
            card.setLikesCounter(res.likes.length);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      }
  }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const popupImage = new PopupWithImage('.popup_photo');
popupImage.setEventListeners();

//creating validators for 2 forms
const validEditForm = new FormValidator(validatorData,'.popup_edit');
validEditForm.enableValidation();

const validAddForm = new FormValidator(validatorData,'.popup_add');
validAddForm.enableValidation();

const validEditAvatar = new FormValidator(validatorData,'.popup_edit-avatar');
validEditAvatar.enableValidation();


//user information
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descrSelector: '.profile__info-description'    
});

const popupEditAvatar = new PopupWithForm(
  '.popup_edit-avatar',
  (data) => {
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);

      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
);
popupEditAvatar.setEventListeners();

const popupEdit = new PopupWithForm('.popup_edit', (data) => {
  popupEdit.setSubmitButtonText("Сохранение...");
  api
    .editUserInfo(data)
    .then(() => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEdit.setSubmitButtonText("Сохранить");
    });
  });

popupEdit.setEventListeners();

//set edit avatar event
avatarEditBtn.addEventListener("click", () => {    
  popupEditAvatar.open();
});

//set edit profile event
openEditBtn.addEventListener('click', (event) => {    
  const userData = userInfo.getUserInfo();
  popupFieldName.value = userData.name;
  popupFieldDescr.value = userData.about;
  popupEdit.open();
});

//popup for adding new images
const popupAdd = new PopupWithForm('.popup_add', (data) => {
    popupAdd.setSubmitButtonText("Создание...");    
    api
      .addCard(data)
      .then((res) => {        
        res._userId = userInfo.userId;
        const cardElement = createCard(res);
        cardLst.addItem(cardElement);
        popupAdd.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAdd.setSubmitButtonText("Создать");
      });
  });
popupAdd.setEventListeners();

openAddBtn.addEventListener('click', () => {
  popupAdd.open();
});

//Initial cards rendering
let cardLst;
Promise.all([
  api.getUserInfo(),
  api.getCards()
])    
.then((data) => {
  const [userData, initialCards] = data;
  userInfo.setUserInfo(userData);
  
  cardLst = new Section (
      (item) => {
        item._userId = userInfo.userId;
        const cardElement = createCard(item);
        cardLst.addItem(cardElement)}
      ,
      ".elements");

  cardLst.renderItems(initialCards);
})
.catch((err) => {
  console.log(err);
});
