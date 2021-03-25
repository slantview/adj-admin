import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Checkbox, Divider } from '@material-ui/core';
import moment from 'moment';
import React from "react";
import { Link } from 'react-router-dom';

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
        published_at,
        seriesId
    } = props;

    const startsAt = moment(starts_at).format("MM/DD/YYYY");
    const isFuture = moment(starts_at).isAfter(moment());
    console.log(startsAt, isFuture);
	return (
        <tr className="p-0 m-0 my-1">
            <td className="p-0 m-0 mb-0">
                <div className="">{startsAt}</div>
            </td>
            <td className="p-0 m-0 mb-0">
                <div>
                    <div>
                        { card && card.formats &&
                            <Link to={"/series/"+seriesId}>
                                <img 
                                    src={card.formats.thumbnail.url} 
                                    width="120px" 
                                    alt={title} 
                                    className="mr-3" />
                            </Link>
                        }
                    </div>
                    <div>
                        <Link to={"/series/"+seriesId+"/"+id}>
                            <span className="text-black" title={title}>
                                {title}
                            </span>
                            <span className="text-black-50 d-block">
                                {subtitle}
                            </span>
                        </Link>
                    </div>
                </div>
            </td>

            <td className="p-0 m-0 mb-0">
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
            <td className="p-0 m-0 mb-0">
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

					