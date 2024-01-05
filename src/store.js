import { configureStore } from "@reduxjs/toolkit";
import statusBarSlice from './features/statusBarSlice';
import menuSlice from "./features/menuSlice";
import projectSlice from "./features/projectSlice";

export const store = configureStore({
    reducer: {
        statusBar: statusBarSlice,
        menu: menuSlice,
        project: projectSlice,
    }
});