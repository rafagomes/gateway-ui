import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close'
import { Credentials } from '../../../services/graphql/types.generated';
import CredentialCard from '../../molecules/credential-card';

/* It's a style object that is used to position the modal in the center of the screen. */
const style = {
  position: 'absolute' as const,
  top: '60%',
  left: '50%',
  minWidth: '100%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 3,
  marginTop: '-80px',
};

/* It's defining the props that the modal will take. */
interface ModalProps {
  open: boolean;
  credential: Credentials | null;
  subsidised?: boolean;
  handleClose: () => void;
}

export default function PocModalMinted({
  open,
  credential,
  subsidised = false,
  handleClose,
}: ModalProps) {
  const router = useRouter();

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
              color:"#fff",
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "64px"
            }}
          >
            <CloseIcon />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: '90vh',
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
                Congrats your work is verified and on-chain.{' '}
              </Typography>
              {subsidised && (
                <Typography
                  id="modal-modal-description"
                  sx={{ mb: 1, textAlign: 'center', marginBottom: '20px' }}
                  fontSize={16}
                >
                  Your NFT has been minted at cost free subsidized by{' '}
                  <span style={{ color: '#D083FF' }}>Gateway</span> .
                </Typography>
              )}
            </Box>
            <CredentialCard
              name={credential?.name}
              description={credential?.description}
            />
            <Button
              variant="outlined"
              size="small"
              sx={{ margin: '20px 0 0 20px' }}
              onClick={() => {
                handleClose();
                router.push('/profile');
              }}
            >
              Back to Profile
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
