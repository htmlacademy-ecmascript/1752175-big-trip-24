import { createSortingItemTemplate } from './helpers.js';
import ItemsList from './items-list.js';


function createSortingTemplate(sorting) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">${sorting.map((item) => createSortingItemTemplate(item, item.isChecked, item.isDisabled)).join('')}</form>`;
}

export default class Sorting extends ItemsList {
  constructor({ items, currentSortingType }) {
    super({ items });
    this._currentSortingType = currentSortingType;
  }

  get template() {
    return createSortingTemplate(this._items, this._currentSortingType);
  }
}
