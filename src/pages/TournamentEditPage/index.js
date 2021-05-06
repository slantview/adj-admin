import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import TournamentEditForm from 'components/TournamentEditForm';
import { GET_TOURNAMENT } from 'queries/tournaments';

const TournamentEditPage = (props) => {
     // @ts-ignore
     const { tournamentId } = useParams();

     const { loading, error, data } = useQuery(
         GET_TOURNAMENT, 
         { 
             variables: { id: tournamentId, limit: 1 },
             notifyOnNetworkStatusChange: true 
         });
     const [tournamentData, setTournamentData] = useState(null);
     const [isLoading, setLoading] = useState(loading);
 
     useEffect(() => {
         if ((isLoading || !loading) && data && data.tournament) {
            setTournamentData(data.tournament);
             setLoading(loading);
         }
     }, [loading, data, error]);
 
     if (isLoading || tournamentData === null) {
         return (<Loading center={true} centerInPage={true} />);
     }

    return (
        <div>
            <SectionHeader 
                title={"Edit " + tournamentData.title}
                titleColor="text-white"
                subtitle="Edit tournament details"
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Tournaments", to: "/tournaments" },
                    { title: "Add Tournament", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <TournamentEditForm tournament={tournamentData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default TournamentEditPage;