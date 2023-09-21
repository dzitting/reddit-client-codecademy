import { createSlice } from "@reduxjs/toolkit";

export const likesSlice = createSlice({
    name: "likesSlice",
    initialState: {
        likes: null,
    },
    reducers: {
        upvote: (state, action) => {
            state.likes += action.payload;
        },
        setItem: (state, action) => {
            state.likes = action.payload
        }
    },
});

export const { upvote, setItem } = likesSlice.actions;
export default likesSlice.reducer;