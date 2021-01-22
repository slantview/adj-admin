import React from 'react';
import { Grid } from '@material-ui/core';
import UsersGraph from '../UsersGraph';
import SitesGraph from '../SitesGraph';
import OrganizationsGraph from '../OrganizationsGraph';

export default function ContentDashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
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
            
        
        </div>
    );
}
