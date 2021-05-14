import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Error from 'components/Error';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import ServiceAreaTableRow from 'components/ServiceAreaTableRow';
import { SiteContext } from 'providers/SiteProvider';
import { GET_ALL_GEO_REGION_LISTS } from 'queries/service_areas';

const ServiceAreaListPage = (props) => {
	const siteCtx = useContext(SiteContext);
	const { loading, error, data, refetch } = useQuery(
		GET_ALL_GEO_REGION_LISTS,
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const geoRegionListsData = loading || error ? [] : data.geoRegionLists;
	const [isLoading, setLoading] = useState(loading);

	const [entries, setEntries] = useState(10);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = useState('');
	const [geoRegionLists, setGeoRegionLists] = useState(geoRegionListsData);
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setGeoRegionLists(geoRegionListsData);
			setSearch('');
		} else {
			setSearch(e.target.value);
			const newData = geoRegionListsData.filter(g => {
				return g.title.toLowerCase().includes(e.target.value.toLowerCase()) || g.description.toLowerCase().includes(e.target.value);
			})
			setGeoRegionLists(newData);
		}
	};

	const refreshServiceAreas = () => {
		setLoading(true);
		setGeoRegionLists([]);
		refetch();
	};

	useEffect(() => {
        let active = true;
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
                if (active) {
                    refreshServiceAreas();
                }
				resolve();
			});
		});
        return () => {
            active = false;
        };
	}, []);

	useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setGeoRegionLists(geoRegionListsData);
		}
	}, [loading, isLoading, geoRegionListsData]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<div>
            <SectionHeader 
                title="Service Areas"
                titleColor="text-white"
                subtitle="Manage your service areas"
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Service Areas", to: null }
                ]}
            />

			<Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="text-right mr-4">
                        <Button
                            component={Link}
                            to={'/service-areas/add'}
                            size="small"
                            className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                <span className="btn-wrapper--icon mr-2">
									<FontAwesomeIcon icon={['fas', 'plus']} />
                                </span>
                                Add Service Area
                        </Button>
                    </div>
                </Grid> 
            </Grid>
			<Card className="card-box mx-4 mt-4 pb-0">
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
				</div>
				<CardContent className="px-0 pt-2 pb-3">
					<Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
						<thead>
							<tr>
								<th>Title</th>
								<th className="text-left">Last Updated</th>
								<th className="text-right">Actions</th>
							</tr>
						</thead>
						<tbody>
							{ geoRegionLists.slice((page-1)*entries, ((page-1)*entries)+entries).map(r => (
								<ServiceAreaTableRow 
									key={r.id} 
									region={r} 
									refreshServiceAreas={refreshServiceAreas} 
								/>
							))}
						</tbody>
					</Table>
					<div className="card-footer d-flex justify-content-between">
						<Collapse in={geoRegionLists.length > entries}>
							<Pagination
								className="pagination-second"
								variant="outlined"
								page={page}
								onChange={handlePageChange}
								count={ Math.floor((geoRegionLists.length/entries)) + (geoRegionLists.length%entries === 0 ? 0 : 1)}
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
									<MenuItem className="mx-2 font-size-xs" value={5}>
										5
									</MenuItem>
									<MenuItem className="mx-2 font-size-xs" value={10}>
										10
									</MenuItem>
									<MenuItem className="mx-2 font-size-sm" value={20}>
										20
									</MenuItem>
									<MenuItem className="mx-2 font-size-xs" value={50}>
										50
									</MenuItem>
								</Select>
							</FormControl>
							<span>entries</span>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default ServiceAreaListPage;