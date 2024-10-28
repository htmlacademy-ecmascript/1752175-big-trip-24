import { remove, render, RenderPosition, replace } from '../framework/render.js';
import Info from '../view/info.js';


export default class InfoPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #infoComponent = null;
  #container = null;

  constructor({ pointsModel, destinationsModel, offersModel, container }) {
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#container = container;

    this.#pointsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new Info({
      points: this.#pointsModel.getPoints(),
      destinations: this.#destinationsModel.getDestinations(),
      offers: this.#offersModel.getOffers()
    });

    if(!prevInfoComponent) {
      render(this.#infoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#infoComponent, prevInfoComponent);
    remove(prevInfoComponent);

    render(this.#infoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
