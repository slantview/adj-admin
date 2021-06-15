import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';

import GameAddDialog from 'components/GameAddDialog';
import GamesCardList from 'components/GamesCardList';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';

import Error from '../../components/Error';
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
	const [entries, setEntries] = useState(10);
	const handleEntriesChange = (e) => {
		setEntries(e.target.value);
	};
	const [page, setPage] = useState(1);
	const handlePageChange = (event, page) => {
		setPage(page);
	};
	const [search, setSearch] = useState(null);
	const [games, setGames] = useState(gamesData);
	const [addGameOpen, setAddGameOpen] = useState(false);
	
	const getEnabledGames = () => {
		return gamesData.filter(g => g.enabled === true);
	}

	const showAddGame = (e) => {
		setAddGameOpen(true);
		e.preventDefault();
	}

	const refreshGames = () => {
		setLoading(true);
		setGames([]);
		refetch();
	}

	// Register to be notified of a site change.
	React.useEffect(() => {
		let active = true;
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
				if (active) {
					refreshGames();
				}
				resolve();
			});
		});
		return () => {
			active = false;
		};
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
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Games", to: null }
                ]}
			/>
			
			<div className="mx-4 mt-4">
				<Grid container className="">
					<Grid item md={6} lg={6} xl={6}>
						<h3 className="text-uppercase font-weight-bolder pt-1 mb-0">My Games</h3>
					</Grid>
					
					<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
						<div className="text-right mr-4">
							<Button
								onClick={showAddGame}
								size="small"
								className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
									<span className="btn-wrapper--icon mr-2">
										<FontAwesomeIcon icon={['fas', 'plus']} />
									</span>
									Add Game
							</Button>
						</div>
					</Grid> 
					
					<Grid item  md={12} lg={12} xl={12} className="mt-5">
						<GamesCardList games={getEnabledGames()} />
					</Grid>
				</Grid>
			</div>
			<GameAddDialog
				open={addGameOpen}
				close={setAddGameOpen}
				setLoading={setLoading}
				refreshGames={refreshGames}
			/>
		</>
	);
};

export default GamesListPage;
