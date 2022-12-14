import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import TournamentForm from 'components/TournamentForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UPDATE_TOURNAMENT } from 'queries/tournaments';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    registration_cutoff: Yup.string().required("Registration Cutoff is required"),
    tournament_start_time: Yup.string().required("Starts At Time is required"),
    registration_cap: Yup.number().required('Registration Capacity is required'),
    fee: Yup.string().required("Tournament Fee is required"),
    game: Yup.object().required('Game is required'),
    game_mode: Yup.object().required('Game mode is required'),
    game_platform: Yup.object().required('Game platform is required'),
    game_rules: Yup.array().min(1, "Game rules are required").required('Game rules are required'),
    bracket_format: Yup.array().min(1, "Bracket Format is required").required('Bracket Format is required')
});

const TournamentEditForm = (props) => {
    const {
        tournament
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();
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
        ? tournament.bracket_format.map(b => ({ name: b.title, value: b.id }))
        : [];
    const geoRegions = tournament.geo_regions && tournament.geo_regions.length > 0
        ? tournament.geo_regions.map(g => ({ name: g.title, value: g.id }))
        : [];
    const startsAt = moment(tournament.tournament_start_time).tz(timezone).format('HH:mm');
    const registrationCutoff = moment(tournament.registration_cutoff).tz(timezone).format('HH:mm');
    
    const initialData = {
        title: tournament.title,
        description: tournament.description,
        header: [],
        registration_cap: tournament.registration_cap,
        fee: tournament.fee,
        matcherino_code: tournament.matcherino_code,
        matcherino_coupon_amount: tournament.matcherino_coupon_amount,
        game: game,
        game_mode: gameMode,
        game_rules: gameRules,
        game_platform: gamePlatform,
        bracket_format: bracketFormat,
        tournament_start_time: startsAt,
        registration_cutoff: registrationCutoff,
        geo_regions: geoRegions
    };

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        let newTournament = Object.assign({}, values);

        delete newTournament.header;
        delete newTournament.game_platform;

        newTournament.fee = "0";
        newTournament.game = values.game.value;
        newTournament.game_rules = values.game_rules.map(g => g.value);
        newTournament.platforms = [values.game_platform.value];
        newTournament.game_mode = [values.game_mode.value];
        newTournament.bracket_format = values.bracket_format.map(b => b.value);
        newTournament.tournament_start_time = moment('2021-03-04T' + values.tournament_start_time+':00').tz(timezone).format();
        newTournament.registration_cutoff = moment('2021-03-04T' + values.registration_cutoff+':00').tz(timezone).format();
        newTournament.registration_cap = parseInt(values.registration_cap);
        newTournament.geo_regions = values.geo_regions.map(g => g.value);

        updateTournament({ variables: { id: tournament.id, data: newTournament }})
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
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Tournament"
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

export default TournamentEditForm;
