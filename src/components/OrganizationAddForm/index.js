import { Button, Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useContext, useState } from 'react';

import FormSubmitButton from 'components/FormSubmitButton';

import { UserContext } from '../../providers/UserProvider';
import { createOrganization } from '../../utils/api';
import Error from '../Error';
import Loading from '../Loading';
import Finished from './Finished';
import { initialData } from './initialData';
import OrganizationForm from './OrganizationForm';
import { validationSchema } from './validationSchema';

const OrganizationAddForm = () => {
    const userCtx = useContext(UserContext);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (values, actions) => {
        createOrganization(userCtx.token, values)
            .then(async (response) => {
                if (response.ok) {
                    setSubmitted(true);
                    return true;
                } else if (response.status === 401) {
                    window.location.pathname = '/login';
                }
                const result = await response.json();
                if (result.message) {
                    setError(result.message);
                } else {
                    setError('Error adding Organization: ' + response.statusText);
                }
            })
            .catch(e => {
                console.error(e);
            });
    };

    return (
        <div className="text-white px-0">
			<Card className="card-box">
				<div>
					<div className="bg-secondary mb-3">
                        {/* Header */}
                    </div>

                    { error && <Error message={error} /> }


                    { isSubmitted &&
                        <Finished 
                            title="You are all done!"
                            redirect="/admin/organizations"
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
                                                <Loading center={true} />
                                                <h3 className="mt-3">Creating Organization...</h3>
                                            </div>
                                        ) : (
                                            <div>
                                                <OrganizationForm {...FormProps} />

                                                <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                    <FormSubmitButton
                                                        showNotificationOnError={true}
                                                        title="Add Organization"
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
}

export default OrganizationAddForm;