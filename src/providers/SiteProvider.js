import Loading from "components/Loading";
import firebase from 'firebase/app';
import _ from "lodash";
import React, { Component, createContext } from "react";
import { getSiteMetadata, getSites } from '../utils/api';

export const SiteContext = createContext({ 
    loading: true,
    selected: null, 
    sites: [], 
    setSite: null,
    getSite: null,
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
        this.getTimezone = this.getTimezone.bind(this);
    }
    state = {
        loading: true,
        selected: null,
        sites: [],
        user: null,
        setSite: null,
        getSite: null,
        getTimezone: null,
        siteChangedCallbacks: [],
        onSiteChanged: null,
        refetchSites: null,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    setSite = (id) => {
        this.setState({selected: id});
        this.siteDidChange();
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

                        const selectedSiteId = this.state.selected === null ? sites[0].id : this.state.selected;
                        const selectedSite = _.first(sites.filter(s => s.id === selectedSiteId));
                        this.setState({
                            selected: selectedSiteId,
                            sites: sites,
                            timezone: selectedSite?.metadata?.timezone.value,
                            loading: false
                        });
                        this.siteDidChange();
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