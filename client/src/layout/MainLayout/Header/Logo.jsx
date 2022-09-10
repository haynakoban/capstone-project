import logo from '../../../assets/sample/logo2_(bnb).png';
import { Link } from 'react-router-dom';

export default function Logo({ w }) {
  return (
    <Link to='/'>
      <img src={logo} alt='Train N Learn Logo' className='tnl_logo' width={w} />
    </Link>
  );
}
