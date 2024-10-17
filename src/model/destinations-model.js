import { destinations } from '../mock/destinations';

export default class Model {
  #destinations = destinations;

  getDestinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const allDestinations = this.#destinations;
    return allDestinations.find((item) => item.id === id);
  }
}
