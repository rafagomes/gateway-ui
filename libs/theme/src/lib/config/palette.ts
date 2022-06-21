import type { PaletteOptions } from '@mui/material/styles/createPalette';

import brandColors from './colors';

const palette: PaletteOptions = {
  mode: 'dark',
  primary: {
    ...brandColors.purple,
  },
  secondary: {
    main: '#ffffff',
  },
  background: {
    default: brandColors.background.main,
    paper: brandColors.background.main,
  },
  text: {
    primary: brandColors.grays.main,
  },
};

export default palette;
