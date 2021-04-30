import { useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Error from 'components/Error';
import EventsList from 'components/EventsList';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { GET_SERIES } from 'queries/series';
import { getSiteAnalytics } from 'utils/api';
import { getSortedEvents } from 'utils/events';

const SeriesDetailAllEventsPage = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);

    // @ts-ignore
    const { seriesId } = useParams();
    const [entries, setEntries] = useState(10);
    const { loading, error, data, refetch } = useQuery(
		GET_SERIES, 
		{ 
            variables: { id: seriesId, limit: 1000 },
			notifyOnNetworkStatusChange: true 
		});
    const [seriesData, setSeriesData] = useState(null);
    const [isLoading, setLoading] = useState(loading);
    const timezone = siteCtx.timezone ? siteCtx.timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
    const [sortedEvents, setSortedEvents] = useState(
       getSortedEvents(seriesData && seriesData.events ? seriesData.events : null, timezone)
    );
    const [setAnalytics] = useState(null);
    
    const refreshSeries = () => {
        setLoading(true);
        setSeriesData([]);
        refetch();
    };

    const refreshSiteAnalytics = () => {
        if (seriesData !== null) {
            getSiteAnalytics(userCtx.token, siteCtx.selected, seriesData.slug)
                .then(resp => resp.json())
                .then(data => {
                    setAnalytics(data.rows);
                })
                .catch(e => {
                    console.error(e);
                });
        }
    };

    // First load only.
	useEffect(() => {
		siteCtx.onSiteChanged(async () => {
			return new Promise((resolve, reject) => {
				refreshSeries();
                refreshSiteAnalytics();
				resolve();
			});
		});
	}, []);

    useEffect(() => {
        refreshSiteAnalytics();
    }, [seriesData])


    useEffect(() => {
        if ((isLoading || !loading) && data && data.seriesItem) {
            setSeriesData(data.seriesItem);
            setSortedEvents(getSortedEvents(data.seriesItem.events, timezone));
            setLoading(loading);
        }
    }, [loading, data, error]);

	if (isLoading || seriesData === null) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

    return (
        <>
            <SectionHeader 
                title={seriesData.title}
                titleColor="text-white"
                subtitle={seriesData.subtitle}
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                backgroundImage={seriesData.header.formats.large.url}
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: seriesData.title, to: "/series/view/" + seriesData.id },
                    { title: "All Events", to: null }
                ]}
                minHeight="20vh"
            />
            
            <div className="mt-3 mx-4">
                { seriesData.events && seriesData.events.length > 0 &&
                     <EventsList 
                        headerTitle={"All"}
                        events={seriesData.events} 
                        refreshSeries={refreshSeries} 
                        entries={entries} 
                        setEntries={setEntries}
                    />
                }
               
            </div>
        </>
    )
}

export default SeriesDetailAllEventsPage;
