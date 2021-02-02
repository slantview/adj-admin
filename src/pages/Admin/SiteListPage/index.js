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
    Snackbar
 } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading';
import { getSites } from '../../../utils/api';
import { UserContext } from '../../../providers/UserProvider';
import SiteListTableRow from '../../../components/SiteListTableRow';

export default function SiteListPage() {
    const userCtx = useContext(UserContext);

	const [isLoading, setLoading] = React.useState(true);
    const [entries, setEntries] = React.useState(10);
    const [search, setSearch] = React.useState(null);
    const [sites, setSites] = React.useState([]);
    const [allSites, setAllSites] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [notification, setNotification] = useState({
        open: false,
        type: '',
        message: ''
    });
   
    const setNotificationWrapper = (update, updateUsers) => {
        setNotification(update);
        if (!isLoading && updateUsers) {
            setLoading(true);
        }
    };
    const handleClose = () => {
        setNotification({ ...notification, open: false });
    };
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
			<div>
				<h2>Sites</h2>
				<p>List all sites.</p>
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
							<Button component="a" onClick={() => setLoading(true)} size="small" className="btn-neutral-primary mr-2">
								<span className="btn-wrapper--icon">
									<RefreshTwoToneIcon fontSize="small" />
								</span>
							</Button>
							<Button to="/admin/sites/add" component={Link} size="small" className="btn-neutral-primary">
								<span className="btn-wrapper--icon">
									<FontAwesomeIcon icon={['fas', 'plus-circle']} />
								</span>
								<span className="btn-wrapper--label">Add Organization</span>
							</Button>
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
								<SiteListTableRow key={org.id} setLoading={setLoading} setNotification={setNotificationWrapper} {...org} />
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
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center' }}
                key="notification"
                autoHideDuration={5000}
                open={notification.open}
                classes={{ root: 'toastr-' + notification.type }}
                onClose={handleClose}
                message={notification.message}
            />
		</>
	);
}
