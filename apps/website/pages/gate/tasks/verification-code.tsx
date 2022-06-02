import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Stack, Typography } from '@mui/material';

export default function VerificationCode() {
  return (
    <Stack direction={'column'}>
      <VerifiedUserIcon />
      <Typography variant="button">VERIFICATION CODE</Typography>
    </Stack>
  );
}
