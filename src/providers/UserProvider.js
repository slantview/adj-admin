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
        token: null
    };

    logout = () => {
        this.setState({
            user: null,
            token: null
        })
    }

    componentDidMount = () => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth === null) {
                return;
            }
            const token = await userAuth.getIdToken();
            this.setState({ user: userAuth, token: token});
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