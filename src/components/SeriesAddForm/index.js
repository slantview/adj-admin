import { useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import { Form, Formik } from 'formik';
import { NotificationContext } from 'providers/NotificationProvider';
import { UPLOAD_FILE } from 'queries/files';
import { CREATE_SERIES } from 'queries/series';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import SeriesForm from './SeriesForm';

const initialData = {
    title: '',
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
    header: Yup.array().required('Header Image is required'),
    card: Yup.array().required('Card Image is required')
});

const SeriesAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const [addSeries] = useMutation(CREATE_SERIES);
    const [uploadFile] = useMutation(UPLOAD_FILE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        console.log(values);
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

        addSeries({ variables: { payload: { data: newSeries }}})
            .then((ret) => {
                const createdSeries = ret.data.createSeriesItem.seriesItem;
                notify({
                    type: 'success',
                    message: "Successfully added event: " + createdSeries.title
                });
                history.push('/events', { refresh: true });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    return (
        <>
            <div className="text-white mt-2">
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
                                                    <SeriesForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Add Series
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

export default SeriesAddForm;
