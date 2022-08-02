var editForm = document.querySelector(".edit-form");                //Окно редактирования
var editFormCont = document.querySelector(".edit-form__container"); //Форма редактирования
var closeIcon = document.querySelector(".edit-form__close-icon");   //Иконка закрытия окна редактирования
var editBtn = document.querySelector(".profile__edit-button");      //Кнопка редактирования профиля
var titleEl = document.querySelector(".profile__info-title");       //Заголовок профиля
var captionEl =  document.querySelector(".profile__info-caption");  //Текст профиля

//Открытие окна редактирования
function openEditForm()
{    
    editForm.style.display = "flex";    
    editFormCont.elements["fldTitle"].value = titleEl.textContent;
    editFormCont.elements["fldCaption"].value = captionEl.textContent;
}

//Закрытие окна редактирования
function closeEditForm()
{        
  editForm.style.display = "none";
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    var fldTitleValue = editFormCont.elements["fldTitle"].value;
    var fldCaptionValue = editFormCont.elements["fldCaption"].value;    
    titleEl.textContent = fldTitleValue;
    captionEl.textContent = fldCaptionValue;
    closeEditForm();
}

//Обработчики событий
editBtn.addEventListener('click',openEditForm);
closeIcon.addEventListener('click',closeEditForm);
editForm.addEventListener('submit', formSubmitHandler); 