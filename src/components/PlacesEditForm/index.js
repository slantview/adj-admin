import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import * as Yup from 'yup';

import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import PlaceForm from 'components/PlaceForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_PLACE, UPDATE_PLACE } from 'queries/places';

const validationSchema = Yup.object({
    name: Yup.string().required('Venue name is required'),
    description: Yup.string().required('Description is required'),
    online_url: Yup.string().required('URL is required')
});

const PlacesEditForm = (props) => {
    const {
        place
    } = props;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updatePlace] = useMutation(UPDATE_PLACE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        name: place?.name,
        description: place?.description,
        type: place?.type,
        online_url: place?.online_url,
        is_online: place?.is_online,
        address_line_1: place?.address_line_1,
        address_line_2: place?.address_line_2,
        city: place?.city,
        state: place?.state,
        postal_code: place?.postal_code,
        country: place?.country
    };

    console.log(initialData);

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        let newPlace = Object.assign({}, values);
        
        newPlace.slug =  '/' + slugify(values.name, {
            replacement: '-', 
            lower: true,
            strict: true
        });
        
        // lat: Float
        // long: Float
        // promotional_images: [ID]
        // logo: ID
      
        updatePlace({ variables: { id: place.id, data: newPlace }})
            .then((ret) => {
                const updatedPlace = ret.data.updatePlace.place;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added venue: " + updatedPlace.name
                        });
                        history.push('/places', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Updating Venue...</h3>
            </div>
        );
    }

    if (typeof place === 'undefined' || place === null) {
        return (<Loading center={true} showTimeout={false} />);
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
                                                    <PlaceForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Update Venue
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

export default PlacesEditForm;
