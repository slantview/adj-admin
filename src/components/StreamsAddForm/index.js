import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import StreamForm from 'components/StreamForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_STREAM } from 'queries/streams';

const initialData = {
    name: '',
    type: '',
    url: ''
};
const validationSchema = Yup.object({
    name: Yup.string().required('Stream name is required'),
    type: Yup.string().required('Stream type is required'),
    url: Yup.string().required('Stream URL is required')
});

const StreamsAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addStream] = useMutation(CREATE_STREAM);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newStream = {
            name: values.name,
            type: values.type,
            url: values.url
        };

        addStream({ variables: { payload: { data: newStream }}})
            .then((ret) => {
                const createdStream = ret.data.createStream.stream;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added stream: " + createdStream.name
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
                <h3 className="mt-3">Creating Stream...</h3>
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
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Add Stream
                                                        </Button>
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

export default StreamsAddForm;
