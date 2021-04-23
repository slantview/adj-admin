import { Container } from '@material-ui/core';
import SectionHeader from 'components/SectionHeader';
import React from 'react';
import BlogList from '../../components/BlogList';

export default function ContentDashboardPage() {
    return (
        <>
            <SectionHeader 
				title="Dashboard"
				titleColor="text-white"
				subtitle="Manage users and groups."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
                    { title: "Home", to: "/" }
                ]}
			/>
			<Container className="mt-5">
                <h1>Dashboard</h1>
                <p>This is where we dashboard at</p>
                <BlogList />
            </Container>
        </>
    );
}
