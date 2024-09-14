import { offers } from '../mock/offers';

export default class OffersModel {
  offers = offers;

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    return this.getOffers().find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.includes(item.id));
  }
}
