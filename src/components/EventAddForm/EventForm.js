import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid, TextField as MTextField } from '@material-ui/core';
import MDEditor, { commands } from '@uiw/react-md-editor';
import 'date-fns';
import { Field } from 'formik';
import { Switch, TextField } from 'formik-material-ui';
import React from 'react';
import ImageUpload from '../../components/ImageUpload';

const EventForm = (props) => {
    const { 
		values,
		errors,
        setFieldValue
	} = props;

    return (
        <Container>
            <div className="p-4">
                <h5 className="font-size-xl mb-1 font-weight-bold">
                    New Event
                </h5>
                <p className="text-black-50 mb-4">
                    Description of form.
                </p>
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
									InputLabelProps={{
										shrink: true,
									}}
								/>
                            </Grid>
							<Grid item md={12} lg={12} className="mt-1 pt-0">
								<span className="text-black-50 font-size-xs font-italic">Using default timezone of GMT-7</span>
							</Grid>
                        </Grid>
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
                            name="logo"
                            title="Header Image" 
                            subtitle="Upload your header image" 
                            description="1280x640"
                            setFieldValue={setFieldValue}
                            error={errors.logo}
                        />
                    </Grid>
                    <Grid md={6} lg={6}> 
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
						<Field
							component={TextField}
							fullWidth
							name="tournaments"
							label="Search Tournaments"
							type="text"
							variant="outlined"
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
						<Field
							component={TextField}
							fullWidth
							name="tournaments"
							label="Search Rules"
							type="text"
							variant="outlined"
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
						<Field
							component={TextField}
							fullWidth
							name="venue"
							label="Search Places"
							type="text"
							variant="outlined"
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
						<Field
							component={TextField}
							fullWidth
							name="streams"
							label="Search Streams"
							type="text"
							variant="outlined"
						/>
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
							placeholder="https://signup.url/"
						/>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default EventForm;