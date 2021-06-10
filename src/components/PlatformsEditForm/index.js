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
import PlatformForm from 'components/PlatformForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_GAME_PLATFORM } from 'queries/platforms';

const validationSchema = Yup.object({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    games: Yup.array().min(1, "Game is required").required('Game is required')
});

const PlatformsEditForm = (props) => {
    const {
        platform
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updatePlatform] = useMutation(UPDATE_GAME_PLATFORM);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const games = platform?.games && platform.games.length > 0
    ? platform?.games.map(g => ({ name: g.title, value: g.id }))
    : [];

    const initialData = {
        name: platform?.name,
        description: platform?.description,
        games: games,
    };

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newPlatform = Object.assign({}, values);
        newPlatform.games = values.games.map(g => g.value);

        updatePlatform({ variables: { id: platform.id, data: newPlatform }})
            .then((ret) => {
                const updatedPlatform = ret.data.updatePlatform.platform;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated platform: " + updatedPlatform.name
                        });
                        history.push('/games/platforms', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Platform...</h3>
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
                                                    <PlatformForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Platform"
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

export default PlatformsEditForm;
