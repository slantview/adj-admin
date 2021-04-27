import { useMutation } from '@apollo/client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogTitle
} from '@material-ui/core';
import Loading from 'components/Loading';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext, useState } from 'react';
import { eventToNewEvent, tournamentToNewTournament } from 'utils/graphql';
import * as Yup from 'yup';
import { CREATE_EVENT, CREATE_TOURNAMENT } from '../../queries/events';
import DialogErrorContent from './DialogErrorContent';
import EventCloneDropdownButton from './EventCloneDropdownButton';
import EventCloneForm from './EventCloneForm';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    starts_at: Yup.date().required("Starts At is required"),
    ends_at: Yup.date().required("Ends At is required"),
    sign_up_link: Yup.string().required('Sign Up Link is required'),
});

const EventCloneDialog = (props) => {
    const {
        event,
        cloneConfirmModal,
        setCloneConfirmModal,
        refreshSeries
    } = props;

    const initialData = {
        title: event.title,
        starts_at: '',
        ends_at: '',
        sign_up_link: '',
        copy_tournament_data: true,
        save_as_draft: false
    };

    const notify = useContext(NotificationContext).notify;

    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [addEvent, eventData] = useMutation(CREATE_EVENT);
    const [addTournament, tournamentData] = useMutation(CREATE_TOURNAMENT);
    const isLoading = processing && !error;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.timezone;
    
    const handleSubmit = async (values, actions) => {
        setProcessing(true);
        
        let newEvent = eventToNewEvent(event, values, timezone);
        
        if (values.save_as_draft) {
            // TODO(smfr): fix draft mode.
            // newEvent.published_at = null;
        }

        delete newEvent.tournaments;
        if (values.copy_tournament_data) {
            const tournamentRequests = event.tournaments.map(t => {
                const newTournament = tournamentToNewTournament(t, values, timezone);
                const result = addTournament({ variables: { payload: { data: newTournament }}})
                    .then(response => {
                        return response.data.createTournament.tournament.id;
                    })
                    .catch(e => {
                        setError(e.toString());
                    });
                return result;
            });
            const newTournamentList = await Promise.all(tournamentRequests);
            newEvent.tournaments = newTournamentList;
        }

        addEvent({ variables: { payload: { data: newEvent }}})
            .then((ret) => {
                const createdEvent = ret.data.createEvent.event;
                setCloneConfirmModal(false);
                refreshSeries();
                notify({
                    type: 'success',
                    message: "Successfully added event: " + createdEvent.title
                });
            }).catch(e  => {
                setError(e.toString());
            });
    }

    const handleReset = () => {
        setError(null);
        setCloneConfirmModal(false);
    }

    return (
        <Dialog
            open={cloneConfirmModal}
            onClose={() => setCloneConfirmModal(false) }
            classes={{ paper: 'shadow-lg rounded' }}>
                { error && 
                    <DialogErrorContent title="Error" message={error} onCancel={() => handleReset()} />
                }
                { !error &&
                    <Formik
                        initialValues={initialData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                            {(FormProps) => (
                                <div className="p-2">
                                    { !FormProps.isSubmitting && !isLoading &&
                                        <DialogTitle>
                                            Clone Into New Event
                                        </DialogTitle>
                                    }
                                    <DialogContent>
                                        <Form id="organization-add-form"> 
                                            { FormProps.isSubmitting || isLoading ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} />
                                                    <h3 className="mt-3">Cloning Event...</h3>
                                                </div>
                                            ) : (
                                                <div>
                                                    <EventCloneForm event={props.event} {...FormProps} />
                                                </div>
                                            )}
                                        </Form>
                                    </DialogContent>
                                    { !FormProps.isSubmitting && !isLoading &&
                                        <DialogActions> 
                                            <div className="">
                                                <EventCloneDropdownButton {...FormProps} />
                                                <Button
                                                    onClick={() => setCloneConfirmModal(false) }
                                                    className="btn btn-neutral-secondary mx-1">
                                                    <span className="btn-wrapper--label">Cancel</span>
                                                </Button>
                                            </div>
                                        </DialogActions>
                                    }
                                </div>
                            )}
                    </Formik>
                }
        </Dialog>

    )
}

export default EventCloneDialog;
