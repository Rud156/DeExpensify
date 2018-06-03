import moment, { Moment } from 'moment';

export const generateDateString = (date: Moment | Date): string =>
  moment(date).format('YYYY-MM-DD');

export const isSameDate = (date: Moment | Date) => {};
