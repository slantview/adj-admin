import { Badge, Grid, IconButton, Menu, MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import React, { useContext } from 'react';

import { UserContext } from '../../providers/UserProvider';
import Userbox from '../Userbox';

const TopMenu = () => {
    const userCtx = useContext(UserContext);

    return (
        <Grid container direction="row" justify="flex-end">
            <Grid item lg={9}>
                &nbsp;
            </Grid>
            <Grid item lg={3}>
                <Menu>
                    <MenuItem>
                        <IconButton aria-label="show 11 new notifications" color="inherit">
                        <Badge badgeContent={11} color="primary">
                            <NotificationsIcon color="first" />
                        </Badge>
                        </IconButton>
                        <p>Notifications</p>
                    </MenuItem>
                </Menu>

                { userCtx && userCtx.user &&
                    <Userbox />
                }
            </Grid>
        </Grid>
    );
}

export default TopMenu