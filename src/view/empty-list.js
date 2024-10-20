import { EmptyListMessage } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createEmptyListTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EmptyList extends AbstractView {
  #filterType = null;
  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    const message = EmptyListMessage[this.#filterType.toUpperCase()] || EmptyListMessage.EVERYTHING;
    return createEmptyListTemplate(message);
  }
}
