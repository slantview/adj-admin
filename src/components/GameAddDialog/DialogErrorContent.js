import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import React from 'react';

const DialogErrorContent = (props) => {
    const {
        title,
        message,
        onCancel
    } = props;

    return (
        <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
                <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                    <FontAwesomeIcon
                        icon={['fas', 'times']}
                        className="d-flex align-self-center display-3"
                    />
                </div>
            </div>
            <h4 className="font-weight-bold mt-4">
                {title}
            </h4>
            <p className="mb-0 font-size-lg">
               {message}
            </p>
            <div className="text-center pt-3">
                <Button
                    name="cancel"
                    onClick={onCancel}
                    size="large"
                    className="btn btn-danger">
                        Close
                </Button>
            </div>
           
        </div>
    )
}

export default DialogErrorContent;
