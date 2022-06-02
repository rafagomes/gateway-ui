import { TOKENS } from '@gateway/theme';

import { Box, Stack, Typography } from '@mui/material';

import { DashboardTemplate } from '../../components/templates/dashboard';
import GateAvatarCard from '../../components/templates/gate/gate-avatar-card';

export default function CreateGateway() {
  return (
    <DashboardTemplate
      showExplore={false}
      containerProps={{
        sx: {
          px: TOKENS.CONTAINER_PX,
          py: TOKENS.CONTAINER_PX,
          display: { xs: 'block', md: 'flex' },
        },
      }}
    >
      <Stack direction="column" gap={6}>
        <Typography variant="h4">Create Gate</Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={6}
        >
          <Box sx={{ width: '25%' }}>
            <Typography variant="h5">Details</Typography>
            <Typography variant="caption">
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>
          <Box sx={{ width: '25%' }}></Box>
          <GateAvatarCard />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={6}
        >
          <Box sx={{ width: '25%' }}>
            <Typography variant="h5">Tasks</Typography>
            <Typography variant="caption">
              Lorem ipsum dolor sit amet
            </Typography>
          </Box>
          <Box sx={{ width: '75%' }}></Box>
        </Stack>
      </Stack>
    </DashboardTemplate>
  );
}
