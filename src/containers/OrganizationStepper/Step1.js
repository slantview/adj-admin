import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Grid,
  Container,
  TextField
} from '@material-ui/core';

import ImageUpload from '../../components/ImageUpload';

const Step1 = () => {
    return (
      <>
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
                  <Grid item md={6} lg={6} className="mt-2">
                      <Grid container spacing={3}>
                          <Grid item md={12} lg={12}>
                              <TextField
                                  fullWidth
                                  name="orgName"
                                  label="Organization Name"
                                  type="text"
                                  variant="outlined"
                              />
                          </Grid>
  
                          <Grid item md={6} lg={6}>
                              <TextField
                                  name="addressLine1"
                                  fullWidth
                                  label="Address"
                                  variant="outlined"
                              />
                          </Grid>
                          <Grid item md={6} lg={6}>
                              <TextField
                                  name="addressLine2"
                                  fullWidth
                                  label="Address 2"
                                  variant="outlined"
                              />
                          </Grid>
                          <Grid item md={6} lg={6}>
                              <TextField
                                  name="city"
                                  fullWidth
                                  label="City"
                                  multiline
                                  variant="outlined"
                              />
                          </Grid>
                          <Grid item md={6} lg={6}>
                              <TextField
                                  name="state"
                                  fullWidth
                                  label="State/Province"
                                  variant="outlined"
                              />
                          </Grid>
                          <Grid item md={6} lg={6}>
                              <TextField
                                  name="postalCode"
                                  fullWidth
                                  label="Postal Code"
                                  variant="outlined"
                              />
                          </Grid>
                          <Grid item md={6} lg={6}>
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

  export default Step1;