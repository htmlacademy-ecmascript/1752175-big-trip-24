import AbstractView from '../framework/view/abstract-view.js';

function createListTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class List extends AbstractView {
  get template() {
    return createListTemplate();
  }

  addItem(itemElement) {
    const list = this.element;
    const li = document.createElement('li');
    li.className = 'trip-events__item';
    li.appendChild(itemElement);
    list.appendChild(li);
  }
}
