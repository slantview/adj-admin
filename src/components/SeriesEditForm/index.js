import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import ConfirmationDialog from 'components/ConfirmationDialog';
import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Loading from 'components/Loading';
import SeriesForm from 'components/SeriesForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { UPLOAD_FILE } from 'queries/files';
import { DELETE_SERIES, UPDATE_SERIES } from 'queries/series';
import { buildSite } from 'utils/api';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Subtitle is required'),
    cadence: Yup.string().required('Cadence is required'),
    description: Yup.string().required('Description is required'),
    header: Yup.array().min(1, 'Header Image is required').required('Header Image is required'),
    card: Yup.array().min(1, 'Card Image is required').required('Card Image is required')
});

const SeriesEditForm = ({ series }) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    
    const client = useApolloClient();
    const [updateSeries] = useMutation(UPDATE_SERIES);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [deleteSeries] = useMutation(DELETE_SERIES);
    const [isSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const initialData = {
        title: series.title,
        slug: series.slug,
        subtitle: series.subtitle,
        description: series.description,
        header: [{__typename: 'UploadFile', name: series.title, preview: series.header.formats.small.url}],
        card: [{__typename: 'UploadFile', name: series.title, preview: series.card.formats.small.url}],
        cadence: series.cadence
    };

    const handleSubmit = async (values, actions) => {
        setError(null);

        let newSeries = {
            title: values.title,
            slug: values.slug,
            subtitle: values.subtitle,
            description: values.description,
            header: values.header?.id,
            card: values.header?.id,
            venues: values.venues,
            cadence: values.cadence
        };
        
        let headerResponse = null;
        if (values.header[0].path) {
            headerResponse = await uploadFile({ 
                variables: { 
                    file: values.header[0]
                }
            });
            newSeries.header = headerResponse.data.upload.id;
        }
        
        let cardResponse = null;
        if (values.card[0].path) {
            cardResponse = await uploadFile({ 
                variables: { 
                    file: values.card[0]
                }
            });
            newSeries.card = cardResponse.data.upload.id;
        }

        // TODO(smfr): Hard code this for now.
        newSeries.use_hero_title_text = false;

        updateSeries({ variables: { payload: { where: { id: series.id }, data: newSeries }}})
            .then((ret) => {
                const updateSeries = ret.data.updateSeriesItem.seriesItem;
                client.resetStore()
                    .then(() => {
                        buildSite(siteCtx.selected, userCtx.token);
                        notify({
                            type: 'success',
                            message: "Successfully updated event: " + updateSeries.title
                        });
                        history.push('/series/view/' + updateSeries.id);
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    const handleDelete = () => {
        deleteSeries({ variables: { payload: { where: { id: series.id }}}})
            .then((ret) => {
                const deleteSeries = ret.data.deleteSeriesItem.seriesItem;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully deleted series: " + deleteSeries.title
                        });
                        history.push('/events');
                    });
            }).catch(e  => {
                setError(e.toString());
            });
        setShowDeleteConfirmation(false);
    };

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
                                        <Form id="organization-add-form"> 
                                            { FormProps.isSubmitting ? (
                                                <div className="text-center m-5">
                                                    <Loading center={true} showTimeout={false} />
                                                    <h3 className="mt-3">Updating Series...</h3>
                                                </div>
                                            ) : (
                                                <div>
                                                    <SeriesForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Series"
                                                            errors={FormProps.errors}
                                                        />
                                                        <div className="text-right">
                                                            <a
                                                                href="#/"
                                                                onClick={(e) => { setShowDeleteConfirmation(true); return e.preventDefault()}}
                                                                className="text-danger font-size-xs text-underline font-weight-bold"
                                                                style={{textDecoration: "underline"}}>
                                                                    Delete Series
                                                            </a>
                                                        </div>
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
            <ConfirmationDialog
                open={showDeleteConfirmation}
                onCancel={() => setShowDeleteConfirmation(false)}
                onConfirm={handleDelete}
                onClose={() => setShowDeleteConfirmation(false)}
                title={"Are you sure you want to delete " + series.title + "?"}
                description="This action cannot be undone."
                iconName="times"
                cancelText="Cancel"
                confirmText="Delete"
                color="danger"
            />
        </>
    )
}

export default SeriesEditForm;
