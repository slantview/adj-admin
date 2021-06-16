import { Card } from '@material-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup';

import Error from 'components/Error';
import FormSubmitButton from 'components/FormSubmitButton';
import Finished from 'components/OrganizationAddForm/Finished';

import PageForm from './PageForm';

const validationSchema = Yup.object({
    title: Yup.string().required(),
    description: Yup.string().required()
})

const PageEditForm = (props) => {
    const {
        handleSubmit,
        pageData
    } = props;

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null);

    const initialData = {
            title: pageData?.title,
            subtitle: pageData?.subtitle,
            description: pageData?.description,
            header: pageData?.header,
            use_hero_title_text: pageData?.use_hero_title_text
    };

    return (
        <>
            <div className="text-white mb-5">
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
                                enableReinitialize={true}
                                onSubmit={handleSubmit}>
                                    {(FormProps) => (
                                        <Form id="organization-add-form"> 
                                            { !FormProps.isSubmitting && 
                                                <div>
                                                    <PageForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Update Page"
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

export default PageEditForm;
