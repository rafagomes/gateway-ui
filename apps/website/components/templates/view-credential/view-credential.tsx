import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useQuery } from 'react-query';

import { TOKENS } from '@gateway/theme';

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import IosShareIcon from '@mui/icons-material/IosShare';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
  Divider,
  Button,
  AvatarGroup,
} from '@mui/material';

import { ROUTES } from '../../../constants/routes';
import { gqlMethods } from '../../../services/api';
import HoldersModal from '../../organisms/holders-modal/holders-modal';

const DetailsFieldset = ({ children }) => (
  <fieldset
    style={{
      display: 'flex',
      border: 'none',
      marginBottom: '15px',
    }}
  >
    {children}
  </fieldset>
);

export function ViewCredentialTemplate({ credential }) {
  const session = useSession();
  const router = useRouter();

  const [holders, setHolders] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const showHolders = () => setOpen(true);
  const hideHolders = () => setOpen(false);

  const isIssuer = credential.issuer.id === session.data?.user.id;
  const details = credential.details;
  const accomplishments = credential.pow;
  const credentialImgUrl =
    'https://i.postimg.cc/6QJDW2r1/olympus-credential-picture.png';

  useQuery(
    [credential.id, 'get-holders'],
    () => {
      if (!session.data.user) return;
      return gqlMethods(session.data.user).get_credential_by_groupid({
        group_id: credential.group_id,
      });
    },
    {
      enabled: !!session.data?.user,
      onSuccess(data) {
        setHolders(data.credentials);
      },
    }
  );

  return (
    <Stack gap={6} p={TOKENS.CONTAINER_PX}>
      <HoldersModal open={open} handleClose={hideHolders} holders={holders} />
      <Box>
        <Image
          src="/favicon-512.png"
          alt="gateway-logo"
          height={40}
          width={40}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '40px',
          right: '50px',
          cursor: 'pointer',
        }}
      >
        <IosShareIcon style={{ marginRight: '15px' }} />
        <Button variant="outlined" onClick={() => router.push(ROUTES.PROFILE)}>
          Check profile
        </Button>
      </Box>
      <Typography
        variant="h5"
        sx={{
          display: 'block',
          color: '#fff',
          fontSize: '34px',
          marginBottom: '20px',
        }}
        ml={{ xs: '0px', md: '92px' }}
      >
        {credential?.target?.name} <br /> Proof of Credential
      </Typography>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="flex-start"
        gap={6}
      >
        {/* Credential details */}
        <Grid
          container
          direction={{ xs: 'column', md: 'row' }}
          sx={{ rowGap: '15px' }}
        >
          <Grid item xs={5}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ display: 'block', color: '#fff', fontSize: '24px' }}
              ml={{ xs: '0px', md: '92px' }}
            >
              Details
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: 'block', fontSize: '14px' }}
              ml={{ xs: '0px', md: '92px' }}
            >
              Basic Details of Credential
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Stack direction={{ xs: 'column', sm: 'row' }}>
              {/* TODO: Responsiveness */}
              <Image
                loader={() => credentialImgUrl}
                src={credentialImgUrl}
                height={389}
                width={389}
                alt="credential image"
                style={{ borderRadius: '5px' }}
              />
              <Box
                sx={{
                  position: 'relative',
                  minHeight: '300px',
                  marginTop: '10px',
                }}
                ml={{ xs: '0px', sm: '32px' }}
                minHeight={{ xs: '180px', md: '300px' }}
              >
                <Typography
                  variant="h6"
                  sx={{ marginBottom: '10px', fontSize: '34px' }}
                >
                  {credential.name}
                </Typography>
                <Chip label="Contributor" sx={{ marginBottom: '20px' }} />
                <Box>
                  <Typography variant="caption" sx={{ fontSize: '16px' }}>
                    {credential.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: '0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'baseline',
                  }}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    sx={{ marginBottom: '10px' }}
                  >
                    {holders?.length !== 0 && (
                      <Typography
                        sx={{
                          width: 'max-content',
                          fontSize: '14px',
                          marginRight: '30px',
                        }}
                        variant="caption"
                      >
                        Holders
                      </Typography>
                    )}
                    <AvatarGroup
                      spacing={15}
                      max={4}
                      onClick={() => showHolders()}
                      sx={{ cursor: 'pointer' }}
                    >
                      {holders?.map(({ target }, index) => {
                        const { name, username, pfp } = target;
                        const alt = `${name} ${username}`;
                        return <Avatar key={index} alt={alt} src={pfp} />;
                      })}
                    </AvatarGroup>
                  </Stack>
                  <Stack direction={'row'}>
                    <Typography
                      sx={{ width: 'max-content', fontSize: '14px' }}
                      variant="caption"
                    >
                      Created by
                    </Typography>
                    <Chip
                      avatar={
                        <Avatar alt="chip avatar" src={credential.issuer.pfp} />
                      }
                      label={credential.issuer.name}
                      sx={{ marginLeft: '10px' }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        {(credential.status === 'pending' || 'to_mint' || 'minted') &&
          details && <Divider light sx={{ width: '100%' }} />}
        {(credential.status === 'pending' || 'to_mint' || 'minted') && details && (
          // Your details
          <Grid
            container
            direction={{ xs: 'column', md: 'row' }}
            sx={{ rowGap: '15px' }}
          >
            <Grid item xs={5}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ display: 'block', color: '#fff', fontSize: '24px' }}
                ml={{ xs: '0px', md: '92px' }}
              >
                Your Details
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'block', fontSize: '14px' }}
                ml={{ xs: '0px', md: '92px' }}
              >
                Customize Your Credential
              </Typography>
            </Grid>
            <Grid item xs={4}>
              {details &&
                Object.keys(details).map(
                  (detailKey, index) =>
                    details[detailKey] && (
                      <DetailsFieldset key={index}>
                        <legend>{detailKey}</legend>
                        <Typography variant="h6" fontWeight="bold">
                          {details[detailKey]}
                        </Typography>
                      </DetailsFieldset>
                    )
                )}
            </Grid>
          </Grid>
        )}
        {(credential.status === 'pending' || 'to_mint' || 'minted') &&
          accomplishments && <Divider light sx={{ width: '100%' }} />}
        {(credential.status === 'pending' || 'to_mint' || 'minted') &&
          accomplishments && (
            <Grid
              container
              direction={{ xs: 'column', md: 'row' }}
              sx={{ rowGap: '15px' }}
            >
              {/* Proudest Accomplishments */}
              <Grid item xs={5}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ display: 'block', color: '#fff', fontSize: '24px' }}
                  ml={{ xs: '0px', md: '92px' }}
                >
                  Proudest Accomplishments
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ display: 'block', fontSize: '14px' }}
                  ml={{ xs: '0px', md: '92px' }}
                >
                  Tell the world about your greatest accomplishments and get it
                  verified!
                </Typography>
              </Grid>
              {accomplishments &&
                accomplishments.map((accomplishment, index) => (
                  <Grid item xs={4} key={index} sx={{ paddingLeft: '87px' }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <LooksOneIcon
                        style={{ marginLeft: '-40px', marginRight: '15px' }}
                      />
                      {accomplishment.title}
                    </Typography>
                    <Typography variant="caption">
                      {accomplishment.accomplishmentDescription}
                    </Typography>
                    <Box sx={{ marginTop: '30px' }}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        style={{ marginBottom: '20px', fontSize: '16px' }}
                      >
                        Proof of Work
                      </Typography>
                      <Box style={{ marginLeft: '0px', marginRight: '15px' }}>
                        <Typography
                          variant="subtitle2"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <ArticleIcon style={{ marginRight: '20px' }} />
                          {accomplishment.type}
                        </Typography>
                        <Typography
                          variant="caption"
                          style={{ marginLeft: '44px' }}
                        >
                          {accomplishment.description}
                        </Typography>
                        <br />
                        <Typography
                          variant="caption"
                          style={{ marginLeft: '44px' }}
                        >
                          {accomplishment.link}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          )}
        {(credential.status === 'to_complete' ||
          credential.status === undefined) &&
          !isIssuer && (
            <Button
              variant="contained"
              sx={{ margin: 'auto' }}
              onClick={() =>
                router.push(ROUTES.CREDENTIALS_EARN + credential.id)
              }
            >
              Complete Credential
            </Button>
          )}
      </Stack>
      <Box alignSelf="flex-end" marginRight="100px">
        {(credential.status === 'pending' || 'to_mint' || 'minted') && (
          <ArrowCircleUpIcon
            fontSize="large"
            onClick={() => window.scrollTo(0, 0)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </Box>
    </Stack>
  );
}
