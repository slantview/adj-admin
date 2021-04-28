import { Container } from '@material-ui/core';
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
			<Container className="mt-5">
				<OrganizationAddForm />
			</Container>
		</>
    )
}

export default OrganizationAddPage;
