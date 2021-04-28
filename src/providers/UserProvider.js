import Loading from 'components/Loading';
import firebase from 'firebase/app';
import moment from 'moment';
import React, { Component, createContext } from "react";
import { useHistory } from 'react-router-dom';

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
        expires: null,
        loading: false
    };

    logout = () => {
        this.setState({
            user: null,
            token: null,
            admin: false,
            loading: false
        })
    }

    componentDidMount = () => {
        this.setState({loading: true});
        
        const auth = firebase.auth();
    
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth === null) {
                this.setState({loading:false});
                window.location.pathname = '/login';
                return;
            }
            const token = await userAuth.getIdToken();
            const { claims, expirationTime } = await userAuth.getIdTokenResult();

            this.setState({ 
                user: userAuth, 
                token: token, 
                admin: claims ? claims.admin : false,
                expires: moment(expirationTime).unix(),
                loading: false
            });
        });

        auth.onIdTokenChanged(async userAuth => {
            if (userAuth === null) {
                this.setState({loading:false});
                window.location.pathname = '/login';
                return;
            }
            if (userAuth) {
                const token = await userAuth.getIdToken();
                const { claims, expirationTime } = await userAuth.getIdTokenResult();
                
                this.setState({
                    user: userAuth, 
                    token: token, 
                    admin: claims ? claims.admin : false,
                    expires: moment(expirationTime).unix(),
                    loading: false
                });
            }
        });

        this.setState({logout: this.logout});
    };

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {/* { this.state.loading ? (
                    <Loading centerInPage={true} center={true} />
                ) : (
                    this.props.children
                )} */}
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
export default UserProvider;