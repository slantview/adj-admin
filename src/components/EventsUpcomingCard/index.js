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
									<CardContent className="p-4 m-0">
											{ next === null ? (
												<EventAddNewCard id={series.id} />
											) : (
												<div className="text-white">
													<h4 className="font-weight-bolder mb-2">
														<span className="text-uppercase text-white-50">Next Event: </span>
														<span className="font-weight-bolder">{next?.title}</span>
													</h4>
													<div className="font-weight-bold">
														<span className="font-size-md text-uppercase text-white-50">Date: </span>
														<span className="text-white font-weight-bold ">{nextStartsAt?.format("MM/DD/YYYY")}</span>
													</div>
													<div className="font-weight-bold">
														<span className="font-size-md text-uppercase text-white-50">Time: </span>
														<span className="text-white font-weight-bold ">{nextStartsAt?.format("h:mmA")}</span>
													</div>
												</div>
											)}
									</CardContent>
								</div>
						</CardMedia>
						{ events && events.length > 0 &&
							<CardContent>
								<div className="">
									<div className="text-uppercase mb-2 mx-1">
										<span className="font-weight-bolder">Upcoming Events</span>
									</div>
									<Table className="table table-borderless table-hover text-nowrap text-left mb-0">
										{/* <thead>
											<tr>
												<th className="pt-0" style={{ width: '40%' }}>Title</th>
												<th className="pt-0 text-center">Status</th>
												<th className="pt-0 text-center">Actions</th>
											</tr>
										</thead> */}
										<tbody>
											{ events && events.map(event => (
												<tr key={event.id}>
													<td>
														<div className="d-flex align-items-center">
															<div className="avatar-icon-wrapper mr-2">
																<div className="avatar-icon">
																	<img alt={event.title} src={event.card.formats.thumbnail.url} />
																</div>
															</div>
															<div>
																<a
																	href="#/"
																	onClick={(e) => e.preventDefault()}
																	className="font-weight-bold text-black"
																	title={event.title}>
																		{event.title}
																</a>
																<span className="text-black-50 font-weight-light d-block">
																	{moment(event.starts_at).tz(timezone).format("MM/DD/YYYY h:mmA")}
																</span>
															</div>
														</div>
													</td>
													<td className="text-right">
														{ event.published_at &&
															<span className="badge text-uppercase badge-success">Published</span>
														}
														{ !event.published_at &&
															<span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
														}
													</td>
													<td className="text-right text-black-50">
														<EventActionMenu event={event} refreshSeries={refreshSeries} setLoading={setLoading} />
													</td>
												</tr>
											))}
										</tbody>
									</Table>
								</div>
							</CardContent>
						}
						<CardContent>
							<Link to={"/series/" + series.id + "/all"} className="font-weight-bold text-first">
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