import { remove, render, replace } from '../framework/render';
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

  constructor({ pointListContainer, offersModel, destinationsModel, onPointChange }) {
    this.#pointListContainer = pointListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onPointChange;
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
      allOffers: this.#offersModel.getOffersByType(point.type),
      pointDestination: this.#destinationsModel.getDestinationsById(point.destination),
      allDestination: this.#destinationsModel.getDestinations(),
      onCloseEditButtonClick: this.#pointCloseHandler,
      onSubmitButtonClick: this.#pointSubmitHandler
    });

    if (!prevPointComponent || !prevPointEditingComponent) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#pointListContainer.contains(prevPointComponent.element)) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#pointListContainer.contains(prevPointEditingComponent.element)) {
      replace(this.#editingComponent, prevPointEditingComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditingComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editingComponent);
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  };

  #replacePointToEdit() {
    replace(this.#editingComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#editingComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
  }

  #pointEditHandler = () => {
    this.#replacePointToEdit();
  };

  #pointSubmitHandler = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditToPoint();
  };

  #pointCloseHandler = () => {
    this.#replaceEditToPoint();
  };

  #favoriteClickHandler = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite });
  };
}
