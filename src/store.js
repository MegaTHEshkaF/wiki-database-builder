import { configureStore } from "@reduxjs/toolkit";
import statusBarSlice from './features/statusBarSlice';
import menuSlice from "./features/menuSlice";
import projectSlice from "./features/projectSlice";
import navbarSlice from "./features/navbarSlice";

export const store = configureStore({
    reducer: {
        statusBar: statusBarSlice,
        menu: menuSlice,
        project: projectSlice,
        navbar: navbarSlice,
    }
});