import React from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
const { ipcRenderer } = window.require('electron');

const SelectFolderInput = ({register, error, setValue}) => {
    function onClick() {
        ipcRenderer.invoke('dialog', 'showOpenDialog', { properties: ['openDirectory'] }).then(result => {
            if(result.canceled) return;
            setValue(register.name, result.filePaths[0], { shouldValidate: true });
        });
    }

    return (
        <InputGroup className='mb-3' hasValidation>
            <Button variant='outline-secondary' onClick={onClick} >Select</Button>
            <Form.Control
                {...register}
                isInvalid={!!error}
                placeholder="Folder is not selected"
                readOnly
            />
            <Form.Control.Feedback type="invalid">{error?.message}</Form.Control.Feedback>
        </InputGroup>
    )
}

export default React.memo(SelectFolderInput);