import { ApolloProvider } from "@apollo/client";
import _ from 'lodash';
import moment from "moment-timezone";
import React, { useContext, useEffect } from "react";

import Loading from "components/Loading";

import { client, getClient } from "../utils/graphql";
import { SiteContext } from './SiteProvider';
import { UserContext } from './UserProvider';

export const BackendProvider = (props) => {
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const site = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
    const backendClient = site ? getClient(site.backend_url + "/graphql", userCtx.token) : client;
    const isLoaded = (siteCtx.selected !== null && userCtx.user !== null && site !== null);
    const userExpired = moment(userCtx.expires).isBefore(moment());

    if (userExpired) {
        if (!userCtx.user) {
            window.location.pathname = '/login';
        }
        userCtx.user.reload();
    }
     // @ts-ignore
     useEffect(() => {
        if (siteCtx.onSiteChanged) {
            siteCtx.onSiteChanged(async () => {
                return new Promise((resolve, reject) => {
                    backendClient.resetStore();
                    resolve();
                });
            });
        }
    }, []);

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