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

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CREATE_POINT: 'CREATE_POINT',
};

const EmptyListMessage = {
  EVERYTHING : 'Click New Event to create your first point',
  FUTURE : 'There are no future events now',
  PRESENT : 'There are no present events now',
  PAST : 'There are no past events now',
};

export {EVENT_TYPES, ZERO_LIMIT, FilterType, Mode, SortingType, disabledSortingType, UpdateType, UserAction, EmptyListMessage };
