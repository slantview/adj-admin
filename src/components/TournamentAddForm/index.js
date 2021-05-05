import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import TournamentForm from 'components/TournamentForm';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_TOURNAMENT } from 'queries/events';
import { UPLOAD_FILE } from 'queries/files';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

const initialData = {
    title: '',
    description: '',
    header: [],
    registration_cap: 100,
    registration_cutoff: "07:00:00",
    start_time: "08:00",
    fee: 0,
    matcherino_code: '',
    matcherino_coupon_amount: '',
    game: null,
    game_mode: null,
    game_rules: [],
    game_platform: null,
    bracket_format: []
};
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    registration_cap: Yup.number().required('Registration Cap is required'),
    fee: Yup.number().required('Fee is required'),
    game: Yup.object().required('Game is required'),
    game_mode: Yup.object().required('Game mode is required'),
    game_rules: Yup.array().required('Game rules are required'),
    game_platform: Yup.object().required('Game platform is required'),
    bracket_format: Yup.array().required('Bracket Format is required')
});

const TournamentAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addTournament] = useMutation(CREATE_TOURNAMENT);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [isSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        let newTournament = values;

        delete newTournament.header;
        delete newTournament.start_time;
        delete newTournament.game_platform;

        newTournament.registration_cutoff = moment(values.registration_cutoff).format();
        newTournament.tournament_start_time = moment(values.start_time).format();
        newTournament.game_rules = values.game_rules.map(g => g.value);
        newTournament.fee = 0;
        newTournament.game = values.game.value;
        newTournament.bracket_format = values.bracket_format.map(b => b.value);
        newTournament.platforms = [values.game_platform.value];
        newTournament.game_mode = [values.game_mode.value];
        
        addTournament({ variables: { payload: { data: newTournament }}})
            .then((ret) => {
                const createdTournament = ret.data.createTournament.tournament;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added event: " + createdTournament.title
                        });
                        history.push('/tournaments', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

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
                                            { FormProps.isSubmitting ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} showTimeout={false} />
                                                    <h3 className="mt-3">Creating Series...</h3>
                                                </div>
                                            ) : (
                                                <div>
                                                    <TournamentForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Add Tournament
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
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

export default TournamentAddForm;
