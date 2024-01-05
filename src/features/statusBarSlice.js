import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    now: 0,
    text: 'Ready to go'
}

export const statusBarSlice = createSlice({
    name: 'statusBar',
    initialState,
    reducers: {
        setNow: (state, action) => {
            state.now = action.payload;
        },
        setText: (state, action) => {
            state.text = action.payload;
        }
    }
});

export const { setNow, setText } = statusBarSlice.actions;

export default statusBarSlice.reducer;