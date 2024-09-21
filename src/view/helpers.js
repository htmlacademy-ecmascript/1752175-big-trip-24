import { FilterType } from '../const';
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

function createFilterItemTemplate(filter) {

  return `<div class="trip-filters__filter">
            <input id="filter-${filter.type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter.type}" ${filter.type === FilterType.EVERYTHING ? 'checked' : ''} ${filter.count === 0 ? 'disabled' : ''}>
            <label class="trip-filters__filter-label" for="filter-${filter.type}">${filter.type}</label>
          </div>`;
}

function createSortingItemTemplate(sortingData) {
  const { type, checked = false, disabled = false } = sortingData;

  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}>
            <label class="trip-sort__btn" for="sort-${type}">${capitalizeFirstLetter(type)}</label>
          </div>`;
}

export {createEventItemTemplate, createOfferSelectorTemplate, createFilterItemTemplate, createSortingItemTemplate};
