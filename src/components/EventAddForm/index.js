import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import slugify from 'slugify';
import * as Yup from 'yup';

import Error from 'components/Error';
import Loading from 'components/Loading';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_EVENT } from 'queries/events';
import { UPLOAD_FILE } from 'queries/files';

import EventForm from './EventForm';

const initialData = {
    title: '',
    description: '',
    is_online: true,
    is_offline: false,
    tournaments: [],
    header: [],
    card: [],
    sign_up_link: '',
    starts_at: moment().format("YYYY-MM-DDThh:mm"),
    ends_at: moment().format("YYYY-MM-DDThh:mm"),
};

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    starts_at: Yup.string().required("Starts At is required"),
    ends_at: Yup.string().required("Ends At is required"),
    header: Yup.array().min(1, "Header Image is required").required('Header Image is required'),
    card: Yup.array().min(1, "Card Image is required").required('Card Image is required'),
    sign_up_link: Yup.string().required('Sign Up Link is required'),
});

const EventAddForm = (props) => {
    // @ts-ignore
    const { seriesId } = useParams();
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    // @ts-ignore
    const [isSubmitted, setSubmitted] = useState(false);
    // @ts-ignore
    const [error, setError] = useState(null);
    const [createEvent, eventData] = useMutation(CREATE_EVENT);
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const handleSubmit = async (values, actions) => {
        // setSubmitted(true);
        // console.log('values', values);

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
            venue: null,
            cadence: null,
            tournaments: values.tournaments.map(t => t.value),
            games: values.games,
            starts_at: values.starts_at,
            ends_at: values.ends_at
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
        
        console.log(newEvent);

        createEvent({ variables: { payload: { data: newEvent }}})
            .then((ret) => {
                const createdEvent = ret.data.createEvent.event;
                client.resetStore()
                    .then(() => {
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
                                                    <Button
                                                        className="btn-primary font-weight-bold"
                                                        type="submit">
                                                            Add Event
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
    )
};

export default EventAddForm;
