import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/react';

import { DashboardTemplate } from '../../components/templates/dashboard';
import { ProfileTemplate } from '../../components/templates/profile';
import { gqlMethods } from '../../services/api';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.user) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
      props: {
        user: null,
      },
    };
  }

  const user = (await gqlMethods(session.user).get_new_user()).me;
  const adminPermissions = (
    await gqlMethods(session.user).get_admin_permissions()
  ).me.permissions;
  const isAdmin = adminPermissions.length > 0;

  const claimableCredentials = (
    await gqlMethods(session.user).get_claimable_credentials()
  ).me.claimable_credentials;
  const filteredClaimableCredentials = claimableCredentials.filter(
    (credential) => {
      return credential.id !== null;
    }
  ).map((credential) => ({
    ...credential,
    categories: [credential.category]
  }));

  const createdCredentials = (
    await gqlMethods(session.user).get_created_credentials({
      user_id: session.user.id,
    })
  )?.me?.credential_groups;

  return {
    props: {
      user,
      isAdmin,
      createdCredentials: createdCredentials || [],
      claimableCredentials: filteredClaimableCredentials,
    },
  };
};

export default function Profile({
  user,
  isAdmin,
  createdCredentials,
  claimableCredentials,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DashboardTemplate showExplore={false}>
      <ProfileTemplate
        user={user}
        isAdmin={isAdmin}
        createdCredentials={createdCredentials}
        claimableCredentials={claimableCredentials}
      />
    </DashboardTemplate>
  );
}
