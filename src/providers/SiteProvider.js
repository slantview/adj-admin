import React, { Component, createContext, useContext } from "react";
import { getSites, getSiteMetadata } from '../utils/api';
import firebase from 'firebase/app';

export const SiteContext = createContext({ 
    selected: null, 
    sites: [], 
    setSite: null,
    user: null
});

class SiteProvider extends Component {
    state = {
        selected: null,
        sites: [],
        user: null,
        setSite: null
    };

    setSite = (id) => {
        return this.setState({selected: id});
    }

    componentDidMount = async () => {
        this.setState({setSite: this.setSite});

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