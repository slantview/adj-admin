import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import EventsList from 'components/EventsList';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import SeriesHeaderAnalytics from 'components/SeriesHeaderAnalytics';
import moment from 'moment-timezone';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { GET_SERIES } from 'queries/series';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSiteAnalytics } from 'utils/api';
import { getSortedEvents } from 'utils/events';
import Error from '../../components/Error';

const SeriesDetailAllEventsPage = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);

    // const history = useHistory();
    // @ts-ignore
    const { seriesId } = useParams();
    const [entries, setEntries] = React.useState(10);
    const { loading, error, data, refetch, networkStatus } = useQuery(
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
    
    const [analytics, setAnalytics] = useState(null);


    const nextEventFormatted = sortedEvents.next !== null ?
        moment(sortedEvents.next.starts_at).tz(timezone)
            .format("MMMM Do, YYYY") : "No Upcoming Events";


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
            
            const sortedEvents = getSortedEvents(data.seriesItem.events, timezone);
            setSortedEvents(sortedEvents);
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
                linkText="Add Event"
                linkTo={"/events/" + seriesId + "/add"}
                linkIconName="plus"
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: seriesData.title, to: "/series/" + seriesData.id }
                ]}
            >
                <Grid container alignItems="flex-end">
                    <Grid item sm={6} lg={6} xl={6}>
                        <Grid container>
                            <Grid item sm={12} lg={12} xl={12}>
                                <div className="mb-2">
                                    <span className="font-size-md text-uppercase text-white-50">Upcoming: </span>
                                    <span className="text-white font-weight-bold ">{sortedEvents.upcoming.length}</span>
                                    <span className="font-size-md text-uppercase text-white-50 ml-3">Completed: </span>
                                    <span className="text-white font-weight-bold">{sortedEvents.previous.length}</span>
                                    <span className="font-size-md text-uppercase text-white-50 ml-3">Unpublished: </span>
                                    <span className="text-white font-weight-bold">{sortedEvents.unpublished.length}</span>
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={6} lg={6} xl={6}>
                        <div className="mr-3">
                            <SeriesHeaderAnalytics analytics={analytics} timezone={timezone} />
                        </div>
                    </Grid>
                </Grid>
            </SectionHeader>
            
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
