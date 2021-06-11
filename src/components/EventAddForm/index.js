import { useApolloClient, useMutation } from '@apollo/client';
import { faVenusDouble } from '@fortawesome/free-solid-svg-icons';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import slugify from 'slugify';
import * as Yup from 'yup';

import Error from 'components/Error';
import EventForm from 'components/EventForm';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { CREATE_EVENT } from 'queries/events';
import { UPLOAD_FILE } from 'queries/files';
import { buildSite } from 'utils/api';

const initialData = {
    title: '',
    description: '',
    is_online: true,
    is_offline: false,
    tournaments: [],
    header: [],
    card: [],
    streams: [],
    sign_up_link: '',
    venue: '',
    starts_at: moment().format("YYYY-MM-DDThh:00"),
    ends_at: moment().format("YYYY-MM-DDThh:00"),
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    starts_at: Yup.string().required("Starts At is required"),
    ends_at: Yup.string().required("Ends At is required"),
    header: Yup.array().min(1, "Header Image is required").required('Header Image is required'),
    card: Yup.array().min(1, "Card Image is required").required('Card Image is required'),
    sign_up_link: Yup.string().required('Sign Up Link is required'),
    streams: Yup.array().min(1, "Stream is required").required("Stream is required")
});

const EventAddForm = (props) => {
    // @ts-ignore
    const { seriesId } = useParams();
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const client = useApolloClient();
    // @ts-ignore
    const [isSubmitted, setSubmitted] = useState(false);
    // @ts-ignore
    const [error, setError] = useState(null);
    const [createEvent, eventData] = useMutation(CREATE_EVENT);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const timezone = siteCtx.getTimezone();

    const handleSubmit = async (values, actions) => {
        setError(null);
        const newEvent = {
            slug: '/' + slugify(values.title, {
                replacement: '-', 
                lower: true,
                strict: true
            }),
            title: values.title,
            description: values.description,
            is_online: values.is_online,
            is_offline: values.is_offline,
            series_item: seriesId,
            sign_up_link: values.sign_up_link,
            checkin_instructions: values.checkin_instructions,
            stream_rules: values.stream_rules,
            venue: values.venue.value,
            tournaments: values.tournaments.map(t => t.value),
            starts_at: moment(values.starts_at).tz(timezone).format(),
            ends_at: moment(values.ends_at).tz(timezone).format()
        };

        const headerResponse = await uploadFile({ 
            variables: { 
                file: values.header[0]
            }
        });
        newEvent.header = headerResponse.data.upload.id;

        const cardResponse = await uploadFile({ 
            variables: { 
                file: values.card[0]
            }
        });
        newEvent.card = cardResponse.data.upload.id;

        createEvent({ variables: { payload: { data: newEvent }}})
            .then((ret) => {
                const createdEvent = ret.data.createEvent.event;
                client.resetStore()
                    .then(() => {
                        buildSite(siteCtx.selected, userCtx.token);
                        notify({
                            type: 'success',
                            message: "Successfully added event: " + createdEvent.title
                        });
                        history.push('/series/view/' + seriesId);
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    return (
        <div className="text-white px-0 px-lg-2 px-xl-4">
			<Card className="card-box">
				<div>
					<div className="bg-secondary mb-3">
                        {/* Header */}
                    </div>

                    { error && <Error message={error} /> }

                    { !isSubmitted &&
                        <Formik
                            initialValues={initialData}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                                {(FormProps) => (
                                    <Form id="organization-add-form"> 
                                        { FormProps.isSubmitting ? (
                                            <div className="text-center m-5">
                                                <Loading center={true} />
                                                <h3 className="mt-3">Creating Event...</h3>
                                            </div>
                                        ) : (
                                            <div>
                                                <EventForm {...FormProps} />

                                                <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                    <FormSubmitButton
                                                        showNotificationOnError={true}
                                                        title="Add Event"
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

export default EventAddForm;
