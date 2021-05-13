import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import SeriesTableRow from '../../components/SeriesTableRow';
import { GET_ALL_SERIES } from '../../queries/series';

export default function SeriesListPage() {
	const { loading, error, data } = useQuery(GET_ALL_SERIES);
	const seriesData = loading || error ? [] : data ? data.seriesItems : [];
	const [isLoading, setLoading] = React.useState(loading);

	const [entries, setEntries] = React.useState(10);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = React.useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = React.useState(null);
	const [series, setSeries] = React.useState(seriesData);

	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setSeries(seriesData);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = seriesData.filter(g => {
				return g.title.toLowerCase().includes(e.target.value.toLowerCase()) || 
					g.subtitle.toLowerCase().includes(e.target.value.toLowerCase()) ||
					g.description.toLowerCase().includes(e.target.value);
			})
			setSeries(newData);
		}
	};

	React.useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setSeries(seriesData);
		}
	});

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<div>
				<div>
					<h2>Series</h2>
					<p>Series list description.</p>
				</div>
				<Card className="card-box mb-spacing-6-x2">
					<div className="card-header">
						<div className="card-header--title">
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

						<div className="card-header--actions">
							<div>
							<Button to="/series/add" component={Link} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add Series</span>
							</Button>
							</div>
						</div>
					</div>
					<CardContent className="px-0 pt-2 pb-3">
						<Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
							{ series.length > 0 &&
								<thead>
									<tr>
										<th>Title</th>
										<th className="text-center">Events</th>
										<th className="text-center">Tournaments</th>
										<th className="text-center">Status</th>
										<th className="text-right">Actions</th>
									</tr>
								</thead>
							}
							<tbody>
								{ series && series.map(s => (
									<SeriesTableRow {...s} />
								))}
								
							</tbody>
						</Table>
						{ series.length === 0 &&
							<div className="m-4 text-center">
								<h4>No Event Series.</h4>
								<p>To get started, <Link className="text-first" to="/series/add">add an event series.</Link></p>
							</div>
						}
						{/* <div className="divider mb-3" /> */}
						<div className="card-footer py-3 d-flex justify-content-between">
							<Collapse in={series.length > entries}>
								<Pagination
									className="pagination-second"
									variant="outlined"
									page={page}
									onChange={handlePageChange}
									count={ Math.floor((series.length/entries)) + (series.length%entries === 0 ? 0 : 1)}
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
			</div>
		</>
	);
}
