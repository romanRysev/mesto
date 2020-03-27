import {serverUrl} from './config'
export class Api {

  constructor() {
    this.baseUrl = serverUrl,
    this.headers= {
      authorization: '74c32bdd-1505-4c49-a329-469893e5c4b1',
      'Content-Type': 'application/json'
    }
  }

  makeFetch(link, method='GET', body) {

    if (body) {
      body = JSON.stringify(body)
    }
    return  fetch(`${this.baseUrl}/${link}`, {
      method: method,
      headers: this.headers,
      body: body
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
        //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
  return  this.makeFetch('cards');
  }

  getUserInfo() {
        //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch('users/me');
  }

  updateUserInfo(name, about) {
        //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch('users/me', 'PATCH', {name, about});
  }

  addCard(data) {
        //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch('cards', 'POST', {name: data.name, link: data.link});
  }

  deleteCard(cardId) {
    //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом   ------------- я здесь не вызывал методы другого класса О_о

  /*  return  fetch(`https://praktikum.tk/cohort8/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '74c32bdd-1505-4c49-a329-469893e5c4b1'
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });*/

      return  this.makeFetch(`cards/${cardId}`, 'DELETE');
  }

  setLike(cardId) {
    //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch(`cards/like/${cardId}`, 'PUT');
  }

  removeLike(cardId) {
    //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch(`cards/like/${cardId}`, 'DELETE');
  }

  updateAvatar(avatar) {
    //  Надо исправить: Вызывая методы другого классе из класса ip вы создаёте жёсткую связь между классами
    // Надо вызывать методы класса API из других классов, а здесь возвращать  return с результатом
    return  this.makeFetch(`users/me/avatar`, 'PATCH', {avatar});
  }
}