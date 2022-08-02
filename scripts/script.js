var editForm = document.querySelector(".edit-form");                //Окно редактирования
var closeIcon = document.querySelector(".edit-form__close-icon");   //Иконка закрытия окна редактирования
var editBtn = document.querySelector(".profile__edit-button");      //Кнопка редактирования профиля

//Открытие окна редактирования
function openEditForm()
{    
    editForm.style.display = "flex";
}

//Закрытие окна редактирования
function closeEditForm()
{        
    editForm.style.display = "none";
}

editBtn.addEventListener('click',openEditForm);
closeIcon.addEventListener('click',closeEditForm);