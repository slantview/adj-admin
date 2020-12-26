import React from 'react';
import { 
    Container
 } from '@material-ui/core';
 import { Alert } from '@material-ui/lab';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Error = ({message}) => {
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                { message && 
                    <div>
                        <Alert icon={false} severity="error">
                            <div className="d-flex align-items-center align-content-center">
                            <span className="font-size-lg d-block btn-icon d-40 mr-3 text-center bg-white rounded-sm text-danger">
                                <FontAwesomeIcon icon={['fas', 'times']} />
                            </span>
                            <span>
                                <strong className="d-block">Error</strong> 
                                {message}
                            </span>
                            </div>
                        </Alert>
                    </div>
                }
           </div>
        </Container>
    )
}
  
export default Error;