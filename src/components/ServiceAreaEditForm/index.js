import { useApolloClient, useMutation } from '@apollo/client';
import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import ServiceAreaForm from 'components/ServiceAreaForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_GEO_REGION, UPDATE_GEO_REGION_LIST } from 'queries/service_areas';

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    places_geo_regions: Yup.array().min(1, 'Must include at least one location').required('Regions is required')
});

const ServiceAreaEditForm = (props) => {
    const {
        region
    } = props;
    console.log(region);
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [updateRegionFormat] = useMutation(UPDATE_GEO_REGION_LIST);
    const [addRegion] = useMutation(CREATE_GEO_REGION);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const initialData = {
        name: region?.title,
        description: region?.description,
        places_geo_regions: region?.places_geo_regions
    };


    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newRegion = {
            title: values.name,
            places_geo_regions: []
        }

        for (let i =0; i < values.places_geo_regions.length; i++) {
            const region = values.places_geo_regions[i];
            if (region.id) {
                newRegion.places_geo_regions.push(region.id);
            } else {
                const newLocation = await addRegion({ variables: { payload: { data: region}}})
                    .then(result => {
                        return result.data.createGeoRegion.geoRegion;
                    }).catch(e  => {
                        setError(e.toString());
                    });
                newRegion.places_geo_regions.push(newLocation.id)
            }
        }

        updateRegionFormat({ variables: { id: region.id, data: newRegion }})
            .then((ret) => {
                const updatedRegion = ret.data.updateGeoRegionList.geoRegionList;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully updated service area: " + updatedRegion.title
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
                <h3 className="mt-3">Updating Service Area...</h3>
            </div>
        );
    }

    if (region === null) {
        <div className="text-center m-5">
            <Loading center={true} showTimeout={false} />
        </div>
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
                                                        <Button
                                                            className="btn-primary font-weight-bold"
                                                            type="submit">
                                                                Update Service Area
                                                        </Button>
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

export default ServiceAreaEditForm;
