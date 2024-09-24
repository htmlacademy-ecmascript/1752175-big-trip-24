import { render, replace } from '../framework/render.js';
import Editing from '../view/editing.js';
import EmptyList from '../view/empty-list.js';
import List from '../view/list.js';
import Point from '../view/point.js';
import Sorting from '../view/sorting.js';

export default class EventsPresenter {
  #eventsList = new List();
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventsListPoints = [];

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#eventsContainer = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventsListPoints = [...this.#pointsModel.getPoints()];

    render(new Sorting(), this.#eventsContainer);

    render(this.#eventsList, this.#eventsContainer);

    if(this.#eventsListPoints.length === 0) {
      render(new EmptyList(), this.#eventsContainer);
    }

    this.#eventsListPoints.forEach((point) => {
      this.#renderEvent(point);
    });

    // const creationPointElement = new Creation({
    //   point: this.#eventsListPoints[this.#eventsListPoints.length - 1],
    //   allOffers: this.#offersModel.getOffersByType(this.#eventsListPoints[this.#eventsListPoints.length - 1].type),
    //   pointDestination: this.#destinationsModel.getDestinationsById(this.#eventsListPoints[this.#eventsListPoints.length - 1].destination),
    //   allDestination: this.#destinationsModel.getDestinations()
    // }).element;
    // this.#eventsList.addItem(creationPointElement);
  }

  #renderEvent(point) {
    const escKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceEditToEvent();
        document.removeEventListener('keydown', escKeydownHandler);
      }
    };

    const onOpenEditButtonClick = () => {
      replaceEventToEdit();
      document.addEventListener('keydown', escKeydownHandler);
    };

    const onCloseEditButtonClick = () => {
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeydownHandler);
    };

    const onSubmitButtonClick = () => {
      replaceEditToEvent();
      document.removeEventListener('keydown', escKeydownHandler);
    };

    const pointComponent = new Point({
      point,
      offers: [...this.#offersModel.getOffersById(point.type, point.offers)],
      destination: this.#destinationsModel.getDestinationsById(
        point.destination
      ),
      onOpenEditButtonClick,
    });

    const editingPointComponent = new Editing({
      point,
      allOffers: this.#offersModel.getOffersByType(point.type),
      pointDestination: this.#destinationsModel.getDestinationsById(
        point.destination
      ),
      allDestination: this.#destinationsModel.getDestinations(),
      onCloseEditButtonClick,
      onSubmitButtonClick,
    });

    function replaceEventToEdit() {
      replace(editingPointComponent, pointComponent);
    }

    function replaceEditToEvent() {
      replace(pointComponent, editingPointComponent);
    }

    const listElement = this.#eventsList.element;
    const li = document.createElement('li');
    li.className = 'trip-events__item';
    li.appendChild(pointComponent.element);
    listElement.appendChild(li);
  }
}
