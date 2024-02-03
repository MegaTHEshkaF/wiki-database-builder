import React from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';

const MyNavLink = ({title, icon, separator, onClick}) => {
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
            <div className={separator ? 'mt-auto' : ''}>
                <Nav.Link active={false} onClick={onClick}>
                    {icon}
                </Nav.Link>
            </div>
        </OverlayTrigger>
    );
}

export default React.memo(MyNavLink);