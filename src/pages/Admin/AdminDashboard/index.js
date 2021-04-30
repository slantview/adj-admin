import { Grid } from '@material-ui/core';
import React from 'react';

import SectionHeader from 'components/SectionHeader';

import OrganizationsGraph from '../OrganizationsGraph';
import SitesGraph from '../SitesGraph';
import UsersGraph from '../UsersGraph';

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
                    { title: "Admin Dashboard", to: null }
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
