import { Grid } from '@material-ui/core';
import React from 'react';

import ModesAddForm from 'components/ModesAddForm';
import SectionHeader from 'components/SectionHeader';

const ModesAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Game Mode"
                titleColor="text-white"
                subtitle="Create new game modes."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Games", to: "/games" },
                    { title: "Modes", to: "/games/modes" },
                    { title: "Add Mode", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Mode</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <ModesAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ModesAddPage;
