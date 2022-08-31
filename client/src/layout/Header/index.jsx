import NavigationBar from './NavigationBar';

const routes = [
  {
    name: 'Internship',
    path: '/internship',
  },
  {
    name: 'Room',
    path: '/room',
  },
];

const authRoute = [
  {
    name: 'Log In',
    path: '/login',
  },
  {
    name: 'Sign Up',
    path: '/signup',
  },
];

const Header = () => {
  return <NavigationBar routes={routes} authRoute={authRoute} />;
};
export default Header;
