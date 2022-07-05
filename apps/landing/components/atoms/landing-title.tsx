import { PropsWithChildren } from 'react';

import Typography from '@mui/material/Typography';

export default function Title({ children }: PropsWithChildren<unknown>) {
  return (
    <Typography
      variant="h2"
      component="h2"
      sx={(theme) => ({
        textAlign: 'center',
        whiteSpace: 'pre-wrap',
        marginBottom: 2,
        [theme.breakpoints.down('md')]: {
          ...theme.typography.h3,
        },
        [theme.breakpoints.down('sm')]: {
          ...theme.typography.h4,
        },
      })}
    >
      {children}
    </Typography>
  );
}
