import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, CardMedia, Fade, Grid, Table, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import moment from 'moment-timezone';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import headerBackground from 'assets/images/header-bg.jpg';
import EventActionMenu from 'components/EventActionMenu';
import EventAddNewCard from 'components/EventAddNewCard';
import EventsListRow from 'components/EventsListRow';
import { SiteContext } from 'providers/SiteProvider';

const EventsUpcomingCard = (props) => {
	const {
		series,
		events,
		next,
		refreshSeries,
		setLoading
	} = props;

	const siteCtx = useContext(SiteContext);
	const timezone = siteCtx.getTimezone();

	const nextStartsAt = next && timezone ? moment(next.starts_at).tz(timezone) : null;
	const bgImage = next && next.header ? next.header?.formats?.large?.url : headerBackground;
	const gameImages = _.uniqBy(next?.tournaments?.flatMap(t => {
		return {
			title: t.game.title,
			cover: t.game.cover.formats.thumbnail.url
		};
	}), 'cover');
	
	return (
		<div className="mt-2">
			<Grid container spacing={2}>
				<Grid item xl={12}>
					<Card className="card-shadow-md card-box-hover-rise card-box-hover my-3">
						<CardMedia image={bgImage}>
							<div className="py-0 bg-black-80 w-100">
								<CardContent className="p-3 m-0">
										{ next === null ? (
											<EventAddNewCard id={series.id} />
										) : (
											<Table className="m-0 table table-borderless text-nowrap text-left mb-0">
												<tbody>
													<tr>
														<td style={{width: "60%"}}>
															<div className="text-white">
																<h5 className="font-weight-bolder mb-1">
																	<span className="text-uppercase text-white-50">Next Event: </span>
																</h5>
																<h4>
																	<Link
																		to={'/events/edit/' + next.id}
																		className="font-weight-bolder text-hover-first text-white"
																		title={next.title}>
																			{next?.title}
																	</Link>
																</h4>
																<div className="mt-2">
																	{ gameImages &&
																		<div className="mb-2 font-size-md text-uppercase font-weight-bold text-white-50">Games Played: </div>
																	}
																	{ gameImages && gameImages.length > 0 && gameImages.map(i => ( 
																		<Tooltip
																			// @ts-ignore
																			key={i.title} 
																			TransitionComponent={Fade} 
																			TransitionProps={{ timeout: 600 }} 
																			// @ts-ignore
																			title={i.title}>
																			<div className="avatar-icon-wrapper mr-2">
																				<div className="avatar-icon">
																					{/* @ts-ignore */}
																					<img key={i.title} alt={i.title} src={i.cover} />
																				</div>
																			</div>
																		</Tooltip>
																	))}
																</div>
															</div>
														</td>
														<td className="text-left">
															<div className="font-weight-bold">
																<div className="font-size-md text-uppercase text-white-50">Date: </div>
																<div className="text-white font-weight-bold ">
																	{nextStartsAt?.format("MM/DD/YYYY")}
																</div>
																<div className="font-size-md font-weight-bold text-uppercase text-white-50">Time: </div>
																<div className="text-white font-weight-bold ">
																	{nextStartsAt?.format("h:mmA")}
																</div>
															</div>
														</td>
														<td className="text-left">
															<div className="font-size-md font-weight-bold text-uppercase text-white-50">Status: </div>
															{ next?.published_at &&
																<div className="badge text-uppercase badge-success">Published</div>
															}
															{ !next?.published_at &&
																<div className="badge text-uppercase badge-neutral-first text-first">Draft</div>
															}
														</td>
														
														<td className="text-right text-white">
															<EventActionMenu 
																event={next} 
																refreshSeries={refreshSeries} 
																setLoading={setLoading} 
																iconClassName="text-white" />
														</td>
													</tr>
												</tbody>
											</Table>
										)}
								</CardContent>
							</div>
						</CardMedia>
						{ events && events.length > 1 &&
							<CardContent>
								<div className="">
									<Table className="table table-borderless table-hover text-nowrap text-left mb-0">
										<tbody>
											{ events && events.filter(e => e.id !== next.id).reverse().map(event => (
												<EventsListRow 
													key={event.id}
													event={event} 
													refreshSeries={refreshSeries}
													setLoading={setLoading}
												/>
											))}
										</tbody>
									</Table>
								</div>
							</CardContent>
						}
						{ series.events.length > 0 &&
							<CardContent>
								<Grid container>
									<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
										{ series.events.length > 0 &&
											<div className="mt-2">
												<Link 
													to={"/series/view/" + series.id + "/all"} 
													style={{textDecoration: 'underline'}} 
													className="font-weight-bold text-first">
														See all events
												</Link> 
											</div>
										}
									</Grid>
									<Grid item md={6} lg={6} xl={6}>
										<div className="text-right">
											<Button
												component={Link}
												to={'/events/' + series.id + '/add'}
												// variant="contained"
												size="small"
												className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
													<span className="btn-wrapper--icon mr-2">
														<FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
													</span>
													Add Event
											</Button>
										</div>
									</Grid>
								</Grid>
							</CardContent>
						}
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

export default EventsUpcomingCard;