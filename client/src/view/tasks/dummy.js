import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

export const pendingTasks = [
  {
    id: 4,
    assignedBy: 'Elon Mush',
    text: 'Task 4: Use API',
    status: <RadioButtonUncheckedIcon />,
    date: {
      due: 'September 12, 2022 - 06:00 PM',
      closes: 'September 13, 2022 - 06:00 PM',
    },
  },
  {
    id: 5,
    assignedBy: 'Pill Gates',
    text: 'Task 5: NodeJS and ExpressJS',
    status: <RadioButtonUncheckedIcon />,
    date: {
      due: 'November 12, 2022 - 06:00 PM',
      closes: 'November 13, 2022 - 06:00 PM',
    },
  },
  {
    id: 6,
    assignedBy: 'Rizza Mia Servanda',
    text: 'Task 6: Firebase',
    status: <RadioButtonUncheckedIcon />,
    date: {
      due: 'December 01, 2022 - 06:00 PM',
      closes: 'December 02, 2022 - 06:00 PM',
    },
  },
  {
    id: 7,
    assignedBy: 'Thea Mae Rirao',
    text: 'Task 7: Deploy App',
    status: <RadioButtonUncheckedIcon />,
    date: {
      due: 'January 21, 2023 - 06:00 PM',
      closes: 'January 22, 2023 - 06:00 PM',
    },
  },
];

export const completedTasks = [
  {
    id: 1,
    assignedBy: 'Thea Mae Rirao',
    text: 'Task 1: Tailwind CSS',
    status: <CheckCircleIcon color='primary' />,
    date: {
      due: 'January 21, 2022 - 06:00 PM',
      closes: 'January 22, 2022 - 06:00 PM',
    },
  },
  {
    id: 2,
    assignedBy: 'Thea Mae Rirao',
    text: 'Task 2: Boostrap CSS',
    status: <CheckCircleIcon color='primary' />,
    date: {
      due: 'March 21, 2022 - 06:00 PM',
      closes: 'March 22, 2022 - 06:00 PM',
    },
  },
  {
    id: 3,
    assignedBy: 'Thea Mae Rirao',
    text: 'Task 3: Vue & React Framework',
    status: <CheckCircleIcon color='primary' />,
    date: {
      due: 'May 21, 2022 - 06:00 PM',
      closes: 'May 22, 2022 - 06:00 PM',
    },
  },
];
