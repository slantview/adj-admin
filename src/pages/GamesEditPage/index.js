import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import GamesEditForm from 'components/GameEditForm';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { GET_GAME } from 'queries/games';

const GamesEditPage = (props) => {
    // @ts-ignore
    const { gameId } = useParams();

    const { loading, error, data } = useQuery(
        GET_GAME, 
        { 
            variables: { id: gameId, limit: 1 },
            notifyOnNetworkStatusChange: true 
        });
    const [gameData, setGameData] = useState(null);
    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if ((isLoading || !loading) && data && data.game) {
            setGameData(data.game);
            setLoading(loading);
        }
    }, [loading, data, error]);

    if (isLoading || gameData === null) {
        return (<Loading center={true} centerInPage={true} />);
    }
    return (
        <div>
            <SectionHeader 
                title={gameData ? "Edit " + gameData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game game."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Games", to: "/games" },
                    { title: 'Edit ' + gameData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Game</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <GamesEditForm game={gameData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default GamesEditPage;
