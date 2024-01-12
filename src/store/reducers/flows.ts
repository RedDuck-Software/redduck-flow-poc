import { createSlice } from '@reduxjs/toolkit';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type NodeChange,
  type Node,
} from 'reactflow';

import { createFlow, deleteFlow } from '@/store/actions/flows.ts';
import { type Flow } from '@/store/entities/flow.ts';

interface FlowsState {
  flows: Record<Flow['id'], Flow>;
  isCreating: boolean;
  isDeleting: boolean;
}

const initialState: FlowsState = {
  flows: {},
  isCreating: false,
  isDeleting: false,
};

type FlowPayload<T> = { payload: { id: Flow['id'] } & T };

export const flowsSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    addNode: (
      state,
      { payload: { id, newNode } }: FlowPayload<{ newNode: Node }>,
    ) => {
      if (state.flows[id]) {
        state.flows[id].sandbox.nodes.push(newNode);
        state.flows[id].updatedAt = Date.now();
      }
    },
    changeNodes: (
      state,
      { payload: { id, changes } }: FlowPayload<{ changes: NodeChange[] }>,
    ) => {
      if (state.flows[id]) {
        state.flows[id].sandbox.nodes = applyNodeChanges(
          changes,
          state.flows[id].sandbox.nodes,
        );
        state.flows[id].updatedAt = Date.now();
      }
    },
    changeEdges: (
      state,
      { payload: { id, changes } }: FlowPayload<{ changes: EdgeChange[] }>,
    ) => {
      if (state.flows[id]) {
        state.flows[id].sandbox.edges = applyEdgeChanges(
          changes,
          state.flows[id].sandbox.edges,
        );
        state.flows[id].updatedAt = Date.now();
      }
    },
    connect: (
      state,
      {
        payload: { id, connection },
      }: FlowPayload<{ connection: Connection | Edge }>,
    ) => {
      if (state.flows[id]) {
        state.flows[id].sandbox.edges = addEdge(
          connection,
          state.flows[id].sandbox.edges,
        );
        state.flows[id].updatedAt = Date.now();
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createFlow.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(createFlow.fulfilled, (state, { payload }) => {
      state.flows[payload.id] = payload;
      state.isCreating = false;
    });
    builder.addCase(createFlow.rejected, (state) => {
      state.isCreating = false;
    });
    builder.addCase(deleteFlow.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteFlow.fulfilled, (state, { payload }) => {
      if (state.flows[payload]) {
        delete state.flows[payload];
      }
      state.isDeleting = false;
    });
    builder.addCase(deleteFlow.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const { addNode, changeEdges, changeNodes, connect } =
  flowsSlice.actions;
