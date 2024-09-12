import { createElement } from '../render.js';
import { createEventItemTemplate, createOfferSelectorTemplate } from './helpers.js';
import { EVENT_TYPES } from '../const.js';
import { dateValue } from '../utils.js';

function createEditingTemplate(point, allOffers, pointDestination, allDestination) {
  const { basePrice, type } = point;
  const { name, description } = pointDestination;

  const typesList = EVENT_TYPES
    .map((eventType) => {
      const checked = eventType === type;
      return createEventItemTemplate(eventType, checked);
    }).join('');

  const offersList = allOffers.offers
    .map((offer) => {
      const checked = point.offers.includes(offer.id);
      return createOfferSelectorTemplate(allOffers.type, offer.title, offer.price, checked);
    }).join('');

  return `<form class="event event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${typesList}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${allDestination.map((item) => `<option value="${item.name}"></option>`).join('')}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateValue(point.dateFrom)}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateValue(point.dateTo)}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </header>
            <section class="event__details">
              ${offersList.length !== 0 ? `
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${offersList}
                </div>
              </section>` : ''}

              ${description ? `
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${description}</p>
                </section>
                ` : ''}
            </section>
          </form>`;
}

export default class Editing {
  constructor({ point, allOffers, pointDestination, allDestination }) {
    this.point = point;
    this.allOffers = allOffers;
    this.pointDestination = pointDestination;
    this.allDestination = allDestination;
  }

  getTemplate() {
    return createEditingTemplate(this.point, this.allOffers, this.pointDestination, this.allDestination);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
