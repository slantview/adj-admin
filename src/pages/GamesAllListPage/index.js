import { Card, CardContent, Collapse, FormControl, Grid, InputAdornment, MenuItem, Select, Table, TextField } from '@material-ui/core';
import Pagination from '@material-ui/core/Pagination';
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import React, { useEffect, useState } from 'react';

import GamesTableRow from 'components/GamesTableRow';

const GamesAllListPage = (props) => {
    const {
        games
    } = props;

    const [entries, setEntries] = useState(10);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = useState(null);
	const [gamesData, setGames] = useState(games);

    const handleSearchChange = (e) => {
		if (e.target.data === "") {
			setGames(games);
			setSearch(null);
		} else {
			setSearch(e.target.value);
			const newData = gamesData.filter(g => {
				return g.title.toLowerCase().includes(e.target.value.toLowerCase()) || g.description.toLowerCase().includes(e.target.value);
			});
			setGames(newData);
		}
	};

    useEffect(() => {
        setGames(games);
    }, [games])

    return (
        <div>
            <Grid container className="">
                <Grid item md={6} lg={6} xl={6}>
                    <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">All Games</h3>
                </Grid>
                <Grid item  md={12} lg={12} xl={12} className="mt-3">
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
                                        <th>Title</th>
                                        <th className="text-center">Created At</th>
                                        <th className="text-center">Updated At</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { gamesData.slice((page-1)*entries, ((page-1)*entries)+entries).map(game => (
                                        <GamesTableRow key={game.id} {...game} />
                                    ))}
                                </tbody>
                            </Table>
                            <div className="divider mb-3" />
                            <div className="card-footer py-3 d-flex justify-content-between">
                                <Collapse in={gamesData.length > entries}>
                                    <Pagination
                                        className="pagination-second"
                                        variant="outlined"
                                        page={page}
                                        onChange={handlePageChange}
                                        count={ Math.floor((gamesData.length/entries)) + (gamesData.length%entries === 0 ? 0 : 1)}
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
    )
}

export default GamesAllListPage
