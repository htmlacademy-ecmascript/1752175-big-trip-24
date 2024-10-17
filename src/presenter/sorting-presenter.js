import { disabledSortingType, SortingType } from '../const';
import { remove, render, replace } from '../framework/render';
import Sorting from '../view/sorting';

export default class SortingPresenter {
  #container = null;
  #sortingComponent = null;
  #sortingTypes = [];
  #currentSortingType = SortingType.DAY;
  #sortingTypesChangeHandler = null;

  constructor({container, onSortTypeChange}) {
    this.#container = container;

    this.#sortingTypes = Object.values(SortingType).map((type) => ({
      type,
      isChecked: (type === this.#currentSortingType),
      isDisabled: !disabledSortingType[type],
    }));

    this.#sortingTypesChangeHandler = onSortTypeChange;
  }

  init() {
    const prevSortingComponent = this.#sortingComponent;

    this.#sortingComponent = new Sorting({
      items: this.#sortingTypes,
      onItemChange: this.#sortingTypesChangeHandler
    });

    if (prevSortingComponent) {
      replace(this.#sortingComponent, prevSortingComponent);
      remove(prevSortingComponent);
    } else {
      render(this.#sortingComponent, this.#container);
    }
  }

  destroy() {
    remove(this.#sortingComponent);
  }
}
