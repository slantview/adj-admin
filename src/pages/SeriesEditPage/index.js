import { Grid } from '@material-ui/core';
import SectionHeader from 'components/SectionHeader';
import SeriesEditForm from 'components/SeriesEditForm';
import { GET_SERIES } from 'queries/series';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Loading from 'components/Loading';

const SeriesEditPage = (props) => {
    // @ts-ignore
    const { seriesId } = useParams();

    const { loading, error, data, refetch, networkStatus } = useQuery(
		GET_SERIES, 
		{ 
            variables: { id: seriesId, limit: 1000 },
			notifyOnNetworkStatusChange: true 
		});
    const [seriesData, setSeriesData] = useState(null);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if ((isLoading || !loading) && data && data.seriesItem) {
            setSeriesData(data.seriesItem);
            setLoading(loading);
        }
    }, [loading, data, error]);

    if (isLoading || seriesData === null) {
        return (<Loading center={true} centerInPage={true} />);
    }

    return (
        <>
            <SectionHeader 
                title={"Edit " + seriesData.title}
                titleColor="text-white"
                subtitle={seriesData.subtitle}
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: "Edit " + seriesData.title, to: null }
                ]}
                minHeight="20vh"
            />
            <div className="mt-3 mx-4">
				<Grid container >
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Edit {seriesId}</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <SeriesEditForm series={seriesData} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default SeriesEditPage;