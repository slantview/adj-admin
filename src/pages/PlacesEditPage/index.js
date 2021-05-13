import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import PlacesEditForm from 'components/PlacesEditForm';
import SectionHeader from 'components/SectionHeader';
import { GET_PLACE } from 'queries/places';

const PlacesEditPage = () => {
    // @ts-ignore
    const { placeId } = useParams();

    const { loading, error, data } = useQuery(
        GET_PLACE, 
        { 
            variables: { id: placeId, limit: 1 },
            notifyOnNetworkStatusChange: true 
        });
    const [placeData, setPlaceData] = useState(null);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if ((isLoading || !loading) && data && data.place) {
            setPlaceData(data.place);
            setLoading(loading);
        }
    }, [loading, data, error]);

    if (isLoading || placeData === null) {
        return (<Loading center={true} centerInPage={true} />);
    }
    
    return (
        <>
            <SectionHeader 
				title={"Edit " + placeData.name}
				titleColor="text-white"
				subtitle="Update venue data."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Venue"
				linkTo="/venues/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Venues", to: "/places" },
                    { title: placeData.name, to: null}
                ]}
			/>
			<div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={12} lg={12} xl={12} className="mt-3">
                        <PlacesEditForm place={placeData} />
                    </Grid>
                </Grid>
            </div>
       </>
    );
}

export default PlacesEditPage;