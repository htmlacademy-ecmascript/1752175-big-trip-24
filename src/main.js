import Info from './view/info.js';
import Filter from './view/filter.js';
import { render, RenderPosition } from './render.js';
import EventsPresenter from './presenter/events-presenter.js';

const infoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const eventsPresenter = new EventsPresenter({container: eventsContainer});

render(new Info(), infoContainer, RenderPosition.AFTERBEGIN);
render(new Filter(), filterContainer, RenderPosition.BEFOREEND);

eventsPresenter.init();
