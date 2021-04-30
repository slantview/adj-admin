import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';

const Loading = (props) => {
    const { 
        center,
        centerInPage,
        showTimeout
    } = props;

    const useTimeout = showTimeout ? showTimeout : true;
    const [timer, setTimer] = useState(false);

    const handleShowLongTime = () => {
        setTimer(true);
    };

    useEffect(() => {
        if (useTimeout) {
            let timeout = setTimeout(() =>  handleShowLongTime(), 5000);
            return () => {
              clearTimeout(timeout);
            };
        }
    }, []);

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
            { timer && showTimeout &&
                <div
                    className="mt-5"
                    style={{
                        display: "flex",
                        justifyContent: center ? "center" : "",
                        alignItems: center ? "center" : "",
                        marginTop: centerInPage ? "50vh" : ""
                    }}
                >
                    <span className="d-block font-size-lg text-center">
                        Sorry this is taking longer than normal.<br />
                        If this operation takes more than 30 seconds, you may need to refresh.
                    </span>
                </div>
            }
        </Container>
    )
}
  
export default Loading;