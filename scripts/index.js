var popup = document.querySelector(".popup"); //Окно редактирования
var closeIcon = document.querySelector(".popup__close-icon"); //Иконка закрытия окна редактирования
var editBtn = document.querySelector(".profile__edit-button"); //Кнопка редактирования профиля
var nameEl = document.querySelector(".profile__info-name"); //Элемент заголовок профиля
var descrEl = document.querySelector(".profile__info-description"); //Элемент текст профиля
var nameFld = document.querySelector(".popup__field_kind_name"); //Поле заголовок профиля
var descrFld = document.querySelector(".popup__field_kind_description"); //Поле текст профиля

//Открытие окна редактирования
function openEditForm()
{    
  nameFld.value = nameEl.textContent;
  descrFld.value = descrEl.textContent;
  popup.classList.add("popup_opened");  
}

//Закрытие окна редактирования
function closeEditForm()
{        
  popup.classList.remove("popup_opened");  
}

//Изменение элементов
function formSubmitHandler (evt) {
  evt.preventDefault();
  nameEl.textContent = nameFld.value;
  descrEl.textContent = descrFld.value;
  closeEditForm();
}

//Обработчики событий
editBtn.addEventListener('click',openEditForm);
closeIcon.addEventListener('click',closeEditForm);
popup.addEventListener('submit', formSubmitHandler);