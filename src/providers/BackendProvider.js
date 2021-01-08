import React, { useContext } from "react";
import { SiteContext } from './SiteProvider';
import _ from 'lodash';
import { ApolloProvider } from "@apollo/client";
import { getClient, client } from "../utils/graphql";

export const BackendProvider = (props) => {
    const siteCtx = useContext(SiteContext);
    const site = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
    const backendClient = site ? getClient("https://" + site.backend_domain + "/graphql") : client;
    console.log('site', site);
    console.log('siteCtx', siteCtx);

    return (
        <ApolloProvider client={backendClient}>
            {props.children}
        </ApolloProvider>
    );
}
export default BackendProvider;