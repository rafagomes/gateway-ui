import MUIGlobalStyles from '@mui/material/GlobalStyles';

export const GlobalStyles = () => (
  <MUIGlobalStyles
    styles={{
      'html, body': {
        height: '100%',
      },
      body: {
        padding: 0,
      },
      '&:-webkit-autofill': {
        transitionDelay: '9999s',
      },
    }}
  />
);
