import { format, isPast } from 'date-fns';

export const DateFormatter = (date) => {
  const d = new Date(`${date}`);

  return `${format(d, 'MMMM d, yyyy hh:mm a')}`;
};

export const isDatePast = (date) => {
  const d = new Date(`${date}`);

  return isPast(d);
};
