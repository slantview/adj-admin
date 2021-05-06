import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import Loading from 'components/Loading';
import TournamentForm from 'components/TournamentForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_TOURNAMENT } from 'queries/tournaments';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    game: Yup.object().required('Game is required'),
    game_mode: Yup.object().required('Game mode is required'),
    game_rules: Yup.array().required('Game rules are required'),
    game_platform: Yup.object().required('Game platform is required'),
    bracket_format: Yup.array().required('Bracket Format is required')
});

const TournamentEditForm = (props) => {
    const {
        tournament
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateTournament] = useMutation(UPDATE_TOURNAMENT);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const game = tournament.game ? { name: tournament.game.title, value: tournament.game.id } : null;
    const gameMode = tournament.game_mode && tournament.game_mode.length > 0
         ? { name: _.first(tournament.game_mode).title, value: _.first(tournament.game_mode).id } 
         : '';
    const gameRules = tournament.game_rules && tournament.game_rules.length > 0
        ? tournament.game_rules.map(g => ({ name: g.title, value: g.id }))
        : [];
    const gamePlatform = tournament.platforms && tournament.platforms.length > 0
        ? { name: _.first(tournament.platforms)?.name, value: _.first(tournament.platforms)?.id }
        : '';
    const bracketFormat = tournament.bracket_format && tournament.bracket_format.length > 0
        ? { name: _.first(tournament.bracket_format)?.title, value: _.first(tournament.bracket_format)?.id }
        : [];

    const initialData = {
        title: tournament.title,
        description: tournament.description,
        header: [],
        registration_cap: 0,
        fee: 0,
        matcherino_code: '',
        matcherino_coupon_amount: '',
        game: game,
        game_mode: gameMode,
        game_rules: gameRules,
        game_platform: gamePlatform,
        bracket_format: bracketFormat
    };

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        let newTournament = Object.assign({}, values);

        delete newTournament.header;
        delete newTournament.start_time;
        delete newTournament.game_platform;

        newTournament.fee = "0";
        newTournament.game = values.game.value;
        newTournament.game_rules = values.game_rules.map(g => g.value);
        newTournament.platforms = [values.game_platform.value];
        newTournament.game_mode = [values.game_mode.value];
        newTournament.bracket_format = [values.bracket_format.value];

        updateTournament({ variables: { id: tournament.id, payload: { data: newTournament }}})
            .then((ret) => {
                const updatedTournament = ret.data.updateTournament.tournament;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated tournament: " + updatedTournament.title
                        });
                        history.push('/tournaments', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Tournament...</h3>
            </div>
        );
    }

    return (
        <>
            <div className="text-white mt-2 mb-5">
                <Card className="card-box">
                    <div>
                        { error && <Error message={error} /> }
                        
                        { !isSubmitted &&
                            <Formik
                                initialValues={initialData}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}>
                                    {(FormProps) => (
                                        <Form id="tournament-add-form"> 
                                            { !FormProps.isSubmitting &&
                                                <div>
                                                    <TournamentForm {...FormProps} />
                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Update Tournament
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

export default TournamentEditForm;
