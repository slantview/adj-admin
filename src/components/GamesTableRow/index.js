
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';

const GamesTableRow = (props) => {
    const {
        id,
        title,
        subtitle,
        cover,
        events,
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
                        <Link to={"/games/"+id}>
                            <img 
                                src={cover.formats.thumbnail.url} 
                                width="60px" 
                                alt={title} 
                                className="mr-3" />
                        </Link>
                    </div>
                    <div>
                        <Link to={"/games/"+id}>
                            <span className="font-weight-bold text-black" title={title}>
                                {title}
                            </span>
                            <span className="text-black-50 d-block">
                                {subtitle}
                            </span>
                        </Link>
                    </div>
                </div>
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

export default GamesTableRow;

					