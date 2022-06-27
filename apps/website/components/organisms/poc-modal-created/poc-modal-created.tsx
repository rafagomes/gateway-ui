import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { AiOutlineCopy } from 'react-icons/ai';
import { useQuery } from 'react-query';

import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import { useSnackbar } from '../../../hooks/use-snackbar';
import { gqlMethods } from '../../../services/api';
import CredentialCard from '../../molecules/credential-card';

const style = {
  position: 'absolute' as const,
  top: '60%',
  left: '50%',
  minWidth: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 3,
  marginTop: '-100px',
};

export default function PocModalCreated({
  credentialGroupId,
  open,
  handleClose,
}) {
  const [credential, setCredential] = useState({
    name: '',
    description: '',
  });

  const session = useSession();
  const router = useRouter();
  const snackbar = useSnackbar();

  const { refetch: getCredentialGroup } = useQuery(
    ['get-credential-group'],
    () => {
      if (!session.data.user) return;
      return gqlMethods(session.data.user).get_credential_group_info({
        credentialId: credentialGroupId,
      });
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (open) {
      getCredentialGroup().then((result) =>
        setCredential({
          name: result.data.credential_group_by_pk.name,
          description: result.data.credential_group_by_pk.description,
        })
      );
    }
  }, [open, credentialGroupId, getCredentialGroup]);

  return (
    <div>
      {/* TODO: Add dialog before making the modal appear */}
      {/* TODO: Modal doesn't scroll when window is not full screen */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Image
            src="/favicon-512.png"
            alt="gateway-logo"
            height={40}
            width={40}
          />
          <IconButton
            aria-label="close"
            onClick={() => router.push('/profile')}
            sx={{
              position: 'absolute',
              right: 20,
              top: 25,
              color: '#fff',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '64px',
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              alignItems: 'center',
              minHeight: '80vh',
            }}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                fontSize={35}
                textAlign="center"
              >
                Proof of Credential created
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mb: 1, textAlign: 'center' }}
                fontSize={16}
              >
                You have created the{' '}
                <span style={{ color: '#D083FF' }}>{credential.name}</span>{' '}
                credential.
              </Typography>
            </Box>
            <CredentialCard
              name={credential.name}
              description={credential.description}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <fieldset
                style={{
                  display: 'flex',
                  border: '1px solid white',
                  borderRadius: '20px',
                }}
              >
                <legend>Share</legend>
                {'poc.mygateway.xyz/credentials/claim/' + credentialGroupId}
                <AiOutlineCopy
                  size={24}
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      'poc.mygateway.xyz/credentials/claim/' + credentialGroupId
                    );
                    snackbar.onOpen({
                      message: 'URL copied to clipboard!',
                    });
                  }}
                />
              </fieldset>
              <Button
                variant="outlined"
                size="small"
                sx={{ margin: '10px 0 0 20px' }}
                onClick={() => router.push('/profile')}
              >
                Go to credentials
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{
          vertical: snackbar.vertical,
          horizontal: snackbar.horizontal,
        }}
        open={snackbar.open}
        onClose={snackbar.handleClose}
        autoHideDuration={3000}
        key={snackbar.vertical + snackbar.horizontal}
      >
        <Alert
          onClose={snackbar.handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
