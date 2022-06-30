import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import { ViewCredentialTemplate } from '../../../../components/templates/view-credential';
import { gqlMethods } from '../../../../services/api';

interface CredentialInfoProps {
  id: string;
  group_id?: string;
  name: string;
  description: string;
  status?: string;
  image?: string;
  admin?: {
    id: string;
    name: string;
    pfp: string;
  };
  issuer?: {
    id: string;
    name: string;
    pfp: string;
  };
  target?: {
    name: string;
  };
}

export default function ViewCredential() {
  const router = useRouter();
  const session = useSession();

  const { credentialId } = router.query;

  const credential = useQuery(
    [credentialId, 'get-credential'],
    () => {
      if (!session.data.user) return;
      return gqlMethods(session.data.user).get_credential({
        credential_id: credentialId,
      });
    },
    {
      enabled: !!session.data?.user && !!credentialId,
      select: (data) => {
        const credentialInfo: CredentialInfoProps =
          data?.['credentials_by_pk'] ?? data?.['credential_group_by_pk'];

        return {
          id: credentialInfo.id,
          name: credentialInfo.name,
          description: credentialInfo.description,
          status: credentialInfo.status,
          group_id: credentialInfo.group_id || credentialInfo.id,
          image: credentialInfo.image,
          issuer: {
            id: credentialInfo?.admin?.id || credentialInfo?.issuer?.id,
            name: credentialInfo?.admin?.name || credentialInfo?.issuer?.name,
            pfp: credentialInfo?.admin?.pfp || credentialInfo?.issuer?.pfp,
          },
          target: {
            name: credentialInfo?.target?.name || '',
          },
        };
      },
    }
  );

  if (!credential.data) return null;

  return <ViewCredentialTemplate credential={credential.data} />;
}
