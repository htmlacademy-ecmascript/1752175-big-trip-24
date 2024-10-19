import { render } from '../framework/render';
import NewPointButton from '../view/new-point-button';

export default class NewPointButtonPresenter {
  #container = null;
  #buttonComponent = null;
  #handleButtonClick = null;

  constructor({container}) {
    this.#container = container;
  }

  init({onButtonClick}) {
    this.#handleButtonClick = onButtonClick;
    this.#buttonComponent = new NewPointButton({onClick: this.#buttonClickHandler});
    render(this.#buttonComponent, this.#container);
  }

  disableButton() {
    this.#buttonComponent.setDisabled(true);
  }

  enableButton() {
    this.#buttonComponent.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.disableButton();
    this.#handleButtonClick();
  };
}
