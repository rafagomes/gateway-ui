import { Button, CardActions, Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface CredentialCardProps {
  name: string;
  description: string;
  smaller?: boolean;
  claimable?: boolean;
  pending?: boolean;
  mintable?: boolean;
  isNFT?: boolean;
  earn?: () => void;
  mint?: () => void;
}

export default function CredentialCard({
  name,
  description,
  smaller,
  claimable,
  pending,
  mintable,
  isNFT,
  earn,
  mint,
}: CredentialCardProps) {
  return (
    <Card sx={{ maxWidth: smaller ? '250px' : '345px' }}>
      <CardMedia
        component="img"
        image="https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png"
        alt="credential image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" fontSize={20}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          padding: '0 10px',
        }}
      >
        <Chip label="Operations" />
        <Chip label="Contributor" />
        {pending && (
          <Chip
            label="Pending Approval"
            variant="outlined"
            sx={{ color: 'red', borderColor: 'red' }}
          />
        )}
        {isNFT && <Chip label="NFT" />}
      </CardContent>
      <CardActions>
        {claimable && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => earn()}
          >
            Complete credential
          </Button>
        )}
        {mintable && (
          <Button
            variant="contained"
            sx={{ width: '100%' }}
            onClick={() => mint()}
          >
            Mint free NFT
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
