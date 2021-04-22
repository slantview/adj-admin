import { NetworkStatus, useQuery } from '@apollo/client';
import { Button, Grid, Snackbar } from '@material-ui/core';
import RefreshTwoToneIcon from '@material-ui/icons/RefreshTwoTone';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext, useState } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_ALL_SERIES } from '../../queries/series';
import AddNewSeriesCard from './AddNewSeriesCard';
import SeriesListItem from './SeriesListItem';

export default function SeriesListPage() {
	const siteCtx = useContext(SiteContext);
	const { loading, error, data, refetch, networkStatus } = useQuery(
		GET_ALL_SERIES, 
		{ 
			notifyOnNetworkStatusChange: true 
		});
	const seriesData = loading || error ? [] : data ? data.seriesItems : [];
	const [isLoading, setLoading] = React.useState(loading);
	const [series, setSeries] = React.useState(seriesData);
	const isRefetching = networkStatus === NetworkStatus.refetch;

	const refreshSeries = () => {
		setLoading(true);
		setSeries([]);
		refetch();
	};

	// Register to be notified of a site change.
	React.useEffect(() => {
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
				refreshSeries();
				resolve();
			});
		});
	}, [])

	React.useEffect(() => {
		if (isLoading && !loading) {
			setLoading(loading);
			setSeries(seriesData);
		}
	}, [loading, data, error]);

	if (loading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<div>
				<Grid container>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
						<h2>Events</h2>
						<p>See all series, events, and tournaments.</p>
					</Grid>
					<Grid item xs={6} sm={6} md={6} lg={6} xl={6} className="text-right">
						<Button component="a" onClick={() => refreshSeries() } size="small" className="btn-neutral-primary mr-2">
							<span className="btn-wrapper--icon">
								<RefreshTwoToneIcon fontSize="medium" />
							</span>
						</Button>
					</Grid>
				</Grid>
				{ series.length === 0 &&
					<AddNewSeriesCard />
				}

				{ series.length > 0 && series.map(item => (
					<SeriesListItem 
						key={item.id}  
						setLoading={setLoading}
						refreshSeries={refreshSeries}
						{...item}
					/>
				))}
			</div>
		</>
	);
}
