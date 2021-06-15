import { Grid } from '@material-ui/core';
import React from 'react';

import RulesAddForm from 'components/RulesAddForm';
import SectionHeader from 'components/SectionHeader';

const RulesAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Game Rules"
                titleColor="text-white"
                subtitle="Create new game rules."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Rules", to: "/games/rules" },
                    { title: "Add Rule", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Rule</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <RulesAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default RulesAddPage;
