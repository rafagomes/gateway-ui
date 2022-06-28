import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { useConnect } from 'wagmi';

import CheckIcon from '@mui/icons-material/Check';
import {
  Button,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';

import { icons } from './wallet-modal';

type Props = {
  onSubmit: () => void;
};
export function WalletSelect({ onSubmit }: Props) {
  const { connect, connectors, activeConnector, isConnected } = useConnect();
  const { t } = useTranslation('index');

  const connectButtonLabel = useMemo(() => {
    if (!isConnected && !activeConnector) return t('connectWalletFirst');
    return t('connectWalletWith', { wallet: activeConnector.name });
  }, [activeConnector, isConnected]);

  return (
    <>
      <Stack alignItems="center" direction="row">
        <DialogTitle>{t('connectWallet')}</DialogTitle>
      </Stack>
      <List>
        {connectors.map((x) => (
          <ListItem key={x.id} disablePadding>
            <ListItemButton onClick={() => connect(x)}>
              <ListItemIcon>{icons[x.id]}</ListItemIcon>
              <ListItemText primary={x.name} />
              <CheckIcon
                color="primary"
                sx={{
                  ml: 4,
                  visibility:
                    x.id === activeConnector?.id ? 'visible' : 'hidden',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <DialogActions>
        <Button
          disabled={!isConnected}
          onClick={onSubmit}
          variant="contained"
          size="small"
          fullWidth
        >
          {connectButtonLabel}
        </Button>
      </DialogActions>
      {/* {error && <div>{error.message}</div>} */}
    </>
  );
}
