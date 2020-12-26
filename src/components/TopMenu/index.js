import React, { useContext } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HeaderUserbox from '../HeaderUserbox';
import { UserContext } from '../../providers/UserProvider';
import { Badge, Grid, Menu, MenuItem, IconButton } from '@material-ui/core';

const TopMenu = () => {
    const user = useContext(UserContext);

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

                { user &&
                    <HeaderUserbox />
                }
            </Grid>
        </Grid>
    );
}

export default TopMenu