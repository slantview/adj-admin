import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Grid } from '@material-ui/core';
import OrganizationAddForm from 'components/OrganizationAddForm';
import SectionHeader from 'components/SectionHeader';
import React from 'react';

const OrganizationAddPage = (props) => {
    return (
		<>
			<SectionHeader 
				title="Add New Organization"
				titleColor="text-white"
				backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
					{ title: "Home", to: "/" },
					{ title: "Organizations", to: "/admin/organizations" },
                    { title: "Add Organization", to: null }
				]}
			/>

            <div className="mx-4 mt-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12} className="mt-3">
                        <OrganizationAddForm />
                    </Grid>
                </Grid>
            </div>
		</>
    )
}

export default OrganizationAddPage;
