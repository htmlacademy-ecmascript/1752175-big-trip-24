import AbstractView from '../framework/view/abstract-view.js';
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

export default class Filter extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
