import { FilterType, SortingType, UpdateType, UserAction } from '../const.js';
import { remove, render } from '../framework/render.js';
import { filter, sorting } from '../utils.js';
import EmptyList from '../view/empty-list.js';
import List from '../view/list.js';
import NewPointPresenter from './new-point-presenter.js';
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
  #newPointPresenter = null;
  #newPointButtonPresenter = null;
  #isCreating = false;
  #isLoading = true;
  #loadingComponent = new EmptyList({ filterType: 'LOADING' });
  #loadingErrorComponent = new EmptyList({ filterType: 'LOADING_ERROR' });

  constructor({ container, pointsModel, offersModel, destinationsModel, filterModel, newPointButtonPresenter }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;
    this.#newPointButtonPresenter = newPointButtonPresenter;

    this.#pointsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);

    this.#newPointPresenter = new NewPointPresenter({
      container: this.#eventsList.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onPointChange: this.#handleViewAction,
      onDestroy:  this.#newPointDestroyHandler,
    });
  }

  get points() {
    const filterType = this.#filterModel.getFilter();
    const filteredPoints = filter[filterType](this.#pointsModel.getPoints());
    return sorting[this.#currentSortingType]([...filteredPoints]);
  }

  get error() {
    return this.#pointsModel.error;
  }

  init() {
    this.#renderEvents();
  }

  #renderEvents() {
    if (this.error) {
      this.#newPointButtonPresenter.disableButton();
      this.#renderLoadingError();
      return;
    }

    if (this.#isLoading) {
      this.#newPointButtonPresenter.disableButton();
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0 && !this.#isCreating) {
      this.#newPointButtonPresenter.enableButton();
      this.#renderEmptyList();
      return;
    }

    this.#newPointButtonPresenter.enableButton();
    this.#renderSort();
    this.#renderList();
    this.#renderPoints();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderLoadingError() {
    render(this.#loadingErrorComponent, this.#container);
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
    this.points.forEach((point) => this.#renderPoint(point));
  }

  #renderPoint(point){
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#eventsList.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onPointChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
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
    this.#newPointPresenter.destroy();
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
    this.#sortingPresenter?.destroy();
    remove(this.#emptyListComponent);

    if(resetSortType) {
      this.#currentSortingType = SortingType.DAY;
    }
  };

  #modelEventHandler = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.#pointsPresenter?.get(data.id)?.init(data);
    }

    if (updateType === UpdateType.MINOR) {
      this.#clearEvents();
      this.#renderEvents();
    }

    if (updateType === UpdateType.MAJOR) {
      this.#clearEvents({ resetSortType: true });
      this.#renderEvents();
    }

    if (updateType === UpdateType.INIT) {
      this.#isLoading = false;
      remove(this.#loadingComponent);
      this.#renderEvents();
    }
  };

  #sortingTypesChangeHandler = (sortingType) => {
    this.#currentSortingType = sortingType;
    this.#clearPoints();
    this.#renderPoints();
  };

  newPointButtonClickHandler = () => {
    this.#isCreating = true;
    this.#currentSortingType = SortingType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointButtonPresenter.disableButton();

    this.#pointsPresenter.forEach((presenter) => presenter.resetView());

    this.#newPointPresenter.init();
  };

  #newPointDestroyHandler = ({isCanceled}) => {
    this.#isCreating = false;
    this.#newPointButtonPresenter.enableButton();
    if (this.points.length === 0 && isCanceled) {
      this.#clearEvents();
      this.#renderEvents();
    }
  };
}
