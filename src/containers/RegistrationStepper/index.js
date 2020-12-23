import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Card,
  MenuItem,
  Button,
  Tooltip,
  TextField,
  FormControl,
  Select
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import BusinessIcon from '@material-ui/icons/Business';
import ChatIcon from '@material-ui/icons/Chat';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';
import ImageUpload from '../../components/ImageUpload';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Step1 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
			<h5 className="font-size-xl mb-1 font-weight-bold">
				Organization Info
			</h5>
			<p className="text-black-50 mb-4">
				Enter information about your organization.
			</p>
		  	<Grid container spacing={4}>
				<Grid item md={6} lg={6} className="mt-2">
					<Grid container spacing={3}>
						<Grid item md={12}>
							<TextField
								fullWidth
								name="orgName"
								label="Organization Name"
								type="text"
								variant="outlined"
							/>
						</Grid>

						<Grid item md={6}>
							<TextField
								name="addressLine1"
								fullWidth
								label="Address"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={6}>
							<TextField
								name="addressLine2"
								fullWidth
								label="Address 2"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								name="city"
								fullWidth
								label="City"
								multiline
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								name="state"
								fullWidth
								label="State/Province"
								variant="outlined"
							/>
						</Grid>
						<Grid item md={4}>
							<TextField
								name="country"
								fullWidth
								label="Country"
								variant="outlined"
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid md={6} lg={6}>
					<ImageUpload 
						title="Organization Logo" 
						subtitle="Upload your organization logo" 
						description="The logo should be 16:9 (wider than taller)." />
				</Grid>
			</Grid>
        </div>
      </Container>
    </>
  );
};
const Step2 = () => {
  const [state, setState] = useState('');

  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <>
      <Container>
        <div className="p-4">
			<h5 className="font-size-xl mb-1 font-weight-bold">
				Social Media
			</h5>
			<p className="text-black-50 mb-4">Enter your social media sites.</p>
			<Grid container spacing={2}>
				<Grid item md={12}>
					<TextField
						name="about"
						label="About your organization"
						fullWidth
						multiline
						rows={3}
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="website"
						label="Website"
						fullWidth
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="addressLine2"
						fullWidth
						label="Facebook"
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="twitch"
						label="Twitch"
						fullWidth
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="discord"
						fullWidth
						label="Discord Server"
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="instagram"
						label="Instagram"
						fullWidth
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="twitter"
						fullWidth
						label="Twitter"
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="youtube"
						label="Youtube"
						fullWidth
						variant="outlined"
					/>
				</Grid>
				<Grid item md={6}>
					<TextField
						name="patreon"
						fullWidth
						label="Patreon"
						variant="outlined"
					/>
				</Grid>
			</Grid>
        </div>
      </Container>
    </>
  );
};
const Step3 = () => {
  return (
    <>
      <Container>
        <div className="p-4">
          <h5 className="font-size-xl mb-1 font-weight-bold">
            User Profile
          </h5>
          <p className="text-black-50 mb-4">
            Fill out your profile details
          </p>
          <Grid container spacing={6}>
            <Grid item md={6}>
				<Grid item md={12}>
					<TextField
						name="birthday"
						fullWidth
						label="Birthday"
						variant="outlined"
					/>
				</Grid>
			</Grid>
			<Grid md={6} lg={6}>
				<ImageUpload 
					title="Profile Image" 
					subtitle="Upload your image" 
					description="The profile image should be a square." />
			</Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

function StepIcon(props) {
  const { active, completed } = props;

  const icons = {
    1: <BusinessIcon />,
    2: <ChatIcon />,
    3: <AccountBoxIcon />
  };

  return (
    <div
      className={clsx(
        'd-50 transition-base d-flex align-items-center bg-gray-400 justify-content-center rounded',
        {
          'd-80 bg-primary text-white shadow-primary-sm': active,
          'd-50 bg-success text-white shadow-success-sm': completed
        }
      )}>
      {completed ? <Check className="completed" /> : icons[String(props.icon)]}
    </div>
  );
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node
};

function getSteps() {
  return ['Organization Info', 'Social Media', 'User Profile'];
}

function getStepContent(step) {
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
}

export default function LivePreviewExample() {
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
    	<div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100" style={{minHeight: "100vh"}}>
			<div className="flex-grow-1 w-100 d-flex align-items-center">
				<div className="bg-composed-wrapper--image opacity-8" style={{ backgroundImage: 'url(' + hero + ')' }} />
				<div className="bg-composed-wrapper--bg bg-white opacity-6" />
				<div className="bg-composed-wrapper--bg bg-beacons opacity-6" />
			<div className="bg-composed-wrapper--content text-center p-5">
				<div className="text-center">
					<div className="my-4">
						<img alt="beacons.gg" src={logo} height={60} />
					</div>
				</div>
				<div className="text-white px-0 px-lg-2 px-xl-4">
					<Card className="card-box">
						<div className="card-header">
							<div className="card-header--title">
							<small>Registration</small>
							{ activeStep < steps.length &&
								<b>Registration {activeStep+1} of {steps.length}</b>
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
			</div>
			</div>
		</div>
  );
}
