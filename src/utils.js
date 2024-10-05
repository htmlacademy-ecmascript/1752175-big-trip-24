import dayjs from 'dayjs';
import {FilterType, ZERO_LIMIT } from './const';

function capitalizeFirstLetter(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function shufflePoints(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function dateValue(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function dateDateTime(date) {
  return dayjs(date).format('YYYY-MM-DD');
}

function dateContent(date) {
  return dayjs(date).format('MMM DD');
}

function timeDateTime(date) {
  return dayjs(date).format('YYYY-MM-DDTHH:mm');
}

function timeContent(date) {
  return dayjs(date).format('HH:mm');
}

function formatDuration(start, end) {
  const startDate = dayjs(start);
  const endDate = dayjs(end);
  const diffInMilliseconds = endDate.diff(startDate);

  const millisecondsInMinute = 1000 * 60;
  const millisecondsInHour = millisecondsInMinute * 60;
  const millisecondsInDay = millisecondsInHour * 24;

  const days = Math.floor(diffInMilliseconds / millisecondsInDay);
  const hours = Math.floor((diffInMilliseconds % millisecondsInDay) / millisecondsInHour);
  const minutes = Math.floor((diffInMilliseconds % millisecondsInHour) / millisecondsInMinute);

  const formatNumber = (num) => (num < ZERO_LIMIT ? `0${num}` : num);

  if (days > 0) {
    return `${days}D ${formatNumber(hours)}H ${formatNumber(minutes)}M`;
  } else if (hours > 0) {
    return `${formatNumber(hours)}H ${formatNumber(minutes)}M`;
  } else {
    return `${formatNumber(minutes)}M`;
  }
}

function isFuturePoint(point) {
  return dayjs().isBefore(point.dateFrom, 'minute');
}

function isPresentPoint(point) {
  return dayjs(point.dateTo) && dayjs().isAfter(dayjs(point.dateTo), 'milliseconds');
}

function isPastPoint(point) {
  return point.dateTo && (
    dayjs().isSame(dayjs(point.dateFrom), 'minute') || dayjs().isAfter(point.dateTo, 'minute')
  );
}

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isFuturePoint),
  [FilterType.PRESENT]: (points) => points.filter(isPresentPoint),
  [FilterType.PAST]: (points) => points.filter(isPastPoint),
};

const updatePoint = (points, updatedPoint) => points.map((point) => (point.id === updatedPoint.id ? updatedPoint : point));

export {capitalizeFirstLetter, shufflePoints, dateValue, dateDateTime, dateContent, timeDateTime, timeContent, formatDuration, isFuturePoint, isPresentPoint, isPastPoint, filter, updatePoint};
