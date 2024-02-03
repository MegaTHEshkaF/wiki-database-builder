import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

const MyNavLink = ({title, icon, onClick}) => {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {title}
        </Tooltip>
    );
    
    return (    
        <OverlayTrigger
            placement="right"
            overlay={renderTooltip}
        >
            <Nav.Link active={false} onClick={onClick}>
                {icon}
            </Nav.Link>
        </OverlayTrigger>
    );
}

export default React.memo(MyNavLink);