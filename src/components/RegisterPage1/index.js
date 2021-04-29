import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Error from '../Error';

import hero from '../../assets/images/hero-bg/hero-arena.jpg';
import logo from '../../assets/images/logo.png';

function equalTo(ref, msg) {
	return Yup.mixed().test({
	  name: 'equalTo',
	  exclusive: false,
	  message: msg || '${path} must be the same as ${reference}',
	  params: {
		reference: ref.path,
	  },
	  test: function(value) {
		return value === this.resolve(ref);
	  },
	});
}
// @ts-ignore
Yup.addMethod(Yup.string, 'equalTo', equalTo);

let validationSchema = Yup.object({
	// @ts-ignore
	password2: Yup.string().equalTo(Yup.ref('password'), 'Passwords must match').required('Password confirm is required'),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email('Email must be a valid format (e.g. user@example.com)').required('Email is required'),
	lastName: Yup.string().required("Last name is required"),
	firstName: Yup.string().required('First name is required')
});

const RegisterPage1Form = (props) => {
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
							<Grid item lg={7} xl={6} className="d-flex align-items-center">
							<Grid item md={10} lg={8} xl={7} className="mx-auto">
								<div className="py-4">
								<div className="text-center">
									<div className="my-4">
										<img alt="beacons.gg" src={logo} height={60} />
									</div>
									<h3 className="display-4 mb-2 font-weight-bold">
										Create account
									</h3>
									<p className="font-size-lg mb-5 text-black-50">
										Start growing your events. Sign up to start using Beacons today.
									</p>
								</div>
								<div className="mb-3">
									{ errors && errors.api &&
										<Error message={errors.api} />
									}
									<Grid container spacing={4} direction="row">
										<Grid item lg={6}>
											<label className="font-weight-bold mb-2">
											First Name
											</label>
											<TextField
												name="firstName"
												variant="outlined"
												size="small"
												fullWidth
												onChange={handleChange}
												value={values.firstName}
												error={touched.firstName && Boolean(errors.firstName)}
												placeholder="Enter your first name"
											/>
											<span className="text-danger">{errors.firstName}</span>
										</Grid>
										<Grid item lg={6}>
											<label className="font-weight-bold mb-2">
											Last Name
											</label>
											<TextField
												name="lastName"
												variant="outlined"
												size="small"
												fullWidth
												onChange={handleChange}
												value={values.lastName}
												error={touched.lastName && Boolean(errors.lastName)}
												placeholder="Enter your last name"
											/>
											<span className="text-danger">{errors.lastName}</span>
										</Grid>
									</Grid>
									
								</div>
								<div className="mb-3">
									<label className="font-weight-bold mb-2">
										Email address
									</label>
									<TextField
										name="email"
										variant="outlined"
										size="small"
										fullWidth
										onChange={handleChange}
										value={values.email}
										error={touched.email && Boolean(errors.email)}
										placeholder="Enter your email address"
										type="email"
									/>
									<span className="text-danger">{errors.email}</span>
								</div>
								<div className="mb-3">
									<div className="d-flex justify-content-between">
										<label className="font-weight-bold mb-2">
											Password
										</label>
									</div>
									<TextField
										name="password"
										variant="outlined"
										size="small"
										fullWidth
										onChange={handleChange}
										value={values.password}
										error={touched.password && Boolean(errors.password)}
										placeholder="Enter your password"
										type="password"
										className="mb-2"
									/>
									<span className="text-danger">{errors.password}</span>
									<TextField
										name="password2"
										variant="outlined"
										size="small"
										fullWidth
										onChange={handleChange}
										value={values.password2}
										error={touched.password2 && Boolean(errors.password2)}
										placeholder="Enter your password again"
										type="password"
									/>
									<span className="text-danger">{errors.password2}</span>
								</div>
								
								<div className="form-group mb-5">
									By clicking the <strong>Create account</strong>{' '}
									button below you agree to our terms of service and
									privacy statement.
								</div>

								<Button
									type="submit"
									size="large"
									fullWidth
									disabled={isSubmitting}
									className="btn-primary mb-3">
										Create Account
								</Button>
								</div>
								<div className="text-center">
									<span>Already have an account? </span>
									<Link
										to="/login"
										className="text-first"
										>
											Sign In
									</Link>
								</div>
							</Grid>
							</Grid>
							<Grid item lg={5} xl={6} className="d-flex">
								<div className="hero-wrapper w-100 bg-composed-wrapper min-vh-lg-100">
									<div className="flex-grow-1 w-100 d-flex align-items-center">
										<div className="bg-composed-wrapper--image opacity-8" style={{ backgroundImage: 'url(' + hero + ')' }} />
										<div className="bg-composed-wrapper--bg bg-white opacity-6" />
										<div className="bg-composed-wrapper--bg bg-beacons opacity-6" />
									<div className="bg-composed-wrapper--content text-center p-5">
										<div className="text-white px-0 px-lg-2 px-xl-4">
										<h1 className="display-3 mb-4 font-weight-bold">
											Register today to start growing your events
										</h1>
										<p className="font-size-lg mb-0 opacity-8">
											Beacons helps you grow your events.
										</p>
										<div className="divider mx-auto border-1 my-5 border-light opacity-2 rounded w-25" />
										</div>
									</div>
									</div>
								</div>
							</Grid>
						</Grid>
						</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		</Form>
	);
};

export default function RegisterPage1(props) {
	const { 
		submit,
		error
	 } = props;

	return (
		<Formik
			initialValues={{
				firstName: '',
				lastName: '',
				email: '',
				password: '',
				password2: ''
			}}
			validationSchema={validationSchema}
			onSubmit={submit}>
				{RegisterPage1Form}
		</Formik>
	)
}

