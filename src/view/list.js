import {createElement} from '../render.js';

function createListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class List {
  getTemplate() {
    return createListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }

  addItem(itemElement) {
    const list = this.getElement();
    const li = document.createElement('li');
    li.className = 'trip-events__item';
    li.appendChild(itemElement);
    list.appendChild(li);
  }
}
