import { render } from '../framework/render.js';
import { updatePoint } from '../utils.js';
import EmptyList from '../view/empty-list.js';
import List from '../view/list.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #container = null;
  #eventsList = new List();
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #pointsPresenter = new Map();

  constructor({ container, pointsModel, offersModel, destinationsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.getPoints()];

    this.#renderList();

    if(this.#points.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderPoints();
    }
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
}
