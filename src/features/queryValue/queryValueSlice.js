import { createSlice } from "@reduxjs/toolkit";

export const queryValueSlice = createSlice({
    name: "queryValueSlice",
    initialState: {
        queryValue: "",
    },
    reducers: {
        setQueryValue: (state, action) => {
            state.queryValue = action.payload;
        },
    },
});

export const { setQueryValue } = queryValueSlice.actions;
export default queryValueSlice.reducer;