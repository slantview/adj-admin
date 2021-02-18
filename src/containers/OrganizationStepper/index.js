import React, { useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  Button
} from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { useHistory } from 'react-router-dom';
import Step1 from './Step1';
import Step1InitialData from './Step1.initialData';
import Step1Schema from './Step1.schema';
import Step2 from './Step2';
import Step2InitialData from './Step2.initialData';
import Step2Schema from './Step2.schema';
import StepIcon from './StepIcon';
import { createOrganization } from '../../utils/api';
import { UserContext } from '../../providers/UserProvider';
import Error from '../../components/Error';
import { Formik, Form } from 'formik';
import _ from 'lodash';

const getSteps = () => {
  	return ['Organization Info', 'Social Media'];
};

const getStepContent = (step) =>  {
	switch (step) {
		case 0:
			return <Step1 />;
		case 1:
			return <Step2 />;
		default:
			return <Error message="Step Not Found" />;
	}
};

const getStepValidation = (step) => {
	switch (step) {
		case 0:
			return Step1Schema;
		case 1:
			return Step2Schema;
	}
};

const getDefaultValues = (step) => {
	switch (step) {
		case 0:
			return Step1InitialData;
		case 1:
			return Step2InitialData;
		default:
			return {};
	}
};

const isStepValid = async (step, data) => {
	return getStepValidation(step).isValid();
};

const OrganizationStepper = () => {
	const history = useHistory();
	const userCtx = useContext(UserContext);

	const [data, setData] = useState({});
	let allData = useRef();

	const [error, setError] = useState(null);
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();
	const isLastStep = activeStep === steps.length - 1;

	const handleBack = () => {
		// actions.setTouched({});
		// actions.setSubmitting(false);
		// actions.setErrors({})
		// actions.setValues(getDefaultValues(activeStep - 1));
		setActiveStep(activeStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	
	const handleFinish = () => {
		history.push("/admin/organizations");
	};

	const handleSubmit = (values, actions, e) => {
		console.log('handleSubmit', values, actions);
		allData.current = _.merge(allData.current, values);
		console.log('allData', allData.current);

		if (!isLastStep) {
			actions.setTouched({});
			actions.setSubmitting(false);
			// actions.setValues(getDefaultValues(activeStep + 1))
			setActiveStep( prevStep => prevStep + 1);
			
		} else {
			console.log('Submitting data', allData.current);
			submitForm(allData);
		}
	};

	const submitForm = (values) => {
		createOrganization(userCtx.token, values)
			.then((response) => {
				if (response.ok) {
					const result = response.json();
					console.log(result);
					return true;
				}
				return false;
			})
			.catch(e => {
				console.log(e);
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
					{ activeStep < steps.length &&
						<b>Step {activeStep+1} of {steps.length}</b>
					}
					{ activeStep === steps.length &&
						<b>Finished</b>
					}
					</div>
					<div className="card-header--actions">
					
					</div>
				</div>
				<div>
					<div className="bg-secondary mb-3">
					<Stepper
						className="stepper-horizontal-1"
						alternativeLabel
						activeStep={activeStep}
						connector={<StepConnector />}>
							{ steps.map((label) => (
								<Step key={label}>
									<StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
								</Step>
							))}
					</Stepper>
					</div>
					{ activeStep === steps.length ? (

						<div className="text-center p-5">
							<div className="avatar-icon-wrapper rounded-circle m-0">
							<div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-success text-success m-0 d-130">
								<FontAwesomeIcon
									icon={['fas', 'check']}
									className="d-flex align-self-center display-3"
								/>
							</div>
							</div>
							<h4 className="font-weight-bold mt-4">You are all done!</h4>
							<p className="mb-0 font-size-lg text-muted">
								Now let's get get started with your events.
							</p>
							<div className="pt-4">
								<Button
									onClick={handleFinish}
									className="btn-primary font-weight-bold hover-scale-lg mx-1 p-2"
									size="small">
									<span className="btn-wrapper--label">Finish</span>
								</Button>
							</div>
						</div>
					) : (
						<Formik
							initialValues={getDefaultValues(activeStep)}
							validationSchema={getStepValidation(activeStep)}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form id={"organization-add-form-" + activeStep}>
									{ error &&
										<Error message={error} />
									}

									<div>{getStepContent(activeStep)}</div>
									
									<div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
										<Button
											// type="submit"
											disabled={activeStep === 0}
											onClick={handleBack}
											className="btn-primary font-weight-bold">
											Back
										</Button>
										<Button
											className="btn-primary font-weight-bold"
											disabled={isSubmitting}
											type="submit">
												{isLastStep ? 'Finish' : 'Next'}
										</Button>
									</div>
								</Form>
							)}
						</Formik>
					)}
				</div>
			</Card>
		</div>
  );
};

export default OrganizationStepper;
