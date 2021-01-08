import React, { useState } from 'react';
import {
  Grid,
  Container,
  TextField
} from '@material-ui/core';

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
                    <Grid item md={12} lg={12}>
                        <TextField
                            name="about"
                            label="About your organization"
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="website"
                            label="Website"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="addressLine2"
                            fullWidth
                            label="Facebook"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="twitch"
                            label="Twitch"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="discord"
                            fullWidth
                            label="Discord Server"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="instagram"
                            label="Instagram"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="twitter"
                            fullWidth
                            label="Twitter"
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="youtube"
                            label="Youtube"
                            fullWidth
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <TextField
                            name="patreon"
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