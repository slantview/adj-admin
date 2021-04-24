import React, { Component, createContext, useContext } from "react";
import { getSites, getSiteMetadata } from '../utils/api';
import firebase from 'firebase/app';
import { Preview } from "@material-ui/icons";

export const SiteContext = createContext({ 
    selected: null, 
    sites: [], 
    setSite: null,
    user: null,
    onSiteChanged: null,
    siteChangedCallbacks: [],
    refetchSites: null
});

class SiteProvider extends Component {
    state = {
        selected: null,
        sites: [],
        user: null,
        setSite: null,
        siteChangedCallbacks: new Array(),
        onSiteChanged: null,
        refetchSites: null
    };

    setSite = (id) => {
        if (this.state.siteChangedCallbacks.length > 0) {
            Promise.all(this.state.siteChangedCallbacks.map(cb => cb()))
        }
        return this.setState({selected: id});
    }

    onSiteChanged = (callback) => {
        this.state.siteChangedCallbacks.push(callback);
        this.setState({
            siteChangedCallbacks: this.state.siteChangedCallbacks
        });
    }

    refetchSites = () => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(async user => {
            if (user === null) {
                return;
            }
            const token = await user.getIdToken();
            getSites(token)
                .then(async response => {
                    if (response.ok) {
                        const sites = await response.json();
                        sites.map(async (site, i) => {
                            const response = await getSiteMetadata(site.backend_url)
                            const orgInfo = await response.json();
                            site.metadata = orgInfo;
                            sites[i] = site;
                        });
                        this.setState({
                            selected: this.state.selected === null ? sites[0].id : this.state.selected,
                            sites: sites,
                        });
                    }
                })
                .catch(e => {
                    console.error(e);
                });
        });
    }

    componentDidMount = async () => {
        this.setState({
            setSite: this.setSite,
            onSiteChanged: this.onSiteChanged,
            refetchSites: this.refetchSites
        });

        this.refetchSites();
    };

    componentWillUnmount = () => {
        this.setState({
            selected: null,
            sites: [],
            user: null,
            setSite: null,
            siteChangedCallbacks: new Array(),
            onSiteChanged: null,
            refetchSites: null
        });
    }

    render() {
        return (
            <SiteContext.Provider value={this.state}>
                {this.props.children}
            </SiteContext.Provider>
        );
    }
}
export default SiteProvider;