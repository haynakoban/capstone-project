const {
  differenceInMilliseconds,
  getHours,
  getMinutes,
  getSeconds,
  getMilliseconds,
  hoursToMilliseconds,
  secondsToMilliseconds,
  minutesToMilliseconds,
} = require('date-fns');

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

const isStartAndEndTime = (startTime, inTime, endTime) => {
  const d1 = new Date(`${startTime}`);
  const d2 = new Date(`${inTime}`);
  const d3 = new Date(`${endTime}`);

  const hrs_1 = getHours(d1);
  const hrs_2 = getHours(d2);
  const hrs_3 = getHours(d3);

  const mins_1 = getMinutes(d1);
  const mins_2 = getMinutes(d2);
  const mins_3 = getMinutes(d3);

  const secs_1 = getSeconds(d1);
  const secs_2 = getSeconds(d2);
  const secs_3 = getSeconds(d3);

  const htm_1 = hoursToMilliseconds(hrs_1);
  const htm_2 = hoursToMilliseconds(hrs_2);
  const htm_3 = hoursToMilliseconds(hrs_3);

  const mtm_1 = minutesToMilliseconds(mins_1);
  const mtm_2 = minutesToMilliseconds(mins_2);
  const mtm_3 = minutesToMilliseconds(mins_3);

  const stm_1 = secondsToMilliseconds(secs_1);
  const stm_2 = secondsToMilliseconds(secs_2);
  const stm_3 = secondsToMilliseconds(secs_3);

  const mill_1 = getMilliseconds(d1);
  const mill_2 = getMilliseconds(d2);
  const mill_3 = getMilliseconds(d3);

  const result_1 = htm_1 + mtm_1 + stm_1 + mill_1;
  const result_2 = htm_2 + mtm_2 + stm_2 + mill_2;
  const result_3 = htm_3 + mtm_3 + stm_3 + mill_3;

  // start time 8
  // in time 10
  // end time 17
  // if (start time > in time && end time < in time) true
  if (result_1 <= result_2 && result_3 >= result_2) return true;

  return false;
};

module.exports = { formatDistance, isStartAndEndTime };
