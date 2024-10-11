import { SortingType } from '../const.js';
import { render } from '../framework/render.js';
import { sorting, updatePoint } from '../utils.js';
import EmptyList from '../view/empty-list.js';
import List from '../view/list.js';
import PointPresenter from './point-presenter.js';
import SortingPresenter from './sorting-presenter.js';

export default class EventsPresenter {
  #container = null;
  #eventsList = new List();
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #pointsPresenter = new Map();
  #currentSortingType = null;
  #defaultSortingType = SortingType.DAY;

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.getPoints()];

    if (!this.#points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderList();
  }

  #renderList() {
    render(this.#eventsList, this.#container);
    this.#sortingTypesChangeHandler(this.#defaultSortingType);
  }

  #renderEmptyList() {
    render(new EmptyList(), this.#container);
  }

  #renderPoints() {
    this.#points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onPointChange: this.#handleDataChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #handleDataChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointsPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    const sortingPresenter = new SortingPresenter({
      container: this.#container,
      onSortTypeChange: this.#sortingTypesChangeHandler
    });

    sortingPresenter.init();
  }

  #sortingPoints = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#points = sorting[this.#currentSortingType](this.#points);
  };

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #sortingTypesChangeHandler = (sortingType) => {
    this.#sortingPoints(sortingType);
    this.#clearPoints();
    this.#renderPoints();
  };
}
