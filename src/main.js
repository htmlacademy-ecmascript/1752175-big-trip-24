import Info from './view/info.js';
import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { render, RenderPosition } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SortingPresenter from './presenter/sorting-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const sortingPresenter = new SortingPresenter({container: eventsContainer});
const filterPresenter = new FilterPresenter({container: filterContainer, pointsModel});
const eventsPresenter = new EventsPresenter({container: eventsContainer, pointsModel, offersModel, destinationsModel});

render(new Info(), infoContainer, RenderPosition.AFTERBEGIN);

filterPresenter.init();
sortingPresenter.init();
eventsPresenter.init();
