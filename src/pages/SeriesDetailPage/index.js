import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import EventsList from 'components/EventsList';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';
import { GET_SERIES } from 'queries/series';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../components/Error';

const SeriesDetailPage = (props) => {
    const siteCtx = useContext(SiteContext);
    // @ts-ignore
    const { seriesId } = useParams();
    const [entries, setEntries] = React.useState(10);
    const { loading, error, data, refetch, networkStatus } = useQuery(
		GET_SERIES, 
		{ 
            variables: { id: seriesId, limit: 9999 },
			notifyOnNetworkStatusChange: true 
		});
   const [seriesData, setSeriesData] = useState(null);
   const [isLoading, setLoading] = React.useState(loading);

   const refreshSeries = () => {
        setLoading(true);
        setSeriesData([]);
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
        if (isLoading && !loading && data && data.seriesItem) {
            setSeriesData(data.seriesItem);
            setLoading(loading);
        }
    }, [loading, data, error]);

	if (isLoading) {
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
                    { title: "Events Series", to: "/events" }
                ]}
                minHeight="25vh"
            />
            <Container className="mt-5">
                <EventsList 
                    events={seriesData.events} 
                    refreshSeries={refreshSeries} 
                    entries={entries} 
                    setEntries={setEntries}
                />
            </Container>
        </>
    )
}

export default SeriesDetailPage;
