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
import ServiceAreaForm from 'components/ServiceAreaForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_GEO_REGION, CREATE_GEO_REGION_LIST } from 'queries/service_areas';

const initialData = {
    name: '',
    places_geo_regions: []
};
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    places_geo_regions: Yup.array().min(1, 'Must include at least one location').required('Regions is required')
});

const validRegions = (rows) => {
    let valid = true;
    rows.forEach((r, i) => {
        if (r.name === '' || r.type === '') {
            valid = false;
        }
    });
    return valid;
}

const ServiceAreaAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addServiceArea] = useMutation(CREATE_GEO_REGION_LIST);
    const [addRegion] = useMutation(CREATE_GEO_REGION);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        if (!validRegions(values.places_geo_regions)) {
            actions.setFieldError('places_geo_regions', 'Locations must include Name and Type');
            actions.setSubmitting(false);
            return;
        }
        setSubmitted(true);
        
        let newServiceArea = {
            title: values.name,
            places_geo_regions: []
        };

        for (let i =0; i < values.places_geo_regions.length; i++) {
            const region = values.places_geo_regions[i];
            const newLocation = await addRegion({ variables: { payload: { data: region}}})
                .then(result => {
                    return result.data.createGeoRegion.geoRegion;
                }).catch(e  => {
                    setError(e.toString());
                });
            newServiceArea.places_geo_regions.push(newLocation.id)
        }

        addServiceArea({ variables: { payload: { data: newServiceArea }}})
            .then((ret) => {
                const createdGeoRegionList = ret.data.createGeoRegionList.geoRegionList;
                client.resetStore()
                    .then(() => {
                        actions.resetForm();
                        notify({
                            type: 'success',
                            message: "Successfully added service area: " + createdGeoRegionList.title
                        });
                        history.push('/service-areas', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Creating Service Area...</h3>
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
                                            { !FormProps.isSubmitting && 
                                                <div>
                                                    <ServiceAreaForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Add Service Area"
                                                            errors={FormProps.errors}
                                                        />
                                                    </div>
                                                </div>
                                            }
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

export default ServiceAreaAddForm;
