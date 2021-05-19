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
import RuleForm from 'components/RuleForm';
import { NotificationContext } from 'providers/NotificationProvider';
import { CREATE_GAME_RULE_LIST } from 'queries/rules';

const initialData = {
    title: '',
    description: '',
    games: []
};
const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    games: Yup.array().min(1, "Game is required").required('Game is required')
});

const RulesAddForm = (props) => {
    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const client = useApolloClient();
    const [addRule] = useMutation(CREATE_GAME_RULE_LIST);
    const [isSubmitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (values, actions) => {
        setSubmitted(true);
        
        let newRule = Object.assign({}, values);
        newRule.games = values.games.map(g => g.value);

        addRule({ variables: { payload: { data: newRule }}})
            .then((ret) => {
                const createdRule = ret.data.createGameRuleList.gameRuleList;
                client.resetStore()
                    .then(() => {
                        notify({
                            type: 'success',
                            message: "Successfully added rule: " + createdRule.title
                        });
                        history.push('/rules', { refresh: true });
                    });
            }).catch(e  => {
                setError(e.toString());
            });
    };

    if (isSubmitted) {
        return (
            <div className="text-center m-5">
                <Loading center={true} showTimeout={false} />
                <h3 className="mt-3">Creating Rule...</h3>
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
                                                    <RuleForm {...FormProps} />

                                                    <div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
                                                        <FormSubmitButton
                                                            showNotificationOnError={true}
                                                            title="Add Rule"
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

export default RulesAddForm;
