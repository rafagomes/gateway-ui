import QuizIcon from '@mui/icons-material/Quiz';
import { Stack, Typography } from '@mui/material';

export default function Quiz() {
  return (
    <Stack direction={'column'}>
      <QuizIcon />
      <Typography variant="button">CREATE QUIZ</Typography>
    </Stack>
  );
}
