import React from 'react';
import "./Support.css"

function Status(props) {
    return (
        <ul className={`status status-${props.variant || 'success'}`}>
            <li>
                <span>{props.children}</span>
            </li>
        </ul>
    );
}

export default Status;