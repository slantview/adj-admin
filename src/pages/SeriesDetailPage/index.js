import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Grid } from '@material-ui/core';
import EventsUpcomingCard from 'components/EventsUpcomingCard';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import SeriesHeaderAnalytics from 'components/SeriesHeaderAnalytics';
import moment from 'moment-timezone';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { GET_SERIES } from 'queries/series';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getSiteAnalytics } from 'utils/api';
import { getSortedEvents } from 'utils/events';
import Error from '../../components/Error';

const SeriesDetailPage = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const location = useLocation();

    // @ts-ignore
    const { seriesId } = useParams();
    const [entries, setEntries] = React.useState(5);
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

    // @ts-ignore
    const { refresh } = location.state.refresh;

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
        if (refresh) {
            refreshSeries();
        }
    }, [refresh])

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
        <div>
            <SectionHeader 
                title={seriesData.title}
                titleColor="text-white"
                subtitle={seriesData.subtitle}
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                backgroundImage={seriesData.header.formats.large.url}
                // linkText="Add Event"
                // linkTo={"/events/" + seriesId + "/add"}
                // linkIconName="plus"
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: seriesData.title, to: null }
                ]}
                minHeight="20vh"
            >
                <Grid container alignItems="flex-end">
                    <Grid item sm={12} lg={12} xl={12}>
                        <div className="mr-3">
                            <SeriesHeaderAnalytics analytics={analytics} timezone={timezone} />
                        </div>
                    </Grid>
                </Grid>
            </SectionHeader>

            <div className="mx-4 mt-4">
                <Grid container>
                    <Grid item md={6} lg={6} xl={6}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Upcoming Events</h3>
                    </Grid>
                    <Grid item md={6} lg={6} xl={6}>
                        <div className="text-right">
                            <Button
                                component={Link}
                                to={'/events/' + seriesId + '/add'}
                                // variant="contained"
                                size="small"
                                className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                    <span className="btn-wrapper--icon mr-2">
                                        <FontAwesomeIcon icon={['fas', 'plus']} className="opacity-8" />
                                    </span>
                                    Add Event
                            </Button>
                        </div>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <EventsUpcomingCard 
                            series={seriesData} 
                            events={sortedEvents.upcoming} 
                            next={sortedEvents.next}
                            refreshSeries={refreshSeries}
                        />
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default SeriesDetailPage;
