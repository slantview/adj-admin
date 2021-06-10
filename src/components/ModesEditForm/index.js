import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import ModeForm from 'components/ModeForm';
import Finished from 'components/OrganizationAddForm/Finished';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_GAME_MODE } from 'queries/modes';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    games: Yup.array().min(1, "Game is required").required('Game is required')
});

const ModesEditForm = (props) => {
    const {
        mode
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateMode] = useMutation(UPDATE_GAME_MODE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const games = mode?.games && mode.games.length > 0
    ? mode?.games.map(g => ({ name: g.title, value: g.id }))
    : [];

    const initialData = {
        title: mode?.title,
        description: mode?.description,
        games: games,
    };

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newMode = Object.assign({}, values);
        newMode.games = values.games.map(g => g.value);

        updateMode({ variables: { id: mode.id, data: newMode }})
            .then((ret) => {
                const updatedMode = ret.data.updateGameMode.gameMode;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated mode: " + updatedMode.title
                        });
                        history.push('/games/modes', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Mode...</h3>
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
                                                    <ModeForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Mode"
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

export default ModesEditForm;
