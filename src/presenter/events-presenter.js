import { SortingType, UpdateType } from '../const.js';
import { remove, render } from '../framework/render.js';
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
  #emptyListComponent = null;
  #sortingPresenter = null;
  #currentSortingType = SortingType.DAY;

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    this.#points = [...this.#pointsModel.getPoints()];

    this.#renderEvents();
  }

  #renderEvents() {
    if (!this.#points.length) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderList();
    this.#renderPoints();
  }

  #renderList() {
    render(this.#eventsList, this.#container);
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
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointsPresenter.set(point.id, pointPresenter);
  }

  #handleViewAction = (actionType, updateType, updatedPoint) => {
    if(actionType === UserAction.UPDATE_POINT) {
      this.#pointsModel.updatePoint(updateType, updatedPoint);
    }

    if(actionType === UserAction.CREATE_POINT) {
      this.#pointsModel.addPoint(updateType, updatedPoint);
    }

    if(actionType === UserAction.DELETE_POINT) {
      this.#pointsModel.deletePoint(updateType, updatedPoint);
    }
  };

  #handleModeChange = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.resetView());
  };

  #renderSort() {
    this.#sortingPresenter = new SortingPresenter({
      container: this.#container,
      onSortTypeChange: this.#sortingTypesChangeHandler
    });

    this.#sortingPresenter.init();
  }

  #clearPoints = () => {
    this.#pointsPresenter.forEach((presenter) => presenter.destroy());
    this.#pointsPresenter.clear();
  };

  #clearEvents = ({resetSortType = false} = {}) => {
    this.#clearPoints();
    this.#sortingPresenter.destroy();
    remove(this.#emptyListComponent);

    if(resetSortType) {
      this.#currentSortingType = SortingType.DAY;
    }
  };

  #modelEventHandler = (updateType, data) => {
    if(updateType === UpdateType.PATCH) {
      this.#pointsPresenter?.get(data.id)?.init(data);
    }

    if(updateType === UpdateType.MINOR) {
      this.#clearEvents();
      this.#renderEvents();
    }

    if(updateType === UpdateType.MAJOR) {
      this.#clearEvents({resetSortType: true});
      this.#renderEvents();
    }
  };

  #sortingTypesChangeHandler = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
