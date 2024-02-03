import { createSlice } from "@reduxjs/toolkit";
import { NAVBAR_LINKS as navbarLinks } from '../components/layout/tabber/navbarLinks';

const initialState = {
    selectedIndex: 0,
}

export const tabberSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setSelectedIndex: (state, action) => {
            state.selectedIndex = action.payload;
        },
        setTab: (state, action) => {
            const navbarLink = navbarLinks.find(element => element.title === action.payload);
            state.selectedIndex = navbarLinks.indexOf(navbarLink);
        },
    }
});

export const { setSelectedIndex, setTab } = tabberSlice.actions;

export default tabberSlice.reducer;