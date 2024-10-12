const EVENT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const ZERO_LIMIT = 10;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortingType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const disabledSortingType = {
  [SortingType.DAY]: true,
  [SortingType.EVENT]: false,
  [SortingType.TIME]: true,
  [SortingType.PRICE]: true,
  [SortingType.OFFER]: false,
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export {EVENT_TYPES, ZERO_LIMIT, FilterType, Mode, SortingType, disabledSortingType};
