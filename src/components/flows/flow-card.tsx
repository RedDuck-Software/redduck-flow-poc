import { Loader2, MoreVertical, Trash2 } from 'lucide-react';
import { type MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { dateDistance } from '@/lib/dateDistance.ts';
import { deleteFlow } from '@/store/actions/flows.ts';
import { type Flow } from '@/store/entities/flow.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectIsDeletingFlow } from '@/store/selectors/flows.ts';

interface FlowCardProps
  extends Pick<Flow, 'title' | 'description' | 'updatedAt' | 'id'> {}

export const FlowCard = ({
  title,
  description,
  updatedAt,
  id,
}: FlowCardProps) => {
  const isDeleting = useAppSelector(selectIsDeletingFlow);
  const dispatch = useAppDispatch();

  const onDeleteFlow = useCallback(
    async (e: MouseEvent) => {
      e.preventDefault();
      try {
        await dispatch(deleteFlow({ id }));
        toast.success('Successfully deleted flow.');
      } catch (e) {
        toast.error('Error while deleting flow.');
      }
    },
    [dispatch, id],
  );

  return (
    <Link to={`/flows/${id}`}>
      <Card className="min-h-[200px] cursor-pointer transition-all hover:scale-105">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div>{title}</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onDeleteFlow} disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="mr-2 h-4 w-4" />
                  )}
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardTitle>
          <CardDescription>Updated: {dateDistance(updatedAt)}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
