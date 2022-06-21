import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useQuery } from 'react-query';

import { EarnCredentialTemplate } from '../../../../components/templates/earn-credential';
import { gqlMethods } from '../../../../services/api';

export default function EarnCredential() {
  const router = useRouter();
  const session = useSession();

  const { credentialId } = router.query;

  const credentialQuery = useQuery(
    ['get-credential'],
    () => {
      if (!session.data.user) return;
      return gqlMethods(session.data.user).get_credential({
        credential_id: credentialId,
      });
    },
    {
      enabled: !!session.data?.user,
    }
  );

  return <EarnCredentialTemplate credentialInfo={credentialQuery.data} />;
}
