import { Collapse, Grid, MenuItem, Select } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { Switch, TextField } from 'formik-material-ui';
import React from 'react';

const PlaceForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

    const typeOptions = [
        "Place",
        "BarOrPub",
        "Brewery",
        "CafeOrCoffeeShop",
        "Distillery",
        "FastFoodRestaurant",
        "InternetCafe",
        "Restaurant",
        "Winery",
        "LocalBusiness",
        "Residence"
    ];
	
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
                                    name="name"
                                    label="Venue Name"
                                    type="text"
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
                        </Grid>
                    </Grid>
				</Grid>
			</div>
            <div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Type
						</h5>
						<p className="text-black-50">What kind of place is this?</p>
                    </Grid>
                    <Grid item md={6} lg={6}>
                        <Field 
                            component={Select} 
                            type="text" 
                            variant="outlined" 
                            name="type"
                            fullWidth 
                            multiple={false}>
                                { typeOptions.map(t => 
                                    <MenuItem value={t}>{t}</MenuItem>
                                )}
                        </Field>
                        <span className="text-danger">{errors.type}</span>
                    </Grid>
                </Grid>
            </div>
            <div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Location
						</h5>
						<p className="text-black-50">Tell us a little about where this venue is located.</p>
					</Grid>
                    <Grid item md={12} lg={12}>
                        <Field
                            component={TextField}
                            fullWidth
                            name="online_url"
                            label="URL"
                            type="text"
                            value={values.online_url ? values.online_url : ''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={12} lg={12}>
                        <span>Is Online Only?</span>
                        <Field 
                            component={Switch} 
                            type="checkbox" 
                            name="is_online"
                            label="Is Online Only?"
                        />
                    </Grid>
                    <Grid md={12} lg={12} className="mx-3 mt-2">
                        <Collapse in={!values.is_online}>
                            <Grid container spacing={2}>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="address_line_1"
                                        label="Address Line 1"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={6} lg={6}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="address_line_2"
                                        label="Address Line 2"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="city"
                                        label="City"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="state"
                                        label="State"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item md={4} lg={4}>
                                    <Field
                                        component={TextField}
                                        fullWidth
                                        name="postal_code"
                                        label="Postal Code"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default PlaceForm;
