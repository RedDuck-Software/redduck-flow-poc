import { memo } from 'react';

import { MarketplaceCard } from '@/components/marketplace/marketplace-card.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { selectAllFlows } from '@/store/selectors/flows.ts';

export const MarketplaceFlows = memo(() => {
  const flows = useAppSelector(selectAllFlows);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {flows.map(({ id }) => (
        <MarketplaceCard key={id} id={id} />
      ))}
    </div>
  );
});
MarketplaceFlows.displayName = 'MarketplaceFlows';
