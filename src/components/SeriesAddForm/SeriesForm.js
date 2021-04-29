import { FormControl, Grid, InputLabel, MenuItem } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import 'date-fns';
import { Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import React from 'react';
import ImageUpload from '../../components/ImageUpload';

const SeriesForm = (props) => {
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
                                <Field
                                    component={TextField}
                                    fullWidth
                                    name="title"
                                    label="Series Title"
                                    type="text"
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item md={6} lg={6}>
                                <FormControl fullWidth>
                                    <InputLabel className="px-1" htmlFor="cadence">Cadence</InputLabel>
                                    <Field
                                        component={Select}
                                        name="cadence"
                                        variant="outlined"
                                        inputProps={{
                                            id: 'cadence'
                                        }}
                                    >
                                        <MenuItem className="mx-2" value="weekly">
                                            Weekly
                                        </MenuItem>
                                        <MenuItem className="mx-2" value="biweekly">
                                            Bi-Weekly
                                        </MenuItem>
                                        <MenuItem className="mx-2" value="monthly">
                                            Monthly
                                        </MenuItem>
                                    
                                    </Field>
                                </FormControl>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <span className="text-black font-weight-bold">Description</span>
                                <MDEditor
                                    commands={[commands.bold, commands.italic, commands.strikethrough, commands.hr, 
                                        commands.title, commands.divider, commands.link, commands.quote, commands.code, 
                                            commands.unorderedListCommand, commands.orderedListCommand, 
                                            commands.checkedListCommand, commands.fullscreen]}
                                        preview='edit'
                                    value={values.description}
                                    onChange={(v) => setFieldValue('description', v)}
                                />
                                <span className="text-danger">{errors.description}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="p-4">
                <div className="divider mt-1 mb-2" />
                <Grid container spacing={2}>
                    <Grid item md={12} lg={12}>
                        <h5 className="font-size-xl mb-1 font-weight-bold">
                            Images
                        </h5>
                        <p className="text-black-50 pb-0 mb-0">
                            Header image will be displayed at top of the series page and should be the branding of the 
                            entire series. The card image can be the same, but will be displayed in locations of the card display.
                        </p>
                    </Grid>
                    <Grid item md={6} lg={6}> 
                        <ImageUpload 
                            name="header"
                            title="Header Image" 
                            subtitle="Upload your header image" 
                            description="1280x640"
                            setFieldValue={setFieldValue}
                            error={errors.header}
                        />
                    </Grid>
                    <Grid item md={6} lg={6}> 
                        <ImageUpload 
                            name="card"
                            title="Card Image" 
                            subtitle="Upload your card image" 
                            description="800x400"
                            setFieldValue={setFieldValue}
                            error={errors.card}
                        />
                    </Grid>
                </Grid>   
            </div>
        </>
    )
}

export default SeriesForm;