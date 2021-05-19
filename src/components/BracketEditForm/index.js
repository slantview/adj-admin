import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import BracketForm from 'components/BracketForm';
import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_BRACKET_FORMAT } from 'queries/bracket_format';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
});

const BracketsEditForm = (props) => {
    const {
        bracket
    } = props;
  
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateBracketFormat] = useMutation(UPDATE_BRACKET_FORMAT);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        title: bracket?.title,
        description: bracket?.description
    };


    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newBracket = Object.assign({}, values);

        updateBracketFormat({ variables: { id: bracket.id, data: newBracket }})
            .then((ret) => {
                const updatedBracket = ret.data.updateBracketFormat.bracketFormat;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated bracket format: " + updatedBracket.title
                        });
                        history.push('/brackets', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Bracket...</h3>
            </div>
        );
    }

    if (bracket === null) {
        <div className="text-center m-5">
            <Loading center={true} showTimeout={false} />
        </div>
    }

    return (
        <>
            <div className="text-white mt-2 mb-5">
                <Card className="card-box">
                    <div>
                        { error && <Error message={error} /> }

                        { isSubmitted &&
                            <Finished 
                                title="You are all done!"
                                buttonText="Continue"
                                redirect="/events"
                            />
                        }
                        { !isSubmitted &&
                            <Formik
                                initialValues={initialData}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                    {(FormProps) => (
                                        <Form id="organization-add-form"> 
                                            { !FormProps.isSubmitting && 
                                                <div>
                                                    <BracketForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Bracket"
                                                            errors={FormProps.errors}
                                                        />
                                                    </div>
                                                </div>
                                            }
                                        </Form>
                                    )}
                            </Formik>
                        }
                    </div>
                </Card>
            </div>
        </>
    )
}

export default BracketsEditForm;
