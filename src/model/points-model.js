
import { points } from '../mock/points';

export default class TripModel {
  points = points;

  getPoints() {
    return this.points;
  }
}
