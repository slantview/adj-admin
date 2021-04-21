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
    siteChangedCallbacks: []
});

class SiteProvider extends Component {
    state = {
        selected: null,
        sites: [],
        user: null,
        setSite: null,
        siteChangedCallbacks: new Array(),
        onSiteChanged: null
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
        console.log('---- DONE ----')
    }

    componentDidMount = async () => {
        this.setState({
            setSite: this.setSite,
            onSiteChanged: this.onSiteChanged
        });

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
                            selected: sites[0].id,
                            sites: sites,
                        });
                    }
                })
                .catch(e => {
                    console.error(e);
                });
        });
    };

    render() {
        return (
            <SiteContext.Provider value={this.state}>
                {this.props.children}
            </SiteContext.Provider>
        );
    }
}
export default SiteProvider;