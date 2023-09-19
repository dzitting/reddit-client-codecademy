import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPopularContents } from '../../data/popularContents';

const initialState = {
  popular: [],
};

export const fetchPopularData = createAsyncThunk(
  'data/fetchPopularData',
  async () => {
    const response = await fetchPopularContents();
    return response.data; // Assuming that `fetchPopularContents` returns an object with a `data` property.
  }
);

export const dataSlice = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.setData = action.payload;
        },
        fetchPopularContents: (state, action) => {
            state.popular = action.payload;
        }
    }
})

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;