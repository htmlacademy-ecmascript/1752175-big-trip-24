import Info from './view/info.js';
import Filter from './view/filter.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render, RenderPosition } from './framework/render.js';
import { generateFilters } from './mock/filters.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filters = generateFilters(pointsModel.points);

const eventsPresenter = new EventsPresenter({container: eventsContainer, pointsModel, offersModel, destinationsModel});

render(new Info(), infoContainer, RenderPosition.AFTERBEGIN);
render(new Filter({filters}), filterContainer, RenderPosition.BEFOREEND);

eventsPresenter.init();
