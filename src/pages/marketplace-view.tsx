import { Rating } from '@smastrom/react-rating';
import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ratingItemStyles } from '@/lib/ratingItemStyles.ts';
import { NavigateToIndex } from '@/router/NavigateToIndex.tsx';
import { useAppSelector } from '@/store/hooks.ts';
import { selectFlowById } from '@/store/selectors/flows.ts';

const MarketplaceRating = memo(() => {
  const [isEditable] = useState(false);

  return (
    <Rating
      className="w-[200px]"
      value={3.5}
      readOnly={!isEditable}
      itemStyles={ratingItemStyles}
      onBlur={(e) => console.log('blur' + e)}
      onChange={() => console.log('change')}
      onFocus={(e) => console.log('focus' + e)}
      onHoverChange={(e) => console.log('hover change' + e)}
    />
  );
});
MarketplaceRating.displayName = 'MarketplaceRating';

const MarketplaceView = memo(() => {
  const { id } = useParams<{ id: string }>();
  const flow = useAppSelector(selectFlowById(id));

  if (!flow) {
    return <NavigateToIndex />;
  }

  return (
    <div className="container flex h-full flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold">{flow.title}</h1>
          <MarketplaceRating />
        </div>

        <h2 className="text-muted-foreground">
          Description: {flow.description}
        </h2>
      </div>
    </div>
  );
});
MarketplaceView.displayName = 'MarketplaceView';

export default MarketplaceView;
