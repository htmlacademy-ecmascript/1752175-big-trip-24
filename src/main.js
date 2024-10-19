import Info from './view/info.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render, RenderPosition } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({ pointsModel, filterModel });
const newPointButtonPresenter = new NewPointButtonPresenter({ container: infoContainer });
const eventsPresenter = new EventsPresenter({
  container: eventsContainer,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  newPointButtonPresenter: newPointButtonPresenter
});

render(new Info(), infoContainer, RenderPosition.AFTERBEGIN);

newPointButtonPresenter.init({ onButtonClick: eventsPresenter.newPointButtonClickHandler });
filterPresenter.init();
eventsPresenter.init();
