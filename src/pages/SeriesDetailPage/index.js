import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Collapse, Grid } from '@material-ui/core';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import Error from 'components/Error';
import EventsUpcomingCard from 'components/EventsUpcomingCard';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import SeriesDetailBlock from 'components/SeriesDetailBlock';
import SeriesHeaderAnalytics from 'components/SeriesHeaderAnalytics';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { GET_SERIES } from 'queries/series';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getSiteAnalytics } from 'utils/api';
import { getSortedEvents } from 'utils/events';

const SeriesDetailPage = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const location = useLocation();

    // @ts-ignore
    const { seriesId } = useParams();
    const { loading, error, data, refetch } = useQuery(
		GET_SERIES, 
		{ 
            variables: { id: seriesId, limit: 1000 },
			notifyOnNetworkStatusChange: true 
		});
    const [seriesData, setSeriesData] = useState(null);
    const [isLoading, setLoading] = useState(loading);
    const [showSeriesDetails, setShowSeriesDetails] = useState(false);

    const timezone = siteCtx.timezone ? siteCtx.timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;

    const [sortedEvents, setSortedEvents] = useState(
       getSortedEvents(seriesData && seriesData.events ? seriesData.events : null, timezone)
    );
    
    const [analytics, setAnalytics] = useState(null);

    // @ts-ignore
    const refresh = location?.state?.refresh;

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

    const toggleSeriesDetails = () => {
        setShowSeriesDetails(!showSeriesDetails);
    }

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

            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className="text-right mr-4">
                        <Button
                            component={Link}
                            to={'/series/edit/' + seriesId}
                            size="small"
                            className="p-2 px-3 mr-0 btn btn-primary font-weight-bold">
                                <span className="btn-wrapper--icon mr-2">
                                    <SettingsTwoToneIcon fontSize="small" className="opacity-8" />
                                </span>
                                Edit Series
                        </Button>
                    </div>
                </Grid> 
            </Grid>
            <div className="mx-4 mt-1">
                <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Upcoming Events</h3>
                    </Grid>
                   
                    <Grid item md={12} lg={12} xl={12}>
                        <EventsUpcomingCard 
                            series={seriesData} 
                            events={sortedEvents.upcoming} 
                            next={sortedEvents.next}
                            refreshSeries={refreshSeries}
                        />
                    </Grid>

                    <Grid item md={12} lg={12} xl={12}>
                        <div className="text-right mr-4">
                            <a 
                                href="#/" 
                                onClick={toggleSeriesDetails}
                                className="text-first text-underline font-weight-bold"
								style={{textDecoration: "underline"}}>
                                    See Series Details
                            </a>
                        </div>
                        <Collapse
                            in={showSeriesDetails}
                        >

                            <SeriesDetailBlock series={seriesData} />
                        </Collapse>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default SeriesDetailPage;
