import { disabledSortingType, SortingType } from '../const';
import { render } from '../framework/render';
import Sorting from '../view/sorting';

export default class SortingPresenter {
  #container = null;
  #sortingTypes = [];
  #defaultSortingType = SortingType.DAY;
  #sortingTypesChangeHandler = null;

  constructor({container, onSortTypeChange}) {
    this.#container = container;
    this.#sortingTypesChangeHandler = onSortTypeChange;

    this.#sortingTypes = Object.values(SortingType).map((type) => ({
      type,
      isChecked: (type === this.#defaultSortingType),
      isDisabled: !disabledSortingType[type],
    }));
  }

  init() {
    render(new Sorting({
      items: this.#sortingTypes,
      onItemChange: this.#sortingTypesChangeHandler
    }), this.#container);
  }
}
