import { createId } from '@paralleldrive/cuid2';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { type Address } from 'viem';

import { timeout } from '@/lib/timeout.ts';
import { type Flow } from '@/store/entities/flow.ts';

interface CreateFlowPayload {
  title: string;
  description: string;
  author: Address;
}

export const createFlow = createAsyncThunk<Flow, CreateFlowPayload>(
  'flows/createFlows',
  async ({ author, title, description }) => {
    await timeout(2000);
    return {
      id: createId(),
      title,
      description,
      author,
      updatedAt: Date.now(),
      sandbox: {
        nodes: [],
        edges: [],
      },
    };
  },
);

interface DeleteFlowPayload {
  id: string;
}

export const deleteFlow = createAsyncThunk<string, DeleteFlowPayload>(
  'flows/deleteFlow',
  async ({ id }) => {
    await timeout(2000);
    return id;
  },
);
