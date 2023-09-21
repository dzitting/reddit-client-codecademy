// dataSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularContents } from '../../data/popularContents';

// Define your async thunk
export const fetchPopularData = createAsyncThunk(
  'data/fetchPopularData',
  async () => {
    try {
      const response = await fetchPopularContents();
      return response;
    } catch (error) {
      console.error('Error fetching popular data:', error);
      throw error; // Rethrow the error to be caught elsewhere
    }
  }
);


// Create a slice with your actions
const dataSlice = createSlice({
  name: 'popular',
  initialState: {
    popular: [],
  },
  reducers: {
    createComment: (state, action) => {
      state.popular.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPopularData.fulfilled, (state, action) => {
      state.popular = action.payload;
    });
  },
});

// Export your actions and reducer
export const { createComment, setSelected } = dataSlice.actions;
export default dataSlice.reducer;
