import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Grid
} from '@material-ui/core';
import SectionHeader from 'components/SectionHeader';
import React from 'react';
import { Link } from 'react-router-dom';

const PlacesAddPage = () => {
    return (
        <>
            <SectionHeader 
				title="Add Venue"
				titleColor="text-white"
				subtitle="Add a new venue."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				linkText="Add Venue"
				linkTo="/venues/add"
				linkIconName="plus"
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Venues", to: null }
                ]}
			/>
			<div className="mx-4 mt-4">
                <Grid container>
					<Grid item md={12} lg={12} xl={12}>
                        <h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Add Venue</h3>
                    </Grid>
					<Grid item md={12} lg={12} xl={12} className="mt-3">

                    </Grid>
                </Grid>
            </div>
       </>
    );
}

export default PlacesAddPage;