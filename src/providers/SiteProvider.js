import firebase from 'firebase/app';
import _ from "lodash";
import React, { Component, createContext } from "react";

import Loading from "components/Loading";

import { getSiteMetadata, getSites } from '../utils/api';

export const SiteContext = createContext({ 
    loading: true,
    selected: null, 
    sites: [], 
    setSite: null,
    getSite: null,
    getSiteById: null,
    getTimezone: null,
    user: null,
    onSiteChanged: null,
    siteChangedCallbacks: [],
    refetchSites: null,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
});

class SiteProvider extends Component {
    constructor(props) {
        super(props);
        this.setSite = this.setSite.bind(this);
        this.getSite = this.getSite.bind(this);
        this.getSiteById = this.getSiteById.bind(this);
        this.getTimezone = this.getTimezone.bind(this);
    }
    state = {
        loading: true,
        selected: null,
        sites: [],
        user: null,
        setSite: null,
        getSite: null,
        getSiteById: null,
        getTimezone: null,
        siteChangedCallbacks: [],
        onSiteChanged: null,
        refetchSites: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    setSite = (id) => {
        if (id !== "") {
            localStorage.setItem('selectedSite', id);
            this.setState({selected: id});
            this.siteDidChange();
        }
    }

    siteDidChange = () => {
        if (this.state.siteChangedCallbacks.length > 0) {
            Promise.all(this.state.siteChangedCallbacks.map(cb => cb()))
        }
    }

    onSiteChanged = (callback) => {
        this.state.siteChangedCallbacks.push(callback);
        this.setState({
            siteChangedCallbacks: this.state.siteChangedCallbacks
        });
    }

    getSite = () => {
        return _.first(this.state.sites.filter(s => s.id === this.state.selected));
    }

    getSiteById = (id) => {
        return _.first(this.state.sites.filter(s => s.id === id));
    }

    getTimezone = () => {
        return this.getSite()?.metadata?.timezone.value;
    }
   

    refetchSites = () => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(async user => {
            if (user === null) {
                return;
            }
            const token = await user.getIdToken();
            
            this.setState({loading:true});
            getSites(token)
                .then(async response => {
                    if (response.ok) {
                        let sites = await response.json();
                        sites.forEach(async (site, i) => {
                            const response = await getSiteMetadata(site.backend_url)
                            const orgInfo = await response.json();
                            site.metadata = orgInfo;
                            sites[i] = site;
                        });
                        // If sites is zero, then this user doesn't have a site assigned yet. Go to fail.
                        if (sites.length === 0) {
                            window.location.pathname = '/failure';
                        }

                        let selectedSiteId = "";

                        if (sites.length === 1) {
                            selectedSiteId = sites[0].id;
                        } else {
                            const prevSelected = localStorage.getItem('selectedSite');
                            if (prevSelected !== "" && prevSelected !== null && typeof prevSelected !== "undefined") {
                                selectedSiteId = prevSelected;
                            }
    
                            if (this.state.selected !== "" && this.state.selected !== null && typeof this.state.selected !== "undefined") {
                                selectedSiteId = this.state.selected;
                            } else {
                                selectedSiteId = sites[0].id; 
                            }
                        }
                         
                        const selectedSite = _.first(sites.filter(s => s.id === selectedSiteId));
                        
                        this.setState({
                            selected: selectedSiteId,
                            sites: sites,
                            timezone: selectedSite?.metadata?.timezone.value,
                            loading: false
                        });
                        this.siteDidChange();
                    } else if (response.status === 401) {
                        window.location.pathname = '/login';
                    } else {
                        // If we don't get an ok here, we have to go to failure mode.
                        window.location.pathname = '/failure';
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
            getSite: this.getSite,
            getSiteById: this.getSiteById,
            getTimezone: this.getTimezone,
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
            getSite: null,
            getSiteById: null,
            getTimezone: null,
            siteChangedCallbacks: [],
            onSiteChanged: null,
            refetchSites: null
        });
    }

    render() {
        return (
            <SiteContext.Provider value={this.state}>
                { false && this.state.loading ? (
                    <Loading centerInPage={true} center={true} />
                ) : (
                    this.props.children
                )}
            </SiteContext.Provider>
        );
    }
}
export default SiteProvider;