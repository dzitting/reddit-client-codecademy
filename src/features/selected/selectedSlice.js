import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selected: null
}

export const selectedSlice = createSlice({
    name: 'selected',
    initialState,
    reducers: {
        setSelected: (state, action) => {
            console.log(action.payload);
            state.selected = action.payload;
        },
        upvote: (state, action) => {
            state.ups += action.payload;
        }
    }
})

export const { setSelected, upvote } = selectedSlice.actions;

export default selectedSlice.reducer;