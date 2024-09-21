import AbstractView from '../framework/view/abstract-view';

function createEmtyListTemplate() {
  return '<p class="trip-events__msg">Click New Event to create your first point</p>';
}

export default class EmptyList extends AbstractView {
  get template() {
    return createEmtyListTemplate();
  }
}
