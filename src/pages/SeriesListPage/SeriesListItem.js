import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Grid, Table } from '@material-ui/core';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';

import EventsTableRow from '../../components/EventsTableRow';
import AddNewEventCard from './AddNewEventCard';

function SeriesListItem({ id, title, subtitle, description, card, events, updated_at, published_at, setLoading }) {

    return (
        <Card className="card-box mb-spacing-6">
            <div className="card-header">
				<div className="card-header--title">
					<h3 className="mt-1 font-weight-bold font-size-xxl text-primary text-uppercase">
                        {title}
                    </h3>
				</div>

				<div className="card-header--actions">
					<div>
						<Button component="a" onClick={() => setLoading(true)} size="small" className="btn-neutral-primary mr-2">
								<span className="btn-wrapper--icon">
									<RefreshTwoToneIcon fontSize="small" />
								</span>
							</Button>
						<Button to="/series/add" component={Link} size="small" className="btn-neutral-primary">
							<span className="btn-wrapper--icon">
								<FontAwesomeIcon icon={['fas', 'plus-circle']} />
							</span>
							<span className="btn-wrapper--label">Add Event</span>
						</Button>
					</div>
				</div>
			</div>
            <CardContent className="px-0 pt-3">
                <Grid container spacing={2} justify="center">
                    <Grid item sm={4} lg={4} alignContent="center">
                        <div className="text-center">
                            <Link to="/">
                                <img
                                    alt={title}
                                    className="rounded"
                                    src={card.formats.thumbnail.url}
                                />
                            </Link>
                        </div>
                    </Grid>
                    <Grid item sm={8} lg={8}>
						<div className="card-header--title">
							<small className="d-block text-uppercase mt-0">Upcoming Events</small>
						</div>
						<div>
							{ events.length === 0 &&
								<AddNewEventCard id={id} />
							}
							{ events.length > 0 &&
								<Table className="table table-borderless table-hover table-alternate text-nowrap mt-2 p-0 font-size-sm">
									<thead>
										<tr className="px-0 mt-0">
											<th className="p-0">Date</th>
											<th className="p-0">Title</th>
											<th className="p-0">Status</th>
											<th className="p-0">&nbsp;</th>
										</tr>
									</thead>
									<tbody>
										{ events.length > 0 && events.map(event => (
											<EventsTableRow key={event.id} seriesId={id} {...event} />
										))}
									</tbody>
								</Table>
							}
						</div>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default SeriesListItem;
 