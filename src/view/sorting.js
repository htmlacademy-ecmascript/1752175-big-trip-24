import {createElement} from '../render.js';
import { createSortingItemTemplate } from './helpers.js';

const SORTING_ITEMS = [
  { type: 'day', checked: true},
  { type: 'event', disabled: true},
  { type: 'time'},
  { type: 'price'},
  { type: 'offer', disabled: true},
];

function createSortingTemplate() {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${SORTING_ITEMS.map((type) => createSortingItemTemplate(type)).join('')}</form>`;
}

export default class Sorting {
  getTemplate() {
    return createSortingTemplate();
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
}
