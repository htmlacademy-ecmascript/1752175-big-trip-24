import AbstractView from '../framework/view/abstract-view.js';
import { createFilterItemTemplate } from './helpers.js';

function createFilterTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
            ${filters.map((filter) => createFilterItemTemplate(filter)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}

export default class Filter extends AbstractView {
  #filters = null;

  constructor({filters}) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
