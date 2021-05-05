import moment from 'moment';
import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import EventActionMenu from 'components/EventActionMenu';
import { SiteContext } from 'providers/SiteProvider';

const EventsListRow = (props) => {
    const {
		setLoading,
        event,
        refreshSeries
    } = props;

    const siteCtx = useContext(SiteContext);
    const timezone = siteCtx.getTimezone();
    const startsAtFormatted = moment(event.starts_at).tz(timezone).format("MM/DD/YYYY");
    
	return (
        <tr key={event.id}>
            <td style={{width: "60%"}}>
                <div className="d-flex align-items-center">
                    <div>
                        <Link
                            to={'/events/edit/' + event.id}
                            className="font-weight-bold text-black"
                            title={event.title}>
                                {event.title}
                        </Link>
                    </div>
                </div>
            </td>
            <td className="text-left">
                <span className="font-weight-bold d-block">
                    {startsAtFormatted}
                </span>
            </td>
            <td className="text-left">
                { event.published_at &&
                    <span className="badge text-uppercase badge-success">Published</span>
                }
                { !event.published_at &&
                    <span className="badge text-uppercase badge-neutral-first text-first">Draft</span>
                }
            </td>
            <td className="text-right text-black-50">
                <EventActionMenu 
                    event={event} 
                    refreshSeries={refreshSeries} 
                    setLoading={setLoading} 
                    iconClassName="text-black-50" />
            </td>
        </tr>
	);
};

export default EventsListRow;

					