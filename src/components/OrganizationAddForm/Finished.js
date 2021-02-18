import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';

const Finished = () => {
    const history = useHistory();

    const handleFinish = () => {
        history.push('/admin/organizations');
    };

    return (
        <div className="text-center p-5">
            <div className="avatar-icon-wrapper rounded-circle m-0">
            <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
                <FontAwesomeIcon
                    icon={['fas', 'check']}
                    className="d-flex align-self-center display-3"
                />
            </div>
            </div>
            <h4 className="font-weight-bold mt-4">You are all done!</h4>
            <p className="mb-0 font-size-lg text-muted">
                Now let's get get started with your events.
            </p>
            <div className="pt-4">
                <Button
                    onClick={handleFinish}
                    className="btn-primary font-weight-bold hover-scale-lg mx-1 p-2"
                    size="small">
                    <span className="btn-wrapper--label">Finish</span>
                </Button>
            </div>
        </div>
    )
}

export default Finished;