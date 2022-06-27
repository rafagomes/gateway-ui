import { useEffect } from 'react';

import { CeramicClient } from '@ceramicnetwork/http-client';
import { model as VCModel } from '@datamodels/verifiable-credentials';
import { ModelManager } from '@glazed/devtools';
import { useViewerConnection } from '@self.id/react';
import { EthereumAuthProvider } from '@self.id/web';
import { useAccount } from 'wagmi';

let aliases;

export const useCeramic = () => {
  const [connection, connect, disconnect] = useViewerConnection();
  const { data: account } = useAccount();

  // Ceramic
  const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com');

  // Glaze Devtools
  const manager = new ModelManager({ ceramic });
  manager.addJSONModel(VCModel);

  useEffect(() => {
    const init = async () => {
      if (connection.status !== 'connected') {
        const authProvider = new EthereumAuthProvider(
          window.ethereum,
          account.address
        );

        connect(authProvider);

        aliases = await manager.deploy();
      }
    };

    init();
  }, [connection.status]);

  return { ceramic, connection, disconnect, aliases, manager };
};

export default useCeramic;
