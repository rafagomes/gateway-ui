import useTranslation from 'next-translate/useTranslation';

import { useFormContext } from 'react-hook-form';

import {
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { NewUserSchema } from './schema';

type Props = {
  onSubmit: (data: NewUserSchema) => void;
  isLoading: boolean;
};

/*
  TODO: Change hardcoded text to translate
  TODO: Loading submit button
  TODO: Disable submit button on form error
  */

export function Form({ onSubmit, isLoading }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<NewUserSchema>();
  const { t } = useTranslation('dashboard-new-user');

  return (
    <Stack
      component="form"
      direction="column"
      gap={2}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        required
        label={t('form.fields.displayName.label')}
        id="name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        required
        label={t('form.fields.username.label')}
        id="username"
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        required
        label={t('form.fields.email.label')}
        type="email"
        id="email_address"
        {...register('email_address')}
        error={!!errors.email_address}
        helperText={errors.email_address?.message}
      />
      <Typography component="p" variant="caption">
        {t('form.fields.email.disclaimer')}
      </Typography>
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          t('form.submit.button')
        )}
      </Button>
    </Stack>
  );
}
