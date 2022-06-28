import { PartialDeep } from 'type-fest';

import { TOKENS } from '@gateway/theme';

import { Avatar, Box, Chip, Stack, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Gates } from '../../../../../services/graphql/types.generated';
import { badgeProps } from '../../../../../utils/badge-props';

// TODO: make it generic
// TODO: Fix Gate name column width

type Props = {
  gates: PartialDeep<Gates>[];
};
export function TableView({ gates }: Props) {
  return (
    <TableContainer
      sx={{
        '& .MuiTableCell-root:first-of-type': {
          pl: TOKENS.CONTAINER_PX,
        },
        '& .MuiTableCell-root:last-of-type': {
          pr: TOKENS.CONTAINER_PX,
        },
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Gate</TableCell>
            <TableCell align="left">Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gates.map((gate) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={gate.id}>
                <TableCell>
                  <Stack alignItems="center" direction="row" gap={1}>
                    <Avatar variant="rounded" {...badgeProps(gate.badge)}>
                      {gate.gate_name?.[0]}
                    </Avatar>
                    <Box>
                      <Typography>{gate.gate_name}</Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {gate.description}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" gap={1}>
                    {gate.categories?.map((category) => (
                      <Chip
                        key={`gate-${gate.id}-category-${category}`}
                        label={category}
                      />
                    ))}
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
