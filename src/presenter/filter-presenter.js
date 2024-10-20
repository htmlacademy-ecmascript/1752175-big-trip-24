import { UpdateType } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import { filter } from '../utils.js';
import Filter from '../view/filter.js';

export default class FilterPresenter {
  #container = document.querySelector('.trip-controls__filters');
  #filterComponent = null;
  #currentFilter = null;
  #pointsModel = null;
  #filterModel = null;

  constructor({ pointsModel, filterModel }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
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
    this.#currentFilter = this.#filterModel.getFilter();
    const filters = this.filters;

    const prevFiltersComponent = this.#filterComponent;
    this.#filterComponent = new Filter({
      items: filters,
      onItemChange: this.#filterTypesChangeHandler
    });

    if(!prevFiltersComponent) {
      render(this.#filterComponent, this.#container);
      return;
    }


    replace(this.#filterComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  }


  #filterTypesChangeHandler = (filterType) => {
    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
