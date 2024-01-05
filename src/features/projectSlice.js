import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    importDir: '',
    exportDir: '',
    loaded: false
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        setImportDir: (state, action) => {
            state.importDir = action.payload;
        },
        setExportDir: (state, action) => {
            state.exportDir = action.payload;
        },
        setLoaded: (state) => {
            state.loaded = true;
        },
        unload: (state) => {
            state.importDir = '';
            state.exportDir = '';
            state.loaded = false;
        },
    }
});

export const { setImportDir, setExportDir, setLoaded, unload } = projectSlice.actions;

export default projectSlice.reducer;