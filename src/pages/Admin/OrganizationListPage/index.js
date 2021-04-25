import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	Table, 
	Card, 
	CardContent, 
	Button,
	FormControl,
	Select,
	MenuItem,
	TextField,
	Collapse,
    InputAdornment,
    Snackbar,
	Container
 } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { getOrganizations } from '../../../utils/api';
import { UserContext } from '../../../providers/UserProvider';
import OrganizationListTableRow from '../../../components/OrganizationListTableRow';
import { useHistory } from 'react-router-dom';
import SectionHeader from 'components/SectionHeader';

export default function OrganizationListPage() {
    const userCtx = useContext(UserContext);
	const history = useHistory();

	let orgData = [];

	const [isLoading, setLoading] = React.useState(true);
    const [entries, setEntries] = React.useState(10);
    const [search, setSearch] = React.useState(null);
    const [organizations, setOrganizations] = React.useState(orgData);
    const [page, setPage] = React.useState(1);
   
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setOrganizations(orgData);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = organizations.filter(o => {
                return o.name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setOrganizations(newData);
		}
    };

	React.useEffect(() => {
        if (isLoading) {
            getOrganizations(userCtx.token)
                .then(async response => {
					if (response.ok) {
						const fetchedData = await response.json();
						setOrganizations(fetchedData);
						orgData = fetchedData;
						setLoading(false);
					} else if (response.status === 401) {
						console.log('needs authentication.')
						history.push('/login', { from: window.location.pathname });
					}
                })
				.catch(e => {
					console.error(e);
				});
        }
	}, [orgData, isLoading]);

	return (
		<>
			<SectionHeader 
				title="Organizations"
				titleColor="text-white"
				subtitle="List all organizations."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Organization"
				linkTo="/admin/organizations/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" }
                ]}
			/>
			<div className="mt-2 mx-3">
				<Card className="card-box mb-spacing-6-x2">
					<div className="card-header">
						<div className="card-header--title">
							
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
									<th>Organization</th>
									<th>ID</th>
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
								{ !isLoading && organizations.length > 0 && organizations.slice((page-1)*entries, ((page-1)*entries)+entries).map(org => (
									<OrganizationListTableRow 
										key={org.id} 
										setLoading={setLoading}
										{...org} />
								))}
							</tbody>
						</Table>
						<div className="card-footer py-3 d-flex justify-content-between">
							<Collapse in={organizations.length > entries}>
								<Pagination
									className="pagination-second"
									variant="outlined"
									page={page}
									onChange={handlePageChange}
									count={ Math.round((organizations.length/entries)) + (organizations.length%entries === 0 ? 0 : 1)}
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
