import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedIndex: 0,
}

export const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setSelectedIndex: (state, action) => {
            state.now = action.payload;
        },
    }
});

export const { setSelectedIndex } = navbarSlice.actions;

export default navbarSlice.reducer;