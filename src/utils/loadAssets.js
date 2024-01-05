import { lock, unlock } from '../features/menuSlice';
import { setLoaded, unload } from '../features/projectSlice';
import { setNow, setText } from '../features/statusBarSlice';

const fs = window.require('fs');
const path = window.require('path');
const readUnityFile = require('./readUnityFile');

async function loadAssets(importDir, exportDir, dispatch) {
    // Lock menu commands
    dispatch(lock());
    // Remove all data about project
    dispatch(unload());

    const assets = [];

    const MBDir = path.join(importDir, 'ExportedProject', 'Assets', 'MonoBehaviour\\');
    const fileNames = fs.readdirSync(MBDir);
    
    let currentNow = 0;
    let currentText = '';

    const intervalId = setInterval(() => {
        dispatch(setText(`Loading: ${currentText}`));
        dispatch(setNow(currentNow / fileNames.length * 100));
    }, 100);

    for(const name in fileNames) {
        if(!fileNames[name].endsWith('.asset')) continue;

        try {
            const file = await readUnityFile(MBDir + fileNames[name]);
            if(!file[0].MonoBehaviour.Settings) continue;
            
            const fileStats = await fs.promises.stat(MBDir + fileNames[name]);
            
            currentNow = name;
            currentText = file[0].MonoBehaviour.Settings.Identifier.Path;

            assets.push({
                id: file[0].MonoBehaviour.Settings.Identifier.Guid.Value,
                name: fileNames[name],
                container: file[0].MonoBehaviour.Settings.Identifier.Path,
                size: fileStats.size,
                sizeDisplay: formatBytes(fileStats.size),
            });
        }
        catch(e) {
            console.log(e);
        }
    }
    clearInterval(intervalId);

    dispatch(setLoaded());
    
    dispatch(setNow(0));
    dispatch(setText(`Finished loading ${assets.length} assets`));
    
    fs.mkdirSync(path.join(exportDir, 'cache'), { recursive: true });
    fs.writeFileSync(path.join(exportDir, 'cache', 'MonoBehaviour.json'), JSON.stringify(assets, null, 4));

    // console.log(assets);
    dispatch(unlock());

    return;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
        return '0';
    }
    else {
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}

export default loadAssets;