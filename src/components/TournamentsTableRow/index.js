import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import moment from 'moment';
import React from "react";
import { Link } from 'react-router-dom';

const TournamentsTableRow = (props) => {
    const {
        id,
        title,
        subtitle,
        header,
        created_at,
        updated_at,
        published_at
    } = props;
    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");

	return (
        <tr>
            <td>
                <div className="d-flex">
                    <div>
                        <Link to={"/tournaments/"+id}>
                            <img 
                                src={header.formats.thumbnail.url} 
                                width="60px" 
                                alt={title} 
                                className="mr-3" />
                        </Link>
                    </div>
                    <div>
                        <Link to={"/tournaments/"+id}>
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
                <span className={"badge text-uppercase " + (published_at ? "badge-success" : "badge-first")}>{(published_at ? "Published" : "Draft")}</span>
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

export default TournamentsTableRow;

					