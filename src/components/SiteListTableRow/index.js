
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import { deleteUser, resetPassword, suspendUser } from "../../utils/api";
import { UserContext } from '../../providers/UserProvider';

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const SiteListTableRow = (props) => {
    const {
        id,
        name,
        url,
        domain,
        backend_domain,
        backend_url,
        deleted_at,
		suspended_at,
		setNotification,
		setLoading
    } = props;

    const [anchorEl, setAnchorEl] = useState(false);
	const userCtx = useContext(UserContext);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleEdit = () => {
		setNotification({
			open: true,
			type: 'primary',
			message: "TODO: Allow users to edit."
		}, false);
		handleClose();
    };
    const handleSuspend = () => {
		setNotification({
			open: true,
			type: 'primary',
			message: "TODO: Allow users to suspend."
		}, false);
		handleClose();
    };
    const handleDelete = () => {
		setNotification({
			open: true,
			type: 'primary',
			message: "TODO: Allow users to delete."
		}, false);
		handleClose();
	};
    
	return (
        <tr>
            <td>
                <div className="d-flex">
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <div>
                                <a
                                    href={backend_url + '/dashboard'}
                                    target="_new"
                                    className="font-weight-bold text-black"
                                    title={name}>
                                    {name}
                                </a>
                                <span className="text-black-50 d-block">
                                    {domain}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <a
                    href={backend_url + '/dashboard'}
                    target="_new"
                    title={name}>
                    {url}
                </a>
                
            </td>
            <td className="text-center">
                { suspended_at &&
                    <span className="badge badge-warning">Disabled</span>
                }
                { deleted_at &&
                    <span className="badge badge-danger">Deleted</span>
                }
                { !suspended_at && !deleted_at &&
                    <span className="badge badge-success">Enabled</span>
                }
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <Button
                        size="small"
                        onClick={handleClick}
                        className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                        <FontAwesomeIcon
                            icon={['fas', 'ellipsis-h']}
                            className="font-size-lg"
                        />
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
									<ListItemLink  onClick={handleSuspend} button className="text-left">
										{suspended_at ? 'Enable' : 'Disable'}
									</ListItemLink>
									<ListItem onClick={handleDelete} button className="text-left">
										Delete
									</ListItem>
								</List>
							</div>
						</div>
					</Menu>
                </div>
            </td>
        </tr>
	);
};

export default SiteListTableRow;

					