
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';

const EventsTableRow = (props) => {
    const {
        id,
        title,
        subtitle,
        card,
        tournaments,
        created_at,
        updated_at,
        starts_at,
        published_at
    } = props;
    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");
    const startsAt = moment(starts_at).format("MM/DD/YYYY");
    const isFuture = moment(starts_at).subtract(moment()) > 0;
    console.log('isFuture', isFuture);
	return (
        <tr>
            <td>
                <div className="d-flex">
                    <div>
                        { card && card.formats &&
                            <Link to={"/series/"+id}>
                                <img 
                                    src={card.formats.thumbnail.url} 
                                    width="120px" 
                                    alt={title} 
                                    className="mr-3" />
                            </Link>
                        }
                    </div>
                    <div>
                        <Link to={"/series/"+id}>
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
                <span className="">{tournaments ? tournaments.length : 0}</span>
            </td>
            <td className="text-center">
                <div className="">{startsAt}</div>
            </td>
            <td className="text-center">
                { published_at && isFuture &&
                    <span className="badge text-uppercase badge-success">Published</span>
                }
                { !isFuture &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Archived</span>
                }
                { !published_at && isFuture &&
                    <span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
                }
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

export default EventsTableRow;

					