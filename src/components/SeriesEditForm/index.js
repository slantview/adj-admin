import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import { Form, Formik } from 'formik';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPLOAD_FILE } from 'queries/files';
import { UPDATE_SERIES } from 'queries/series';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import SeriesForm from 'components/SeriesForm';

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    subtitle: Yup.string().required('Subtitle is required'),
    cadence: Yup.string().required('Cadence is required'),
    description: Yup.string().required('Description is required'),
    header: Yup.array().required('Header Image is required'),
    card: Yup.array().required('Card Image is required')
});

const SeriesEditForm = ({ series }) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateSeries] = useMutation(UPDATE_SERIES);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        title: series.title,
        slug: series.slug,
        subtitle: series.subtitle,
        description: series.description,
        header: [{__typename: 'UploadFile', name: series.title, preview: series.header.formats.small.url}],
        card: [{__typename: 'UploadFile', name: series.title, preview: series.card.formats.small.url}],
        venues: series.venues,
        cadence: series.cadence
    };
    console.log('initialData', initialData);

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
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Update Series
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

export default SeriesEditForm;
