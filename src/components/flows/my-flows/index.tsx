import { useAccount } from 'wagmi';

import { FlowCard } from '@/components/flows/flow-card.tsx';
import { CreateFlowCard } from '@/components/flows/my-flows/create-flow/create-flow-card.tsx';
import { WalletButton } from '@/components/wallet/wallet-button.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { selectFlowsByAuthor } from '@/store/selectors/flows.ts';

export const MyFlows = () => {
  const { address } = useAccount();
  const flows = useAppSelector(selectFlowsByAuthor(address));

  return address ? (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <CreateFlowCard />
      {flows.map(({ id, title, description, updatedAt }) => (
        <FlowCard
          key={id}
          id={id}
          title={title}
          description={description}
          updatedAt={updatedAt}
        />
      ))}
    </div>
  ) : (
    <div className="flex w-fit items-center gap-2">
      <div>Don't see your flows?</div>
      <WalletButton />
    </div>
  );
};
