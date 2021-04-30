import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import TournamentsTableRow from '../../components/TournamentsTableRow';
import { GET_ALL_TOURNAMENTS } from '../../queries/tournaments';

export default function TournamentsListPage() {
	const { loading, error, data } = useQuery(GET_ALL_TOURNAMENTS);
	const tournamentData = loading || error ? [] : data.tournaments;
	const [isLoading, setLoading] = useState(loading);

	const [entries, setEntries] = useState(5);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = useState(null);
	const [tournaments, setTournaments] = useState(tournamentData);
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setTournaments(tournamentData);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = tournamentData.filter(g => {
				return g.title.toLowerCase().includes(e.target.value.toLowerCase()) || g.description.toLowerCase().includes(e.target.value);
			})
			setTournaments(newData);
		}
	};

	useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setTournaments(tournamentData);
		}
	}, [loading, isLoading, tournamentData]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<div>
				<h2>Tournaments</h2>
				<p>Tournaments list description.</p>
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
								value={search}
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
						<Button to="/tournaments/add" component={Link} size="small" className="btn-neutral-primary">
							<span className="btn-wrapper--icon">
								<FontAwesomeIcon icon={['fas', 'plus-circle']} />
							</span>
							<span className="btn-wrapper--label">Add Tournament</span>
						</Button>
						</div>
					</div>
				</div>
				<CardContent className="px-0 pt-2 pb-3">
					<Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
						<thead>
							<tr>
								<th>Title</th>
								<th className="text-center">Created At</th>
								<th className="text-center">Updated At</th>
								<th className="text-center">Status</th>
								<th className="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ tournaments.map(t => (
								<TournamentsTableRow {...t} />
							))}
						</tbody>
					</Table>
					<div className="divider mb-3" />
					<div className="card-footer py-3 d-flex justify-content-between">
						<Collapse in={tournaments.length > entries}>
							<Pagination
								className="pagination-second"
								variant="outlined"
								page={page}
								onChange={handlePageChange}
								count={ Math.round((tournaments.length/entries)) + (tournaments.length%entries === 0 ? 0 : 1)}
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
		</>
	);
}
