import AdapterService from '../service/adapter-service';

export default class OffersModel {
  #offers = [];
  #pointsApiService = null;
  #pointsAdapterService = new AdapterService();

  constructor(pointsApiService) {
    this.#pointsApiService = pointsApiService;
  }

  getOffers() {
    return this.#offers;
  }

  async init() {
    const offers = await this.#pointsApiService.offers;
    this.#offers = offers.map(this.#pointsAdapterService.adaptToClient);
    return this.#offers;
  }

  getOffersByType(type) {
    const allOffers = this.#offers;
    return allOffers.find((item) => item.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.includes(item.id));
  }
}
