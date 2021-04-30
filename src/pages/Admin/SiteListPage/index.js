import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';

import Loading from '../../../components/Loading';
import SiteListTableRow from '../../../components/SiteListTableRow';
import { UserContext } from '../../../providers/UserProvider';
import { getSites } from '../../../utils/api';

export default function SiteListPage() {
    const userCtx = useContext(UserContext);
	
	const [isLoading, setLoading] = React.useState(true);
    const [entries, setEntries] = React.useState(10);
    const [setSearch] = React.useState(null);
    const [sites, setSites] = React.useState([]);
    const [allSites, setAllSites] = React.useState([]);
    const [page, setPage] = React.useState(1);
   
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setSites(allSites);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = allSites.filter(o => {
                return o.name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setSites(newData);
		}
    };

	React.useEffect(() => {
        if (isLoading) {
            getSites(userCtx.token)
                .then(async response => {
                    const fetchedData = await response.json();
					setSites(fetchedData);
					setAllSites(fetchedData);
                    setLoading(false);
                });
        }
	}, [allSites, sites, isLoading]);

	return (
		<>
			<SectionHeader 
				title="Sites"
				titleColor="text-white"
				subtitle="List all sites."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Site"
				linkTo="/admin/sites/add"
				linkIconName="plus"
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Sites", to: null }
                ]}
			/>
			 <div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">All Sites</h3>
                    </Grid>
					<Grid item md={6} lg={6} xl={6}>
                        <div className="text-right">
                            <Button
                                component={Link}
                                to={'/admin/sites/add'}
                                // variant="contained"
                                size="small"
                                className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                    <span className="btn-wrapper--icon mr-2">
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
                                    </span>
                                    Add Site
                            </Button>
                        </div>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-3">
						<Card className="card-box mb-spacing-6-x2">
							<div className="card-header">
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
											<th>Site</th>
											<th>URL</th>
											<th className="text-center">Status</th>
											<th className="text-right">Actions</th>
										</tr>
									</thead>
									<tbody>
										{ isLoading && 
											<tr>
												<td colSpan={5}>
													<div className="text-center my-3">
														<Loading centerInPage={false} center={true} />
													</div> 
												</td>
											</tr>
										}
										{ !isLoading && sites.length > 0 && sites.slice((page-1)*entries, ((page-1)*entries)+entries).map(org => (
											<SiteListTableRow 
												key={org.id} 
												setLoading={setLoading}
												{...org} />
										))}
									</tbody>
								</Table>
								<div className="card-footer py-3 d-flex justify-content-between">
									<Collapse in={sites.length > entries}>
										<Pagination
											className="pagination-second"
											variant="outlined"
											page={page}
											onChange={handlePageChange}
											count={ Math.round((sites.length/entries)) + (sites.length%entries === 0 ? 0 : 1)}
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
}
