import firebase from 'firebase/app';
import moment from 'moment';
import React, { Component, createContext } from "react";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const UserContext = createContext({ user: null, token: null, admin: false, expires: null });

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    state = {
        user: null,
        token: null,
        admin: false,
        expires: null
    };

    logout = () => {
        this.setState({
            user: null,
            token: null,
            admin: false
        })
    }

    componentDidMount = () => {
        const auth = firebase.auth();

        auth.onAuthStateChanged(async userAuth => {
            if (userAuth === null) {
                return;
            }
            const token = await userAuth.getIdToken();
            const { claims, expirationTime } = await userAuth.getIdTokenResult();

            this.setState({ 
                user: userAuth, 
                token: token, 
                admin: claims ? claims.admin : false,
                expires: moment(expirationTime).unix()
            });
        });

        auth.onIdTokenChanged(async userAuth => {
            if (userAuth) {
                const token = await userAuth.getIdToken();
                const { claims, expirationTime } = await userAuth.getIdTokenResult();
                this.setState({
                    user: userAuth, 
                    token: token, 
                    admin: claims ? claims.admin : false,
                    expires: moment(expirationTime).unix()
                });
            }
        });

        this.setState({logout: this.logout});
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;