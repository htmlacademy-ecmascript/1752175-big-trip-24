import { EditType, POINT_EMPTY, UpdateType, UserAction } from '../const';
import { remove, render, RenderPosition } from '../framework/render';
import Editing from '../view/editing';

export default class NewPointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #newPointComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, destinationsModel, offersModel, onPointChange, onDestroy}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onPointChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#newPointComponent) {
      return;
    }

    this.#newPointComponent = new Editing({
      point: POINT_EMPTY,
      allOffers: this.#offersModel.getOffers(),
      typeOffers: this.#offersModel.getOffersByType(),
      allDestinations: this.#destinationsModel.getDestinations(),
      pointDestination: this.#destinationsModel.getDestinationsById(),
      onCloseClick: this.#cancelClickHandler,
      onSubmitClick: this.#pointSubmitHandler,
      editorMode: EditType.CREATING
    });

    render(this.#newPointComponent, this.#container, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy({isCanceled = true} = {}) {
    if (!this.#newPointComponent) {
      return;
    }
    this.#handleDestroy({isCanceled});
    remove(this.#newPointComponent);
    this.#newPointComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #pointSubmitHandler = (point) => {
    this.#handleDataChange (
      UserAction.CREATE_POINT,
      UpdateType.MINOR,
      point
    );
    this.destroy({isCanceled: false});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #cancelClickHandler = () => {
    this.destroy();
  };
}
