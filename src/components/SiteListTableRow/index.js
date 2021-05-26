import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, List, ListItem, Menu } from '@material-ui/core';
import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';

import { NotificationContext } from 'providers/NotificationProvider';
import { SiteContext } from 'providers/SiteProvider';

import { UserContext } from '../../providers/UserProvider';
import { deleteSite } from "../../utils/api";

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
}

const SiteListTableRow = (props) => {
    const {
        id,
        name,
        url,
        domain,
        backend_url,
        deleted_at,
		suspended_at,
		setLoading
    } = props;

   
	const userCtx = useContext(UserContext);
    const siteCtx = useContext(SiteContext);
    const notify = useContext(NotificationContext).notify;
    const history = useHistory();
    
    const [anchorEl, setAnchorEl] = useState(null);
    
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleEdit = () => {
		history.push('/admin/sites/edit/' + id);
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
        deleteSite({id: id}, userCtx.token)
            .then(resp => {
                if (resp.ok) {
                    siteCtx.refetchSites();
                    notify({
                        type: 'success',
                        message: `Successfully deleted site '${name}'.`
                    });
                    setLoading(true);
                }
            })
            .catch(e => {
                notify({
                    type: 'error',
                    message: `Error deleting site '${name}': ${e.toString()}.`
                });
            });
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

					