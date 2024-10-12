import { FilterType } from '../const.js';
import { render } from '../framework/render.js';
import { filter } from '../utils.js';
import Filter from '../view/filter';

export default class FilterPresenter {
  #container = null;
  #filterComponent = null;
  #currentFilter = FilterType.EVERYTHING;
  #pointsModel = null;

  constructor({ container,pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  get filters() {
    const points = this.#pointsModel.getPoints();

    return Object.entries(filter).map(([filterType, filterPoints]) => ({
      type: filterType,
      isChecked: filterType === this.#currentFilter,
      isDisabled: filterPoints(points).length === 0,
    }));
  }

  init() {
    const filters = this.filters;

    this.#filterComponent = new Filter({ items: filters });

    render(this.#filterComponent, this.#container);
  }
}
