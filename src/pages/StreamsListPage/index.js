import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SectionHeader from 'components/SectionHeader';
import StreamsTableRow from 'components/StreamsTableRow';
import { SiteContext } from 'providers/SiteProvider';
import { GET_ALL_STREAMS } from 'queries/streams';

import Error from '../../components/Error';
import Loading from '../../components/Loading';

const StreamsListPage = (props) => {
	const siteCtx = useContext(SiteContext);
	const { loading, error, data, refetch } = useQuery(
		GET_ALL_STREAMS,
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const streamData = loading || error ? [] : data.streams;
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
	const [streams, setStream] = useState(streamData);
	const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setStream(streamData);
			setSearch('');
		} else {
			setSearch(e.target.value);
			const newData = streamData.filter(s => {
				return s.name.toLowerCase().includes(e.target.value.toLowerCase()) || s.description.toLowerCase().includes(e.target.value);
			})
			setStream(newData);
		}
	};

	const refreshStreams = () => {
		setLoading(true);
		setStream([]);
		refetch();
	};

	useEffect(() => {
        let active = true;
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
                if (active) {
                    refreshStreams();
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
			setStream(streamData);
		}
	}, [loading, isLoading, streamData]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<div>
            <SectionHeader 
                title="Streams"
                titleColor="text-white"
                subtitle="Manage your game streams."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Streams", to: null }
                ]}
            >
                <Grid container alignItems="flex-end">
                    <Grid item sm={12} lg={12} xl={12}>
                        <div className="mr-3">
                            
                        </div>
                    </Grid>
                </Grid>
            </SectionHeader>

			<Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="text-right mr-4">
                        <Button
                            component={Link}
                            to={'/streams/add'}
                            size="small"
                            className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                <span className="btn-wrapper--icon mr-2">
									<FontAwesomeIcon icon={['fas', 'plus']} />
                                </span>
                                Add Stream
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
							{ streams.map(s => (
								<StreamsTableRow 
									key={s.id} 
									stream={s} 
									refreshStreams={refreshStreams} 
								/>
							))}
						</tbody>
					</Table>
					<div className="card-footer d-flex justify-content-between">
						<Collapse in={streams.length > entries}>
							<Pagination
								className="pagination-second"
								variant="outlined"
								page={page}
								onChange={handlePageChange}
								count={ Math.floor((streams.length/entries)) + (streams.length%entries === 0 ? 0 : 1)}
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

export default StreamsListPage;