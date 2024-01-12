import { LucidePlus } from 'lucide-react';
import { useCallback, useState } from 'react';

import { CreateFlowDialog } from '@/components/flows/my-flows/create-flow/create-flow-dialog.tsx';
import { Card } from '@/components/ui/card.tsx';

export const CreateFlowCard = () => {
  const [isDialogOpened, setIsDialogOpened] = useState(false);

  const onCreateFlowCardClick = useCallback(() => setIsDialogOpened(true), []);

  return (
    <>
      <CreateFlowDialog
        open={isDialogOpened}
        onOpenChange={setIsDialogOpened}
      />
      <Card
        className="group flex min-h-[200px] cursor-pointer items-center justify-center transition-all hover:scale-105"
        onClick={onCreateFlowCardClick}
      >
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border border-card-foreground transition-all group-hover:border-card group-hover:bg-card-foreground group-hover:text-card">
          <LucidePlus />
        </div>
      </Card>
    </>
  );
};
