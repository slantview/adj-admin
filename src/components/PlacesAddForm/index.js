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
import { CREATE_PLACE } from 'queries/places';

const initialData = {
    name: '',
    description: '',
    online_url: '',
    is_online: true,
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
};

const validationSchema = Yup.object({
    name: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    online_url: Yup.string().required('URL is required')
});

const PlacesAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addPlace] = useMutation(CREATE_PLACE);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

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
      
        addPlace({ variables: { payload: { data: newPlace }}})
            .then((ret) => {
                const createdPlace = ret.data.createPlace.place;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added venue: " + createdPlace.name
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
                <h3 className="mt-3">Creating Venue...</h3>
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
                                                    <PlaceForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Add Venue
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

export default PlacesAddForm;
