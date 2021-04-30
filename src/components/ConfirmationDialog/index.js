import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog } from '@material-ui/core';
import React from 'react'

const ConfirmationDialog = (props) => {
    const {
        open,
        onCancel,
        onConfirm,
        onClose,
        title,
        description,
        iconName,
        cancelText,
        confirmText,
        color
    } = props;

    const iconClasses = "d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-"+color+" text-"+color+" m-0 d-130";
    const confirmButtonClasses = "mx-1 btn-"+color;
    
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                classes={{ paper: 'shadow-lg rounded' }}>
                <div className="text-center p-5">
                    <div className="avatar-icon-wrapper rounded-circle m-0">
                        <div className={iconClasses}>
                            <FontAwesomeIcon
                                icon={['fas', iconName]}
                                className="d-flex align-self-center display-3"
                            />
                        </div>
                    </div>
                    <h4 className="font-weight-bold mt-4">{title}</h4>
                    <p className="mb-0 font-size-lg">
                        {description}
                    </p>
                    <div className="pt-4">
                        <Button onClick={onConfirm} className={confirmButtonClasses}>
                            <span className="btn-wrapper--label">{confirmText}</span>
                        </Button>
                        <Button
                            onClick={onCancel}
                            className="btn-neutral-secondary mx-1">
                            <span className="btn-wrapper--label">{cancelText}</span>
                        </Button>
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default ConfirmationDialog;
