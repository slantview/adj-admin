
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';
import PersonIcon from '@material-ui/icons/PersonTwoTone';

const UsersListTableRow = (props) => {
    const {
        id,
        first_name,
        last_name,
        email,
        photo_url,
        admin,
        created_at,
        updated_at,
        deleted_at,
        suspended_at
    } = props;
    
    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");
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
            <td className="text-center">
                { suspended_at &&
                    <span className="badge badge-warning">Suspended</span>
                }
                { deleted_at &&
                    <span className="badge badge-danger">Deleted</span>
                }
                { !suspended_at && !deleted_at &&
                    <span className="badge badge-success">Active</span>
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
                        className="btn-link d-30 p-0 btn-icon hover-scale-sm">
                        <FontAwesomeIcon
                            icon={['fas', 'ellipsis-h']}
                            className="font-size-lg"
                        />
                    </Button>
                </div>
            </td>
        </tr>
	);
};

export default UsersListTableRow;

					