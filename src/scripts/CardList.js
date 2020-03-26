// REVIEW: Надо исправить
// В этот класс можно, например, передавать инстанс класса Card для добавления карточек
// (или метод класса Card, можно реализовать по-разному)
// Но при этом CardList отрисовывает (добавляет непосредственно в DOM) элементы карточек,
// слушает события

export class CardList {
  constructor(tagretElement, cardInstance, api) {
    this.element = tagretElement;
    this.cardInstance = cardInstance;
    this.api = api;
  }

  addCard(data) {
    this.element.appendChild(this.cardInstance.create(data));
  }

  render(cards) {
    // REVIEW 3: Можно лучше
    // this.cards.forEach((card) => this.addCard(card, sanitizeHTML));
    for (const elem of cards) {
      this.addCard(elem);
    }
  }

  setEventListeners() {
    this.element.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__like-icon')) {
        const cardId = event.path[3].querySelector('.place-card__card-id').textContent;
        if (!event.target.classList.contains('place-card__like-icon_liked')) {
          this.api.setLike(cardId,event)
          .then(res => {
            event.target.nextElementSibling.textContent = res.likes.length;
          });
        } else {
          this.api.removeLike(cardId,event)
          .then(res => {
            // реализацию тоже надо убрать
            event.target.nextElementSibling.textContent = res.likes.length;
          });
        }
        this.cardInstance.like(event);
      }
      if (event.target.classList.contains('place-card__delete-icon')) {
        if (window.confirm("Do you really want to delete card?")) { 
          const cardId = event.target.previousElementSibling.textContent;
          this.api.deleteCard(cardId)
          this.cardInstance.remove(event, this.element);
        }
      }

      if (event.target.classList.contains('place-card__image')) {
        this.cardInstance.zoom(event);
      }

      if (event.target.classList.contains('zoom-card__close')) {
        this.cardInstance.closeZoom();
      }
    });
  }
}
