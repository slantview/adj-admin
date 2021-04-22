import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, InputAdornment, Link, MenuItem, Pagination, Select, Table, TextField } from '@material-ui/core';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import EventsListRow from 'components/EventsListRow';
import EventsTableRow from 'components/EventsTableRow';
import React from 'react'

const EventsList = (props) => {
    const {
        events,
        refreshSeries,
        entries,
        setEntries
    } = props;

    const [eventsList, setEvents] = React.useState(events);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = React.useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = React.useState(null);
	
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setEvents(events);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = events.filter(d => {
				return (d.title && d.title.toLowerCase().includes(e.target.value.toLowerCase())) || 
					(d.description && d.description.toLowerCase().includes(e.target.value));
			})
			setEvents(newData);
		}
	};
    
    return (
        <Card className="card-box mb-spacing-6-x2" elevation={0}>
            <div className="card-header">
                <div className="card-header--title">
                    <small className="d-block text-uppercase mt-1">Upcoming</small>
                    <b>Events</b>
                </div>
                <div className="card-header--actions">
                    <div className="search-wrapper">
                        <TextField
                            variant="outlined"
                            size="small"
                            id="input-search"
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchTwoToneIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
            <CardContent className="px-0 pt-2 pb-3">
                <Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th className="text-center">Starts At</th>
                            <th className="text-center">Status</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { eventsList.map(event => (
                            <EventsListRow event={event} refreshSeries={refreshSeries} />
                        ))}
                    </tbody>
                </Table>
                <div className="divider mb-3" />
                <div className="card-footer py-3 d-flex justify-content-between">
                    <Collapse in={eventsList.length > entries}>
                        <Pagination
                            className="pagination-second"
                            variant="outlined"
                            page={page}
                            onChange={handlePageChange}
                            count={ Math.round((eventsList.length/entries)) + (eventsList.length%entries === 0 ? 0 : 1)}
                        />
                    </Collapse>
                    <div className="d-flex align-items-center">
                        <span>Show</span>
                        <FormControl size="small" variant="outlined" className="mx-3">
                            <Select
                                labelId="select-entries-label"
                                id="select-entries"
                                value={entries}
                                onChange={handleEntriesChange}>
                                <MenuItem className="mx-2" value={1}>
                                    All
                                </MenuItem>
                                <MenuItem className="mx-2" value={5}>
                                    5
                                </MenuItem>
                                <MenuItem className="mx-2" value={10}>
                                    10
                                </MenuItem>
                                <MenuItem className="mx-2" value={20}>
                                    20
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <span>entries</span>
                    </div>
                </div>
            </CardContent>
		</Card>
    )
}

export default EventsList;
