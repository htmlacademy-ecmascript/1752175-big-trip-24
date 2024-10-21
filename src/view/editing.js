import { createEventItemTemplate, createOfferSelectorTemplate } from './helpers.js';
import { EditType, EVENT_TYPES, POINT_EMPTY } from '../const.js';
import { dateValue } from '../utils.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import he from 'he';

import 'flatpickr/dist/flatpickr.min.css';

function createEditingTemplate(state, allDestinations) {
  const { id, basePrice, type, offers, typeOffers, destination, dateTo, dateFrom } = state;

  const createTypeList = EVENT_TYPES
    .map((eventType) => {
      const checked = eventType === type ? 'checked' : '';
      return createEventItemTemplate(eventType, checked);
    }).join('');

  const createAllOffers = (typeOffers?.offers || [])
    .map((offer) => {
      const checked = offers.includes(offer.id) ? 'checked' : '';
      return createOfferSelectorTemplate(type, offer.title, offer.price, offer.id, checked);
    }).join('');

  const pointDestination = destination
    ? allDestinations.find((item) => item.id === destination)
    : '';

  const { name = '', description = '', pictures = [] } = pointDestination || {};

  const createButtonRollUp = id
    ? `<button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>`
    : '';

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
                  <input class="event__input  event__input--price" id="event-price-1" type="number" pattern="^[ 0-9]+$" name="event-price" value="${he.encode(String(basePrice))}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">${id === POINT_EMPTY.id ? 'Cancel' : 'Delete'}</button>
                ${createButtonRollUp}
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
  #datepickerStart = null;
  #datepickerEnd = null;
  #onDeleteClick = null;
  #editorMode;

  constructor({
    point = POINT_EMPTY,
    typeOffers,
    allOffers,
    pointDestination = false,
    allDestinations,
    onCloseClick,
    onSubmitClick,
    onDeleteClick,
    editorMode = EditType.EDITING
  }) {
    super();
    this.#initialPoint = point;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
    this.#onCloseClick = onCloseClick;
    this.#onSubmitClick = onSubmitClick;
    this.#onDeleteClick = onDeleteClick;
    this.#editorMode = editorMode;

    this._setState(Editing.parsePointToState(point, pointDestination.id, typeOffers, editorMode));
    this._restoreHandlers();
  }

  get template() {
    return createEditingTemplate(this._state, this.#allDestinations, this.#editorMode);
  }

  reset() {
    this.updateElement({
      ...this.#initialPoint,
      typeOffers: this.#allOffers.find((offer) => offer.type === this.#initialPoint.type),
    });
  }

  removeElement = () => {
    super.removeElement();

    this.#datepickerStart?.destroy();
    this.#datepickerEnd?.destroy();
    this.#datepickerStart = null;
    this.#datepickerEnd = null;
  };


  _restoreHandlers = () => {
    if(this.#editorMode === EditType.EDITING) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);

      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#deleteClickHandler);
    }

    if(this.#editorMode === EditType.CREATING) {
      this.element.querySelector('.event__reset-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element.querySelector('.event.event--edit')
      .addEventListener('submit', this.#submitClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element.querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerSelectHandler);

    this.#setDatepickerStart();
    this.#setDatepickerEnd();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#onCloseClick();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();

    const { basePrice, dateFrom, dateTo, destination } = this._state;

    if (basePrice < 1) {
      return;
    }

    if (new Date(dateFrom) >= new Date(dateTo)) {
      return;
    }

    if (!destination) {
      return;
    }

    this.#onSubmitClick(Editing.parseStateToPoint(this._state));
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onDeleteClick(this._state);
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType);
    this.updateElement({
      type: targetType,
      typeOffers: typeOffers,
      offers: [],
    });
  };

  #offerSelectHandler = () => {
    const checkedOffersElement = this.element.querySelectorAll('.event__offer-checkbox:checked');
    const checkedOffersById = Array.from(checkedOffersElement).map((item) => item.dataset.offerId);
    this._setState({
      offers: checkedOffersById
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination ? newDestination.id : '',
    });
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.valueAsNumber;
    this._setState({
      basePrice: newPrice
    });
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });

    this.#setDatepickerEnd();
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #initializeDatepicker(selector, defaultDate, onChange, minDate) {
    return flatpickr(
      this.element.querySelector(selector),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        defaultDate,
        onChange,
        ...(minDate ? { minDate } : {}),
      }
    );
  }

  #setDatepickerStart() {
    this.#datepickerStart = this.#initializeDatepicker(
      '#event-start-time-1',
      this._state.dateFrom,
      this.#dateFromChangeHandler
    );
  }

  #setDatepickerEnd() {
    this.#datepickerEnd = this.#initializeDatepicker(
      '#event-end-time-1',
      this._state.dateTo,
      this.#dateToChangeHandler,
      this._state.dateFrom
    );
  }

  static parsePointToState(point, pointDestination, typeOffers) {
    return {
      ...point,
      destination: pointDestination,
      typeOffers,
    };
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
