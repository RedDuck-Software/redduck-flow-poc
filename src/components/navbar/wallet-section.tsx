import { memo } from 'react';
import { useAccount } from 'wagmi';

import { Blockies } from '@/components/wallet/blockies';
import { WalletButton } from '@/components/wallet/wallet-button.tsx';
import { cn } from '@/lib/utils.ts';

interface WalletSectionProps {
  className?: string;
}

export const WalletSection = memo(({ className }: WalletSectionProps) => {
  const { address } = useAccount();

  return (
    <div className={cn('hidden items-center gap-2 lg:flex', className)}>
      <Blockies address={address} />
      <WalletButton />
    </div>
  );
});
WalletSection.displayName = 'WalletSection';
