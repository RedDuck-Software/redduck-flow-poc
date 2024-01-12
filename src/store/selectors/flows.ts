import { createSelector } from '@reduxjs/toolkit';
import { type Address } from 'viem';

import { type RootState } from '@/store';
import { type Flow } from '@/store/entities/flow.ts';

const selectFlows = (state: RootState) => state.flows.flows;

export const selectAllFlows: (state: RootState) => Flow[] = createSelector(
  [selectFlows],
  (flows) => {
    return Object.values(flows).toSorted((a, b) => b.updatedAt - a.updatedAt);
  },
);

export const selectFlowsByAuthor = (author?: Address) =>
  createSelector([selectFlows], (flows) =>
    author
      ? Object.values(flows)
          .filter((flow) => flow.author.toLowerCase() === author.toLowerCase())
          .toSorted((a, b) => b.updatedAt - a.updatedAt)
      : [],
  );

export const selectIsCreatingFlow = (state: RootState) =>
  state.flows.isCreating;

export const selectIsDeletingFlow = (state: RootState) =>
  state.flows.isDeleting;

export const selectFlowById = (id?: string) =>
  createSelector([selectFlows], (flows) => (id ? flows[id] : undefined));
