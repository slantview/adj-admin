import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import ModesEditForm from 'components/ModesEditForm';
import SectionHeader from 'components/SectionHeader';
import { GET_GAME_MODE } from 'queries/modes';

const GameModesEditPage = (props) => {
       // @ts-ignore
       const { modeId } = useParams();

       const { loading, error, data } = useQuery(
            GET_GAME_MODE, 
           { 
               variables: { id: modeId, limit: 1 },
               notifyOnNetworkStatusChange: true 
           });
       const [modeData, setModeData] = useState(null);
       const [isLoading, setLoading] = useState(loading);
   
       useEffect(() => {
           if ((isLoading || !loading) && data && data.gameMode) {
                setModeData(data.gameMode);
                setLoading(loading);
           }
       }, [loading, data, error]);
   
       if (isLoading || modeData === null) {
           return (<Loading center={true} centerInPage={true} />);
       }
    return (
        <div>
            <SectionHeader 
                title={modeData ? "Edit " + modeData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game mode."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Games", to: "/games" },
                    { title: "Modes", to: "/games/modes" },
                    { title: 'Edit ' + modeData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <ModesEditForm mode={modeData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default GameModesEditPage;
