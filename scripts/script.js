var editForm     = document.querySelector(".edit-form");              //Окно редактирования
var editFormCont = document.querySelector(".edit-form__container");   //Форма редактирования
var closeIcon    = document.querySelector(".edit-form__close-icon");  //Иконка закрытия окна редактирования
var editBtn      = document.querySelector(".profile__edit-button");   //Кнопка редактирования профиля
var titleEl      = document.querySelector(".profile__info-title");    //Заголовок профиля
var captionEl    = document.querySelector(".profile__info-caption");  //Текст профиля
var cont         = document.querySelector(".content");
var header       = document.querySelector(".header");
var heartsImgs   = ["./images/heart_disabled.png","./images/heart_enabled.png"];//Сердечки

//Позиционирование popup при ресайзе
function resizeWnd() {        
    let wndWdth = window.innerWidth;
    if (wndWdth > 320)    
    {
        editForm.style.left = (wndWdth - editFormCont.offsetWidth)/2 + "px";
    } else 
    {
        editForm.style.left = 0;
    }
}

//Открытие окна редактирования
function openEditForm()
{    
    editForm.style.display = "flex";        
    editFormCont.elements["fldTitle"].value = titleEl.textContent;
    editFormCont.elements["fldCaption"].value = captionEl.textContent;    
    cont.style.opacity = 0.5;
    header.style.opacity = 0.5;    
    resizeWnd();
}

//Закрытие окна редактирования
function closeEditForm()
{        
  editForm.style.display = "none";
  cont.style.opacity = 1;
  header.style.opacity = 1;
}

//Изменение элементов
function formSubmitHandler (evt) {
    evt.preventDefault();
    let fldTitleValue = editFormCont.elements["fldTitle"].value;
    let fldCaptionValue = editFormCont.elements["fldCaption"].value;    
    titleEl.textContent = fldTitleValue;
    captionEl.textContent = fldCaptionValue;
    closeEditForm();
}

//Тут переключаем сердечки
function heartClick() {            
    let e;
    if (this.hasAttribute("enabled"))
    {
        e = this.getAttribute("enabled");
    } else
    {
        e = 0;
    }
    
    e = 1 - e;
       
    this.setAttribute("enabled",e);    
    this.src = heartsImgs[+e];
}


//Обработчики событий
editBtn.addEventListener('click',openEditForm); 
closeIcon.addEventListener('click',closeEditForm);

var hearts = document.querySelectorAll(".element__heart");
for (var i = 0; i < hearts.length; i++) 
{
    var heart = hearts[i];
    heart.onclick = heartClick;
}

editForm.addEventListener('submit', formSubmitHandler);
window.addEventListener('resize',resizeWnd)