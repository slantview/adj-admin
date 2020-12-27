import React, { Component, createContext } from "react";
import firebase from 'firebase/app';
import { useHistory } from 'react-router-dom';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth});
            // If we have a user send them to dashboard, otherwise let's go to the login page.
            const history = useHistory();
            if (userAuth) {
                history.push('/')
            } else {
                history.push('/login');
            }
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