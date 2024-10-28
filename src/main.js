import EventsPresenter from './presenter/events-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButtonPresenter from './presenter/new-point-button-presenter.js';
import PointsApiService from './service/points-api-service.js';
import { END_POINT } from './const.js';
import InfoPresenter from './presenter/info-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const eventsContainer = document.querySelector('.trip-events');

const AUTHORIZATION = 'Basic zk394lfqapw';

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const pointsModel = new PointsModel({
  pointsApiService,
  destinationsModel,
  offersModel,
});
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
const infoPresenter = new InfoPresenter({ pointsModel, destinationsModel, offersModel, container: infoContainer });

newPointButtonPresenter.init({ onButtonClick: eventsPresenter.newPointButtonClickHandler });
filterPresenter.init();
eventsPresenter.init();
pointsModel.init();
infoPresenter.init();
