import { render } from '../framework/render.js';
import EmptyList from '../view/empty-list.js';
import List from '../view/list.js';
import Sorting from '../view/sorting.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #eventsList = new List();
  #eventsContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#eventsContainer = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    const eventsListPoints = [...this.#pointsModel.getPoints()];

    render(new Sorting(), this.#eventsContainer);

    render(this.#eventsList, this.#eventsContainer);

    if(eventsListPoints.length === 0) {
      render(new EmptyList(), this.#eventsContainer);
    } else {
      eventsListPoints.forEach((point) => {
        const pointPresenter = new PointPresenter({
          offersModel: this.#offersModel,
          destinationsModel: this.#destinationsModel,
        });

        pointPresenter.init(this.#eventsList.element, point);
      });
    }
  }
}
