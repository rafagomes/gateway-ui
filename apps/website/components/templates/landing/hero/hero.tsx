import dynamic from 'next/dynamic';

import { TOKENS } from '@gateway/theme';
import { MotionBox } from '@gateway/ui';

import { ArrowDownward } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

import BackgroundImage from '../../../../public/images/hero-background.png';
import { HeroBackground } from './styles';
import { HeroProps } from './types';
const Title = dynamic(() => import('../title'));

export function Hero({
  enterButton,
  title,
  subtitle,
  titleDescription,
}: HeroProps): JSX.Element {
  return (
    <Box component="section" sx={{ height: '100%', width: '100%' }}>
      <Stack
        direction="column"
        sx={{ flex: 1, width: '100%', px: TOKENS.CONTAINER_PX }}
      >
        <MotionBox
          sx={{
            display: 'flex',
            position: 'absolute',
            flexDirection: 'column',
            alignItems: 'flex-start',
            zIndex: 2,
            top: (theme) => theme.spacing(14),
          }}
          initial={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            ease: 'easeOut',
            duration: 0.75,
            opacity: { duration: 0.5 },
          }}
        >
          <Title>
            <Typography
              component="span"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                display: 'block',
                fontSize: 'inherit',
                fontWeight: 'inherit',
                lineHeight: 'inherit',
              })}
            >
              {title}
            </Typography>
            {subtitle}
          </Title>
          <Typography
            component="h2"
            variant="subtitle1"
            sx={(theme) => ({
              color: theme.palette.secondary.main,
              marginTop: '34px',
              maxWidth: '338px',
            })}
          >
            {titleDescription}
          </Typography>
          {enterButton}
          <Button
            variant="outlined"
            sx={{ borderRadius: '50%', padding: '20px' }}
          >
            <ArrowDownward />
          </Button>
        </MotionBox>
      </Stack>
      <MotionBox
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          ease: 'easeOut',
          duration: 1,
          opacity: { duration: 0.5 },
        }}
        sx={{
          width: '61%',
          height: '86%',
          position: 'absolute',
          bottom: '0',
          right: '0',
        }}
      >
        <HeroBackground
          src={BackgroundImage}
          layout="raw"
          sizes={'(max-width: 768px) 50%, 100%'}
          alt="Gateway's background with people joining the network"
        />
      </MotionBox>
    </Box>
  );
}
