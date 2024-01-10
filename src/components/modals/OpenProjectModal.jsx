import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { lock, unlock } from '../../features/menuSlice';
import { setImportDir, setExportDir, setLoaded } from '../../features/projectSlice';
import { setText } from '../../features/statusBarSlice';

import loadAssets from '../../utils/loadAssets';

import { useNavigate } from 'react-router-dom';
import { AssetsTableContext } from '../../context';

const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');
const path = window.require('path');

const OpenProjectModal = () => {
    const locked = useSelector((state) => state.menu.locked);
    const dispatch = useDispatch();
    const { setData } = React.useContext(AssetsTableContext);

    const navigate = useNavigate();

    // Listen for command
    React.useEffect(() => {
        ipcRenderer.on('menu:open', openHandler);
        return () => {
            ipcRenderer.removeListener('menu:open', openHandler);
        }
    });
    var openHandler = function(e) {
        if(locked) return;

        // Lock menu commands
        dispatch(lock());
        
        ipcRenderer.invoke('dialog', 'showOpenDialog', {
            properties: ['openFile'],
            filters: [{ name: 'JSON', extensions: ['json'] }],
        }).then(result => {
            if(result.canceled) return dispatch(unlock());

            const { importDir } = JSON.parse(fs.readFileSync(result.filePaths[0], 'utf8'));
            const exportDir = path.dirname(result.filePaths[0]);

            dispatch(setImportDir(importDir));
            dispatch(setExportDir(exportDir));

            // Check if cache exists
            if(fs.existsSync(path.join(exportDir, 'cache', 'MonoBehaviour.json'))) {
                const cacheData = JSON.parse(fs.readFileSync(path.join(exportDir, 'cache', 'MonoBehaviour.json'), 'utf8'));

                dispatch(setLoaded());
                dispatch(unlock());
                dispatch(setText(`Finished loading ${cacheData.length} assets from cache`));

                setData(cacheData);
                return navigate('/structure');
            }
            else {
                loadAssets(importDir, exportDir, dispatch, setData).then(result => {
                    return navigate('/structure');
                });
            }
        });
    }
    
    return (
        <></>
    );
}

export default React.memo(OpenProjectModal);