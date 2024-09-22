import { filter } from '../utils';

function generateFilters(points) {
  return Object.entries(filter).map(([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length,
  }));
}

export { generateFilters };
