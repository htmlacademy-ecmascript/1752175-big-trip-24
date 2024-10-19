import {Mode, UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isMinorChange } from '../utils';
import Editing from '../view/editing';
import Point from '../view/point';

export default class PointPresenter {
  #pointListContainer = null;
  #point = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointComponent = null;
  #editingComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;
  #mode = Mode.DEFAULT;

  constructor({ pointListContainer, offersModel, destinationsModel, onPointChange, onModeChange }) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onPointChange;
    this.#handleModeChange = onModeChange;
  }


  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditingComponent = this.#editingComponent;

    this.#pointComponent = new Point({
      point: this.#point,
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      onOpenEditButtonClick: this.#pointEditHandler,
      onFavoriteButtonClick: this.#favoriteClickHandler
    });

    this.#editingComponent = new Editing({
      point: this.#point,
      allOffers: this.#offersModel.getOffers(),
      typeOffers: this.#offersModel.getOffersByType(point.type),
      allDestinations: this.#destinationsModel.getDestinations(),
      pointDestination: this.#destinationsModel.getDestinationsById(point.destination),
      onCloseClick: this.#pointCloseHandler,
      onSubmitClick: this.#pointSubmitHandler,
      onDeleteClick: this.#deleteClickHandler,
    });

    if (!prevPointComponent || !prevPointEditingComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editingComponent, prevPointEditingComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditingComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#editingComponent.reset(this.#point);
      this.#replaceEditToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editingComponent);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#editingComponent.reset();
      this.#replaceEditToPoint();
      document.removeEventListener('keydown', this.#escKeydownHandler);
    }
  };

  #replacePointToEdit() {
    this.#handleModeChange();
    replace(this.#editingComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#editingComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #pointEditHandler = () => {
    this.#handleModeChange();
    this.#replacePointToEdit();
  };

  #pointSubmitHandler = (point) => {
    const currentType = isMinorChange(point, this.#point) ? UpdateType.MINOR : UpdateType.PATCH;
    this.#handleDataChange(UserAction.UPDATE_POINT, currentType, point);
    this.#replaceEditToPoint();
  };

  #pointCloseHandler = () => {
    this.#editingComponent.reset(this.#point);
    this.#replaceEditToPoint();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange(UserAction.UPDATE_POINT, UpdateType.PATCH, {...this.#point, isFavorite: !this.#point.isFavorite });
  };

  #deleteClickHandler = (point) => {
    this.#handleDataChange(UserAction.DELETE_POINT, UpdateType.MINOR, point);
  };
}
