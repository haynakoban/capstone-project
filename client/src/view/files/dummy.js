import { Link } from '@mui/material';

export const _files = [
  <Link underline='hover' key='1' color='inherit' sx={{ cursor: 'pointer' }}>
    Documents
  </Link>,
  <Link underline='hover' key='2' color='inherit' sx={{ cursor: 'pointer' }}>
    General
  </Link>,
  <Link
    key='3'
    color='text.primary'
    underline='hover'
    sx={{ cursor: 'pointer' }}
    onClick={() => console.log('clicked')}
  >
    2022 Back-end Development
  </Link>,
  <Link
    key='3'
    color='text.primary'
    underline='hover'
    sx={{ cursor: 'pointer' }}
    onClick={() => console.log('clicked')}
  >
    Breadcrumb
  </Link>,
];

function createData(filname, dateModified, modifiedBy, isFolder) {
  return { filname, dateModified, modifiedBy, isFolder };
}

export const rows = [
  createData("Dev's Folder", 'September 10, 2022', 'Rizza Mia Servanda', true),
  createData(
    'Multimedia Folder',
    'September 10, 2022',
    'Rizza Mia Servanda',
    true
  ),
  createData('Memes Folder', 'September 10, 2022', 'Rizza Mia Servanda', true),
  createData('ReadMe.md', 'September 10, 2022', 'Rizza Mia Servanda', false),
  createData('Games Folder', 'September 10, 2022', 'Rizza Mia Servanda', true),
  createData(
    'Database Folder',
    'September 10, 2022',
    'Rizza Mia Servanda',
    true
  ),
  createData('Program.java', 'September 10, 2022', 'Rizza Mia Servanda', false),
];

export const headCells = [
  {
    id: 'name',
    isFileName: true,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'date-modified',
    isFileName: false,
    disablePadding: false,
    label: 'Date Modified',
  },
  {
    id: 'modified by',
    isFileName: false,
    disablePadding: false,
    label: 'Modified By',
  },
];
