import React from 'react';

import { useForm } from 'react-hook-form';

import { Button, Modal, Form } from 'react-bootstrap';
import SelectFolderInput from '../SelectFolderInput';
import MyModal from './MyModal';

import { useDispatch } from 'react-redux';
import { setImportDir, setExportDir } from '../../features/projectSlice';
import { setText } from '../../features/statusBarSlice';
import { setTab } from '../../features/navbarSlice';

import { ExplorerContext } from '../../context';

import loadAssets from '../../utils/loadAssets';

const { ipcRenderer } = window.require('electron');
const fs = window.require('fs');
const path = window.require('path');

const CreateProjectModal = () => {
    const dispatch = useDispatch();
    const { setTableData } = React.useContext(ExplorerContext);

    const modalRef = React.useRef(null);

    const { 
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        setValue,
        reset,
    } = useForm({mode: "onChange"});

    const onSubmit = (data) => {
        const exportDir = path.join(data.exportDir, data.projectName);
        const importDir = data.importDir;
            
        dispatch(setImportDir(importDir));
        dispatch(setExportDir(exportDir));

        fs.mkdirSync(exportDir, { recursive: true });
        fs.writeFileSync(path.join(exportDir, 'settings.json'), JSON.stringify({
            projectName: data.projectName,
            importDir,
        }, null, 4));

        dispatch(setText(`Saved`));

        modalRef.current.handleClose();
        reset();

        loadAssets(importDir, exportDir, dispatch, setTableData).then(result => {
            return dispatch(setTab('Structure'));
        });
    }

    const validateImportFolder = (value) => {
        try {
            const folder = fs.readdirSync(value + '\\ExportedProject\\Assets\\MonoBehaviour');
            return folder[0]? true : false;
        } catch(e) {
            return false;
        }
    }
    const validateFolderName = (value) => {
        try {
            const regex = /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/;
            return regex.test(value);
        } catch(e) {
            return false;
        }
    }
    
    // Listen for command
    React.useEffect(() => {
        ipcRenderer.on('menu:create', handler);
        return () => {
            ipcRenderer.removeListener('menu:create', handler);
        }
    });
    const handler = function(e) {
        reset();
        modalRef.current.handleShow();
    }

    return (
        <MyModal 
            ref={modalRef}
            props={{
                size: 'lg',
                centered: true,
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Create new project</Modal.Title>
            </Modal.Header>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <Modal.Body>
                    <Form.Group className='mb-3'>
                        <Form.Label>Name the project folder</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Project name"
                            defaultValue="WDB PROJECT"
                            {...register('projectName', {
                                required: 'Enter the project name',
                                maxLength: {
                                    value: 40,
                                    message: 'Name is too big',
                                },
                                validate: value => validateFolderName(value) || `Incorrect folder name`,
                            })} 
                            isInvalid={!!errors.projectName}
                        />
                        <Form.Control.Feedback type="invalid">{errors.projectName?.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Select the folder where AssetRipper files are located</Form.Label>
                        <SelectFolderInput 
                            register={register('importDir', {
                                required: 'Select the folder',
                                validate: value => validateImportFolder(value) || `...${value.split("\\").pop()}\\ExportedProject\\Assets\\MonoBehaviour has no assets`,
                            })} 
                            error={errors.importDir}
                            setValue={setValue}
                        />
                    </Form.Group>
                    
                    <Form.Group className='mb-3'>
                        <Form.Label>Select the project folder (can be the same as import)</Form.Label>
                        <SelectFolderInput 
                            register={register('exportDir', {
                                required: 'Select the folder',
                            })} 
                            error={errors.exportDir}
                            setValue={setValue}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button type='submit' variant='primary' disabled={!isValid}>Save</Button>
                </Modal.Footer>
            </Form>
        </MyModal>
    );
}

export default React.memo(CreateProjectModal);