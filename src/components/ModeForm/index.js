import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';

import AutocompleteSearchField from 'components/AutocompleteSearchField';
import { GET_ALL_GAMES } from 'queries/games';

const ModeForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

	const gamesData = useQuery(GET_ALL_GAMES);
	const [games, setGames] = useState([]);

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

	useEffect(() => {
		if (!gamesData.loading) {
			setGames(resultsToData(gamesData?.data?.games));
		}
		
	}, [gamesData]);

	const handleGameAutocompleteRequest = (request, callback) => {
		filterForCallback(games, request, callback);
	};

    const filterForCallback = (arr, request, callback) => {
        if (arr.length === 0) {
			callback([]);
		}
		if (typeof request?.input === 'string') {
            arr && callback(arr.filter(r => {
				return r.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		} else {
			callback(arr);
		}
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
                                    name="title"
                                    label="Mode Title"
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
			<div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Game
						</h5>
						<p className="text-black-50">Select games that this mode can be used with.</p>
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
            </div>
        </>
    )
}

export default ModeForm;
