import { configureStore } from "@reduxjs/toolkit";
import statusBarSlice from './features/statusBarSlice';
import menuSlice from "./features/menuSlice";
import projectSlice from "./features/projectSlice";
import tabberSlice from "./features/tabberSlice";

export const store = configureStore({
    reducer: {
        statusBar: statusBarSlice,
        menu: menuSlice,
        project: projectSlice,
        navbar: tabberSlice,
    }
});