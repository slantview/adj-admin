import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import ServiceAreaEditForm from 'components/ServiceAreaEditForm';
import { GET_GEO_REGION_LIST } from 'queries/service_areas';

const ServiceAreaEditPage = (props) => {
    // @ts-ignore
    const { regionId } = useParams();

    const { loading, error, data } = useQuery(
    GET_GEO_REGION_LIST, 
        { 
            variables: { id: regionId, limit: 1 },
            notifyOnNetworkStatusChange: true 
        });
    const [regionData, setRegionData] = useState(null);

    useEffect(() => {
        let active = true;
        if (active && data && data.geoRegionList) {
            setRegionData(data.geoRegionList);
        }
        return () => {
            active = false;
        }
    }, [loading, data, error]);

    if (loading || regionData === null) {
        return (<Loading center={true} centerInPage={true} />);
    }

    return (
        <div>
            <SectionHeader 
                title={regionData ? "Edit " + regionData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update service area."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
                    { title: "Service Areas", to: "/service-areas" },
                    { title: 'Edit ' + regionData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <ServiceAreaEditForm region={regionData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default ServiceAreaEditPage;
