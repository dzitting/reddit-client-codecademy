import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedId: null
}

export const selectedIdSlice = createSlice({
    name: 'selectedId',
    initialState,
    reducers: {
        setSelectedId: (state, action) => {
            console.log(action.payload);
            state.selectedId = action.payload;
        }
    }
})

export const { setSelectedId } = selectedIdSlice.actions;

export default selectedIdSlice.reducer;