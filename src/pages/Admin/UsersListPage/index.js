import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';

import Loading from '../../../components/Loading';
import UsersListTableRow from '../../../components/UsersListTableRow';
import { UserContext } from '../../../providers/UserProvider';
import { getUsers } from '../../../utils/api';

export default function UsersListPage() {
    const userCtx = useContext(UserContext);
    let usersData = [];

	const [isLoading, setLoading] = React.useState(true);
    const [entries, setEntries] = React.useState(10);
    const [setSearch] = React.useState(null);
    const [users, setUsers] = React.useState(usersData);
    const [page, setPage] = React.useState(1);
   
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setUsers(usersData);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = users.filter(u => {
                return u.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
					u.last_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
					u.first_name.toLowerCase().includes(e.target.value.toLowerCase()) + ' ' +
					u.last_name.toLowerCase().includes(e.target.value.toLowerCase());
			});
			setUsers(newData);
		}
    };

	React.useEffect(() => {
        if (isLoading) {
            getUsers(userCtx.token)
                .then(async response => {
                    const fetchedData = await response.json();
					setUsers(fetchedData);
                    setLoading(false);
                });
        }
	}, [usersData, isLoading]);

	return (
		<>
			<SectionHeader 
				title="Users"
				titleColor="text-white"
				subtitle="Manage users and groups."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add User"
				linkTo="/admin/users/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Users", to: null }
                ]}
			/>
		 	<div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">All Users</h3>
                    </Grid>
					<Grid item md={6} lg={6} xl={6}>
                        <div className="text-right">
                            <Button
                                component={Link}
                                to={'/admin/users/add'}
                                // variant="contained"
                                size="small"
                                className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                    <span className="btn-wrapper--icon mr-2">
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
                                    </span>
                                    Add User
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

								<div className="card-header--actions">
									<div>
									</div>
								</div>
							</div>
							<CardContent className="px-0 pt-2 pb-3">
								<Table className="table table-borderless table-hover table-alternate text-nowrap mb-0">
									<thead>
										<tr>
											<th>User</th>
											<th>ID</th>
											<th className="text-center">Status</th>
											<th className="text-center">Role</th>
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
										{ !isLoading && users.slice((page-1)*entries, ((page-1)*entries)+entries).map(user => (
											<UsersListTableRow 
												key={user.id} 
												setLoading={setLoading}
												{...user} />
										))}
									</tbody>
								</Table>
								<div className="card-footer py-3 d-flex justify-content-between">
									<Collapse in={users.length > entries}>
										<Pagination
											className="pagination-second"
											variant="outlined"
											page={page}
											onChange={handlePageChange}
											count={ Math.round((users.length/entries)) + (users.length%entries === 0 ? 0 : 1)}
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
