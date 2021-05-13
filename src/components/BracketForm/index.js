import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';

import { GET_ALL_GAMES } from 'queries/games';

const BracketForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

	const resultsToData = (results) => {
		if (results === null || typeof results === 'undefined' || results.length === 0) {
			return [];
		}
		return results.map(r => {
			return {
				name: `${r.title ? r.title : (r.name ? r.name : 'undefined')}`,
				value: r.id
			};
		})
	};
	
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
                                    label="Bracket Title"
                                    type="text"
                                    value={values.title ? values.title : ''}
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
        </>
    )
}

export default BracketForm;
