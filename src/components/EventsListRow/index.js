import EventActionMenu from 'components/EventActionMenu';
import moment from 'moment';
import { SiteContext } from 'providers/SiteProvider';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

const EventsListRow = (props) => {
    const {
		setLoading,
        event,
        refreshSeries
    } = props;

    const {
        id,
        title,
        starts_at,
        published_at,
        seriesId,
        card
    } = event;

    const startsAt = moment(starts_at).format("MM/DD/YYYY");
    const isFuture = moment(starts_at).isAfter(moment());

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();

	return (
        <tr >
            <td>
                <div className="d-flex align-items-center">
                    <div className="avatar-icon-wrapper mr-2">
                        <div className="avatar-icon">
                            <img alt={title} src={card.formats.thumbnail.url} />
                        </div>
                    </div>
                    <div>
                        <Link
                            to={"/events/" + seriesId + "/" + id}
                            onClick={(e) => e.preventDefault()}
                            className="font-weight-bold text-black"
                            title={title}>
                                {title}
                        </Link>
                        <span className="text-black-50 font-weight-light d-block">
                            {moment(starts_at).tz(timezone).format("MM/DD/YYYY h:mmA")}
                        </span>
                    </div>
                </div>
            </td>
            <td className="text-left">
                {startsAt}
            </td>
            <td className="text-left">
                { published_at && isFuture &&
                    <span className="badge text-uppercase badge-success">Published</span>
                }
                { !isFuture && published_at &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Archived</span>
                }
                { !published_at && isFuture &&
                    <span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
                }
                 { !isFuture && !published_at &&
                    <span className="badge text-uppercase badge-neutral-success text-black-50">Draft</span>
                }
            </td>
            <td className="text-right">
                <div className="d-flex align-items-center justify-content-end pr-3">
                    <EventActionMenu 
                        event={event} 
                        refreshSeries={refreshSeries} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" />
                </div>
            </td>
        </tr>
	);
};

export default EventsListRow;

					