import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useAccount, useNetwork } from 'wagmi';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { WalletButton } from '@/components/wallet/wallet-button.tsx';
import { validateAddress } from '@/lib/validate-address.ts';
import { createFlow } from '@/store/actions/flows.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectIsCreatingFlow } from '@/store/selectors/flows.ts';

const createFlowSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  description: z.string().optional().default(''),
});

type CreateFlowSchema = z.infer<typeof createFlowSchema>;

interface CreateFlowFormProps {
  onOpenChange: (open: boolean) => void;
}

export const CreateFlowForm = ({ onOpenChange }: CreateFlowFormProps) => {
  const isCreating = useAppSelector(selectIsCreatingFlow);
  const dispatch = useAppDispatch();
  const { address } = useAccount();
  const { chain } = useNetwork();

  const form = useForm<CreateFlowSchema>({
    resolver: zodResolver(createFlowSchema),
    defaultValues: {
      description: '',
    },
  });

  const onSubmit = useCallback(
    async (data: CreateFlowSchema) => {
      if (validateAddress(address) && !isCreating) {
        try {
          await dispatch(createFlow({ author: address, ...data }));
          onOpenChange(false);
          toast('Successfully created flow.');
        } catch (e) {
          console.error(e);
          toast.error('Error while creating flow.');
        }
      }
    },
    [address, dispatch, isCreating, onOpenChange],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title*</FormLabel>
              <FormControl>
                <Input placeholder="My flow" {...field} />
              </FormControl>
              <FormDescription>This is the name of your flow.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="My flow description" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your flow.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          {validateAddress(address) && !!chain && !chain.unsupported ? (
            <Button type="submit" disabled={isCreating}>
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
          ) : (
            <WalletButton />
          )}
        </div>
      </form>
    </Form>
  );
};
