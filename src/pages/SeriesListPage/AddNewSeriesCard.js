import { Card, CardContent } from '@material-ui/core';
import EventBusyTwoToneIcon from '@material-ui/icons/EventBusyTwoTone';
import React from 'react';
import { Link } from 'react-router-dom';

function AddNewSeriesCard() {
    return (
		<Card className="card-box mb-spacing-6-x2">
			<CardContent className="px-0 pt-2 pb-3">
				<div className="m-4 text-center">
					<div className="text-primary-50">
						<EventBusyTwoToneIcon fontSize="large" />
					</div>
					<h4>No Events</h4>
					<p>To get started, <Link className="text-first" to="/series/add">create a new event series.</Link></p>
				</div>
			</CardContent>
		</Card>
    )
}

export default AddNewSeriesCard;
