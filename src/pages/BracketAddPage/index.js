import { Grid } from '@material-ui/core';
import React from 'react';

import BracketsAddForm from 'components/BracketsAddForm';
import SectionHeader from 'components/SectionHeader';

const BracketsAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Bracket Format"
                titleColor="text-white"
                subtitle="Create new tournament bracket format."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Tournaments", to: "/tournaments" },
                    { title: "Bracket Formats", to: "/tournaments/brackets" },
                    { title: "Add Bracket Format", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Bracket Format</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <BracketsAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default BracketsAddPage;
