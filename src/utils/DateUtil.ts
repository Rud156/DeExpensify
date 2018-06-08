import moment, { Moment } from 'moment';

type DateType = Moment | Date | string;

export const formatHumanReadableDate = (date: DateType): string =>
  moment(date).format('ddd, MMM DD');

export const formatDateAgo = (date: DateType): string => moment(date).fromNow();

export const generateFormattedTime = (hour: string | number, minute: string | number): string =>
  `${hour}:${minute}`;

export const generateISODateString = (date: DateType): string => moment(date).format('YYYY-MM-DD');

export const isSameDate = (firstDate: DateType, secondDate: DateType): boolean => {
  const parsedFirstDate = moment(generateISODateString(firstDate));
  const parsedSecondDate = moment(generateISODateString(secondDate));

  return parsedFirstDate.isSame(parsedSecondDate);
};

export const isDateBefore = (firstDate: DateType, secondDate: DateType): boolean => {
  const parsedFirstDate = moment(generateISODateString(firstDate));
  const parsedSecondDate = moment(generateISODateString(secondDate));

  return parsedFirstDate.isBefore(parsedSecondDate);
};

export const isDateAfter = (firstDate: DateType, secondDate: DateType): boolean => {
  const parsedFirstDate = moment(generateISODateString(firstDate));
  const parsedSecondDate = moment(generateISODateString(secondDate));

  return parsedFirstDate.isAfter(parsedSecondDate);
};
