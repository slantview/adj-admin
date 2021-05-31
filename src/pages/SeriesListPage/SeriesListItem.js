import { Button, Card, CardActionArea, CardContent, CardMedia, Grid } from '@material-ui/core';
import moment from 'moment-timezone';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { SiteContext } from 'providers/SiteProvider';
import { getSortedEvents } from 'utils/events';

function SeriesListItem(props) {
	const { 
		id, 
		title,
		subtitle,
		header,
		events
	} = props;

	const history = useHistory();
	const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

	const handleClick = () => {
		history.push('/series/view/' + id);
	};

	const sortedEvents = getSortedEvents(events, timezone);
	const nextEvent = sortedEvents.next;
	const previousEvents = sortedEvents.previous;
	const unpublishedEvents = sortedEvents.unpublished;
	const upcomingEvents = sortedEvents.upcoming;

	// @ts-ignore
	const nextEventFormatted = nextEvent !== null ? moment(nextEvent.starts_at).tz(timezone)
		.format("MMMM Do, YYYY") : "No Upcoming Events";
	
    return (
        <Card className="mb-5 text-left" raised={true} style={{borderRadius: "8px"}}>
			<CardActionArea className="m-0 p-0 btn-transition-none" onClick={handleClick}>
				<CardMedia
					image={header?.formats?.large?.url}
					title={title}>
						<div className="py-0 bg-beacons-black-to-transparent w-100">
							<CardContent className="">	
								<Grid container spacing={0} alignItems="flex-start" className="mb-4" style={{minHeight: "200px"}}>
									<Grid item sm={9} lg={9}>
										<h2 className="text-white text-shadow font-weight-bold text-uppercase">{title}</h2>
										<h3 className="text-white-50 font-size-lg font-weight-bold ">{subtitle}</h3>
									</Grid>
									<Grid item sm={3} lg={3}>
										<Grid alignItems="center">
											<div className=" text-right">
												<Button
													component="span"
													size="large"
													className="p-3 btn btn-rounded btn-neutral-second text-white text-uppercase font-weight-bold">
														Manage Series
												</Button>
											</div>
										</Grid>
										
										
									</Grid>
								</Grid>
								<Grid container alignItems="flex-end">
									<Grid item sm={12} lg={12}>
										<div className="mb-2">
											<span className="font-size-lg font-weight-bold text-uppercase text-white-50 ml-2">Next Event: </span>
											<span className="font-size-xl text-white font-weight-bold ml-1">{nextEventFormatted}</span>
										</div>
										<div className="font-weight-normal">
											<span className="font-size-md text-uppercase text-white-50 ml-2">Upcoming: </span>
											<span className="text-white font-weight-bold ">{upcomingEvents.length}</span>
											<span className="font-size-md text-uppercase text-white-50 ml-3">Completed: </span>
											<span className="text-white font-weight-bold">{previousEvents.length}</span>
											<span className="font-size-md text-uppercase text-white-50 ml-3">Unpublished: </span>
											<span className="text-white font-weight-bold">{unpublishedEvents.length}</span>
										</div>
									</Grid>
									
								</Grid>
							</CardContent>
						</div>
				</CardMedia>
			</CardActionArea>
        </Card>
    )
}

export default SeriesListItem;
 