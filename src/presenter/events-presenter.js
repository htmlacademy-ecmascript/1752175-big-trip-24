import { SortingType, UpdateType, UserAction } from '../const.js';
import { remove, render } from '../framework/render.js';
import { filter, sorting } from '../utils.js';
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
  #filterModel = null;
  #pointsPresenter = new Map();
  #emptyListComponent = null;
  #sortingPresenter = null;
  #currentSortingType = SortingType.DAY;

  constructor({ container, pointsModel, offersModel, destinationsModel, filterModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  get points() {
    const filterType = this.#filterModel.getFilter();
    const filteredPoints = filter[filterType](this.#pointsModel.getPoints());
    const sortedPoints = sorting[this.#currentSortingType]([...filteredPoints]);

    return sortedPoints;
  }

  init() {
    this.#renderEvents();
  }

  #renderEvents() {
    if (!this.points.length) {
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
    this.#emptyListComponent = new EmptyList({
      filterType: this.#filterModel.getFilter()
    });

    render(this.#emptyListComponent, this.#container);
  }

  #renderPoints() {
    this.points.forEach((point) => {
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
    console.log('Sorting type changed to:', sortingType);
    this.#currentSortingType = sortingType;
    this.#clearPoints();
    this.#renderPoints();
  };
}
