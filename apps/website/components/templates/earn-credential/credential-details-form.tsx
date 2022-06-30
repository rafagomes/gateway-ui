import * as React from 'react';

import { useFormContext } from 'react-hook-form';

import {
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//date picker components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { mockLevels } from './__mock__';

export function CredentialDetailsForm() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack direction="column" gap={2}>
        {/* Role */}
        <TextField
          required
          label="Role"
          id="role"
          {...register('role')}
          error={!!errors.role}
          helperText={errors.role?.message}
        />
        {/* Level of commitment */}
        <FormControl fullWidth>
          <InputLabel htmlFor="commitmentLevel">Level of commitment</InputLabel>
          <Select
            id="commitmentLevel"
            label="Level of commitment"
            {...register('commitmentLevel')}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {mockLevels.map((level) => (
              <MenuItem key={level.value} value={level.value}>
                {level.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Typography
          variant="caption"
          sx={{ textTransform: 'uppercase', display: 'block' }}
        >
          Time period of contribution
        </Typography>
        {/* Start and end dates */}
        <DatePicker
          disableFuture
          label="Start date"
          inputFormat="dd-MM-yyyy"
          openTo="year"
          views={['year', 'month', 'day']}
          value={watch('startDate')}
          onChange={(date) => {
            setValue('startDate', date);
          }}
          renderInput={(params) => (
            <TextField
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
              {...params}
            />
          )}
        />
        <DatePicker
          disablePast
          disabled={watch('isStillWorking')}
          label="End date"
          inputFormat="dd-MM-yyyy"
          openTo="year"
          views={['year', 'month', 'day']}
          onChange={(date) => {
            setValue('endDate', date);
          }}
          value={watch('endDate')}
          renderInput={(params) => (
            <TextField
              disabled={watch('isStillWorking')}
              id="endDate"
              error={!!errors.endDate}
              helperText={errors.endDate?.message}
              {...params}
            />
          )}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="isStillWorking"
              checked={watch('isStillWorking')}
              {...register('isStillWorking')}
            />
          }
          label="I'm currently working on this role"
        />
      </Stack>
    </LocalizationProvider>
  );
}
