import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Error from 'components/Error';
import Loading from 'components/Loading';
import PagesList from 'components/PagesList';
import SectionHeader from 'components/SectionHeader';
import { GET_ALL_PAGES } from 'queries/pages';

const PagesListPage = () => {
	const { loading, error, data,  refetch } = useQuery(
		GET_ALL_PAGES,
		{ 
			notifyOnNetworkStatusChange: true 
		});

	const [isLoading, setLoading] = useState(loading);
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        if (!loading) {
            setPageData(data);
            setLoading(false);
        }
    }, [data, error, loading])
	if (isLoading) {
		return (<Loading centerInPage={true} center={true} />);
	}

	if (error) {
		return (<Error message={error.message} />)
	}

	return (
		<>
			<SectionHeader 
				title="Pages"
				titleColor="text-white"
				subtitle="Manage all of the pages on your site."
				subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
				breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Pages", to: null }
                ]}
			/>
			
			<div className="mx-4 mt-4">
				<Grid container>
					<Grid item md={6} lg={6} xl={6}>
						<h3 className="text-uppercase font-weight-bolder pt-1 mb-0">Pages</h3>
					</Grid>
					
					<Grid item  md={12} lg={12} xl={12} className="mt-5">
						<PagesList data={pageData} />
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default PagesListPage;
