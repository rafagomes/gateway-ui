import { Chip, TextField, Autocomplete } from '@mui/material';

/* A React component that is exported as a named export. */
export const WalletInput = ({ set, ...props }) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={[]}
      freeSolo
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip
            key={index}
            variant="filled"
            label={option}
            color={
              props.errors
                ?.map((error) => error.message || null)
                .includes(`${option} is not a valid wallet address`)
                ? 'error'
                : 'default'
            }
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Wallet Adressess"
          id="wallets"
          multiline
          {...props}
        />
      )}
      onChange={(event, wallets) => set(wallets)}
    />
  );
};

export default WalletInput;
