import './index.css';
import { validatorData,
         popupFieldName,
         popupFieldDescr,
         popupSelectors,
         openAddBtn,
         openEditBtn,
         avatarEditBtn,
         apiSettings,
         loader
       } from "../utils/data.js";
import FormValidator from "../components/validate.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from "../components/api.js";

const api = new Api({
  address: apiSettings.address,
  headers: {
    authorization: apiSettings.token,
    "Content-Type": "application/json",
  },
});

const popupDelCard = new PopupWithConfirm(popupSelectors.popupDeleteCard);
popupDelCard.setEventListeners();

function createCard(cardData, userId) {
  cardData._userId = userId;
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
          .undoLike(cardId)
          .then((res) => {            
            card.setLikesCounter(res.likes.length);            
            card.likeToggle();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      } else {          
        api
          .doLike(cardId)
          .then((res) => {            
            card.setLikesCounter(res.likes.length);            
            card.likeToggle();
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

const popupImage = new PopupWithImage(popupSelectors.popupPhoto);
popupImage.setEventListeners();

//creating validators for 3 forms
const validEditForm = new FormValidator(validatorData, popupSelectors.popupEdit);
validEditForm.enableValidation();

const validAddForm = new FormValidator(validatorData, popupSelectors.popupAdd);
validAddForm.enableValidation();

const validEditAvatar = new FormValidator(validatorData, popupSelectors.popupAvatar);
validEditAvatar.enableValidation();


//user information
const userInfo = new UserInfo({
  nameSelector: '.profile__info-name',
  descrSelector: '.profile__info-description'
});

const popupEditAvatar = new PopupWithForm(
  popupSelectors.popupAvatar,
  (data) => {
    popupEditAvatar.setSubmitButtonText("Сохранение...");
    api
      .editAvatar(data)
      .then((res) => {
        userInfo.setUserAvatar(res);
        popupEditAvatar.close();
        validEditAvatar.disableButton();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.setSubmitButtonText("Сохранить");
      });
  }
);
popupEditAvatar.setEventListeners();

const popupEdit = new PopupWithForm(popupSelectors.popupEdit, (data) => {
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
const popupAdd = new PopupWithForm(popupSelectors.popupAdd, (data) => {
    popupAdd.setSubmitButtonText("Создание...");
    api
      .addCard(data)
      .then((res) => {        
        const cardElement = createCard(res, userInfo.userId);
        cardLst.prependItem(cardElement);
        popupAdd.close();
        validAddForm.disableButton();
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
  
  cardLst = new Section(
      (item) => {        
        const cardElement = createCard(item, userInfo.userId);
        cardLst.appendItem(cardElement)}
      ,
      ".elements");

  cardLst.renderItems(initialCards);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  loader.classList.add("loader_hidden");
});