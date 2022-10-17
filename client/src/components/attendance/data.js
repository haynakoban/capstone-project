function createData(name, attendance_date, in_time, out_time, status) {
  return { name, attendance_date, in_time, out_time, status };
}

export const rows = [
  createData(
    'Gerald Tolentino',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData(
    'Bryan D. Cortez',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData(
    'Rizza Mia Servanda	',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData(
    'Allana Shane Baterina',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData('Xenon Vergara', '10/15/2022', '00:00', '00:00', 'Absent'),
  createData(
    'Iris Ysabel Bernabe',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData('Bien Enriquez', '10/15/2022', '00:00', '00:00 ', 'Absent'),
  createData(
    'Jerickson Tomajin',
    '10/17/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData(
    'Emil Andrei Aguimatang',
    '10/17/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData('Jeorge Agustin', '10/17/2022', '09:30 AM', '05:00 PM', 'Present'),
  createData(
    'Jeremy Laxamana',
    '10/16/2022',
    '09:30 AM',
    '05:00 PM',
    'Present'
  ),
  createData('Aaron Quesada', '10/17/2022', '09:30 AM', '05:00 PM', 'Present'),
  createData('Alvin Supan', '10/16/2022', '09:30 AM', '05:00 PM', 'Present'),
];

function createSummaryData(name, summary, completed, remaining) {
  return { name, summary, completed, remaining };
}

export const summaryData = [
  createSummaryData('Xenon Vergara', '300/460 Hours', '300 Hours', '160 Hours'),
  createSummaryData(
    'Gerald Tolentino',
    '100/460 Hours',
    '100 Hours',
    '360 Hours'
  ),
  createSummaryData('Aaron Quesada', '290/460 Hours', '290 Hours', '170 Hours'),
  createSummaryData('Alvin Supan', '310/460 Hours', '310 Hours', '150 Hours'),
  createSummaryData(
    'Jeorge Agustin',
    '300/460 Hours',
    '300 Hours',
    '160 Hours'
  ),
  createSummaryData('Bien Enriquez', '305/460 Hours', '305 Hours', '155 Hours'),
  createSummaryData(
    'Bryan D. Cortez',
    '200/460 Hours',
    '200 Hours',
    '260 Hours'
  ),
];

// function createMonthlyData(day, status, name = 'Gerald') {
//   return {
//     name,
//     dateToday: day,
//     status,
//   };
// }

// export const monthlyRows = [
//   createMonthlyData(1, 'Present'),
//   createMonthlyData(2, 'Present'),
//   createMonthlyData(3, 'Absent'),
//   createMonthlyData(4, 'Present'),
//   createMonthlyData(5, 'Saturday'),
//   createMonthlyData(6, 'Sunday'),
//   createMonthlyData(7, 'Present'),
//   createMonthlyData(8, 'Present'),
//   createMonthlyData(9, 'Present'),
//   createMonthlyData(10, 'Present'),
//   createMonthlyData(11, 'Present'),
//   createMonthlyData(12, 'Saturday'),
//   createMonthlyData(13, 'Sunday'),
//   createMonthlyData(14, 'Absent'),
//   createMonthlyData(15, 'Present'),
//   createMonthlyData(16, 'Present'),
//   createMonthlyData(17, 'Present'),
//   createMonthlyData(18, 'Present'),
//   createMonthlyData(19, 'Saturday'),
//   createMonthlyData(20, 'Sunday'),
//   createMonthlyData(21, 'Present'),
//   createMonthlyData(22, 'Present'),
//   createMonthlyData(23, 'Present'),
//   createMonthlyData(24, 'Present'),
//   createMonthlyData(25, 'Present'),
//   createMonthlyData(26, 'Saturday'),
//   createMonthlyData(27, 'Sunday'),
//   createMonthlyData(28, 'Present'),
//   createMonthlyData(29, 'Present'),
//   createMonthlyData(30, 'Present'),
//   createMonthlyData(31, 'Present'),
// ];
