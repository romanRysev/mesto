export class UserInfo {
  constructor() {
    this.UserProfileAvatar = document.querySelector('.user-info__photo');
    this.nameProfileElement = document.querySelector('.user-info__name');
    this.jobProfileElement = document.querySelector('.user-info__job');
    this.nameProfileInput = document.querySelector('.popup__input_type_name');
    this.jobProfileInput = document.querySelector('.popup__input_type_job');
    this.userName = '';
    this.about = '';
  }

  setUserInfo(object) {
    this.userName = object.name;
    this.about = object.about;
    this.avatar = object.avatar;
  }

  updateUserInfo() {
    this.nameProfileElement.textContent = this.userName;
    this.jobProfileElement.textContent = this.about;
    this.UserProfileAvatar.style.backgroundImage = `url(${this.avatar}`;
  }

  renderProfilePopup() {
    this.nameProfileInput.value = this.nameProfileElement.textContent;
    this.jobProfileInput.value = this.jobProfileElement.textContent;
  }
}
