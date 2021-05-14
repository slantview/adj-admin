import { Grid, InputLabel, MenuItem } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import React from 'react';

const StreamForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;
	
    return (
        <>
            <div className="p-4">
                <Grid container spacing={4}>
                    <Grid item md={12} lg={12} className="mt-2">
                        <Grid container spacing={3}>
                            <Grid item md={6} lg={6}>
								<InputLabel id="stream-name-label" className="text-uppercase font-size-sm">Stream Name</InputLabel>
                                <Field
                                    component={TextField}
                                    fullWidth
                                    name="name"
                                    labelId="stream-name-label"
                                    type="text"
                                    value={values.name ? values.name : ''}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item md={6} lg={6}>
								<InputLabel id="stream-type-label" className="text-uppercase font-size-sm">Stream Type</InputLabel>
								<Field
									component={Select}
									fullWidth
									name="type"
									labelId="stream-type-label"
									type="text"
									value={values.type ? values.type : ''}
									variant="outlined"
								>
									<MenuItem dense={true} className="font-size-sm" value="twitch">Twitch</MenuItem>
									<MenuItem dense={true} className="font-size-sm" value="youtube">YouTube</MenuItem>
								</Field>
                            </Grid>
							<Grid item md={12} lg={12}>
								<Field
									component={TextField}
									fullWidth
									name="url"
									label="URL"
									type="text"
									value={values.url ? values.url : ''}
									variant="outlined"
								/>
                            </Grid>
                        </Grid>
                    </Grid>
				</Grid>
			</div>
			<div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
                    
                </Grid>
            </div>
        </>
    )
}

export default StreamForm;
