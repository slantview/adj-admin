import React, { useState } from 'react';
import * as Yup from 'yup';
import {
  Grid,
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import ImageUpload from '../../components/ImageUpload';

const Step1Form = (props) => {
	const {
		values,
		errors,
		touched,
		onChange
    } = props;

    return (
        <Container>
          <div className="p-4">
              <h5 className="font-size-xl mb-1 font-weight-bold">
                  Organization Info
              </h5>
              <p className="text-black-50 mb-4">
                  To get started, we need to create an Organization. An Organization is the place to contain all of your 
                  Series, Events, and Tournaments as well as your social media connections and websites. You can have more
                  than one Organization that you manage, and you can assign additional admins to your Organization. An 
                  Organization also maps one to one with an events site.
              </p>
                <Grid container spacing={4}>
                  <Grid item md={12} lg={12} className="mt-2">
                      <Grid container spacing={3}>
                            <Grid item md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    label="Organization Name"
                                    type="text"
                                    variant="outlined"
                                    value={values.name}
                                    onChange={onChange}
                                    error={touched.name && Boolean(errors.name)}
                                />
                                <span className="text-danger">{errors.name}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    name="address_line_1"
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    value={values.address_line_1}
                                    onChange={onChange}
                                    error={touched.address_line_1 && Boolean(errors.address_line_1)}
                                />
                                <span className="text-danger">{errors.address_line_1}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    name="address_line_2"
                                    fullWidth
                                    label="Address 2"
                                    variant="outlined"
                                    value={values.address_line_2}
                                    onChange={onChange}
                                    error={touched.address_line_2 && Boolean(errors.address_line_2)}
                                />
                                <span className="text-danger">{errors.address_line_2}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    name="city"
                                    fullWidth
                                    label="City"
                                    variant="outlined"
                                    value={values.city}
                                    onChange={onChange}
                                    error={touched.city && Boolean(errors.city)}
                                />
                                <span className="text-danger">{errors.city}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    name="state"
                                    fullWidth
                                    label="State/Province"
                                    variant="outlined"
                                    value={values.state}
                                    onChange={onChange}
                                />
                                <span className="text-danger">{errors.state}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <TextField
                                    name="postal_code"
                                    fullWidth
                                    label="Postal Code"
                                    variant="outlined"
                                    value={values.postal_code}
                                    onChange={onChange}
                                />
                                <span className="text-danger">{errors.postal_code}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
                                <Select
                                    name="country"
                                    fullWidth
                                    label="Country"
                                    value={values.country}
                                    onChange={onChange}
                                    variant="outlined">
                                        <MenuItem dense={true} className="font-size-sm" value="CAN">Canada</MenuItem>
                                        <MenuItem dense={true} className="font-size-sm" value="USA">United States of America</MenuItem>
                                </Select>
                                <span className="text-danger">{errors.country}</span>
                            </Grid>
                      </Grid>
                  </Grid>
                  <Grid md={12} lg={12}>
                      <ImageUpload 
                          title="Organization Logo" 
                          subtitle="Upload your organization logo" 
                          description="1280x640" />
                  </Grid>
              </Grid>
          </div>
        </Container>
    );
  };

  const Step1 = (props) => {
    const {
        onChange,
        values,
        touched,
        errors
    } = props;

	return (
        <Step1Form 
            onChange={onChange} 
            values={values}
            errors={errors}
            touched={touched} />
	)
  };

  export default Step1;