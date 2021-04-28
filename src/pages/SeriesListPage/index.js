import { NetworkStatus, useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import EventsUpcomingCard from 'components/EventsUpcomingCard';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext } from 'react';
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
				title="Event Series"
				titleColor="text-white"
				subtitle="See all series, events, and tournaments."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Series"
				linkTo="/series/add"
				linkIconName="plus"
				// breadcrumbs={[
                //     { title: "Home", to: "/" }
                // ]}
			/>
			<div className="mt-5 mx-5">
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
