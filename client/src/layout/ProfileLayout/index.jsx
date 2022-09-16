import { Fragment } from 'react';
import Header from './Header';

const ProfileLayout = ({ children }) => {
  return (
    <Fragment>
      <Header content={children} />
    </Fragment>
  );
};
export default ProfileLayout;
