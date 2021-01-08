import React, { useState } from 'react';
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
import Step2 from './Step2';
import Step3 from './Step3';
import StepIcon from './StepIcon';

const getSteps = () => {
  	return ['Organization Info', 'Social Media', 'Events Site'];
};

const getStepContent = (step) =>  {
	switch (step) {
		case 0:
			return <Step1 />;
		case 1:
			return <Step2 />;
		case 2:
			return <Step3 />;
		default:
			return <Step1 />;
	}
};

const OrganizationStepper = () => {
	const history = useHistory();

	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	
	const handleFinish = () => {
		history.push("/");
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
								<span className="btn-wrapper--label">Continue to dashboard</span>
							</Button>
						</div>
					</div>
					) : (
					<div>
						<div>{getStepContent(activeStep)}</div>
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
