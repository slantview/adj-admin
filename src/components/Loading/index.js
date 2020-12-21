import React from 'react';
import { Container } from '@material-ui/core';
import { HashLoader } from 'react-spinners';

const Loading = ({ children }) => {
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "48vh"
                }}
            >
                <HashLoader />
            </div>
           
        </Container>
    )
}
  
export default Loading;