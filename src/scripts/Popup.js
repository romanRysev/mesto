export class Popup {
  constructor(elem) {
    this.element = elem;
  }

  open(popup) {
    popup.classList.add('popup_is-opened');
  }

  close() {
    this.element.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup__close')) {
        this.close(event);
      }
    });
  }
}
