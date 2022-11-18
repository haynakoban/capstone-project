import { Container } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AdminLayout from '../../layout/AdminLayout';
import UsersCard from './UsersCard';
import {
  getCompanies,
  getInterns,
  getUsers,
} from '../../features/users/usersSlice';

const AdminDashboardPage = () => {
  const dispatch = useDispatch();

  const interns = useSelector(getInterns);
  const companies = useSelector(getCompanies);

  useEffect(() => {
    dispatch(getUsers({ type: false }));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUsers({ type: true }));
  }, [dispatch]);

  return (
    <AdminLayout>
      <Container
        maxWidth='md'
        disableGutters
        sx={{
          marginLeft: 0,
          width: {
            xs: '100%',
            sm: '100%',
            md: 'calc(100% - 380px)',
          },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'center', sm: 'flex-start' },
          justifyContent: 'space-between',
          '& > div:first-of-type': {
            mr: { xs: 0, sm: 1.5 },
            mb: { xs: 3, sm: 0 },
          },
          '& > div:last-child': {
            ml: { xs: 0, sm: 1.5 },
          },
        }}
      >
        <UsersCard
          type='Interns'
          route='interns'
          members={interns?.slice(0, 5)}
          sum={interns?.length}
        />

        <UsersCard
          type='Companies'
          route='companies'
          members={companies?.slice(0, 5)}
          sum={companies?.length}
        />
      </Container>
    </AdminLayout>
  );
};
export default AdminDashboardPage;
