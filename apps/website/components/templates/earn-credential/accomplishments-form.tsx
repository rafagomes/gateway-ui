import { useFieldArray, useFormContext } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Avatar,
  Stack,
  TextField,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  IconButton,
  Button,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { mockTypes } from './__mock__';
import { AccomplishmentsTypes } from './accomplishments-schema';

type Props = {
  accomplishmentId: number;
  onDelete: (index: number) => void;
};

export function AccomplishmentsForm({ accomplishmentId, onDelete }: Props) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: `accomplishments.${accomplishmentId}.pow`,
  });

  return (
    <Card
      sx={{
        mb: 4,
      }}
    >
      <CardHeader
        disableTypography
        avatar={
          <Avatar sx={{ bgcolor: 'white', color: 'black' }}>
            {accomplishmentId + 1}
          </Avatar>
        }
        title={
          <TextField
            required
            variant="standard"
            label="Accomplishment Title"
            sx={{
              width: 300,
            }}
            {...register(`accomplishments.${accomplishmentId}.title`)}
            error={!!errors.accomplishment_title}
            helperText={errors.accomplishment_title?.message}
          />
        }
        sx={{
          padding: 6,
          paddingBottom: 0,
        }}
        action={
          <IconButton onClick={() => onDelete(accomplishmentId)}>
            <DeleteIcon />
          </IconButton>
        }
      />
      {/* Title */}

      <CardContent
        sx={{
          padding: 6,
        }}
      >
        {/* Accomplishment Description */}
        <TextField
          required
          label="Accomplishment Description"
          multiline
          minRows={4}
          sx={{
            width: '100%',
          }}
          {...register(`accomplishments.${accomplishmentId}.description`)}
          error={!!errors.accomplishment_description}
          helperText={errors.accomplishment_description?.message}
        />
        {/* Proof of work text*/}

        {fields.map((field, index) => {
          return (
            <Box
              key={field.id}
              sx={{
                marginTop: 4,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    mb: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    Proof of Work
                  </Typography>
                  <Typography variant="caption" color="secondary">
                    Showcase your work related to this accomplishment
                  </Typography>
                </Box>
                <IconButton size="small" onClick={() => remove(index)}>
                  X
                </IconButton>
              </Box>
              {/* Proof of Work: Type */}
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr',
                  columnGap: '15px',
                }}
              >
                <FormControl
                  fullWidth
                  sx={{
                    mb: 2,
                  }}
                >
                  <InputLabel variant="outlined" htmlFor="pow_type">
                    Type
                  </InputLabel>
                  <Select
                    label="Type"
                    {...register(
                      `accomplishments.${accomplishmentId}.pow.${index}.pow_type`
                    )}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {mockTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {/* Proof of Work: Link */}
                <TextField
                  required
                  label="Link"
                  id="pow_link"
                  {...register(
                    `accomplishments.${accomplishmentId}.pow.${index}.pow_link`
                  )}
                  error={!!errors.pow?.[index]?.pow_link}
                  helperText={errors.pow?.[index]?.pow_link?.message}
                />
              </Box>
              {/* Proof of Work: Description */}
              <TextField
                required
                label="Description"
                id="pow_description"
                sx={{
                  width: '100%',
                }}
                multiline
                minRows={4}
                {...register(
                  `accomplishments.${accomplishmentId}.pow.${index}.pow_description`
                )}
                error={!!errors.pow?.[index]?.pow_description}
                helperText={errors.pow?.[index]?.pow_description?.message}
              />
            </Box>
          );
        })}
      </CardContent>

      <Divider />

      <CardActions
        sx={{
          paddingX: 6,
          paddingY: 4,
        }}
      >
        <Button
          variant="text"
          onClick={() =>
            append({
              pow_type: '',
              pow_link: '',
              pow_description: '',
            })
          }
        >
          Add more proof of work
        </Button>
      </CardActions>
    </Card>
  );
}
