import React, { useContext, useState } from 'react';
import { Button, Card } from '@material-ui/core';
import { Formik, Form } from 'formik';
import OrganizationForm from './OrganizationForm';
import { UserContext } from '../../providers/UserProvider';
import { createOrganization } from '../../utils/api';
import { initialData } from './initialData';
import { validationSchema } from './validationSchema';
import _ from 'lodash';
import Finished from './Finished';
import Error from '../Error';

const OrganizationAddForm = () => {
    const userCtx = useContext(UserContext);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (values, actions) => {
        const submitValues = _.pickBy(values, (value, key) => key !== 'logo');
        console.log(submitValues);

        createOrganization(userCtx.token, values)
            .then(async (response) => {
                if (response.ok) {
                    setSubmitted(true);
                    return true;
                }
                const result = result.json();
                if (result.error) {
                    setError(result.error);
                } else {
                    setError('Error adding Organization: ' + response.statusText);
                }
                
                return false;
            })
            .catch(e => {
                console.error(e);
                return false;
            });
        return true;
    };

    return (
        <div className="text-white px-0 px-lg-2 px-xl-4">
			<Card className="card-box">
				<div className="card-header">
					<div className="card-header--title">
					    <small>Create Organization</small>
					</div>
					<div className="card-header--actions">
                        {/* Actions */}
					</div>
				</div>
				<div>
					<div className="bg-secondary mb-3">
                        {/* Header */}
                    </div>

                    { error && <Error message={error} /> }

                    { isSubmitted ? (
                        <Finished />
                    ) : (
                        <Formik
                            initialValues={initialData}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}>
                                {(FormProps) => (
                                    <Form id="organization-add-form">   
                                        
                                        <OrganizationForm {...FormProps} />

                                        <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                            <Button
                                                className="btn-primary font-weight-bold"
                                                disabled={FormProps.isSubmitting}
                                                type="submit">
                                                    Add Organization
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                        </Formik>
                    )}
				</div>
			</Card>
		</div>
    )
}

export default OrganizationAddForm;