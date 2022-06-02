import BlurCircularIcon from '@mui/icons-material/BlurCircular'; // note: placeholder icon for token
import { Stack, Typography } from '@mui/material';

export default function HoldToken() {
  return (
    <Stack direction={'column'}>
      <BlurCircularIcon />
      <Typography variant="button">HOLD TOKEN</Typography>
    </Stack>
  );
}
