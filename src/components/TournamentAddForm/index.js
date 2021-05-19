import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import TournamentForm from 'components/TournamentForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { CREATE_TOURNAMENT } from 'queries/tournaments';

const initialData = {
    title: '',
    description: '',
    header: [],
    registration_cap: 0,
    fee: 0,
    matcherino_code: '',
    matcherino_coupon_amount: '',
    game: '',
    game_mode: '',
    game_rules: [],
    game_platform: '',
    bracket_format: [],
    tournament_start_time: '',
    registration_cutoff: '',
    geo_regions: []
};
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

const TournamentAddForm = (props) => {
    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addTournament] = useMutation(CREATE_TOURNAMENT);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

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

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Creating Tournament...</h3>
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
                                            { FormProps.isSubmitting ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} showTimeout={false} />
                                                    <h3 className="mt-3">Creating Series...</h3>
                                                </div>
                                            ) : (
                                                <div>
                                                    <TournamentForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Add Tournament"
                                                            errors={FormProps.errors}
                                                        />
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
