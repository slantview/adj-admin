import { Button, Card, CardContent, CardMedia, Grid, Table } from '@material-ui/core';
import headerBackground from 'assets/images/header-bg.jpg';
import EventAddNewCard from 'components/EventAddNewCard';
import moment from 'moment-timezone';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext } from 'react';
import EventActionMenu from 'components/EventActionMenu';
import { Link } from 'react-router-dom';

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
	const bgImage = next ? next.header.formats.large.url : headerBackground;

	return (
		<div className="mt-2">
			<Grid container spacing={2}>
				<Grid item xl={12}>
					<Card className="card-shadow-md card-box-hover-rise card-box-hover my-3">
						<CardMedia
							image={bgImage}
							title={next?.title}>
								<div className="py-0 bg-beacons-black-to-transparent w-100">
									<CardContent className="p-3 m-0">
											{ next === null ? (
												<EventAddNewCard id={series.id} />
											) : (
												<Table className="m-0 table table-borderless text-nowrap text-left mb-0">
													<tbody>
														<tr>
															<td style={{width: "60%"}}>
																<div className="text-white">
																	<h5 className="font-weight-bolder mb-2">
																		<span className="text-uppercase text-white-50">Next Event: </span>
																	</h5>
																	<h4>
																		<span className="font-weight-bolder">
																			{next?.title}
																		</span>
																	</h4>
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
						{ events && events.length > 0 &&
							<CardContent>
								<div className="">
									<Table className="table table-borderless table-hover text-nowrap text-left mb-0">
										{/* <thead>
											<tr>
												<th className="pt-0" style={{ width: '40%' }}>Title</th>
												<th className="pt-0 text-center">Status</th>
												<th className="pt-0 text-center">Actions</th>
											</tr>
										</thead> */}
										<tbody>
											{ events && events.filter(e => e.id !== next.id).reverse().map(event => (
												<tr key={event.id}>
													<td style={{width: "60%"}}>
														<div className="d-flex align-items-center">
															{/* <div className="avatar-icon-wrapper mr-2">
																<div className="avatar-icon">
																	<img alt={event.title} src={event.card.formats.thumbnail.url} />
																</div>
															</div> */}
															<div>
																<Link
																	to={'/events/' + series.id + '/' + event.id}
																	className="font-weight-bold text-black"
																	title={event.title}>
																		{event.title}
																</Link>
															</div>
														</div>
													</td>
													<td className="text-left">
														<span className="font-weight-bold d-block">
															{moment(event.starts_at).tz(timezone).format("MM/DD/YYYY")}
														</span>
													</td>
													<td className="text-left">
														{ event.published_at &&
															<span className="badge text-uppercase badge-success">Published</span>
														}
														{ !event.published_at &&
															<span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
														}
													</td>
													<td className="text-right text-black-50">
														<EventActionMenu 
															event={event} 
															refreshSeries={refreshSeries} 
															setLoading={setLoading} 
															iconClassName="text-black-50" />
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</CardContent>
						}
						<CardContent>
							<Link 
								to={"/series/view/" + series.id + "/all"} 
								style={{textDecoration: 'underline'}} 
								className="font-weight-bold text-first">
									See all events
							</Link> 
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}

export default EventsUpcomingCard;