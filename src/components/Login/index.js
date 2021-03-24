import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Hidden
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth } from '../../utils/firebase';
import { useHistory } from 'react-router-dom';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import Error from '../Error';
import _ from 'lodash';
import { UserContext } from '../../providers/UserProvider';

let validationSchema = Yup.object({
	checked: Yup.bool(),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email('Email must be a valid format (e.g. user@example.com)').required('Email is required')
});

export default function Login() {
	const history = useHistory();
	
	const userCtx = useContext(UserContext);

	useEffect(() => {
		if (userCtx.user && !userCtx.expired) {
			history.push("/");
		}
	}, [userCtx.expired, userCtx.user])

    const signInHandler = (values, { setErrors }) => {
		auth.signInWithEmailAndPassword(values.email, values.password)
			.then(result => {
				if (!result.confirmed) {
					history.push("/organization/add");
				} else {
					history.push("/");
				}
				return true;
			})
			.catch(e => {
				setErrors({api: _.get(e, ["message"])});
				console.error("Error signing in with password and email", e);
			});
	};

	return (
		<Formik 
			initialValues={{
				email: '',
				password: '',
				checked: true
			}}
			validationSchema={validationSchema}
			onSubmit={signInHandler}>
				{LoginForm}
		</Formik>
	)
}

const LoginForm = (props) => {
	const { 
		values,
		errors,
		touched,
		handleChange,
		handleSubmit,
		isValid,
		isSubmitting,
		setFieldTouched,
		submitCount
	} = props;

	return (
		<Form onSubmit={handleSubmit}>
			<div className="app-wrapper min-vh-100 bg-white">
				<div className="app-main min-vh-100">
				<div className="app-content p-0">
					<div className="app-inner-content-layout--main">
					<div className="flex-grow-1 w-100 d-flex align-items-center">
						<div className="bg-composed-wrapper--content">
						<Grid container spacing={0} className="min-vh-100">
							<Grid
								item
								sm={12}
								md={12}
								lg={7}
								xl={7}
								className="d-flex align-items-center">
								<Grid item sm={12} md={12} lg={8} xl={8} className="mx-auto">
									<div className="py-4">
										<div className="text-center">
											<Link
												to="/"
												title="beacons.gg"
												className="">
													<img alt="beacons.gg" src={logo} height={60} />
													<div className="app-nav-logo--text" style={{display:"none"}}>
														<b>admin.beacons.gg</b>
													</div>
											</Link>
											<div className="divider my-5" />
										</div>
										<div>
											{ errors && errors.api &&
												<Error message={errors.api} />
											}
											
											<div className="m-4">
												<TextField
													name="email"
													fullWidth
													variant="outlined"
													id="textfield-email"
													label="Email address"
													onChange={handleChange}
													value={values.email}
													error={touched.email && Boolean(errors.email)}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<MailOutlineTwoToneIcon />
															</InputAdornment>
														)
													}}
												/>
												<span className="text-danger">{errors.email}</span>
											</div>
											<div className="mb-3 mx-4">
												<TextField
													name="password"
													fullWidth
													variant="outlined"
													id="textfield-password"
													label="Password"
													type="password"
													onChange={handleChange}
													value={values.password}
													error={touched.password && Boolean(errors.password)}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<LockTwoToneIcon />
															</InputAdornment>
														)
													}}
												/>
												<span className="text-danger">{errors.password}</span>
											</div>
											<div className="d-flex justify-content-between align-items-center font-size-md mx-4">
												<FormControlLabel
													control={
													<Checkbox
														checked={values.checked}
														onChange={handleChange}
														value="checked"
														color="primary"
													/>
													}
													label="Remember me"
												/>
												<div>
													<Link
														to="/recover"
														className="text-first">
															Recover password
													</Link>
												</div>
											</div>
											<div className="text-center py-4">
												<Button 
													type="submit"
													className="btn-primary font-weight-bold w-50 my-2 mx-4">
														Sign in
												</Button>
											</div>
											<div className="text-center text-black-50 mt-3 mx-4">
												Don't have an account?{' '}
												<Link
													to="/register"
													className="text-first">
													Sign up
												</Link>
											</div>
										</div>
									</div>
								</Grid>
							</Grid>
							<Hidden mdDown>
								<Grid item lg={5} xl={5} className="d-flex">
									<div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100">
										<div className="flex-grow-1 w-100 d-flex align-items-center">
											<div className="bg-composed-wrapper--image opacity-8" style={{ backgroundImage: 'url(' + hero + ')' }} />
											<div className="bg-composed-wrapper--bg bg-white opacity-6" />
											<div className="bg-composed-wrapper--bg bg-beacons opacity-6" />
										<div className="bg-composed-wrapper--content text-center p-5">
											<div className="text-white px-0 px-lg-2 px-xl-4">
											<h1 className="display-3 mb-4 font-weight-bold">
												The tools you need to grow your events
											</h1>
											<p className="font-size-lg mb-0 opacity-8">
												Let's get started.
											</p>
											<div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
											</div>
										</div>
										</div>
									</div>
								</Grid>
							</Hidden>
						</Grid>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</Form>
	);
}
