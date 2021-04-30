import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, Container, FormControl, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';

import Error from '../../components/Error';
import GamesTableRow from '../../components/GamesTableRow';
import Loading from '../../components/Loading';
import { GET_ALL_GAMES } from '../../queries/games';

const GamesListPage = () => {
	const siteCtx = useContext(SiteContext);
	const { loading, error, data,  refetch } = useQuery(
		GET_ALL_GAMES,
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const gamesData = loading || error ? [] : data ? data.games : [];
	const [isLoading, setLoading] = useState(loading);

	const [entries, setEntries] = useState(5);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [setSearch] = useState(null);
	const [games, setGames] = useState(gamesData);
	
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setGames(data);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = gamesData.filter(g => {
				return g.title.toLowerCase().includes(e.target.value.toLowerCase()) || g.description.toLowerCase().includes(e.target.value);
			});
			setGames(newData);
		}
	};

	const refreshGames = () => {
		setLoading(true);
		setGames([]);
		refetch();
	}

	// Register to be notified of a site change.
	React.useEffect(() => {
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
				refreshGames();
				resolve();
			});
		});
	}, [])

	React.useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setGames(gamesData);
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
			<SectionHeader 
				title="Games"
				titleColor="text-white"
				subtitle="Manage all your games and customize the display."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Game"
				linkTo="/games/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Games", to: null }
                ]}
			/>
			<Container className="mt-5">
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
								<span className="btn-wrapper--label">Add Game</span>
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
									<th className="text-right">Actions</th>
								</tr>
							</thead>
							<tbody>
								{ games.slice((page-1)*entries, ((page-1)*entries)+entries).map(game => (
									<GamesTableRow key={game.id} {...game} />
								))}
							</tbody>
						</Table>
						<div className="divider mb-3" />
						<div className="card-footer py-3 d-flex justify-content-between">
							<Collapse in={games.length > entries}>
								<Pagination
									className="pagination-second"
									variant="outlined"
									page={page}
									onChange={handlePageChange}
									count={ Math.round((games.length/entries)) + (games.length%entries === 0 ? 0 : 1)}
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
			</Container>
		</>
	);
};

export default GamesListPage;
