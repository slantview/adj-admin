import { useQuery } from '@apollo/client';
import { Grid, TextField as MTextField } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useContext, useEffect, useState } from 'react';

import AutocompleteSearchField from 'components/AutocompleteSearchField';
import { SiteContext } from 'providers/SiteProvider';
import { GET_ALL_BRACKET_FORMATS } from 'queries/bracket_format';
import { GET_ALL_GAME_MODES } from 'queries/game_modes';
import { GET_ALL_GAME_PLATFORMS } from 'queries/game_platforms';
import { GET_ALL_GAMES } from 'queries/games';
import { GET_ALL_GAME_RULE_LISTS } from 'queries/rules';
import { GET_ALL_GEO_REGION_LISTS } from 'queries/service_areas';

const TournamentForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

	const siteCtx = useContext(SiteContext);
	const timezone = siteCtx.getTimezone();
	const gamesData = useQuery(GET_ALL_GAMES);
	const [games, setGames] = useState([]);
	const gameRulesData = useQuery(GET_ALL_GAME_RULE_LISTS);
	const [rules, setRules] = useState(values.rules ? values.rules : []);
	const gameModesData = useQuery(GET_ALL_GAME_MODES);
	const [gameModes, setGameModes] = useState([]);
    const gamePlatformsData = useQuery(GET_ALL_GAME_PLATFORMS);
	const [gamePlatforms, setGamePlatforms] = useState([]);
    const bracketFormatsData = useQuery(GET_ALL_BRACKET_FORMATS);
	const [bracketFormats, setBracketFormats] = useState([]);
	const serviceAreasData = useQuery(GET_ALL_GEO_REGION_LISTS);
	const [serviceAreas, setServiceAreas] = useState([]);

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
		if (!gameRulesData.loading) {
			setRules(resultsToData(gameRulesData?.data?.gameRuleLists));
		}
		if (!gameModesData.loading) {
			setGameModes(resultsToData(gameModesData?.data?.gameModes));
		}
		if (!gamePlatformsData.loading) {
			setGamePlatforms(resultsToData(gamePlatformsData?.data?.platforms));
		}
        if (!bracketFormatsData.loading) {
			setBracketFormats(resultsToData(bracketFormatsData?.data?.bracketFormats));
		}
		if (!serviceAreasData.loading) {
			setServiceAreas(resultsToData(serviceAreasData?.data?.geoRegionLists));
		}
	}, [gamesData, gameRulesData, gameModesData, gamePlatformsData, bracketFormatsData, serviceAreasData]);

	const handleGameAutocompleteRequest = (request, callback) => {
		filterForCallback(games, request, callback);
	};

	const handleRulesAutocompleteRequest = (request, callback) => {
		filterForCallback(rules, request, callback);
	};

	const handleGameModeAutocompleteRequest = (request, callback) => {
		filterForCallback(gameModes, request, callback);
	};

    const handleGamePlatformAutocompleteRequest = (request, callback) => {
		filterForCallback(gamePlatforms, request, callback);
	};

    const handleBracketFormatsAutocompleteRequest = (request, callback) => {
		filterForCallback(bracketFormats, request, callback);
	};

	const handleServiceAreasAutocompleteRequest = (request, callback) => {
		filterForCallback(serviceAreas, request, callback);
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
                                    label="Tournament Title"
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
							Details
						</h5>
						<p className="text-black-50">Choose a start time and registration cutoff time for this tournament.</p>
					</Grid>
                    <Grid item md={6} lg={6}>
						<Field
							component={TextField}
							name="registration_cutoff"
							type="time"
							label="Registration Cutoff"
							placeholder=""
							fullWidth
							// onChange={(e) => handleTimeFieldChange('ends_at', e)}
							// value={moment(values?.ends_at).tz(timezone).format("YYYY-MM-DDTHH:mm")}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item md={6} lg={6}>
						<Field
							component={TextField}
							name="tournament_start_time"
							type="time"
							label="Starts At"
							placeholder=""
							fullWidth
							// onChange={(e) => handleTimeFieldChange('starts_at', e)}
							// value={moment(values?.starts_at).tz(timezone).format("YYYY-MM-DDTHH:mm")}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item md={6} lg={6}>
						<Field
							component={TextField}
							fullWidth
							name="registration_cap"
							label="Registration Capacity"
							type="text"
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</div>
			<div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Fees
						</h5>
						<p className="text-black-50">Setup tournament fee.</p>
					</Grid>
                    <Grid item md={6} lg={6}>
						<Field
							component={TextField}
							fullWidth
							name="fee"
							label="Tournament Fee"
							type="text"
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</div>
			<div className="p-4">
				<div className="divider mb-2" />
                <Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Matcherino
						</h5>
						<p className="text-black-50">Setup matcherino code and discount.</p>
					</Grid>
                    <Grid item md={6} lg={6}>
						<Field
							component={TextField}
							fullWidth
							name="matcherino_code"
							label="Matcherino Code"
							type="text"
							variant="outlined"
						/>
					</Grid>
					<Grid item md={6} lg={6}>
						<Field
							component={TextField}
							fullWidth
							name="matcherino_coupon_amount"
							label="Matcherino Discount"
							type="text"
							variant="outlined"
						/>
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
						<p className="text-black-50">Select game, platform, and mode to be played at this tournament.</p>
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="game"
							inputLabel="Game"
							getOptions={handleGameAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gamesData?.data?.games)}
                            initialValue={values.game}
                            multiple={false}
						/>
                    </Grid>
                    <Grid item md={6} lg={6}>
						<AutocompleteSearchField
							name="game_platform"
							inputLabel="Game Platform"
							getOptions={handleGamePlatformAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gamePlatformsData?.data?.platforms)}
                            initialValue={values.game_platform}
                            multiple={false}
						/>
                    </Grid>
                    <Grid item md={6} lg={6}>
						<AutocompleteSearchField
							name="game_mode"
							inputLabel="Game Mode"
							getOptions={handleGameModeAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gameModesData?.data?.gameModes)}
                            initialValue={values.game_mode}
                            multiple={false}
						/>
                    </Grid>
                </Grid>
            </div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
                <Grid container spacing={2}>
					<Grid item md={8} lg={8}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Rules
						</h5>
						<p className="text-black-50">Select rules and bracket for tournament.</p>
					</Grid>
                    <Grid item md={6} lg={6}>
						<AutocompleteSearchField
							name="game_rules"
							inputLabel="Search Rules"
							getOptions={handleRulesAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gameRulesData?.data?.gameRuleLists)}
                            initialValue={values.game_rules}
                            multiple
						/>
                    </Grid>
                    <Grid item md={6} lg={6}>
						<AutocompleteSearchField
							name="bracket_format"
							inputLabel="Bracket Format"
							getOptions={handleBracketFormatsAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(bracketFormatsData?.data?.bracketFormats)}
                            initialValue={values.bracket_format}
                            multiple
						/>
                    </Grid>
                </Grid>
            </div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
                <Grid container spacing={2}>
					<Grid item md={8} lg={8}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Service Areas
						</h5>
						<p className="text-black-50">Select areas that are eligible to play this tournament.</p>
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="geo_regions"
							inputLabel="Service Areas"
							getOptions={handleServiceAreasAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(serviceAreasData?.data?.geoRegionLists)}
                            initialValue={values.geo_regions}
                            multiple
						/>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default TournamentForm;
