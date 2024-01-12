import { memo } from 'react';

import { CreateFlowForm } from '@/components/flows/my-flows/create-flow/create-flow-form.tsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.tsx';

interface CreateFlowDialogProps {
  open?: boolean;
  onOpenChange: (open: boolean) => void;
}

const title = 'Create flow';
const description = 'All flows are stored on your device.';
export const CreateFlowDialog = memo(
  ({ open, onOpenChange }: CreateFlowDialogProps) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <CreateFlowForm onOpenChange={onOpenChange} />
        </DialogContent>
      </Dialog>
    );
  },
);
CreateFlowDialog.displayName = 'CreateFlowDialog';
