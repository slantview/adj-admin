import { Grid } from '@material-ui/core';
import SectionHeader from 'components/SectionHeader';
import TournamentAddForm from 'components/TournamentAddForm';
import React from 'react';

export default function SeriesAddPage() {
    return (
        <div>
            <SectionHeader 
                title="Add Tournament"
                titleColor="text-white"
                subtitle="Create new tournament"
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
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Tournament</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <TournamentAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
