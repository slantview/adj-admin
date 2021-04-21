
import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import { deleteUser, resetPassword, suspendUser } from "../../utils/api";
import { UserContext } from '../../providers/UserProvider';
import { NotificationContext } from "providers/NotificationProvider";

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const UsersListTableRow = (props) => {
    const {
        id,
        first_name,
        last_name,
        email,
        photo_url,
        admin,
        deleted_at,
		suspended_at,
		setLoading
    } = props;

	const userCtx = useContext(UserContext);
	const notify = useContext(NotificationContext).notify;

    const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleEdit = () => {
		notify({
			type: 'primary',
			message: "TODO: Allow users to edit."
		});
		handleClose();
	};
	const handlePasswordReset = () => {
		resetPassword(id, userCtx.token)
			.then(async (response) => {
				if (response.ok) {
					notify({
						type: 'success',
						message: "Password reset sent for " + first_name + " " + last_name + " (ID: " + id + ")"
					});
				} else {
					const ret = await response.json()
					notify({
						type: 'danger',
						message: "Error sending password reset for " + first_name + " " + last_name + " (ID: " + id + "): " + ret.error
					});
				}
				
			})
			.catch((e) => {
				notify({
					type: 'danger',
					message: "Error sending password reset for " + first_name + " " + last_name + " (ID: " + id + "): " + e  
				});
			});
		handleClose();
	};
	const handleSuspend = () => {
		setLoading(true);
		suspendUser(id, userCtx.token)
			.then(() => {
				notify({
					type: 'success',
					message: (suspended_at ? "Enabled" : "Disabled") + " user " + first_name + " " + last_name + " (ID: " + id + ")"
				});
			})
			.catch(e => {
				notify({
					type: 'danger',
					message: "Unable to " + (suspended_at ? "enable" : "disable") + " user " + first_name + " " + last_name + " (ID: " + id + "): " + e
				});
			})
		handleClose();
	};
	const handleDelete = () => {
		setLoading(true);
		deleteUser(id, userCtx.token)
		.then(() => {
			notify({
				type: 'success',
				message: "Deleted user " + first_name + " " + last_name + " (ID: " + id + ")"
			});
		})
		.catch(e => {
			notify({
				type: 'danger',
				message: "Unable to delete user " + first_name + " " + last_name + " (ID: " + id + "): " + e
			});
		})
		handleClose();
	};
    
	return (
        <tr>
            <td>
                <div className="d-flex">
                    <div className="d-flex">
                        <div className="d-flex align-items-center">
                            <div className="avatar-icon-wrapper mr-3">
                                <div className="avatar-icon text-center align-content-center">
                                    { photo_url ? (
                                        <img alt={"{first_name} {last_name}"} src={photo_url} />
                                    ) : (
                                        <PersonIcon className="" style={{ fontSize: 40 }} />
                                    )}
                                    
                                </div>
                            </div>
                            <div>
                                <a
                                    href="#/"
                                    onClick={(e) => e.preventDefault()}
                                    className="font-weight-bold text-black"
                                    title={"{first_name} {last_name}"}>
                                    {first_name} {last_name}
                                </a>
                                <span className="text-black-50 d-block">
                                    {email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>
                {id}
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
            <td className="text-center">
                { admin ? (
                    <span className="badge badge-success">Admin</span>
                ) : (
                    <span className="badge badge-neutral-first">Normal</span>
                )}
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
									<ListItemLink onClick={handlePasswordReset} button className="text-left">
										Reset Password
									</ListItemLink>
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

export default UsersListTableRow;

					