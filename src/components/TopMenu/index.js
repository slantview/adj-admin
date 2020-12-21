import React from 'react';
import LoginButton from '../LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import NotificationsIcon from '@material-ui/icons/Notifications';
import HeaderUserbox from '../HeaderUserbox';
import { Badge, Grid, Menu, MenuItem, IconButton } from '@material-ui/core';

const TopMenu = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <Grid container direction="row" justify="flex-end">
            <Grid item lg={10}>
                &nbsp;
            </Grid>
            <Grid item lg={2}>
                <Menu>
                    <MenuItem>
                        <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                        </IconButton>
                        <p>Notifications</p>
                    </MenuItem>
                </Menu>
           
                { !isAuthenticated &&
                    <LoginButton />
                }
                { isAuthenticated &&
                    <HeaderUserbox />
                }
            </Grid>
        </Grid>
    );
}

export default TopMenu