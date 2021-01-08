import React, { Component, createContext, useContext } from "react";
import { getSites } from '../utils/api';
import firebase from 'firebase/app';

export const SiteContext = createContext({ selected: null, sites: [] });

class SiteProvider extends Component {
    state = {
        selected: null,
        sites: [],
        user: null,
        setSite: null
    };

    setSite = (id) => {
        this.setState({selected: id});
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
                    const sites = await response.json();
                    this.setState({
                        selected: this.state.selected ? this.state.selected : sites[0].id,
                        sites: sites,
                    })
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