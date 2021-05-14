import { Grid } from '@material-ui/core';
import React from 'react';

import SectionHeader from 'components/SectionHeader';
import StreamsAddForm from 'components/StreamsAddForm';

const StreamsAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Stream"
                titleColor="text-white"
                subtitle="Create new stream"
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Streams", to: "/streams" },
                    { title: "Add Stream", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Stream</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <StreamsAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default StreamsAddPage;
