import { capitalizeFirstLetter } from '../utils';

function createEventItemTemplate(type, checked) {

  return `<div class="event__type-item">
            <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"  ${checked ? 'checked' : ''}>
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalizeFirstLetter(type)}</label>
          </div>`;
}

function createOfferSelectorTemplate(type, title, price, checked) {

  return `
    <div class="event__offer-selector">
      <input id="event-offer-${type}-1" class="event__offer-checkbox visually-hidden" type="checkbox" name="event-offer-${type}" ${checked ? 'checked' : ''}>
      <label class="event__offer-label" for="${type}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `;
}

function createFilterItemTemplate(filter, isChecked, isDisabled) {

  return `<div class="trip-filters__filter">
            <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" data-item="${filter.type}" value="${filter.type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
          </div>`;
}

function createSortingItemTemplate(sorting, isChecked, isDisabled) {

  return `<div class="trip-sort__item  trip-sort__item--${sorting.type}">
            <input id="sort-${sorting.type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" data-item="${sorting.type}" value="sort-${sorting.type}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
            <label class="trip-sort__btn" for="sort-${sorting.type}">${capitalizeFirstLetter(sorting.type)}</label>
          </div>`;
}

export {createEventItemTemplate, createOfferSelectorTemplate, createFilterItemTemplate, createSortingItemTemplate};
