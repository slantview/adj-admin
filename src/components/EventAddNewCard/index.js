import EventBusyTwoToneIcon from '@material-ui/icons/EventBusyTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';

function EventAddNewCard({ id }) {
    return (
        <div className="m-4 text-center text-white">
            <div className="text-white-50">
                <EventBusyTwoToneIcon fontSize="large" />
            </div>
            <h4 className="font-size-lg">No Upcoming Events</h4>
            <p>To get started,&nbsp;
                <Link className="text-first" to={"/events/" + id + "/add"}>add a new event</Link>.
                </p>
        </div>
    )
}

export default EventAddNewCard;
