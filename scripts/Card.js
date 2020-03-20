class Card {
  constructor() {

    this.zoomElement = document.querySelector('.zoom-card');
    this.zoomImage = document.querySelector('.zoom-card__image');
    this.template = document.createElement("template");
  }

  create(data) {
    this.link = data.link;
    this.name = data.name;
    this.likes = data.likes;
    this._id = data._id;
    this.owner_id = data.owner._id;
    this.template.innerHTML = `<div class="place-card">
      <div class="place-card__image" style="background-image: url(${this.link})">
        <div class="place-card__card-id" style = "display: none">${this._id}</div>
        <button class="place-card__delete-icon ${(this.owner_id == "5be0f7a778963c02c5b45f5c") ? 'place-card__delete-icon_enable' : ''}"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name">${this.name}</h3>
        <div class="place-card__like-container">
          <button class="place-card__like-icon ${(this.likes.find(item => item._id == "5be0f7a778963c02c5b45f5c")) ? 'place-card__like-icon_liked' : ''}"></button>
          <span class="place-card__like-counter">${this.likes.length}</span>
        </div>
      </div>
    </div>`;
    return this.template.content;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event, container) {
    this.container = container;
    this.container.removeChild(event.target.closest('.place-card'));
  }

  zoom(event) {
    this.zoomImage.setAttribute("src", `${event.target.style.backgroundImage.slice(5, -2)}`);
    this.zoomElement.classList.add("zoom-card_is-opened");
  }

  closeZoom() {
    this.zoomElement.classList.remove("zoom-card_is-opened");
  }
}

