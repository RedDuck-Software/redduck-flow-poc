import { useWeb3Modal } from '@web3modal/wagmi/react';
import { memo } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import { Button } from '@/components/ui/button';
import { shortenAddress } from '@/lib/shorten-address.ts';
import { validateAddress } from '@/lib/validate-address.ts';

export const WalletButton = memo(() => {
  const { address } = useAccount();
  const { open } = useWeb3Modal();
  const { chain } = useNetwork();

  if (validateAddress(address)) {
    if (!!chain && chain.unsupported) {
      return (
        <Button
          variant="destructive"
          onClick={() => open({ view: 'Networks' })}
        >
          Wrong Network
        </Button>
      );
    }

    return (
      <Button onClick={() => open({ view: 'Account' })}>
        {shortenAddress(address)}
      </Button>
    );
  }

  return (
    <Button onClick={() => open({ view: 'Connect' })}>Connect Wallet</Button>
  );
});
WalletButton.displayName = 'WalletButton';
