import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import * as Yup from 'yup';

import Error from 'components/Error';
import EventForm from 'components/EventForm';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPDATE_EVENT } from 'queries/events';
import { UPLOAD_FILE } from 'queries/files';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    starts_at: Yup.string().required("Starts At is required"),
    ends_at: Yup.string().required("Ends At is required"),
    header: Yup.array().min(1, "Header Image is required").required('Header Image is required'),
    card: Yup.array().min(1, "Card Image is required").required('Card Image is required'),
    sign_up_link: Yup.string().required('Sign Up Link is required'),
});

const eventToInitialData = (incoming) => {
    let newFormData = Object.assign({}, incoming);
    newFormData.header = incoming?.header ? [incoming.header] : [];
    newFormData.card = incoming?.card ? [incoming.card] : [];

    newFormData.tournaments = incoming?.tournaments ? incoming.tournaments.map(t => {
        return {
            name: t.title,
            value: t.id
        };
    }) : [];

    // newFormData.rules = incoming?.rules ? incoming.rules.map(r => {
    //     return {
    //         title: r.title,
    //         value: r.id
    //     };
    // }) : [];
    
    newFormData.venue = incoming?.venue ? {
        name: incoming?.venue?.name,
        value: incoming?.venue?.id
    } : null;

    newFormData.streams = incoming?.streams ? incoming.streams.map(s => {
        return {
            name: s.name,
            value: s.id
        };
    }) : [];

    return newFormData;
}

const EventEditForm = (props) => {
    const {
        event,
        loading
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();

    // @ts-ignore
    const [isSubmitted, setSubmitted] = useState(false);
    // @ts-ignore
    const [error, setError] = useState(null);
    const [updateEvent, updateEventData] = useMutation(UPDATE_EVENT);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    
    const [eventData, setEventData] = useState(event);
    const [eventFormData, setEventFormData] = useState(eventToInitialData(event));

    useEffect(() => {
        if (event) {
            setEventData(event);
            setEventFormData(eventToInitialData(event));
        }
    }, [event, loading]);

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);

        let eventPayload = {
            title: values.title,
            slug: values.slug,
            description: values.description,
            is_online: values.is_online,
            is_offline: values.is_offline,
            starts_at: values.starts_at,
            ends_at: values.ends_at,
            series_item: event.series_item.id,
            sign_up_link: values.sign_up_link,
            venue: values.venue.value,
            cadence: event.series_item.cadence
        };

        // checkin_instructions:  // TODO
        // stream_rules: // TODO
        // games: [ID] // TODO

        // Remove cruft fields.
        delete eventPayload.id;
        delete eventPayload.__typename;
        delete eventPayload.places;

        eventPayload.slug = event.slug === values.slug ? event.slug : 
            '/' + slugify(values.title, {
                replacement: '-', 
                lower: true,
                strict: true
            })

        // Update fields for input to graphql.
        eventPayload.tournaments = values.tournaments.map(t => t.value);
        // eventPayload.rules = values.rules.map(r => r.value);
        eventPayload.streams = values.streams.map(s => s.value);
        eventPayload.series_item = values.series_item.id;

        // Submit new upload files if we have changed card or header.
        const card = _.first(values.card);
        if (card.__typename !== 'UploadFile') {
            const cardResponse = await uploadFile({ 
                variables: { 
                    file: card
                }
            });
            eventPayload.card = cardResponse.data.upload.id;
        } else {
            eventPayload.card = card.id;
        }

        const header = _.first(values.header);
        if (header.__typename !== 'UploadFile') {
            const headerResponse = await uploadFile({ 
                variables: { 
                    file: header
                }
            });
            eventPayload.header = headerResponse.data.upload.id;
        } else {
            eventPayload.header = header.id;
        }

        // TODO(smfr): Add checkin instructions.
        // checkin_instructions: "Any special checkin instructions."

        // TODO(smfr): Add stream rules.
        // stream_rules: "Any special stream rules."
        
        updateEvent({ variables: { id: event.id, data: eventPayload }})
            .then((ret) => {
                const updatedEvent = ret.data.updateEvent.event;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated event: " + updatedEvent.title
                        });
                        history.push('/series/view/' + updatedEvent.series_item.id);
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (loading || typeof event === undefined || event === null) {
        return (<Loading centerInPage={true} center={true} />);
    }

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} />
                <h3 className="mt-3">Updating Event...</h3>
            </div>
        )
    }
    
    return (
        <div className="text-white px-0 px-lg-2 px-xl-4 mb-5">
			<Card className="card-box">
				<div>
					<div className="bg-secondary mb-3">
                        {/* Header */}
                    </div>

                    { error && <Error message={error} /> }

                    { !isSubmitted &&
                        <Formik
                            enableReinitialize
                            initialValues={eventFormData}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                                {(FormProps) => (
                                    <Form id="organization-add-form"> 
                                        { FormProps.isSubmitting ? (
                                            <div className="text-center m-5">
                                                <Loading center={true} />
                                                <h3 className="mt-3">Updating Event...</h3>
                                            </div>
                                        ) : (
                                            <div>
                                                <EventForm {...FormProps} />

                                                <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                    <FormSubmitButton
                                                        showNotificationOnError={true}
                                                        title="Update Event"
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
    )
};

export default EventEditForm;
