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

function createMonthlyData(name, summary, month) {
  return {
    name,
    summary,
    month,
    monthly: [
      {
        day: 1,
        status: 'Present',
      },
      {
        day: 2,
        status: 'Present',
      },
      {
        day: 3,
        status: 'Present',
      },
      {
        day: 4,
        status: 'Absent',
      },
      {
        day: 5,
        status: 'Present',
      },
      {
        day: 6,
        status: 'Absent',
      },
      {
        day: 8,
        status: 'Present',
      },
      {
        day: 9,
        status: 'Absent',
      },
      {
        day: 10,
        status: 'Present',
      },
      {
        day: 11,
        status: 'Present',
      },
      {
        day: 12,
        status: 'Present',
      },
      {
        day: 13,
        status: 'Present',
      },
      {
        day: 15,
        status: 'Present',
      },
      {
        day: 16,
        status: 'Present',
      },
      {
        day: 17,
        status: 'Present',
      },
      {
        day: 18,
        status: 'Present',
      },
      {
        day: 19,
        status: 'Present',
      },
      {
        day: 20,
        status: 'Present',
      },
      {
        day: 22,
        status: 'Present',
      },
      {
        day: 23,
        status: 'Present',
      },
      {
        day: 24,
        status: 'Present',
      },
      {
        day: 25,
        status: 'Present',
      },
      {
        day: 26,
        status: 'Present',
      },
      {
        day: 28,
        status: 'Present',
      },
      {
        day: 29,
        status: 'Absent',
      },
      {
        day: 30,
        status: 'Present',
      },
      {
        day: 31,
        status: 'Present',
      },
    ],
  };
}

export const monthlyRows = [
  createMonthlyData('Gerald Tolentino', '24/28', 'October'),
  createMonthlyData('Abner Macapagal', '24/28', 'October'),
  createMonthlyData('Bogart Macapinlac', '24/28', 'October'),
  createMonthlyData('Bryan Cortez', '24/28', 'October'),
  createMonthlyData('Rizza Mia Servanda', '24/28', 'October'),
  createMonthlyData('Thea Mae Rirao', '24/28', 'October'),
  createMonthlyData('Xenon Vergara', '24/28', 'October'),
  createMonthlyData('Allana Shane Baterina', '24/28', 'October'),
  createMonthlyData('Jeremy Roie Laxamana', '24/28', 'October'),
  createMonthlyData('Aaron Joshua Quesada', '24/28', 'October'),
];
