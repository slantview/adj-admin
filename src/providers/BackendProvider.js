import React, { useContext } from "react";
import { SiteContext } from './SiteProvider';
import { UserContext } from './UserProvider';
import _ from 'lodash';
import { ApolloProvider } from "@apollo/client";
import { getClient, client } from "../utils/graphql";
import Loading from "components/Loading";

export const BackendProvider = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const site = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
    const backendClient = site ? getClient(site.backend_url + "/graphql", userCtx.token) : client;
    const isLoaded = siteCtx.selected && userCtx.user && site;
    return (
        <ApolloProvider client={backendClient}>
            { isLoaded ? (
                props.children
            ) : (
                <Loading centerInPage={true} center={true} />
            )}
        </ApolloProvider>
    );
}
export default BackendProvider;