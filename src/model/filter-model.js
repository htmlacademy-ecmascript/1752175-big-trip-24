import { FilterType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  getFilter() {
    return this.#filter;
  }

  setFilter(updateType, updatedFilter) {
    this.#filter = updatedFilter;
    this._notify(updateType, updatedFilter);
  }
}
