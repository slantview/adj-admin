import { useApolloClient, useMutation } from '@apollo/client';
import { Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import GameForm from 'components/GameForm';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_GAME } from 'queries/games';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required')
});

const GameEditForm = (props) => {
    const {
        game
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateGame] = useMutation(UPDATE_GAME);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        title: game?.title,
        description: game?.description,
    };

    const handleSubmit = async (values, actions) => {
        // setSubmitted(true);
        
        let newGame = Object.assign({}, values);

        updateGame({ variables: { id: game.id, game: newGame }})
            .then((ret) => {
                const updatedGame = ret.data.updateGame.game;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated game: " + updatedGame.title
                        });
                        history.push('/games', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Game...</h3>
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
                                redirect="/games"
                            />
                        }
                        { !isSubmitted &&
                            <Formik
                                initialValues={initialData}
                                validationSchema={validationSchema}
                                enableReinitialize={true}
                                onSubmit={handleSubmit}>
                                    {(FormProps) => (
                                        <Form id="organization-add-form"> 
                                            { !FormProps.isSubmitting && 
                                                <div>
                                                    <GameForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Game"
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

export default GameEditForm;
