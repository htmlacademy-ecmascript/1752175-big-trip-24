export default class DestinationsModel {
  #destinations = [];
  #pointsApiService = null;

  constructor(pointsApiService) {
    this.#pointsApiService = pointsApiService;
  }

  getDestinations() {
    return this.#destinations;
  }

  async init() {
    this.#destinations = await this.#pointsApiService.destinations;
    return this.#destinations;
  }

  getDestinationsById(id) {
    const allDestinations = this.#destinations;
    return allDestinations.find((item) => item.id === id);
  }
}
