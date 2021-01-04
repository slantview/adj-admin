import React from 'react';
import {
  Grid,
  Container,
  TextField
} from '@material-ui/core';
import ImageUpload from '../../components/ImageUpload';

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
              <Grid item md={12} lg={12}>
                  <Grid item md={12} lg={12}>
                      <TextField
                          name="birthday"
                          fullWidth
                          label="Birthday"
                          variant="outlined"
                      />
                  </Grid>
                  <Grid item md={12} lg={12}>
                      <ImageUpload 
                          title="Profile Image" 
                          subtitle="Upload your image" 
                          description="The profile image should be a square." />
                  </Grid>
                  
              </Grid>
            </Grid>
          </div>
        </Container>
      </>
    );
  };

  export default Step3;