import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import BracketsEditForm from 'components/BracketEditForm';
import Loading from 'components/Loading';
import SectionHeader from 'components/SectionHeader';
import { GET_BRACKET_FORMAT } from 'queries/bracket_format';

const BracketsEditPage = (props) => {
    // @ts-ignore
    const { bracketId } = useParams();

    const { loading, error, data } = useQuery(
    GET_BRACKET_FORMAT, 
        { 
            variables: { id: bracketId, limit: 1 },
            notifyOnNetworkStatusChange: true 
        });
    const [bracketData, setBracketData] = useState(null);

    useEffect(() => {
        let active = true;
        if (active && data && data.bracketFormat) {
            setBracketData(data.bracketFormat);
        }
        return () => {
            active = false;
        }
    }, [loading, data, error]);

    if (loading || bracketData === null) {
        return (<Loading center={true} centerInPage={true} />);
    }

    return (
        <div>
            <SectionHeader 
                title={bracketData ? "Edit " + bracketData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game bracket."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Tournaments", to: "/tournaments" },
                    { title: "Brackets", to: "/tournaments/brackets" },
                    { title: 'Edit ' + bracketData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <BracketsEditForm bracket={bracketData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default BracketsEditPage;
