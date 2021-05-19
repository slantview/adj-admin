import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import StreamForm from 'components/StreamForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_STREAM } from 'queries/streams';

const validationSchema = Yup.object({
    name: Yup.string().required('Stream name is required'),
    type: Yup.string().required('Stream type is required'),
    url: Yup.string().required('Stream URL is required')
});
const StreamsEditForm = (props) => {
    const {
        stream
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateStream] = useMutation(UPDATE_STREAM);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        name: stream?.name,
        type: stream?.type,
        url: stream?.url
    };

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newStream = Object.assign({}, values);

        updateStream({ variables: { id: stream.id, data: newStream }})
            .then((ret) => {
                const updatedStream = ret.data.updateStream.stream;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated stream: " + updatedStream.name
                        });
                        history.push('/streams', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Stream...</h3>
            </div>
        );
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
                                                    <StreamForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Stream"
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

export default StreamsEditForm;
