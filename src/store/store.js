import { configureStore, combineReducers } from '@reduxjs/toolkit';
import selectedReducer from '../features/selected/selectedSlice';
import dataReducer from '../features/data/dataSlice';

const rootReducer = combineReducers({
  selectedId: selectedReducer,
  data: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
