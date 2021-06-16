import { Grid } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';

import ImageUpload from 'components/ImageUpload';

const PageForm = (props) => {
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
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    fullWidth
                                    name="title"
                                    label="Page Title"
                                    type="text"
                                    value={values.title ? values.title : ''}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Field
                                    component={TextField}
                                    fullWidth
                                    name="subtitle"
                                    label="Page Subtitle"
                                    type="text"
                                    value={values.subtitle ? values.subtitle : ''}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item md={12} lg={12}>
                                <span className="text-black font-weight-bold">Description</span>
                                <MDEditor
                                    commands={[commands.bold, commands.italic, commands.strikethrough, commands.hr, 
                                        commands.title, commands.divider, commands.link, commands.quote, commands.code, 
                                         commands.unorderedListCommand, commands.orderedListCommand, 
										 commands.checkedListCommand, commands.fullscreen]}
                                        preview='edit'
                                    value={values?.description ? values.description : ''}
                                    onChange={(v) => setFieldValue('description', v)}
                                />
								<span className="text-danger">{errors.description}</span>
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <ImageUpload 
                                    name="header"
                                    title="Header Image" 
                                    subtitle="Upload your header image" 
                                    description="1280x640"
                                    setFieldValue={setFieldValue}
                                    error={errors.header}
                                    value={values.header}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
				</Grid>
			</div>
			{/* <div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Game
						</h5>
						<p className="text-black-50">Select games that this rule can be used with.</p>
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="games"
							inputLabel="Games"
							getOptions={handleGameAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gamesData?.data?.games)}
                            initialValue={values.games}
                            multiple={true}
						/>
                    </Grid>
                </Grid>
            </div> */}
        </>
    )
}

export default PageForm;
