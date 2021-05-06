import { useMutation } from '@apollo/client';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import moment from 'moment-timezone';
import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { DELETE_TOURNAMENT, UPDATE_TOURNAMENT } from 'queries/tournaments';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';


const TournamentActionMenu = (props) => {
    const {
        tournament,
        refreshTournaments,
        iconClassName
    } = props;

    const {
        id,
        published_at,
    } = tournament;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteTournament] = useMutation(DELETE_TOURNAMENT);
    const [updateTournament] = useMutation(UPDATE_TOURNAMENT);
    
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
    const handleEdit = () => {
		history.push('/tournaments/edit/'+id);
		handleClose();
    };

    const handlePublish = () => {
        updateTournament({ variables: { 
                id: id, 
                data: { 
                    published_at: moment().tz(timezone).format() 
                }
            }})
            .then(result => {
                const updatedTournament = result.data.updateTournament.tournament;
                notify({
                    type: 'success',
                    message: `Successfully published tournament: ${updatedTournament.title}.`
                });
                refreshTournaments();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error publishing tournament: ${e.toString()}`
                });
            });
    };

    const handleUnpublish = () => {
        updateTournament({ variables: {
                id: id,
                data: {
                    published_at: null
                }
            }})
            .then(result => {
                const updatedTournament = result.data.updateTournament.tournament;
                notify({
                    type: 'success',
                    message: `Successfully unpublished event: ${updatedTournament.title}.`
                });
                refreshTournaments();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting event: ${e.toString()}`
                });
            });
    };

    const handleDelete = () => {
        deleteTournament({ variables: { id: id }})
            .then(result => {
                const updatedTournament = result.data.updateTournament.tournament;
                notify({
                    type: 'success',
                    message: `Successfully deleted tournament: ${updatedTournament.title}.`
                });
                refreshTournaments();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting tournament: ${e.toString()}`
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
        </>
    )
}

export default TournamentActionMenu;
