const { differenceInMilliseconds } = require('date-fns');

const formatDistance = (in_time, out_time) => {
  const result = differenceInMilliseconds(
    new Date(`${out_time}`),
    new Date(`${in_time}`)
  );

  const seconds = result / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;

  // format hours with 3 decimal places
  const formattedHours = hours.toFixed(3);

  // check if output is negative
  const output = formattedHours < 0 ? 0 : formattedHours;

  return output;
};

module.exports = { formatDistance };
