import { createEventItemTemplate, createOfferSelectorTemplate } from './helpers.js';
import { EVENT_TYPES } from '../const.js';
import { dateValue } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function createEditingTemplate(state, allDestinations) {
  const { basePrice, type, offers, typeOffers, destination, dateTo, dateFrom } = state;

  const createTypeList = EVENT_TYPES
    .map((eventType) => {
      const checked = eventType === type;
      return createEventItemTemplate(eventType, checked);
    }).join('');

  const createAllOffers = typeOffers.offers
    .map((offer) => {
      const checked = offers.includes(offer.id);
      return createOfferSelectorTemplate(type, offer.title, offer.price, offer.id, checked);
    }).join('');

  const pointDestination = allDestinations.find((item) => item.id === destination);
  const { name, description, pictures } = pointDestination;

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
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
                      ${createTypeList}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${name}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    ${allDestinations.map((item) => `<option value="${item.name}"></option>`).join('')}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateValue(dateFrom)}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateValue(dateTo)}">
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
                ${createAllOffers.length !== 0 ? `
                <section class="event__section  event__section--offers">
                  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                  <div class="event__available-offers">
                    ${createAllOffers}
                  </div>
                </section>` : ''}

                ${description ? `
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>
                  </section>
                  ` : ''}

                ${pictures.length !== 0 ? `
                  <div class="event__photos-container">
                    <div class="event__photos-tape">
                      ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}"></img>`).join('')}
                    </div>
                  </div>
                ` : ''}
              </section>
            </form>
          </li>`;
}

export default class Editing extends AbstractStatefulView {
  #initialPoint = null;
  #allOffers = null;
  #allDestinations = [];
  #onCloseClick = null;
  #onSubmitClick = null;

  constructor({
    point,
    typeOffers,
    allOffers,
    pointDestination,
    allDestinations,
    onCloseClick,
    onSubmitClick
  }) {
    super();
    this.#initialPoint = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitClick = onSubmitClick;
    this._setState(Editing.parsePointToState(point, pointDestination.id, typeOffers));
    this._restoreHandlers();
  }

  get template() {
    return createEditingTemplate(this._state, this.#allDestinations);
  }

  reset() {
    this.updateElement({
      ...this.#initialPoint,
      typeOffers: this.#allOffers.find((offer) => offer.type === this.#initialPoint.type),
    });
  }

  removeElement = () => {
    super.removeElement();
  };


  _restoreHandlers = () => {
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#closeClickHandler);

    this.element.querySelector('.event__save-btn')
      .addEventListener('submit', this.#submitClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#onSubmitClick(Editing.parseStateToPoint(this.#initialPoint));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType);
    this.updateElement({
      type: targetType,
      typeOffers: typeOffers,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination.id,
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice
    });
  };

  static parsePointToState(point, pointDestination, typeOffers) {
    return {
      ...point,
      destination: pointDestination,
      typeOffers
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    return point;
  }
}
