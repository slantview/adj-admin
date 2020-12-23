import React, { Component, createContext } from "react";
import firebase from 'firebase/app';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth});
        });
    };
    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;