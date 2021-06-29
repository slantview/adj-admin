import { ApolloProvider } from "@apollo/client";
import _ from 'lodash';
import moment from "moment-timezone";
import React, { useContext, useEffect } from "react";
import history from 'utils/history';
import Loading from "components/Loading";

import { getClient } from "../utils/graphql";
import { SiteContext } from './SiteProvider';
import { UserContext } from './UserProvider';

export const BackendProvider = (props) => {

    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const site = _.first(siteCtx.sites.filter(s => s.id === siteCtx.selected));
    const backendClient = getClient(site?.backend_url + "/graphql", userCtx.token);
    const isLoaded = (siteCtx.selected !== null && userCtx.user !== null && site !== null);
    const userExpired = userCtx?.expires?.isBefore(moment());

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

    useEffect(() => {
        let listener;
        if (userCtx.user !== null && site !== null && typeof site !== 'undefined') {
            if (listener !== null && typeof listener !== 'undefined') {
                // @ts-ignore
                listener();
            }
            listener = history.listen((location) => {
                // @ts-ignore
                window.analytics.page({
                    path: location.pathname + location.search,
                    properties: {
                        userId: userCtx.user.uid,
                        isAdmin: userCtx.admin,
                        isAuthenticated: !userCtx.user.isAnonymous,
                        isAnonymous: userCtx.user.isAnonymous,
                        email: userCtx.user.email,
                        displayName: userCtx.user?.displayName,
                        selectedSiteId: site.id,
                        selectedSiteDomain: site.domain
                    }
                });
            });
        }
        return () => {
            if (listener !== null && typeof listener !== 'undefined') {
                // @ts-ignore
                listener();
            }
        }
    }, [userCtx, site])

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