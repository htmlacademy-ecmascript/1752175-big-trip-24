import AbstractView from '../framework/view/abstract-view.js';
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

export default class Sorting extends AbstractView {
  get template() {
    return createSortingTemplate();
  }
}
