import React, { Component, createContext } from "react";
import firebase from 'firebase/app';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    state = {
        user: null,
        token: null,
        admin: false
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
            const { claims } = await userAuth.getIdTokenResult();
            this.setState({ user: userAuth, token: token, admin: claims ? claims.admin : false});
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