import React, { useState, useContext } from 'react';
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
import * as Yup from 'yup';

const getSteps = () => {
  	return ['Organization Info', 'Social Media'];
};

const getStepContent = (step, onChange, values, errors, touched) =>  {
	switch (step) {
		case 0:
			return <Step1 
				validation={getStepValidation(step)} 
				onChange={onChange} 
				values={values}
				errors={errors} 
				touched={touched} 
			/>;
		case 1:
			return <Step2 
				validation={getStepValidation(step)} 
				onChange={onChange} 
				values={values}
				errors={errors} 
				touched={touched} 
			/>;
		default:
			return <Error message="Not Found" />;
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

const isStepValid = async (step, data) => {
	return getStepValidation(step).isValid();
};

const OrganizationStepper = () => {
	const history = useHistory();
	const userCtx = useContext(UserContext);

	const [error, setError] = useState(null);
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = async () => {
		const isValid = await isStepValid(activeStep, values);
		if (!isValid) {
			await getStepValidation(activeStep)
				.validate(values)
				.catch(e => {
					setError(e.errors.join(', '));
				});
			return false;
		}
		switch (activeStep) {
			case 0:
				setError(null);
				submitStep1();
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
		return true;
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	
	const handleFinish = () => {
		history.push("/admin/organizations");
	};

	const handleChange = (e) => {
		console.log('Setting ' + e.target.name + ' to ' + e.target.value);
		let newValues = values;
		newValues[e.target.name] = e.target.value;
		setValues(newValues);

		// let newErrors = errors;
		// await getStepValidation(activeStep)
		// 	.validate(values)
		// 	.catch(err => {
		// 		console.log(err);
		// 		err.errors.map(error => {
		// 			console.log(error);
		// 		});
		// 	});
		// setErrors(newErrors);
		
		// let newTouched = touched;
		// newTouched[e.target.name] = true;
		// setTouched(newTouched);
	};

	const getDefaultValues = (step) => {
		switch (step) {
			case 0:
				return Step1InitialData;
			case 1:
				return Step2Schema;
			default:
				return {};
		}
	};

	const getDefaultTouched = (step) => {
		switch (step) {
			case 0:
				return {
					name: false,
					address_line_1: false,
					address_line_2: false,
					city: false,
					state: false,
					postal_code: false,
					country: false
				}
		}
	};

	const getDefaultErrors = (step) => {
		switch (step) {
			case 0:
				return {
					name: null,
					address_line_1: null,
					address_line_2: null,
					city: null,
					state: null,
					postal_code: null,
					country: null
				}
		}
	};
	const submitStep1 = () => {
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

	const [values, setValues] = useState(getDefaultValues(0));
	const [errors, setErrors] = useState(getDefaultErrors(0));
	const [touched, setTouched] = useState(getDefaultTouched(0));

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
						{steps.map((label) => (
						<Step key={label}>
							<StepLabel StepIconComponent={StepIcon}>{label}</StepLabel>
						</Step>
						))}
					</Stepper>
					</div>
					{activeStep === steps.length ? (
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
						<div>
							{ error &&
								<Error message={error} />
							}
							<div>{getStepContent(activeStep, handleChange, values, errors, touched)}</div>
							<div className="card-footer mt-4 p-4 d-flex align-items-center justify-content-between bg-secondary">
							<Button
								disabled={activeStep === 0}
								className="btn-primary font-weight-bold"
								onClick={handleBack}>
								Back
							</Button>
							<Button
								className="btn-primary font-weight-bold"
								onClick={handleNext}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
							</div>
						</div>
					)}
				</div>
			</Card>
		</div>
  );
};

export default OrganizationStepper;
