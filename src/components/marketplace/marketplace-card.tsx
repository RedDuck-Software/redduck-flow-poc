import { Rating } from '@smastrom/react-rating';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';

import { Badge } from '@/components/ui/badge.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { dateDistance } from '@/lib/dateDistance.ts';
import { ratingItemStyles } from '@/lib/ratingItemStyles.ts';
import { type Flow } from '@/store/entities/flow.ts';
import { useAppSelector } from '@/store/hooks.ts';
import { selectFlowById } from '@/store/selectors/flows.ts';

interface MarketplaceCardProps extends Pick<Flow, 'id'> {}

export const MarketplaceCard = memo(({ id }: MarketplaceCardProps) => {
  const { address } = useAccount();
  const flow = useAppSelector(selectFlowById(id));

  if (!flow) return null;

  const { title, updatedAt, description, author } = flow;

  return (
    <Link to={`/marketplace/${id}`}>
      <Card className="min-h-[200px] cursor-pointer transition-all hover:scale-105">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div>{title}</div>
            {address && address.toLowerCase() === author.toLowerCase() && (
              <Badge variant="secondary">MY</Badge>
            )}
          </CardTitle>
          <CardDescription>Updated: {dateDistance(updatedAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{description}</p>
        </CardContent>
        <CardFooter>
          <Rating
            className="w-[50%]"
            value={3.5}
            readOnly={true}
            itemStyles={ratingItemStyles}
          />
        </CardFooter>
      </Card>
    </Link>
  );
});
MarketplaceCard.displayName = 'MarketplaceCard';
