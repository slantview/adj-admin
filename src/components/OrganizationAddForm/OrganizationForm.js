import React from 'react';
import {
    Container,
    Grid,
    MenuItem
} from '@material-ui/core';
import { Field } from 'formik';
import ImageUpload from '../../components/ImageUpload';
import { 
    TextField,
    Select
} from 'formik-material-ui';

const OrganizationForm = (props) => {
    console.log(props);
    const { 
		values,
		errors,
		touched,
		handleChange,
		handleSubmit,
		isValid,
		isSubmitting,
		setFieldTouched,
		submitCount,
        setFieldValue
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
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="name"
                                        label="Organization Name"
                                        type="text"
                                        variant="outlined"
                                    />
                                    {/* <span className="text-danger">{errors.name}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="address_line_1"
                                        fullWidth
                                        label="Address"
                                        variant="outlined"
                                    />
                                    {/* <span className="text-danger">{errors.address_line_1}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="address_line_2"
                                        fullWidth
                                        label="Address 2"
                                        variant="outlined"
                                        error=""
                                    />
                                    {/* <span className="text-danger">{errors.address_line_2}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="city"
                                        fullWidth
                                        label="City"
                                        variant="outlined"
                                    />
                                    {/* <span className="text-danger">{errors.city}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="state"
                                        fullWidth
                                        label="State/Province"
                                        variant="outlined"
                                    />
                                    {/* <span className="text-danger">{errors.state}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        name="postal_code"
                                        fullWidth
                                        label="Postal Code"
                                        variant="outlined"
                                    />
                                    {/* <span className="text-danger">{errors.postal_code}</span> */}
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        name="country"
                                        component={Select}
                                        fullWidth
                                        label="Country"
                                        // value={values.country}
                                        variant="outlined">
                                            <MenuItem dense={true} className="font-size-sm" value="CAN">Canada</MenuItem>
                                            <MenuItem dense={true} className="font-size-sm" value="USA">United States of America</MenuItem>
                                    </Field>
                                    {/* <span className="text-danger">{errors.country}</span> */}
                                </Grid>
                        </Grid>
                    </Grid>
                    <Grid md={12} lg={12}>
                        
                        <ImageUpload 
                            name="logo"
                            title="Organization Logo" 
                            subtitle="Upload your organization logo" 
                            description="1280x640"
                            setFieldValue={setFieldValue}
                            error={errors.logo}
                        />
                    </Grid>
                </Grid>   
            </div>
            <div className="p-4">
                <h5 className="font-size-xl mb-1 font-weight-bold">
                    Social Media
                </h5>
                <p className="text-black-50 mb-4">Enter your social media sites.</p>
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12}>
                        <Field
                            name="about"
                            component={TextField}
                            label="About your organization"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="website"
                            component={TextField}
                            label="Website"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="email"
                            component={TextField}
                            label="Email"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="facebook"
                            component={TextField}
                            fullWidth
                            label="Facebook"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="twitch"
                            component={TextField}
                            label="Twitch"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="discord"
                            component={TextField}
                            fullWidth
                            label="Discord Server"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="instagram"
                            component={TextField}
                            label="Instagram"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="twitter"
                            component={TextField}
                            fullWidth
                            label="Twitter"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="youtube"
                            component={TextField}
                            label="Youtube"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="linkedin"
                            component={TextField}
                            label="LinkedIn"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field
                            name="patreon"
                            component={TextField}
                            fullWidth
                            label="Patreon"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default OrganizationForm;