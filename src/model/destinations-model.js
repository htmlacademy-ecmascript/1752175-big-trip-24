import { destinations } from '../mock/destinations';

export default class Model {
  destinations = destinations;

  getDestinations() {
    return this.destinations;
  }

  getDestinationsById(id) {
    return this.getDestinations().find((destination) => destination.id === id);
  }
}
