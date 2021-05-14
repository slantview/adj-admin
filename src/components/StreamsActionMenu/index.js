import { useMutation } from '@apollo/client';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { DELETE_GEO_REGION_LIST } from 'queries/service_areas';
import { DELETE_STREAM } from 'queries/streams';

const StreamsActionMenu = (props) => {
    const {
        stream,
        refreshStreams,
        iconClassName
    } = props;

    const {
        id,
    } = stream;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteStream] = useMutation(DELETE_STREAM);
    
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
    const handleEdit = () => {
		history.push('/streams/edit/'+id);
		handleClose();
    };

    const handleDelete = () => {
        deleteStream({ variables: { id: id }})
            .then(result => {
                const deletedStream = result.data.deleteStream.stream;
                notify({
                    type: 'success',
                    message: `Successfully deleted stream: ${deletedStream.name}.`
                });
                refreshStreams();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting stream: ${e.toString()}`
                });
            })
		handleClose();
	};

    return (
        <>
            <Button
                size="small"
                onClick={handleClick}
                className={"d-30 p-0 " + iconClassName}>
                    <SettingsTwoToneIcon fontSize="small" />
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                getContentAnchorEl={null}
                open={Boolean(anchorEl)}
                classes={{ list: 'p-0' }}
                onClose={handleClose}>
                <div className="dropdown-menu-lg overflow-hidden p-0">
                    <div className="dropdown-menu-lg overflow-hidden p-0">
                        <List component="div" className="nav-neutral-primary font-size-sm text-left">
                            <ListItem onClick={handleEdit} button className="text-left">
                                Edit
                            </ListItem>
                            <ListItem onClick={handleDelete} button className="text-left">
                                Delete
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Menu>
        </>
    )
}

export default StreamsActionMenu;
