import { replace } from '../framework/render';
import Editing from '../view/editing';
import Point from '../view/point';

export default class PointPresenter {
  #point = null;
  #offersModel = null;
  #destinationsModel = null;
  #pointComponent = null;
  #editingComponent = null;

  constructor({ offersModel, destinationsModel }) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(container, point) {
    this.#point = point;

    this.#pointComponent = new Point({
      point: this.#point,
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      destination: this.#destinationsModel.getDestinationsById(point.destination),
      onOpenEditButtonClick: this.#replacePointToEdit.bind(this),
    });

    this.#editingComponent = new Editing({
      point: this.#point,
      allOffers: this.#offersModel.getOffersByType(point.type),
      pointDestination: this.#destinationsModel.getDestinationsById(point.destination),
      allDestination: this.#destinationsModel.getDestinations(),
      onCloseEditButtonClick: this.#replaceEditToPoint.bind(this),
      onSubmitButtonClick: this.#handleSubmitButtonClick.bind(this),
    });

    const listItem = document.createElement('li');
    listItem.className = 'trip-events__item';
    listItem.appendChild(this.#pointComponent.element);
    container.appendChild(listItem);
  }

  #escKeydownHandler(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceEditToPoint();
    }
  }

  #replacePointToEdit() {
    replace(this.#editingComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeydownHandler.bind(this));
  }

  #replaceEditToPoint() {
    replace(this.#pointComponent, this.#editingComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler.bind(this));
  }

  #handleSubmitButtonClick(updatedPoint) {
    this.#point = updatedPoint;
    this.#replaceEditToPoint();
  }
}
