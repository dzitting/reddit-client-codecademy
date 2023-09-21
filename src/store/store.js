import { configureStore } from '@reduxjs/toolkit';
import dataReducer, { fetchPopularData } from '../features/data/dataSlice';
import selectedReducer from '../features/selected/selectedSlice';
import selectedIdReducer from '../features/selectedId/selectedIdSlice';
import commentsReducer from '../features/comments/commentsSlice';
import queryValueSliceReducer from '../features/queryValue/queryValueSlice';

export const store = configureStore({
  reducer: {
    data: dataReducer,
    selected: selectedReducer,
    selectedId: selectedIdReducer,
    comments: commentsReducer,
    queryValue: queryValueSliceReducer,
  },
});

// Dispatch the fetchPopularData action to fetch initial data when needed
store.dispatch(fetchPopularData());