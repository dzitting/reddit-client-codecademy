import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedId: null
}

export const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelectedId: (state, action) => {
            state.selectedId = action.payload;
        }
    }
})

export const { setSelectedId } = selectedSlice.actions;

export default selectedSlice.reducer;