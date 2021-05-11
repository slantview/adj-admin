import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loading from 'components/Loading';
import RulesEditForm from 'components/RuleEditForm';
import SectionHeader from 'components/SectionHeader';
import { GET_GAME_RULE_LIST } from 'queries/rules';

const RulesEditPage = (props) => {
       // @ts-ignore
       const { ruleId } = useParams();

       const { loading, error, data } = useQuery(
           GET_GAME_RULE_LIST, 
           { 
               variables: { id: ruleId, limit: 1 },
               notifyOnNetworkStatusChange: true 
           });
       const [ruleData, setRuleData] = useState(null);
       const [isLoading, setLoading] = useState(loading);
   
       useEffect(() => {
           if ((isLoading || !loading) && data && data.gameRuleList) {
                setRuleData(data.gameRuleList);
                setLoading(loading);
           }
       }, [loading, data, error]);
   
       if (isLoading || ruleData === null) {
           return (<Loading center={true} centerInPage={true} />);
       }
    return (
        <div>
            <SectionHeader 
                title={ruleData ? "Edit " + ruleData?.title : 'Loading...'}
                titleColor="text-white"
                subtitle="Update game rule."
                subtitleColor="text-white-50"
                backgroundStyle='bg-beacons-gradient'
                breadcrumbs={[
                    { title: "Home", to: "/" },
					{ title: "Tournaments", to: "/tournaments" },
                    { title: "Rules", to: "/rules" },
                    { title: 'Edit ' + ruleData?.title, to: null }
                ]}
            />
            
            <div className="mx-4">
                <Grid container>
                    <Grid item md={12} lg={12} xl={12}>
                        <RulesEditForm rule={ruleData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default RulesEditPage;
