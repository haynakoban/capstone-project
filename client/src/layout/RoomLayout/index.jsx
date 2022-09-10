import { Fragment } from 'react';
import Header from './Header';

const RoomLayout = ({ children }) => {
  return (
    <Fragment>
      <Header content={children} />
    </Fragment>
  );
};
export default RoomLayout;
