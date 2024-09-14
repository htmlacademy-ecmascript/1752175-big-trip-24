import { render } from '../framework/render.js';
import Creation from '../view/creation.js';
import Editing from '../view/editing.js';
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


  constructor({container, pointsModel, offersModel, destinationsModel}) {
    this.#eventsContainer = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#eventsListPoints = [...this.#pointsModel.getPoints()];

    render(new Sorting(), this.#eventsContainer);

    render(this.#eventsList, this.#eventsContainer);

    const editingPointElement = new Editing({
      point: this.#eventsListPoints[0],
      allOffers: this.#offersModel.getOffersByType(this.#eventsListPoints[0].type),
      pointDestination: this.#destinationsModel.getDestinationsById(this.#eventsListPoints[0].destination),
      allDestination: this.#destinationsModel.getDestinations()
    }).element;
    this.#eventsList.addItem(editingPointElement);

    for (let i = 1; i < this.#eventsListPoints.length - 1; i++) {
      const pointElement = new Point({
        point: this.#eventsListPoints[i],
        offers: [...this.#offersModel.getOffersById(this.#eventsListPoints[i].type, this.#eventsListPoints[i].offers)],
        destination: this.#destinationsModel.getDestinationsById(this.#eventsListPoints[i].destination)
      }).element;
      this.#eventsList.addItem(pointElement);
    }

    const creationPointElement = new Creation({
      point: this.#eventsListPoints[this.#eventsListPoints.length - 1],
      allOffers: this.#offersModel.getOffersByType(this.#eventsListPoints[this.#eventsListPoints.length - 1].type),
      pointDestination: this.#destinationsModel.getDestinationsById(this.#eventsListPoints[this.#eventsListPoints.length - 1].destination),
      allDestination: this.#destinationsModel.getDestinations()
    }).element;
    this.#eventsList.addItem(creationPointElement);
  }
}
