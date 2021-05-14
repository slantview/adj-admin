import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import StreamsEditForm from 'components/StreamsEditForm';
import { GET_STREAM } from 'queries/streams';

const StreamsEditPage = (props) => {
       // @ts-ignore
       const { streamId } = useParams();

       const { loading, error, data } = useQuery(
           GET_STREAM, 
           { 
               variables: { id: streamId, limit: 1 },
               notifyOnNetworkStatusChange: true 
           });
       const [streamData, setStreamData] = useState(null);
       const [isLoading, setLoading] = useState(loading);
   
       useEffect(() => {
           if ((isLoading || !loading) && data && data.stream) {
                setStreamData(data.stream);
                setLoading(loading);
           }
       }, [loading, data, error]);
   
       if (isLoading || streamData === null) {
           return (<Loading center={true} centerInPage={true} />);
       }
    return (
        <div>
            <SectionHeader 
                title={streamData ? "Edit " + streamData?.name : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game stream."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Streams", to: "/streams" },
                    { title: 'Edit ' + streamData?.name, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <StreamsEditForm stream={streamData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default StreamsEditPage;
