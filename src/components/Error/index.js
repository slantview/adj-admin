import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Alert,
    Container
} from '@material-ui/core';
import React from 'react';

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