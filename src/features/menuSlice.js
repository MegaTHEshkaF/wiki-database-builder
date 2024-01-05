import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locked: false
}

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        lock: (state) => {
            state.locked = true;
        },
        unlock: (state) => {
            state.locked = false;
        }
    }
});

export const { lock, unlock } = menuSlice.actions;

export default menuSlice.reducer;