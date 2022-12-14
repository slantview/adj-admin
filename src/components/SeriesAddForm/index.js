import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import SeriesForm from 'components/SeriesForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { UPLOAD_FILE } from 'queries/files';
import { CREATE_SERIES } from 'queries/series';
import { buildSite } from 'utils/api';

const initialData = {
    title: '',
    subtitle: '',
    description: '',
    cadence: '',
    header: [],
    card: []
};
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Subtitle is required'),
    cadence: Yup.string().required('Cadence is required'),
    description: Yup.string().required('Description is required'),
    header: Yup.array().min(1, 'Header Image is required').required('Header Image is required'),
    card: Yup.array().min(1, 'Card Image is required').required('Card Image is required')
});

const SeriesAddForm = (props) => {
    const history = useHistory();
    const client = useApolloClient();
    
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);

    const [addSeries] = useMutation(CREATE_SERIES);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        let newSeries = values;

        const headerResponse = await uploadFile({ 
            variables: { 
                file: values.header[0]
            }
        });

        const cardResponse = await uploadFile({ 
            variables: { 
                file: values.card[0]
            }
        });

        newSeries.header = headerResponse.data.upload.id;
        newSeries.card = cardResponse.data.upload.id;

        // TODO(smfr): Hard code this for now.
        newSeries.use_hero_title_text = false;
        
        actions.resetForm();

        addSeries({ variables: { payload: { data: newSeries }}})
            .then((ret) => {
                const createdSeries = ret.data.createSeriesItem.seriesItem;
                setSubmitted(true);
                client.resetStore()
                    .then(() => {
                        buildSite(siteCtx.selected, userCtx.token);
                        notify({
                            type: 'success',
                            message: "Successfully added event: " + createdSeries.title
                        });
                        history.push('/events', { refresh: true });
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
                                            { FormProps.isSubmitting || isSubmitted ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} showTimeout={false} />
                                                    <h3 className="mt-3">Creating Series...</h3>
                                                </div>
                                            ) : (
                                                <div>
                                                    <SeriesForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Add Series"
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

export default SeriesAddForm;
