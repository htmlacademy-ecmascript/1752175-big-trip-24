import AbstractView from '../framework/view/abstract-view';

export default class ItemsList extends AbstractView {
  _items = [];
  _handleItemChange = null;

  constructor ({items, onItemChange}) {
    super();
    this._items = items;
    this._handleItemChange = onItemChange;
    this.element.addEventListener('change', this.#itemChangeHandler);
  }

  #itemChangeHandler = (evt) => {
    evt.preventDefault();
    this._handleItemChange?.(evt.target.dataset.item);
  };
}
