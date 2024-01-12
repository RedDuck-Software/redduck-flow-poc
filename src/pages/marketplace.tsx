import { memo } from 'react';

import { MarketplaceFlows } from '@/components/marketplace/marketplace-flows.tsx';

const Marketplace = memo(() => {
  return (
    <div className="container flex flex-col gap-8">
      <h1 className="text-4xl font-semibold">Marketplace</h1>
      <MarketplaceFlows />
    </div>
  );
});
Marketplace.displayName = 'Marketplace';

export default Marketplace;
