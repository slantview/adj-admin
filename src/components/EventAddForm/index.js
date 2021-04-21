import { Button, Card } from '@material-ui/core';
import Error from 'components/Error';
import Loading from 'components/Loading';
import Finished from 'components/OrganizationAddForm/Finished';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import EventForm from './EventForm';

const initialData = {
    title: '',
    description: '',
    is_online: true,
    is_offline: false,
    starts_at: new Date(),
    ends_at: new Date()
};
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    starts_at: Yup.date().required("Starts At is required"),
    ends_at: Yup.date().required("Ends At is required"),
    logo: Yup.array().required('Logo Image is required'),
    card: Yup.array().required('Card Image is required'),
    sign_up_link: Yup.string().required('Sign Up Link is required'),
});

function EventAddForm(props) {
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (values, actions) => {
        // setSubmitted(true);
    };

    return (
        <div className="text-white px-0 px-lg-2 px-xl-4">
			<Card className="card-box">
				<div className="card-header">
					<div className="card-header--title">
					    <small>Create Event</small>
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
                                                <Loading center={true} />
                                                <h3 className="mt-3">Creating Event...</h3>
                                            </div>
                                        ) : (
                                            <div>
                                                <EventForm {...FormProps} />

                                                <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                    <Button
                                                        className="btn-primary font-weight-bold"
                                                        type="submit">
                                                            Add Event
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
    )
}

export default EventAddForm;
