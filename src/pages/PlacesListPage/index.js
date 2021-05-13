import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';

import Error from '../../components/Error';
import Loading from '../../components/Loading';
import PlacesTableRow from '../../components/PlacesTableRow';
import { GET_ALL_PLACES } from '../../queries/places';

const PlacesListPage = () => {
	const siteCtx = useContext(SiteContext);
	const { loading, error, data, refetch } = useQuery(
		GET_ALL_PLACES, 
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const placesData = loading || error ? [] : data ? data.places : [];
	const [isLoading, setLoading] = useState(loading);

	const [entries, setEntries] = useState(10);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page] = useState(1);

	const [setSearch] = useState(null);
	const [places, setPlaces] = useState(placesData);

	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setPlaces(placesData);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = placesData.filter(g => {
				return g.name.toLowerCase().includes(e.target.value.toLowerCase()) || g.description.toLowerCase().includes(e.target.value);
			})
			setPlaces(newData);
		}
	};

	const refreshPlaces = () => {
		setLoading(true);
		setPlaces([]);
		refetch();
	}

	// Register to be notified of a site change.
	React.useEffect(() => {
		let active = true;
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
				if (active) {
					refreshPlaces();
				}
				resolve();
			});
		});
		return () => {
			active = false;
		};
	}, [])

	useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setPlaces(placesData);
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
				title="Venues"
				titleColor="text-white"
				subtitle="Manage places where you have events."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Venue"
				linkTo="/venues/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Venues", to: null }
                ]}
			/>
			<div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">All Venues</h3>
                    </Grid>
					<Grid item md={6} lg={6} xl={6}>
                        <div className="text-right">
                            <Button
                                component={Link}
                                to={'/places/add'}
                                // variant="contained"
                                size="small"
                                className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                    <span className="btn-wrapper--icon mr-2">
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
                                    </span>
                                    Add Venue
                            </Button>
                        </div>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-3">
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
							</div>
							<CardContent className="px-0 pt-2 pb-3">
								<Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
									<thead>
										<tr>
											<th>Name</th>
											<th className="text-center">Events</th>
											<th className="text-center">Tournaments</th>
											<th className="text-center">Created At</th>
											<th className="text-center">Updated At</th>
											<th className="text-center">Status</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{ places.map(place => (
											<PlacesTableRow key={place.id} {...place} />
										))}
									</tbody>
								</Table>
								<div className="divider mb-3" />
								<div className="card-footer py-3 d-flex justify-content-between">
									<Collapse in={places.length > entries}>
										<Pagination
											className="pagination-second"
											variant="outlined"
											page={page}
											count={ Math.floor((places.length/entries)) + (places.length%entries === 0 ? 0 : 1)}
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
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default PlacesListPage;
