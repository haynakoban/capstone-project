import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@mui/material/colors';

const avatarTheme = ({ name }) => {
  if (name === 'a') return yellow[700];
  if (name === 'b') return green[500];
  if (name === 'c') return pink[500];
  if (name === 'd') return blue[500];
  if (name === 'e') return purple[500];
  if (name === 'f') return red[500];
  if (name === 'g') return indigo[500];
  if (name === 'h') return deepPurple[500];
  if (name === 'i') return deepOrange[500];
  if (name === 'j') return lightBlue[500];
  if (name === 'k') return cyan[500];
  if (name === 'l') return teal[500];
  if (name === 'm') return lime[900];
  if (name === 'n') return amber[500];
  if (name === 'o') return grey[500];
  if (name === 'p') return blueGrey[500];
  if (name === 'q') return pink[700];
  if (name === 'r') return brown['A400'];
  if (name === 's') return grey['A700'];
  if (name === 't') return lightBlue[900];
  if (name === 'u') return blueGrey[900];
  if (name === 'v') return lightGreen[900];
  if (name === 'w') return brown[500];
  if (name === 'x') return red[800];
  if (name === 'y') return purple['A400'];
  return indigo['A700'];
};

export default avatarTheme;
