import "../pages/index.css";
import {UserInfo} from './UserInfo.js'
import {Popup} from './Popup.js'
import {FormValidator} from './FormValidator.js'
import {CardList} from './CardList.js'
import {Card} from './Card.js'
import {Api} from './Api.js'
(function () {

  const placesList = document.querySelector('.places-list');
  const addButton = document.querySelector('.user-info__button');
  const addCartPopup = document.querySelector('.popup_type_add-cart');
  const editProfilePopup = document.querySelector('.popup_type_edit-profile');
  const avatarPopup = document.querySelector('.popup_type_avatar');
  const formPlace = document.forms.new;
  const { name, link } = formPlace.elements;
  const formProfile = document.forms.profile;
  const nameProfile = formProfile.elements.name;
  const jobProfile = formProfile.elements.job;
  const formAvatar = document.forms.avatar;
  const linkAvatar = formAvatar.elements.link;
  const editButton = document.querySelector('.user-info__edit-button');
  const avatar = document.querySelector('.user-info__photo');
  const popup = new Popup(addCartPopup);
  const popupProfile = new Popup(editProfilePopup);
  const popupAvatar = new Popup(avatarPopup);
  const userInfo = new UserInfo();
  const card = new Card();
  const formPlaceValidator = new FormValidator(formPlace);
  const formProfileValidator = new FormValidator(formProfile);
  const formAvatarValidator = new FormValidator(formAvatar);
  const api = new Api();
  const cardList = new CardList(placesList, card, api);
  // Объявления функций

  const sanitizeHTML = (str) =>  {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  };

  // Слушатели событий

  addButton.addEventListener('click', () => {
    formPlace.reset();
    formPlaceValidator.setSubmitButtonState(false);
    formPlaceValidator.resetErrors();
    popup.open(addCartPopup);
  });
  editButton.addEventListener('click', () => {
    formProfileValidator.setSubmitButtonState(true);
    formProfileValidator.resetErrors();
    popup.open(editProfilePopup);
    userInfo.renderProfilePopup();
  });

  avatar.addEventListener('click', () => {
    formAvatar.reset();
    formAvatarValidator.setSubmitButtonState(false);
    formAvatarValidator.resetErrors();
    popup.open(avatarPopup);
  });

  formPlace.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.querySelector('.button').textContent = 'Загрузка...';
    const data = { link: sanitizeHTML(link.value), name: sanitizeHTML(name.value) };
    api.addCard(data)
    .then((res) => {
      cardList.addCard(res);
    })
    event.target.querySelector('.button').textContent = '+';
    popup.close(event);
    formPlace.reset();
    formPlaceValidator.setSubmitButtonState(false);
  });

  formProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.querySelector('.button').textContent = 'Загрузка...';
    api.updateUserInfo(nameProfile.value, jobProfile.value)
    .then((result) => {
      userInfo.setUserInfo(result);
    })
    .then(() => {
      userInfo.updateUserInfo();
    })
    event.target.querySelector('.button').textContent = 'Сохранить';
    popupProfile.close(event);
  });

  formAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.querySelector('.button').textContent = 'Загрузка...';
    api.updateAvatar(linkAvatar.value, userInfo)
    .then((result) => {
      userInfo.setUserInfo(result);
    })
    .then(() => {
      userInfo.updateUserInfo();
    })
    event.target.querySelector('.button').textContent = 'Сохранить';
    popupAvatar.close(event);
  });

  // Вызовы функций

  cardList.setEventListeners(card);
  formPlaceValidator.setEventListeners();
  formProfileValidator.setEventListeners();
  formAvatarValidator.setEventListeners();
  popup.setEventListeners();
  popupProfile.setEventListeners();
  popupAvatar.setEventListeners();
  api.getUserInfo()
  .then(res => userInfo.setUserInfo(res))
  .then(() => userInfo.updateUserInfo());
  api.getInitialCards()
  .then(res => cardList.render(res));
})();
