import {createElement} from '../render.js';
import { createFilterItemTemplate } from './helpers.js';

const FILTER_ITEMS = [
  { type: 'everything', checked: true},
  { type: 'future'},
  { type: 'present'},
  { type: 'past'},
];

function createFilterTemplate() {
  return `<form class="trip-filters" action="#" method="get">
            ${FILTER_ITEMS.map((type) => createFilterItemTemplate(type)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class Filter {
  getTemplate() {
    return createFilterTemplate();
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
