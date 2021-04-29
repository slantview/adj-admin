import { Grid } from '@material-ui/core';
import SectionHeader from 'components/SectionHeader';
import SeriesAddForm from 'components/SeriesAddForm';
import React from 'react';

const SeriesAddPage = (props) => {
    return (
        <>
            <SectionHeader 
                title="Add Series"
                titleColor="text-white"
                subtitle="Create a new series to hold events."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Events", to: "/events" },
                    { title: "Add Series", to: null }
                ]}
                minHeight="20vh"
            />
            <div className="mt-3 mx-4">
				<Grid container >
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Series</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <SeriesAddForm />
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default SeriesAddPage;
