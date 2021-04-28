
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';

const SeriesTableRow = (props) => {
    const {
        id,
        title,
        subtitle,
        card,
        events,
        created_at,
        updated_at,
        published_at
    } = props;
    const tournaments = events.flatMap(e => e.tournaments);
    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");
	return (
        <tr>
            <td>
                <div className="d-flex">
                    { card && 
                        <div>
                            <Link to={"/series/view/"+id}>
                                <img 
                                    src={card.formats.thumbnail.url} 
                                    width="120px" 
                                    alt={title} 
                                    className="mr-3" />
                            </Link>
                        </div>
                    }
                    <div>
                        <Link to={"/series/view/"+id}>
                            <div className="font-weight-bold text-black" title={title}>
                                {title}
                            </div>
                            <div className="text-black-50 d-block">
                                {/* {subtitle} */}
                            </div>
                        </Link>
                    </div>
                </div>
            </td>
            <td className="text-center">
                <span className="">{events.length}</span>
            </td>
            <td className="text-center">
                <span className="">{tournaments ? tournaments.length : 0}</span>
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

export default SeriesTableRow;

					