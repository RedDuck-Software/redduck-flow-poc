import { createId } from '@paralleldrive/cuid2';
import { type DragEvent, useCallback, useState } from 'react';
import {
  Background,
  BackgroundVariant,
  type Connection,
  Controls,
  type Edge,
  type EdgeChange,
  MiniMap,
  type NodeChange,
  ReactFlow,
  type ReactFlowInstance,
} from 'reactflow';

import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  addNode,
  changeEdges,
  changeNodes,
  connect,
} from '@/store/reducers/flows.ts';
import { selectFlowById } from '@/store/selectors/flows.ts';

interface SandboxProps {
  id: string;
}

export const Sandbox = ({ id }: SandboxProps) => {
  const flow = useAppSelector(
    selectFlowById(id),
    // (a, b) => JSON.stringify(a) === JSON.stringify(b),
  )!;
  const dispatch = useAppDispatch();

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      dispatch(connect({ id: flow.id, connection: params })),
    [dispatch, flow.id],
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type || !reactFlowInstance) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: createId(),
        type: type === 'buffer' ? 'default' : type,
        position,
        data: { label: `${type} node` },
      };

      dispatch(addNode({ id: flow.id, newNode }));
    },
    [dispatch, flow.id, reactFlowInstance],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      dispatch(changeNodes({ id: flow.id, changes }));
    },
    [dispatch, flow.id],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      dispatch(changeEdges({ id: flow.id, changes }));
    },
    [dispatch, flow.id],
  );

  return (
    <div className="h-full w-full rounded-md border border-border lg:col-span-3">
      <ReactFlow
        nodes={flow.sandbox.nodes}
        edges={flow.sandbox.edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <MiniMap zoomable pannable />
        <Controls />
        <Background
          color="hsl(var(--border))"
          variant={BackgroundVariant.Lines}
        />
      </ReactFlow>
    </div>
  );
};
