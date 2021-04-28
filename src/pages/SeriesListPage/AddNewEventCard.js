import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, CardContent } from '@material-ui/core';
import EventBusyTwoToneIcon from '@material-ui/icons/EventBusyTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';

function AddNewEventCard({ id }) {
    return (
        <div className="m-4 text-center">
            <div className="text-primary-50">
                <EventBusyTwoToneIcon fontSize="large" />
            </div>
            <h4 className="font-size-lg">No Upcoming Events</h4>
            <p>To get started, <Link className="text-first" to={"/series/view/" + id + "/add"}>add a new event.</Link></p>
        </div>
    )
}

export default AddNewEventCard;
