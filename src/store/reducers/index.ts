import { combineReducers } from '@reduxjs/toolkit';

import { flowsSlice } from '@/store/reducers/flows.ts';

export const rootReducer = combineReducers({
  flows: flowsSlice.reducer,
});
