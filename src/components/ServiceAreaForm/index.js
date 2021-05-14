import { Button, Grid } from '@material-ui/core';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';

import RegionRow from './RegionRow';

const ServiceAreaForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;
    console.log(errors);
    const [rows, setRows] = useState(values.places_geo_regions);

    const handleRowChange = (rowId, name, type) => {
        let currentRegions = Object.assign([], rows);
        
        // Delete id if we change the name.
        delete currentRegions[rowId].id;
        currentRegions[rowId].name = name;
        currentRegions[rowId].type = type;

        setRows(currentRegions);
        setFieldValue('places_geo_regions', currentRegions);
    }

    const handleRowRemove = (rowId) => {
        let newRegions = Object.assign([], rows);
        newRegions.splice(rowId, 1);
        setRows(newRegions);
        setFieldValue('places_geo_regions', newRegions);
    }

    const addNewRow = () => {
        const newRegions = Object.assign([], rows);
        newRegions.push({name:'', type:''});
        setRows(newRegions);
        setFieldValue('places_geo_regions', newRegions);
    }
	
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
                                    label="Service Area Name"
                                    type="text"
                                    value={values.name ? values.name : ''}
                                    variant="outlined"
                                />

                            </Grid>
                            <Grid item md={12} lg={12}>
                                { rows.map((r, i) => {
                                    return (
                                        <RegionRow 
                                            rowId={i} 
                                            name={r.name} 
                                            type={r.type} 
                                            onChange={handleRowChange} 
                                            onRemove={handleRowRemove} 
                                        />
                                    );
                                })}
                            </Grid>
                            <Grid item md={12} lg={12}>
                                <Button className="btn-neutral-primary font-weight-bold" onClick={addNewRow}>
                                    Add Location
                                </Button>
                                <div className="mt-1">
                                    <span className="text-danger">{errors.places_geo_regions}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
				</Grid>
			</div>
        </>
    )
}

export default ServiceAreaForm;
