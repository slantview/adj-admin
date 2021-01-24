import React from 'react';
import { Container } from '@material-ui/core';
import { HashLoader } from 'react-spinners';

const Loading = (props) => {
    const { 
        center,
        centerInPage
    } = props;
    return (
        <Container>
            <div
                style={{
                    display: "flex",
                    justifyContent: center ? "center" : "",
                    alignItems: center ? "center" : "",
                    marginTop: centerInPage ? "48vh" : ""
                }}
            >
                <HashLoader />
            </div>
           
        </Container>
    )
}
  
export default Loading;