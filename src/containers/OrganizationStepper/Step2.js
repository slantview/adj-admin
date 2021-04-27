import React, { useState } from 'react';
import {
  Grid,
  Container,
  TextField
} from '@material-ui/core';
import { useFormikContext, Field } from 'formik';

const Step2 = (props) => {
	const { 
        values,
        errors,
        touched,
        setFieldValue
    } = useFormikContext();
    
    return (
      <>
        <Container>
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
      </>
    );
  };
  
  export default Step2;