import dayjs from 'dayjs';
import { ZERO_LIMIT } from './const';

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

export {capitalizeFirstLetter, shufflePoints, dateValue, dateDateTime, dateContent, timeDateTime, timeContent, formatDuration};
