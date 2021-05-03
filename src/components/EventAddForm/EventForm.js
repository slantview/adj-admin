import { useLazyQuery, useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid, TextField as MTextField } from '@material-ui/core';
import { RuleSharp, StreamSharp } from '@material-ui/icons';
import MDEditor, { commands } from '@uiw/react-md-editor';
import { Field } from 'formik';
import { Switch, TextField } from 'formik-material-ui';
import moment from 'moment-timezone';
import React, { useContext, useEffect, useState } from 'react';

import AutocompleteSearchField from 'components/AutocompleteSearchField';
import { SiteContext } from 'providers/SiteProvider';
import { GET_ALL_PLACES } from 'queries/places';
import { GET_ALL_GAME_RULE_LISTS } from 'queries/rules';
import { GET_ALL_STREAMS } from 'queries/streams';
import { GET_ALL_TOURNAMENTS } from 'queries/tournaments';

import ImageUpload from '../../components/ImageUpload';

const EventForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

	const siteCtx = useContext(SiteContext);
	const timezone = siteCtx.getTimezone();
	const tournamentsData = useQuery(GET_ALL_TOURNAMENTS);
	const [tournaments, setTournaments] = useState([]);
	const gameRulesData = useQuery(GET_ALL_GAME_RULE_LISTS);
	const [rules, setRules] = useState([]);
	const placesData = useQuery(GET_ALL_PLACES);
	const [places, setPlaces] = useState([]);
	const streamsData = useQuery(GET_ALL_STREAMS);
	const [streams, setStreams] = useState([]);

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
		if (!tournamentsData.loading) {
			setTournaments(resultsToData(tournamentsData?.data?.tournaments));
		}
		if (!gameRulesData.loading) {
			setRules(resultsToData(gameRulesData?.data?.gameRuleLists));
		}
		if (!placesData.loading) {
			setPlaces(resultsToData(placesData?.data?.places));
		}
		if (!streamsData.loading) {
			setStreams(resultsToData(streamsData?.data?.streams));
		}
	}, [tournamentsData, gameRulesData, placesData, streamsData]);

	const handleTournamentAutocompleteRequest = (request, callback) => {
		if (tournaments.length === 0) {
			callback([]);
		}
		if (request?.input === null || request?.input === '') {
			callback(tournaments);
		} else {
			callback(tournaments?.filter(t => {
				return t.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		}
	};

	const handleRulesAutocompleteRequest = (request, callback) => {
		if (rules.length === 0) {
			callback([]);
		}
		if (request?.input === null || request?.input === '') {
			callback(rules);
		} else {
			callback(rules?.filter(r => {
				return r.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		}
	};

	const handlePlacesAutocompleteRequest = (request, callback) => {
		if (places.length === 0) {
			callback([]);
		}
		if (request?.input === null || request?.input === '') {
			callback(places);
		} else {
			callback(places?.filter(r => {
				return r.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		}
	};

	const handleStreamsAutocompleteRequest = (request, callback) => {
		if (streams.length === 0) {
			callback([]);
		}
		if (request?.input === null || request?.input === '') {
			callback(streams);
		} else {
			callback(streams?.filter(r => {
				return r.name?.toLowerCase().includes(request.input?.toLowerCase());
			}));
		}
	};

	const handleTimeFieldChange = (name, e) => {
		setFieldValue(name, moment(e.target.value).tz(timezone).format());
	};

	// console.log(values, errors);

    return (
        <Container>
            <div className="p-4">
                <Grid container spacing={4}>
                    <Grid item md={12} lg={12} className="mt-2">
                        <Grid container spacing={3}>
                            <Grid item md={6} lg={6}>
                                <Field
                                    component={TextField}
                                    fullWidth
                                    name="title"
                                    label="Event Title"
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
                                    value={values.description}
                                    onChange={(v) => setFieldValue('description', v)}
                                />
								<span className="text-danger">{errors.description}</span>
                            </Grid>
                            <Grid item md={6} lg={6}>
								<Field
									component={MTextField}
									name="starts_at"
									type="datetime-local"
									label="Starts At"
									placeholder=""
									fullWidth
									onChange={(e) => handleTimeFieldChange('starts_at', e)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
                            </Grid>
                            <Grid item md={6} lg={6}>
								<Field
									component={MTextField}
									name="ends_at"
									type="datetime-local"
									label="Ends At"
									placeholder=""
									fullWidth
									onChange={(e) => handleTimeFieldChange('ends_at', e)}
									InputLabelProps={{
										shrink: true,
									}}
								/>
                            </Grid>
							<Grid item md={12} lg={12} className="mt-1 pt-0">
								<span className="text-black-50 font-size-xs font-italic">Using default timezone of {timezone}</span>
							</Grid>
                        </Grid>
                    </Grid>
				</Grid>
			</div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
				<h5 className="font-size-xl mb-1 font-weight-bold">
					Signup
				</h5>
				<p className="text-black-50 mb-4">Enter your signup information.</p>
				<Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<Field
							component={TextField}
							fullWidth
							name="sign_up_link"
							label="Sign Up Link"
							type="text"
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
				<Grid container spacing={2}>
					<Grid item md={12} lg={12}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Images
						</h5>
						<p className="text-black-50 pb-0 mb-0">Add images for the event.</p>
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
                            description="1280x640"
                            setFieldValue={setFieldValue}
                            error={errors.card}
                        />
                    </Grid>
                </Grid>   
            </div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
                <Grid container spacing={2}>
					<Grid item md={8} lg={8}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Tournaments
						</h5>
						<p className="text-black-50">Select existing or add a new tournament.</p>
					</Grid>
					<Grid item md={4} lg={4}>
						<div className="text-right">
							<Button onClick={(e) => e.preventDefault()} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add New Tournament</span>
							</Button>
						</div>
						
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="tournaments"
							inputLabel="Search Tournaments"
							getOptions={handleTournamentAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(tournamentsData?.data?.tournaments)}
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
						<p className="text-black-50">Select existing or add a new rules.</p>
					</Grid>
					<Grid item md={4} lg={4}>
						<div className="text-right">
							<Button onClick={(e) => e.preventDefault()} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add New Rules</span>
							</Button>
						</div>
						
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="rules"
							inputLabel="Search Rules"
							getOptions={handleRulesAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(gameRulesData?.data?.gameRules)}
						/>
                    </Grid>
                </Grid>
            </div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
                <Grid container spacing={2}>
					<Grid item md={8} lg={8}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Venue
						</h5>
						<p className="text-black-50">Select existing or add a new venue.</p>
					</Grid>
					<Grid item md={4} lg={4}>
						<div className="text-right">
							<Button onClick={(e) => e.preventDefault()} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add New Venue</span>
							</Button>
						</div>
					</Grid>
					<Grid item md={12} lg={12}>
						<span>Is Online?</span>
						<Field 
							component={Switch} 
							type="checkbox" 
							name="is_online"
							label="Is Online?"
						/>
						<span>Is Offline?</span>
						<Field 
							component={Switch} 
							type="checkbox" 
							name="is_offline"
							label="Is Offline?"
						/>
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="venue"
							inputLabel="Search Places"
							getOptions={handlePlacesAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(placesData?.data?.setPlaces)}
						/>
                    </Grid>
                </Grid>
            </div>
			<div className="p-4">
				<div className="divider mt-3 mb-2" />
                
                <Grid container spacing={2}>
					<Grid item md={8} lg={8}>
						<h5 className="font-size-xl mb-1 font-weight-bold">
							Streams
						</h5>
						<p className="text-black-50 mb-4">Add your streams or create new one.</p>
					</Grid>
					<Grid item md={4} lg={4}>
						<div className="text-right">
							<Button onClick={(e) => e.preventDefault()} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add New Stream</span>
							</Button>
						</div>
					</Grid>
                    <Grid item md={12} lg={12}>
						<AutocompleteSearchField
							name="streams"
							inputLabel="Search Streams"
							getOptions={handleStreamsAutocompleteRequest}
							setFieldValue={setFieldValue}
							initialOptions={resultsToData(streamsData?.data?.streams)}
						/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default EventForm;