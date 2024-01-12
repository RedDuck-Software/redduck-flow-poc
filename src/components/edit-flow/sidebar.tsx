import { type DragEvent, memo, useCallback } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

export const Sidebar = memo(() => {
  const onDragStart = useCallback(
    (nodeType: string) => (event: DragEvent) => {
      event.dataTransfer.setData('application/reactflow', nodeType);
      event.dataTransfer.effectAllowed = 'move';
    },
    [],
  );

  return (
    <Card className="h-fit w-full">
      <CardHeader>
        <CardTitle>Drag'n'Drop</CardTitle>
        <CardDescription>
          You can drag these nodes to the pane on the right.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div
          className="flex cursor-grab items-center justify-center rounded-md border border-blue-600  py-1"
          onDragStart={onDragStart('input')}
          draggable
        >
          Input Node
        </div>
        <div
          className="flex cursor-grab items-center justify-center rounded-md border border-border py-1"
          onDragStart={onDragStart('buffer')}
          draggable
        >
          Buffer Node
        </div>
        <div
          className="flex cursor-grab items-center justify-center rounded-md border border-rose-500  py-1"
          onDragStart={onDragStart('output')}
          draggable
        >
          Output Node
        </div>
      </CardContent>
    </Card>
  );
});
Sidebar.displayName = 'Sidebar';
