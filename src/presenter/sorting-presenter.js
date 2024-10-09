import { disabledSortingType, SortingType } from '../const';
import { render } from '../framework/render';
import Sorting from '../view/sorting';

export default class SortingPresenter {
  #container = null;
  #sortingTypes = [];
  #currentSortingType = SortingType.DAY;
  #sortingComponent = null;

  constructor({container}) {
    this.#container = container;

    this.#sortingTypes = Object.values(SortingType).map((type) => ({
      type,
      isChecked: (type === this.#currentSortingType),
      isDisabled: !disabledSortingType[type],
    }));
  }

  init() {
    this.#renderSorting();
  }

  #renderSorting() {
    this.#sortingComponent = new Sorting({
      items: this.#sortingTypes,
      currentSortingType: this.#currentSortingType,
    });

    render(this.#sortingComponent, this.#container);
  }
}
