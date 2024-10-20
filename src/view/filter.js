import { createFilterItemTemplate } from './helpers.js';
import ItemsList from './items-list.js';

function createFilterTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
            ${filters.map((filter) => createFilterItemTemplate(filter, filter.isChecked, filter.isDisabled)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class Filter extends ItemsList {

  get template() {
    return createFilterTemplate(this._items);
  }
}
