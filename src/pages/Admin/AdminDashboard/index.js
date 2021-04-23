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
                    { title: "Home", to: "/" },
                    { title: "Dashboard", to: "/admin/dashboard" }
                ]}
			/>
            <Container className="mt-3">
                <Grid container spacing={3}>
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
            </Container>
        </>
    );
}
