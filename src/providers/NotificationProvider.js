import { Snackbar } from "@material-ui/core";
import React, { Component, createContext, useContext } from "react";

export const NotificationContext = createContext({ 
    notify: (notification) => {}, 
});

class NotificationProvider extends Component {
    state = {
        open: false,
        type: "primary",
        message: ""
    };

    notify = (notification) => {
        this.setState({
            open: true,
            type: notification.type,
            message: notification.message
        })
    }

    onClose = () => {
        this.setState({
            open: false,
            type: "primary",
            message: ""
        });
    }

    render() {
        return (
            <NotificationContext.Provider value={{notify: this.notify}}>
                {this.props.children}
                <Snackbar
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center' }}
                    key="notification"
                    autoHideDuration={5000}
                    open={this.state.open}
                    classes={{ root: 'toastr-' + this.state.type }}
                    message={this.state.message}
                    onClose={this.onClose}
                />
            </NotificationContext.Provider>
        );
    }
}
export default NotificationProvider;