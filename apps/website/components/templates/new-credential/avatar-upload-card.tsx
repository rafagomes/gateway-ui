import { useMemo } from 'react';

import { useFormContext } from 'react-hook-form';

import { showIfNotEmpty } from '@gateway/helpers';

import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Chip,
  Box,
} from '@mui/material';

import { ImageDropField } from '../../molecules/image-drop-field';
import { mockCategories } from './__mock__';
import { NewCredentialSchema } from './schema';

/* TODO: Drop image field */
/* TODO: Translate  */
export function AvatarUploadCard() {
  const { watch, control } = useFormContext<NewCredentialSchema>();

  const name = watch('name');
  const description = watch('description');
  const category = watch('category');

  const categoryLabel = useMemo(
    () => mockCategories.find(({ value }) => category === value)?.label,
    [category]
  );

  const ConnectedAvatarField = () => (
    <Box sx={{ aspectRatio: 1, paddingTop: '100%', position: 'relative' }}>
      <Box sx={{ position: 'absolute', inset: 0 }}>
        <ImageDropField
          withCrop
          control={control}
          name="image"
          label="Drop to upload your credential image"
        />
      </Box>
    </Box>
  );

  return (
    <Card
      sx={{
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
        order: { xs: '2', md: '3' },
        width: (theme) => theme.spacing(37.75),
      }}
    >
      {/*<CardMedia
        sx={{
          aspectRatio: '1',
          borderBottom: 1,
          borderColor: 'rgba(255,255,255,.12)',
          width: (theme) => theme.spacing(37.75),
        }}
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />*/}
      <CardMedia component={ConnectedAvatarField} />
      <CardHeader
        sx={{ wordBreak: 'break-word', maxWidth: '300px' }}
        title={showIfNotEmpty(name, 'Title')}
        subheader={showIfNotEmpty(description, 'Description')}
      />
      <CardActions>
        <Chip size="small" label={showIfNotEmpty(categoryLabel, 'Category')} />
      </CardActions>
    </Card>
  );
}
