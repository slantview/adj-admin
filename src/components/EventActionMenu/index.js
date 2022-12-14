import { useMutation } from '@apollo/client';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import EventCloneDialog from 'components/EventCloneDialog';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { UserContext } from 'providers/UserProvider';
import { DELETE_EVENT, UPDATE_EVENT } from 'queries/events';
import { buildSite } from 'utils/api';

const EventActionMenu = (props) => {
    const {
        event,
        refreshSeries,
        setLoading,
        iconClassName
    } = props;

    const {
        id,
        published_at,
    } = event;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const userCtx = useContext(UserContext);
    const timezone = siteCtx.getTimezone();
    const [anchorEl, setAnchorEl] = useState(null);
    const [cloneConfirmModal, setCloneConfirmModal] = useState(false);
    const [deleteEvent] = useMutation(DELETE_EVENT);
    const [updateEvent] = useMutation(UPDATE_EVENT);
    
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
    const handleEdit = () => {
		history.push('/events/edit/'+id);
		handleClose();
    };
    const handleClone = () => {
		setCloneConfirmModal(true);
        handleClose()
    };

    const handlePublish = () => {
        updateEvent({ variables: { 
                id: id, 
                data: { 
                    published_at: moment().tz(timezone).format() 
                }
            }})
            .then(result => {
                const updatedEvent = result.data.updateEvent.event;
                buildSite(siteCtx.selected, userCtx.token);
                notify({
                    type: 'success',
                    message: `Successfully published event: ${updatedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error publishing event: ${e.toString()}`
                });
            });
    };

    const handleUnpublish = () => {
        updateEvent({ variables: {
                id: id,
                data: {
                    published_at: null
                }
            }})
            .then(result => {
                const updatedEvent = result.data.updateEvent.event;
                buildSite(siteCtx.selected, userCtx.token);
                notify({
                    type: 'success',
                    message: `Successfully unpublished event: ${updatedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting event: ${e.toString()}`
                });
            });
    };

    const handleDelete = () => {
        deleteEvent({ variables: { id: id }})
            .then(result => {
                const deletedEvent = result.data.deleteEvent.event;
                buildSite(siteCtx.selected, userCtx.token);
                notify({
                    type: 'success',
                    message: `Successfully deleted event: ${deletedEvent.title}.`
                });
                refreshSeries();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting event: ${e.toString()}`
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
                            <ListItem onClick={handleClone} button className="text-left">
                                Clone
                            </ListItem>
                            <ListItem 
                                onClick={published_at === null ? handlePublish : handleUnpublish} 
                                button 
                                className="text-left">
                                    {published_at === null ? 'Publish' : 'Unpublish'}
                            </ListItem>
                            <ListItem onClick={handleDelete} button className="text-left">
                                Delete
                            </ListItem>
                        </List>
                    </div>
                </div>
            </Menu>
            <EventCloneDialog
                event={event}
                cloneConfirmModal={cloneConfirmModal}
                setCloneConfirmModal={setCloneConfirmModal}
                setLoading={setLoading}
                refreshSeries={refreshSeries}
            />
        </>
    )
}

export default EventActionMenu;
