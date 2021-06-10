import { Grid } from '@material-ui/core';
import PlatformsAddForm from 'components/PlatformsAddForm';
import React from 'react';

import SectionHeader from 'components/SectionHeader';

const PlatformsAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Game Platform"
                titleColor="text-white"
                subtitle="Create new game platforms."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Games", to: "/games" },
                    { title: "Platforms", to: "/games/platforms" },
                    { title: "Add Platform", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Platform</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <PlatformsAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default PlatformsAddPage;
