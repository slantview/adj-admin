import { Grid, Switch, TextField as MTextField } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

const EventCloneForm = (props) => {
    const {
        values,
        setFieldValue
    } = props;
    
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-2">
                <Field
                    component={TextField}
                    fullWidth
                    name="title"
                    label="Event Title"
                    type="text"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Field
                    component={TextField}
                    name="starts_at"
                    type="date"
                    label="Starts At"
                    placeholder=""
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                <Field
                    component={TextField}
                    name="ends_at"
                    type="date"
                    label="Ends At"
                    placeholder=""
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-2">
                <Field
                    component={TextField}
                    fullWidth
                    name="sign_up_link"
                    label="Sign Up Link"
                    type="text"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} className="mt-2">
                <span>Copy Tournament Data?</span>
                <Switch
                    type="checkbox" 
                    name="copy_tournament_data"
                    checked={values.copy_tournament_data}
                    onChange={() => setFieldValue('copy_tournament_data', !values.copy_tournament_data)}
                />
            </Grid>
        </Grid>
    )
}

export default EventCloneForm;
