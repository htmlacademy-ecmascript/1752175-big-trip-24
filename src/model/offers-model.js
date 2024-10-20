import { offers } from '../mock/offers';

export default class OffersModel {
  #offers = offers;

  getOffers() {
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
