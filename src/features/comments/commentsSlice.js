import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: null,
    userComment: "",
}

export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        selectedComments: (state, action) => {
            console.log(action.payload);
            state.comments = action.payload;
        },
        addComment: (state, action) => {
            console.log(action.payload);
            state.userComment = action.payload;
        }

    }
})

export const { selectedComments, addComment } = commentsSlice.actions;

export default commentsSlice.reducer;