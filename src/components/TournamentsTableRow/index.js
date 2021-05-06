import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@material-ui/core';
import moment from 'moment';
import React from "react";
import { Link } from 'react-router-dom';

import TournamentActionMenu from 'components/TournamentActionMenu';

const TournamentsTableRow = (props) => {
    const {
        refreshTournaments,
        setLoading,
        tournament
    } = props;

    const {
        id,
        title,
        subtitle,
        created_at,
        updated_at,
        published_at
    } = tournament;

    const createdAt = moment(created_at).format("MM/DD/YYYY");
    const updatedAt = moment(updated_at).format("MM/DD/YYYY");

	return (
        <tr>
            <td>
                <Link
                    to={"/tournaments/edit/"+id}
                    className="font-weight-bold text-black"
                    title={title}>
                        {title}
                </Link>
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
                    <TournamentActionMenu 
                        tournament={props.tournament} 
                        refreshTournaments={refreshTournaments} 
                        setLoading={setLoading} 
                        iconClassName="text-black-50" 
                    />
                </div>
            </td>
        </tr>
	);
};

export default TournamentsTableRow;

					