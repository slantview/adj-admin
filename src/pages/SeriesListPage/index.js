import { NetworkStatus, useQuery } from '@apollo/client';
import { Button, Container, Grid } from '@material-ui/core';
import EventsUpcomingCard from 'components/EventsUpcomingCard';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext } from 'react';
import Error from '../../components/Error';
import Loading from '../../components/Loading';
import { GET_ALL_SERIES } from '../../queries/series';
import AddNewSeriesCard from './AddNewSeriesCard';
import SeriesListItem from './SeriesListItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
		if (isLoading && !loading && seriesData !== null) {
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
			<SectionHeader 
				title="Events"
				titleColor="text-white"
				subtitle="See all series, events, and tournaments."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Series"
				linkTo="/series/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Events", to: null }
                ]}
			/>
			<div className="mt-3 mx-4">
				<Grid container >
                    <Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Event Series</h3>
                    </Grid>
                    <Grid item md={6} lg={6} xl={6}>
                        <div className="text-right">
                            <Button
                                component={Link}
                                to={'/series/add'}
                                // variant="contained"
                                size="small"
                                className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                    <span className="btn-wrapper--icon mr-2">
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
                                    </span>
                                    Add Series
                            </Button>
                        </div>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-4">
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
					</Grid>
				</Grid>
				
			</div>
		</>
	);
}
