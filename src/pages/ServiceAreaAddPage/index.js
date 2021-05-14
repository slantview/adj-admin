import { Grid } from '@material-ui/core';
import React from 'react';

import SectionHeader from 'components/SectionHeader';
import ServiceAreaAddForm from 'components/ServiceAreaAddForm';

const ServiceAreaAddPage = (props) => {
    return (
        <div>
            <SectionHeader 
                title="Add Service Area"
                titleColor="text-white"
                subtitle="Create new service area"
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Tournaments", to: "/tournaments" },
                    { title: "Service Areas", to: "/service-areas" },
                    { title: "Add Service Area", to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Create New Service Area</h3>
                    </Grid>
                    <Grid item md={12} lg={12} xl={12}>
                        <ServiceAreaAddForm />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ServiceAreaAddPage;
