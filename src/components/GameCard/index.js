import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CardContent, Grid } from '@material-ui/core';
import { DateTime } from 'luxon';
import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = (props) => {
    const {
        game
    } = props;

	return (
		<Grid item sm={12} md={4} xl={2} lg={2}>
			<Link
				className="card card-box-hover-rise bg-white"
				to={'/games/edit/' + game.id}>
					<div className="card-badges">
						&nbsp;
					</div>

					<img alt={game.title} className="card-img-top" src={game.cover.formats.small.url} />

					<CardContent className="px-2">
						<h5 className="card-title font-weight-bold font-size-sm">
							{game.title}
						</h5>
						<div className=""></div>
						<div className="card-date text-black-50 mt-2">
							<FontAwesomeIcon icon={['far', 'clock']} className="mr-1 mt-1 pt-1" />
							<small>{DateTime.fromISO(game.updated_at).toFormat("MMM dd, yyyy h:mm a")}</small>
						</div>
					</CardContent>
			</Link>
		</Grid>
	);
}

export default GameCard;