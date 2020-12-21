
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';

const PlacesTableRow = (props) => {
    const {
        id,
        name,
        created_at,
        updated_at
    } = props;
    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");
	return (
        <tr>
            <td>
                <div className="d-flex">
                    <div>
                        <Link to={"/places/"+id}>
                            <span className="font-weight-bold text-black" title={name}>
                                {name}
                            </span>
                        </Link>
                    </div>
                </div>
            </td>
            <td className="text-center">
                <span className="">0</span>
            </td>
            <td className="text-center">
                <span className="">0</span>
            </td>
            <td className="text-center">
                <span className="">{createdAt}</span>
            </td>
            <td className="text-center">
                <div className="">{updatedAt}</div>
            </td>
            <td className="text-center">
                <span className="badge badge-success text-uppercase">Published</span>
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

export default PlacesTableRow;

					