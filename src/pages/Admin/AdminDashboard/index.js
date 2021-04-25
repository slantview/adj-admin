import React from 'react';
import { Container, Grid } from '@material-ui/core';
import UsersGraph from '../UsersGraph';
import SitesGraph from '../SitesGraph';
import OrganizationsGraph from '../OrganizationsGraph';
import SectionHeader from 'components/SectionHeader';

export default function ContentDashboardPage() {
    return (
        <>
        	<SectionHeader 
				title="Admin Dashboard"
				titleColor="text-white"
				subtitle=""
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" }
                ]}
			/>
            <div className="mt-2 mx-3">
                <Grid container spacing={2}>
                    <Grid item lg={6}> 
                        <OrganizationsGraph />
                    </Grid>
                    <Grid item lg={6}> 
                        <SitesGraph />
                    </Grid>
                    <Grid item lg={12}>
                        <UsersGraph />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}
