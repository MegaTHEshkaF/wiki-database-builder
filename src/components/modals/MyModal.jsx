import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { lock, unlock } from '../../features/menuSlice';

import { Modal } from 'react-bootstrap';

const MyModal = React.forwardRef(({children, props}, ref) => {
    React.useImperativeHandle(ref, () => ({
        handleShow,
        handleClose,
    }));
    
    const [show, setShow] = React.useState(false);
    const locked = useSelector((state) => state.menu.locked);
    const dispatch = useDispatch();

    const handleShow = () => {
        if(locked) return;
        setShow(true);
        dispatch(lock());
    }
    const handleClose = () => {
        setShow(false);
        dispatch(unlock());
    }

    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            // backdrop='static'
            {...props}
        >
            {children}
        </Modal>
    );
});

export default React.memo(MyModal);