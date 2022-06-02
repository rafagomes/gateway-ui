import { Card, CardActions, CardHeader, CardMedia, Chip } from '@mui/material';

const GateAvatarCard = () => {
  return (
    <Card
      sx={{
        border: 1,
        borderColor: 'rgba(255,255,255,.12)',
      }}
    >
      <CardMedia
        sx={{
          aspectRatio: '1',
          borderBottom: 1,
          borderColor: 'rgba(255,255,255,.12)',
          width: (theme) => theme.spacing(37.75),
        }}
        component="img"
        src="https://images.unsplash.com/photo-1650943574955-ac02c65cfc71?w=500"
      />
      <CardHeader title={'Title'} subheader={'Lorem ipsum dolor sit amet'} />
      <CardActions>
        <Chip size="small" label={'Category'} />
      </CardActions>
    </Card>
  );
};

export default GateAvatarCard;
