import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import PlatformsEditForm from 'components/PlatformsEditForm';
import SectionHeader from 'components/SectionHeader';
import { GET_GAME_PLATFORM } from 'queries/platforms';

const GamePlatformsEditPage = (props) => {
       // @ts-ignore
       const { platformId } = useParams();

       const { loading, error, data } = useQuery(
            GET_GAME_PLATFORM, 
           { 
               variables: { id: platformId, limit: 1 },
               notifyOnNetworkStatusChange: true 
           });
       const [platformData, setPlatformData] = useState(null);
       const [isLoading, setLoading] = useState(loading);
   
       useEffect(() => {
           if ((isLoading || !loading) && data && data.platform) {
                setPlatformData(data.platform);
                setLoading(loading);
           }
       }, [loading, data, error]);
   
       if (isLoading || platformData === null) {
           return (<Loading center={true} centerInPage={true} />);
       }
    return (
        <div>
            <SectionHeader 
                title={platformData ? "Edit " + platformData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game platform."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Games", to: "/games" },
                    { title: "Platforms", to: "/games/platforms" },
                    { title: 'Edit ' + platformData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <PlatformsEditForm platform={platformData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default GamePlatformsEditPage;
