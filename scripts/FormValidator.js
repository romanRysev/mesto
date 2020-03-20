class FormValidator {
  constructor(form) {
    this.form = form;
    this.button = this.form.querySelector('.popup__button');
  }

  checkInputValidity(event, errorElement) {
    // REVIEW 2: Можно лучше
    // Не очень хорошая практика менять полученные данные, погуглите на досуге про "чистые функции"
    if (!this.form.checkValidity()) {
      if (event.target.validity.valueMissing) {
        errorElement.textContent = 'Это обязательное поле'
        return false;
      }
      if (event.target.validity.tooLong || event.target.validity.tooShort) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов'
        return false;
      }
      if (event.target.validity.typeMismatch) {
        errorElement.textContent = 'Здесь должна быть ссылка'
        return false;
      }
      errorElement.textContent = ''
      return false;
    }
    errorElement.textContent = ''
    return true;
  }

  setSubmitButtonState(result) {
    if (result) {
      this.button.classList.add('popup__button_enable');
      this.button.removeAttribute('disabled');
    } else {
      this.button.classList.remove('popup__button_enable');
      this.button.setAttribute('disabled', true);
    }
  }

  setEventListeners() {
    this.form.addEventListener('input', (event) => {
      const errorElement = event.target.nextElementSibling;
      this.setSubmitButtonState(this.checkInputValidity(event, errorElement));
    });
  }

  resetErrors() {
    this.form.querySelectorAll('.popup__error').forEach(elem => elem.textContent = '');
  }
}