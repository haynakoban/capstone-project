import { format, isPast } from 'date-fns';

export const DateFormatter = (date) => {
  const d = new Date(`${date}`);

  return `${format(d, 'MMMM d, yyyy hh:mm a')}`;
};

export const TimeFormatter = (date) => {
  const d = new Date(`${date}`);

  // sample output: 12:30 PM
  return `${format(d, 'hh:mm a')}`;
};

export const DailyAttendanceDateFormatter = (date) => {
  const d = new Date(`${date}`);

  // sample output: 10-16-2022 or 02-04-2022
  return `${format(d, 'MM-dd-yyyy')}`;
};

export const MonthlyAttendanceDateFormatter = (date) => {
  const d = new Date(`${date}`);

  // sample output: 10 or 09
  return `${format(d, 'MM')}`;
};

export const isDatePast = (date) => {
  const d = new Date(`${date}`);

  return isPast(d);
};

export const DateToday = () => {
  const d = new Date();

  return `${format(d, 'MMMM d, yyyy')}`;
};
