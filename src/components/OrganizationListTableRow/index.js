
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Dialog, List, ListItem, Menu } from '@material-ui/core';
import { NotificationContext } from "providers/NotificationProvider";
import React, { useContext, useState } from "react";
import { UserContext } from '../../providers/UserProvider';
import { deleteOrganization } from "../../utils/api";

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const OrganizationListTableRow = (props) => {
    const {
        id,
        name,
        email,
        website,
        deleted_at,
		suspended_at
    } = props;

    const userCtx = useContext(UserContext);
    const notify = useContext(NotificationContext).notify;

    const [anchorEl, setAnchorEl] = useState(null);
    const [errorConfirmModal, setErrorConfirmModal] = useState(false);

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
    const handleSuspend = () => {
		notify({
			type: 'primary',
			message: "TODO: Allow users to suspend."
		});
		handleClose();
    };
    const handleDelete = () => {
        deleteOrganization(userCtx.token, id)
            .then(response => {
                if (response.ok) {
                    setErrorConfirmModal(false);
                    notify({
                        type: 'success',
                        message: "Sucessfully deleted organization."
                    });
                } else {
                    const result = response.json();
                    console.log(result);
                    console.log(response);
                    notify({
                        type: 'danger',
                        message: "Unable to delete organization."
                    });
                }
            })
            .catch(e => {
                notify({
                    type: 'danger',
                    message: "Unable to delete organization: " + e
                });
            });
		
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
                                    href={website}
                                    target="_new"
                                    className="font-weight-bold text-black"
                                    title={name}>
                                    {name}
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
									<ListItem onClick={() => setErrorConfirmModal(true) } button className="text-left">
										Delete
									</ListItem>
								</List>
							</div>
						</div>
					</Menu>
                    <Dialog
                        open={errorConfirmModal}
                        onClose={() => setErrorConfirmModal(false) }
                        classes={{ paper: 'shadow-lg rounded' }}>
                        <div className="text-center p-5">
                            <div className="avatar-icon-wrapper rounded-circle m-0">
                            <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
                                <FontAwesomeIcon
                                icon={['fas', 'times']}
                                className="d-flex align-self-center display-3"
                                />
                            </div>
                            </div>
                            <h4 className="font-weight-bold mt-4">
                                Are you sure you want to delete {name}?
                            </h4>
                            <p className="mb-0 font-size-lg text-muted">
                                This operation cannot be undone.
                            </p>
                            <div className="pt-4">
                            <Button
                                onClick={() => setErrorConfirmModal(false) }
                                className="btn-neutral-secondary btn-pill mx-1">
                                <span className="btn-wrapper--label">Cancel</span>
                            </Button>
                            <Button onClick={handleDelete} className="btn-danger btn-pill mx-1">
                                <span className="btn-wrapper--label">Delete</span>
                            </Button>
                            </div>
                        </div>
                        </Dialog>
                </div>
            </td>
        </tr>
	);
};

export default OrganizationListTableRow;

					