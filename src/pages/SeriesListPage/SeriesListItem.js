import { Button, Card, CardContent, CardMedia, Grid } from '@material-ui/core';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { SiteContext } from 'providers/SiteProvider';
import _ from 'lodash';

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
    const site = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
    const timezone = site.metadata.timezone.value;
	
	const handleClick = () => {
		history.push('/series/' + id);
	};

	const today = moment().tz(timezone);
	let nextEvent = null;
	const previousEvents = [];
	const upcomingEvents = events.map(e => {
		const eventTime = moment(e.starts_at).tz(timezone);
		if (eventTime.isAfter(today)) {
			if (nextEvent === null) {
				nextEvent = eventTime;
			} else if (nextEvent.isAfter(eventTime)) {
				nextEvent = eventTime;
			}
			return e;
		}
		if (e.published_at !== null) {
			previousEvents.push(e);
		}
	});

	// @ts-ignore
	const nextEventFormatted = nextEvent !== null ? nextEvent.format("MMMM Do, YYYY") : "No Upcoming Events";
	
    return (
        <Card className="mb-5" raised={true} onClick={handleClick} square={true}>
			<CardMedia
				image={header.formats.large.url}
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
									<div>
										<span className="font-size-md text-uppercase text-white-50 ml-2">Upcoming: </span>
										<span className="text-white font-weight-bold ">{upcomingEvents.length}</span>
										<span className="font-size-md text-uppercase text-white-50 ml-5">Completed: </span>
										<span className="text-white font-weight-bold">{previousEvents.length}</span>
									</div>
								</Grid>
								
							</Grid>
						</CardContent>
					</div>
			</CardMedia>
        </Card>
    )
}

export default SeriesListItem;
 