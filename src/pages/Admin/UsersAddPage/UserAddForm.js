import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Error from '../../../components/Error';

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
Yup.addMethod(Yup.string, 'equalTo', equalTo);

let validationSchema = Yup.object({
	password2: Yup.string().equalTo(Yup.ref('password'), 'Passwords must match').required('Password confirm is required'),
	password: Yup.string().required('Password is required'),
	email: Yup.string().email('Email must be a valid format (e.g. user@example.com)').required('Email is required'),
	last_name: Yup.string().required("Last name is required"),
    first_name: Yup.string().required('First name is required')
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
            <div className="flex-grow-1 w-100 d-flex align-items-center">
                <div className="bg-composed-wrapper--content">
                <Grid container spacing={6} className="px-5">
                    <Grid item lg={6} className="align-items-center">
                        <Grid item lg={6}>
                            <div className="mb-3">
                                { errors && errors.api &&
                                    <Error message={errors.api} />
                                }
                                <label className="font-weight-bold mb-2">
                                    First Name
                                </label>
                                <TextField
                                    name="first_name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.first_name}
                                    error={touched.first_name && Boolean(errors.first_name)}
                                    placeholder="First name"
                                />
                                <span className="text-danger">{errors.first_name}</span>
                            </div>
                            <div className="mb-3">
                                <label className="font-weight-bold mb-2">
                                    Last Name
                                </label>
                                <TextField
                                    name="last_name"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={handleChange}
                                    value={values.last_name}
                                    error={touched.last_name && Boolean(errors.last_name)}
                                    placeholder="Last name"
                                />
                                <span className="text-danger">{errors.last_name}</span>
                                
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
                                    placeholder="Email address"
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
                                    placeholder="Password"
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
                                    placeholder="Password again"
                                    type="password"
                                />
                                <span className="text-danger">{errors.password2}</span>
                            </div>

                            <div className="mb-3">
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        name="admin"
                                        checked={values.checked}
                                        onChange={handleChange}
                                        value={values.admin}
                                        color="primary"
                                    />
                                    }
                                    label="Admin User"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="medium"
                                disabled={isSubmitting}
                                className="btn-primary my-3">
                                    Create Account
                            </Button>
                            
                        </Grid>
                    </Grid>
                </Grid>
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
				first_name: '',
				last_name: '',
				email: '',
				password: '',
                password2: '',
                admin: false
			}}
			validationSchema={validationSchema}
			onSubmit={submit}>
				{RegisterPage1Form}
		</Formik>
	)
}

