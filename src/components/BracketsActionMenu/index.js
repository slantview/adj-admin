import { useMutation } from '@apollo/client';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';
import { DELETE_GAME_RULE_LIST } from 'queries/rules';

const BracketsActionMenu = (props) => {
    const {
        rule,
        refreshBrackets,
        iconClassName
    } = props;

    const {
        id,
    } = rule;

    const history = useHistory();
    const notify = useContext(NotificationContext).notify;
    const siteCtx = useContext(SiteContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteGameBracketList] = useMutation(DELETE_GAME_RULE_LIST);
    
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
    const handleEdit = () => {
		history.push('/rules/edit/'+id);
		handleClose();
    };

    const handleDelete = () => {
        deleteGameBracketList({ variables: { id: id }})
            .then(result => {
                const deletedGameBracketList = result.data.deleteGameBracketList.gameBracketList;
                notify({
                    type: 'success',
                    message: `Successfully deleted rule: ${deletedGameBracketList.title}.`
                });
                refreshBrackets();
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: `Error deleting rule: ${e.toString()}`
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

export default BracketsActionMenu;
