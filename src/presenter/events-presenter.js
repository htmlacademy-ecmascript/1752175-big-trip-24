import {render} from '../render.js';
import Creation from '../view/creation.js';
import Editing from '../view/editing.js';
import List from '../view/list.js';
import Point from '../view/point.js';
import Sorting from '../view/sorting.js';

const NUMBER_OF_POINTS = 3;

export default class EventsPresenter {
  eventsList = new List();

  constructor({container}) {
    this.eventsContainer = container;
  }

  init() {
    render(new Sorting(), this.eventsContainer);
    render(this.eventsList, this.eventsContainer);
    const editingPointElement = new Editing().getElement();
    this.eventsList.addItem(editingPointElement);
    for (let i = 0; i < NUMBER_OF_POINTS; i++) {
      const pointElement = new Point().getElement();
      this.eventsList.addItem(pointElement);
    }
    const creationPointElement = new Creation().getElement();
    this.eventsList.addItem(creationPointElement);
  }
}
