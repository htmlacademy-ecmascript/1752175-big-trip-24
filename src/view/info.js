import AbstractView from '../framework/view/abstract-view.js';
import { generateRoute, getEndDate, getStartDate, getTotalCost } from '../utils.js';

function createInfoTemplate({route, points, cost}) {
  const routeContent = () => {
    const startDate = getStartDate(points);
    const endDate = getEndDate(points);

    if (!startDate || !endDate) {
      return '<p class="trip-info__dates"></p>';
    }

    const startDay = startDate.date();
    const endDay = endDate.date();
    const startMonth = startDate.format('MMM');
    const endMonth = endDate.format('MMM');

    const formattedStartDate = startDate.format('DD MMM');
    const formattedEndDate = endDate.format('DD MMM');

    if (startDate.isSame(endDate, 'day')) {
      return `<p class="trip-info__dates">${endDay} ${endMonth}</p>`;
    } else if (startMonth === endMonth) {
      return `<p class="trip-info__dates">${startDay}&nbsp;&mdash;&nbsp;${endDay} ${startMonth}</p>`;
    } else {
      return `<p class="trip-info__dates">${formattedStartDate}&nbsp;&mdash;&nbsp;${formattedEndDate}</p>`;
    }
  };

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${route ? route : ''}</h1>

              ${routeContent()}

            </div>

            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
            </p>
          </section>`;
}

export default class Info extends AbstractView {
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createInfoTemplate({
      route: generateRoute(this.#points, this.#destinations),
      points: this.#points,
      cost: getTotalCost(this.#points, this.#offers),
    });
  }
}
