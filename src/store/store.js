import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { fetchPopularData } from '../features/data/dataSlice';
import selectedReducer from '../features/selected/selectedSlice';
import selectedIdReducer from '../features/selectedId/selectedIdSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    selected: selectedReducer,
    selectedId: selectedIdReducer,
    comments: commentsReducer
  },
});

// Dispatch the fetchPopularData action to fetch initial data when needed
store.dispatch(fetchPopularData());