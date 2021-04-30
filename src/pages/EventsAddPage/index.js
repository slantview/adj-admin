import { useQuery } from '@apollo/client';
import { Container } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import Error from 'components/Error';
import EventAddForm from 'components/EventAddForm';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { SiteContext } from 'providers/SiteProvider';
import { GET_SERIES } from 'queries/series';

const SeriesAddPage = () => {
    const siteCtx = useContext(SiteContext);
    // @ts-ignore
    const { seriesId } = useParams();
    const { loading, error, data, refetch } = useQuery(
		GET_SERIES, 
		{ 
            variables: { id: seriesId, limit: 0 },
			notifyOnNetworkStatusChange: true 
		});
   const [seriesData, setSeriesData] = useState(null);
   const [isLoading, setLoading] = useState(loading);

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
                title="Create New Event"
                titleColor="text-white"
                backgroundStyle='bg-beacons-gradient'
                backgroundImage={seriesData.header.formats.large.url}
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: seriesData.title, to: "/series/" + seriesId },
                    { title: "Add Event", to: null }
                ]}
                minHeight="10vh"
            />
            <Container className="mt-3">
                <EventAddForm seriesId={seriesId} />
            </Container>
        </>
    );
};

export default SeriesAddPage;
