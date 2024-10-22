import { UpdateType } from '../const';
import Observable from '../framework/observable';
import AdapterService from '../service/adapter-service';

export default class PointsModel extends Observable {
  #points = [];
  #destinations = [];
  #pointsApiService = null;
  #pointsAdapterService = new AdapterService();
  #destinationsModel = null;
  #offersModel = null;

  constructor({ pointsApiService, destinationsModel, offersModel }) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  getPoints() {
    return this.#points;
  }

  getDestinations() {
    return this.#destinations;
  }

  async init() {
    try {
      await Promise.all([this.#destinationsModel.init(), this.#offersModel.init()]);

      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#pointsAdapterService.adaptToClient);

      this._notify(UpdateType.INIT);
    } catch (error) {
      this.error = true;
      this._notify(UpdateType.INIT);
    }
  }

  async updatePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index !== -1) {
      try {
        const pointData = Object.fromEntries(
          Object.entries(updatedPoint).filter(([key]) => !['typeOffers'].includes(key))
        );

        const response = await this.#pointsApiService.updatePoint(pointData);
        const updatePoint = this.#pointsAdapterService.adaptToClient(response);

        this.#points[index] = updatePoint;

        this._notify(updateType, updatePoint);
      } catch (err) {
        throw new Error('Can\'t update point');
      }
    }
  }

  async addPoint(updateType, updatedPoint) {
    try {
      const pointData = Object.fromEntries(
        Object.entries(updatedPoint).filter(([key]) => !['typeOffers', 'id'].includes(key))
      );

      const response = await this.#pointsApiService.addPoint(pointData);
      const newPoint = this.#pointsAdapterService.adaptToClient(response);

      this.#points = [
        newPoint,
        ...this.#points,
      ];

      this._notify(updateType, newPoint);
    } catch (err) {
      throw new Error('Can\'t add point');
    }
  }

  async deletePoint(updateType, updatedPoint) {
    const index = this.#points.findIndex((point) => point.id === updatedPoint.id);

    if (index !== -1) {
      try {
        await this.#pointsApiService.deletePoint(updatedPoint);

        this.#points.splice(index, 1);
        this._notify(updateType);
      } catch (err) {
        throw new Error('Can\'t delete point');
      }
    }
  }
}
