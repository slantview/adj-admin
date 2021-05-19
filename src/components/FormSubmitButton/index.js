import { Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import ErrorTwoToneIcon from '@material-ui/icons/ErrorTwoTone';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react'

import { NotificationContext } from 'providers/NotificationProvider';

const FormSubmitButton = (props) => {
    const {
        onClick,
        showNotificationOnError,
        onError,
        title,
        errors,
        isSubmitted
    } = props;

    const [errorData, setErrorData] = useState(errors);
    const [submitted, setSubmitted] = useState(isSubmitted)
    
    useEffect(() => {
        let active = true;
        if (active) {
            setErrorData(errors);
            setSubmitted(submitted);
        }
        return () => {
            active = false;
        }
    }, [errors, isSubmitted])

    const notify = useContext(NotificationContext).notify;
    const hasError = !_.isEmpty(errorData);

    const handleClick = (e) => {
        if (showNotificationOnError && hasError) {
            const errorMap = Object.values(errorData);
            console.log(errorMap);
            notify({
                type: 'danger',
                message: (
                    <>
                        <span className="font-weight-bold font-size-md">
                            {"There is an error in the form: "}
                        </span>
                        <List dense className="m-0 p-0">
                            { errorMap.map(value => (
                                <ListItem className="m-0">
                                    <ListItemIcon className="m-0 p-0">
                                        <ErrorTwoToneIcon className="text-white m-0 p-0" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText className="font-size-sm m-0 p-0" primary={value} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )
            });
        }

        if (onClick&& !hasError) {
            onClick(e);
        } else if (onError && hasError) {
            onError(e);
        }
    };

    return (
        <Button
            onClick={handleClick}
            disabled={submitted}
            className="btn-primary font-weight-bold"
            type="submit">
                {title}
        </Button>
    )
}

export default FormSubmitButton;
