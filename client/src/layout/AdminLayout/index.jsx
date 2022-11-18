import { Fragment } from 'react';
import Header from './Header';

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <Header content={children} />
    </Fragment>
  );
};
export default AdminLayout;
